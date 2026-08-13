from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
import httpx
import phonenumbers
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# ---------------- Landowner enquiries + WhatsApp auto-reply (Meta Cloud API) ----------------

META_GRAPH_VERSION = "v26.0"
META_TEMPLATE_NAME = "landowner_enquiry_confirmation"
META_ACCESS_TOKEN = os.environ.get("META_ACCESS_TOKEN")
META_PHONE_NUMBER_ID = os.environ.get("META_PHONE_NUMBER_ID")


class LandownerEnquiryIn(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=8, max_length=20)
    email: Optional[str] = Field(default=None, max_length=200)
    location: str = Field(min_length=2, max_length=200)
    area: Optional[str] = Field(default=None, max_length=100)
    message: Optional[str] = Field(default=None, max_length=3000)
    whatsapp_opt_in: bool = False


def indian_e164(value: str) -> str:
    # Accept 10-digit Indian mobile numbers or an already international number.
    raw = re.sub(r"[^0-9+]", "", value)
    if raw.startswith("0") and len(raw) == 11:
        raw = "+91" + raw[1:]
    elif raw.isdigit() and len(raw) == 10:
        raw = "+91" + raw
    elif raw.startswith("91") and len(raw) == 12:
        raw = "+" + raw
    if not raw.startswith("+"):
        raise ValueError("Use an Indian mobile number such as +919876543210")
    try:
        n = phonenumbers.parse(raw, None)
        if not phonenumbers.is_valid_number(n):
            raise ValueError
        return phonenumbers.format_number(n, phonenumbers.PhoneNumberFormat.E164)
    except Exception:
        raise ValueError("Invalid phone number")


async def send_landowner_confirmation(to: str, name: str, location: str) -> dict:
    # A website form submit does not open WhatsApp's 24h customer-service window,
    # so the confirmation is always sent as the approved Utility template.
    url = (
        f"https://graph.facebook.com/{META_GRAPH_VERSION}/"
        f"{META_PHONE_NUMBER_ID}/messages"
    )
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "template",
        "template": {
            "name": META_TEMPLATE_NAME,
            "language": {"code": "en"},
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {"type": "text", "text": name},
                        {"type": "text", "text": location},
                    ],
                }
            ],
        },
    }
    headers = {"Authorization": f"Bearer {META_ACCESS_TOKEN}"}
    async with httpx.AsyncClient(timeout=15) as http:
        response = await http.post(url, json=payload, headers=headers)
    if response.status_code >= 400:
        logger.error("WhatsApp API error %s: %s", response.status_code, response.text[:1000])
        raise HTTPException(502, "Enquiry saved, but WhatsApp confirmation could not be sent")
    return response.json()  # acceptance, not proof of delivery


@api_router.post("/enquiries/landowner")
async def create_landowner_enquiry(data: LandownerEnquiryIn):
    if not data.whatsapp_opt_in:
        raise HTTPException(400, "WhatsApp confirmation opt-in is required")
    try:
        phone = indian_e164(data.phone)
    except ValueError as exc:
        raise HTTPException(422, str(exc))

    doc = data.model_dump()
    doc.update(
        {
            "phone_e164": phone,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "whatsapp_status": "pending",
        }
    )
    result = await db.landowner_enquiries.insert_one(doc)
    enquiry_id = str(result.inserted_id)

    if not (META_ACCESS_TOKEN and META_PHONE_NUMBER_ID):
        await db.landowner_enquiries.update_one(
            {"_id": result.inserted_id},
            {"$set": {"whatsapp_status": "not_configured"}},
        )
        return {"id": enquiry_id, "whatsapp": "not_configured"}

    try:
        sent = await send_landowner_confirmation(phone, data.name.strip(), data.location.strip())
        message_id = sent.get("messages", [{}])[0].get("id")
        await db.landowner_enquiries.update_one(
            {"_id": result.inserted_id},
            {"$set": {"whatsapp_status": "accepted", "whatsapp_message_id": message_id}},
        )
    except HTTPException:
        await db.landowner_enquiries.update_one(
            {"_id": result.inserted_id},
            {"$set": {"whatsapp_status": "failed"}},
        )
        raise

    return {"id": enquiry_id, "whatsapp": "accepted"}


# ---------------- Admin: manage landowner enquiries (guarded by ADMIN_PASSWORD) ----------------

def require_admin(x_admin_key: Optional[str]) -> None:
    if not x_admin_key or x_admin_key != os.environ.get("ADMIN_PASSWORD"):
        raise HTTPException(401, "Invalid admin key")


@api_router.get("/admin/enquiries")
async def list_landowner_enquiries(x_admin_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_key)
    docs = await db.landowner_enquiries.find({}).sort("created_at", -1).to_list(200)
    for d in docs:
        d["id"] = str(d.pop("_id"))
    return docs


@api_router.delete("/admin/enquiries/{enquiry_id}")
async def delete_landowner_enquiry(enquiry_id: str, x_admin_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_key)
    try:
        oid = ObjectId(enquiry_id)
    except Exception:
        raise HTTPException(400, "Invalid enquiry id")
    result = await db.landowner_enquiries.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Enquiry not found")
    return {"deleted": enquiry_id}


@api_router.delete("/admin/status-checks/{check_id}")
async def delete_status_check(check_id: str, x_admin_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_key)
    result = await db.status_checks.delete_one({"id": check_id})
    if result.deleted_count == 0:
        raise HTTPException(404, "Status check not found")
    return {"deleted": check_id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()