"""Internal analytics: event tracking, backend-confirmed floor-plan downloads,
and the admin-only summary feed for the /admin dashboard.

Privacy: only anonymous visitor/session UUIDs are stored. No names, emails,
phone numbers or any personal data are collected.
"""

import os
import uuid
from datetime import datetime, timezone, timedelta
from pathlib import Path

import bcrypt
import jwt
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api")

PROJECTS_DIR = Path("/app/frontend/public/assets/projects")
JWT_ALGORITHM = "HS256"
VALID_TYPES = {
    "PROJECT_VIEW",
    "FLOOR_PLAN_VIEW",
    "FLOOR_PLAN_DOWNLOAD_START",
    "FLOOR_PLAN_DOWNLOAD_SUCCESS",
    "FLOOR_PLAN_DOWNLOAD_FAILURE",
}

_db = None


def init_db(db):
    global _db
    _db = db


# ---------------------------------------------------------------- auth ------

def _jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


async def seed_admin():
    email = os.environ["ADMIN_EMAIL"].lower()
    password = os.environ["ADMIN_PASSWORD"]
    existing = await _db.users.find_one({"email": email})
    if existing is None:
        await _db.users.insert_one(
            {
                "email": email,
                "password_hash": hash_password(password),
                "name": "Admin",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )
    elif not verify_password(password, existing["password_hash"]):
        await _db.users.update_one(
            {"email": email}, {"$set": {"password_hash": hash_password(password)}}
        )


async def ensure_indexes():
    await _db.users.create_index("email", unique=True)
    await _db.login_attempts.create_index("identifier")
    await _db.analytics_events.create_index("type")
    await _db.analytics_events.create_index("ts")
    await _db.analytics_events.create_index("projectId")


async def require_admin(request: Request):
    auth = request.headers.get("Authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, _jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


class LoginIn(BaseModel):
    email: str
    password: str


@router.post("/analytics/login")
async def analytics_login(body: LoginIn, request: Request):
    email = body.email.lower().strip()
    identifier = f"{request.client.host}:{email}"
    attempts = await _db.login_attempts.find_one({"identifier": identifier})
    if attempts:
        locked_until = attempts.get("locked_until")
        if locked_until and datetime.fromisoformat(locked_until) > datetime.now(timezone.utc):
            if attempts.get("count", 0) >= 5:
                raise HTTPException(status_code=429, detail="Too many attempts. Try again later.")
        else:
            # lockout window passed — reset so returning users are not trapped
            await _db.login_attempts.delete_one({"identifier": identifier})
            attempts = None

    user = await _db.users.find_one({"email": email, "role": "admin"})
    if not user or not verify_password(body.password, user["password_hash"]):
        await _db.login_attempts.update_one(
            {"identifier": identifier},
            {
                "$inc": {"count": 1},
                "$set": {
                    "locked_until": (
                        datetime.now(timezone.utc) + timedelta(minutes=15)
                    ).isoformat()
                },
            },
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await _db.login_attempts.delete_one({"identifier": identifier})
    token = jwt.encode(
        {
            "sub": email,
            "role": "admin",
            "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        },
        _jwt_secret(),
        algorithm=JWT_ALGORITHM,
    )
    return {"token": token, "email": email}


# ------------------------------------------------------------- tracking -----

class AnalyticsEvent(BaseModel):
    type: str
    projectId: str
    projectName: str
    visitorId: str
    sessionId: str
    ts: str
    floorPlan: str | None = None
    meta: dict = Field(default_factory=dict)


class TrackIn(BaseModel):
    events: list[AnalyticsEvent]


@router.post("/analytics/track")
async def track_events(body: TrackIn):
    docs = []
    for ev in body.events:
        if ev.type not in VALID_TYPES:
            continue
        doc = ev.model_dump()
        doc["id"] = str(uuid.uuid4())
        # anonymous IDs only — never store anything beyond what was declared
        doc["visitorId"] = str(doc["visitorId"])[:64]
        doc["sessionId"] = str(doc["sessionId"])[:64]
        docs.append(doc)
    if docs:
        await _db.analytics_events.insert_many(docs)
    return {"recorded": len(docs)}


# --------------------------------------- backend-confirmed download endpoint

@router.get("/download/floor-plan/{slug}")
async def download_floor_plan(slug: str, request: Request):
    """Streams the project's floor-plan PDF and records the outcome:
    SUCCESS only when the file has been fully streamed to the client;
    FAILURE when the client disconnects mid-transfer."""
    import re

    if not re.fullmatch(r"my-dream-[a-z]+", slug):
        raise HTTPException(status_code=404, detail="Unknown project")
    pdf = PROJECTS_DIR / slug / "floor-plan.pdf"
    if not pdf.exists():
        raise HTTPException(status_code=404, detail="Floor plan not found")

    vid = request.query_params.get("vid", "")[:64]
    sid = request.query_params.get("sid", "")[:64]
    start_id = request.query_params.get("start", "")[:64]
    name = slug.replace("-", " ").title()
    size = pdf.stat().st_size

    async def streamer():
        sent = 0
        try:
            with open(pdf, "rb") as f:
                while True:
                    chunk = f.read(64 * 1024)
                    if not chunk:
                        break
                    sent += len(chunk)
                    yield chunk
                    if await request.is_disconnected():
                        await _db.analytics_events.insert_one(
                            {
                                "id": str(uuid.uuid4()),
                                "type": "FLOOR_PLAN_DOWNLOAD_FAILURE",
                                "projectId": slug,
                                "projectName": name,
                                "floorPlan": "floor-plan.pdf",
                                "visitorId": vid,
                                "sessionId": sid,
                                "ts": datetime.now(timezone.utc).isoformat(),
                                "meta": {"startEventId": start_id, "reason": "client_disconnected", "bytesSent": sent},
                            }
                        )
                        return
            # full file streamed — only now is the download confirmed
            await _db.analytics_events.insert_one(
                {
                    "id": str(uuid.uuid4()),
                    "type": "FLOOR_PLAN_DOWNLOAD_SUCCESS",
                    "projectId": slug,
                    "projectName": name,
                    "floorPlan": "floor-plan.pdf",
                    "visitorId": vid,
                    "sessionId": sid,
                    "ts": datetime.now(timezone.utc).isoformat(),
                    "meta": {"startEventId": start_id, "bytes": sent},
                }
            )
        except Exception:
            await _db.analytics_events.insert_one(
                {
                    "id": str(uuid.uuid4()),
                    "type": "FLOOR_PLAN_DOWNLOAD_FAILURE",
                    "projectId": slug,
                    "projectName": name,
                    "floorPlan": "floor-plan.pdf",
                    "visitorId": vid,
                    "sessionId": sid,
                    "ts": datetime.now(timezone.utc).isoformat(),
                    "meta": {"startEventId": start_id, "reason": "stream_error", "bytesSent": sent},
                }
            )
            raise

    return StreamingResponse(
        streamer(),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{name} - Floor Plan.pdf"',
            "Content-Length": str(size),
        },
    )


# ------------------------------------------------------------- summary ------

def _median(values):
    if not values:
        return None
    s = sorted(values)
    n = len(s)
    mid = n // 2
    return s[mid] if n % 2 else (s[mid - 1] + s[mid]) / 2


def _fmt_ms(ms):
    if ms is None:
        return None
    secs = round(ms / 1000)
    return {"ms": round(ms), "label": f"{secs // 60}m {secs % 60:02d}s" if secs >= 60 else f"{secs}s"}


@router.get("/analytics/summary")
async def analytics_summary(_admin=Depends(require_admin)):
    events = await _db.analytics_events.find({}, {"_id": 0}).sort("ts", 1).to_list(200000)

    totals = {t: 0 for t in VALID_TYPES}
    per_project = {}
    recent = []

    for ev in events:
        t = ev["type"]
        totals[t] = totals.get(t, 0) + 1
        pid = ev["projectId"]
        p = per_project.setdefault(
            pid,
            {
                "projectId": pid,
                "projectName": ev["projectName"],
                "views": 0,
                "planViews": 0,
                "downloadStarts": 0,
                "downloadConfirmed": 0,
                "downloadFailures": 0,
                "viewToPlanMs": [],
                "planToDownloadMs": [],
                "viewToDownloadMs": [],
            },
        )
        meta = ev.get("meta") or {}
        if t == "PROJECT_VIEW":
            p["views"] += 1
        elif t == "FLOOR_PLAN_VIEW":
            p["planViews"] += 1
            if meta.get("sinceProjectViewMs") is not None:
                p["viewToPlanMs"].append(meta["sinceProjectViewMs"])
        elif t == "FLOOR_PLAN_DOWNLOAD_START":
            p["downloadStarts"] += 1
            if meta.get("sincePlanViewMs") is not None:
                p["planToDownloadMs"].append(meta["sincePlanViewMs"])
            if meta.get("sinceProjectViewMs") is not None:
                p["viewToDownloadMs"].append(meta["sinceProjectViewMs"])
        elif t == "FLOOR_PLAN_DOWNLOAD_SUCCESS":
            p["downloadConfirmed"] += 1
        elif t == "FLOOR_PLAN_DOWNLOAD_FAILURE":
            p["downloadFailures"] += 1

        recent.append(
            {
                "ts": ev["ts"],
                "type": t,
                "projectName": ev["projectName"],
            }
        )

    projects = []
    for p in per_project.values():
        starts = p["downloadStarts"]
        confirmed = p["downloadConfirmed"]
        views = p["views"]
        plan_views = p["planViews"]
        projects.append(
            {
                "projectId": p["projectId"],
                "projectName": p["projectName"],
                "views": views,
                "planViews": plan_views,
                "downloadStarts": starts,
                "downloadConfirmed": confirmed,
                "downloadFailures": p["downloadFailures"],
                "viewToPlanPct": round(plan_views / views * 100, 1) if views else 0,
                "planToDownloadPct": round(starts / plan_views * 100, 1) if plan_views else 0,
                "overallPct": round(confirmed / views * 100, 1) if views else 0,
                "avgViewToPlan": _fmt_ms(
                    sum(p["viewToPlanMs"]) / len(p["viewToPlanMs"]) if p["viewToPlanMs"] else None
                ),
                "medianViewToPlan": _fmt_ms(_median(p["viewToPlanMs"])),
                "avgPlanToDownload": _fmt_ms(
                    sum(p["planToDownloadMs"]) / len(p["planToDownloadMs"]) if p["planToDownloadMs"] else None
                ),
                "medianPlanToDownload": _fmt_ms(_median(p["planToDownloadMs"])),
                "avgViewToDownload": _fmt_ms(
                    sum(p["viewToDownloadMs"]) / len(p["viewToDownloadMs"]) if p["viewToDownloadMs"] else None
                ),
                "medianViewToDownload": _fmt_ms(_median(p["viewToDownloadMs"])),
            }
        )

    total_views = totals["PROJECT_VIEW"]
    total_plan_views = totals["FLOOR_PLAN_VIEW"]
    total_starts = totals["FLOOR_PLAN_DOWNLOAD_START"]
    total_confirmed = totals["FLOOR_PLAN_DOWNLOAD_SUCCESS"]

    funnel = [
        {"stage": "Project View", "count": total_views, "pct": 100.0},
        {
            "stage": "Floor Plan View",
            "count": total_plan_views,
            "pct": round(total_plan_views / total_views * 100, 1) if total_views else 0,
        },
        {
            "stage": "Download Started",
            "count": total_starts,
            "pct": round(total_starts / total_views * 100, 1) if total_views else 0,
        },
        {
            "stage": "Download Confirmed",
            "count": total_confirmed,
            "pct": round(total_confirmed / total_views * 100, 1) if total_views else 0,
        },
    ]

    return {
        "totals": {
            "projectViews": total_views,
            "planViews": total_plan_views,
            "downloadStarts": total_starts,
            "downloadConfirmed": total_confirmed,
            "downloadFailures": totals["FLOOR_PLAN_DOWNLOAD_FAILURE"],
            "conversionPct": round(total_confirmed / total_views * 100, 1) if total_views else 0,
        },
        "funnel": funnel,
        "projects": projects,
        "recent": recent[-30:][::-1],
    }
