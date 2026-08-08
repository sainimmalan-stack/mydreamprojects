// Anonymous internal analytics — no names, emails or personal data.
// visitorId: random UUID persisted in localStorage (per browser)
// sessionId: random UUID per tab session (sessionStorage)

const API = process.env.REACT_APP_BACKEND_URL;

const uuid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const getVisitorId = () => {
  let id = localStorage.getItem("mdp_vid");
  if (!id) {
    id = uuid();
    localStorage.setItem("mdp_vid", id);
  }
  return id;
};

export const getSessionId = () => {
  let id = sessionStorage.getItem("mdp_sid");
  if (!id) {
    id = uuid();
    sessionStorage.setItem("mdp_sid", id);
  }
  return id;
};

const readMap = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
};

const writeMap = (key, map) => sessionStorage.setItem(key, JSON.stringify(map));

const post = (events, useBeacon = false) => {
  const payload = JSON.stringify({ events });
  const url = `${API}/api/analytics/track`;
  if (useBeacon && navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
    return;
  }
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
};

const baseEvent = (project, type) => ({
  type,
  projectId: project.slug,
  projectName: project.title,
  visitorId: getVisitorId(),
  sessionId: getSessionId(),
  ts: new Date().toISOString(),
});

// PROJECT_VIEW — once per session per project (avoids React StrictMode
// double-mount and reload noise distorting the funnel)
export const trackProjectView = (project) => {
  const seen = readMap("mdp_pvm");
  const now = Date.now();
  if (!seen[project.slug]) {
    seen[project.slug] = now;
    writeMap("mdp_pvm", seen);
    post([baseEvent(project, "PROJECT_VIEW")]);
  }
};

// FLOOR_PLAN_VIEW — once per session per project; records the timestamp of
// the related PROJECT_VIEW for view → plan timing
export const trackPlanView = (project) => {
  const seen = readMap("mdp_fvm");
  const now = Date.now();
  if (!seen[project.slug]) {
    seen[project.slug] = now;
    writeMap("mdp_fvm", seen);
    const pv = readMap("mdp_pvm")[project.slug];
    const ev = {
      ...baseEvent(project, "FLOOR_PLAN_VIEW"),
      floorPlan: project.floorPlan?.fileName || "floor-plan.pdf",
      meta: {
        projectViewTs: pv ? new Date(pv).toISOString() : null,
        sinceProjectViewMs: pv ? now - pv : null,
      },
    };
    post([ev]);
  }
};

// DOWNLOAD_START — every click counts; carries both timing deltas, then the
// actual file is streamed through the backend which confirms/fails it
export const trackDownloadStart = (project) => {
  const startId = uuid();
  const now = Date.now();
  const pv = readMap("mdp_pvm")[project.slug];
  const fv = readMap("mdp_fvm")[project.slug];
  const ev = {
    ...baseEvent(project, "FLOOR_PLAN_DOWNLOAD_START"),
    floorPlan: project.floorPlan?.fileName || "floor-plan.pdf",
    meta: {
      eventId: startId,
      projectViewTs: pv ? new Date(pv).toISOString() : null,
      planViewTs: fv ? new Date(fv).toISOString() : null,
      sinceProjectViewMs: pv ? now - pv : null,
      sincePlanViewMs: fv ? now - fv : null,
    },
  };
  post([ev], true); // beacon — must survive the download navigation
  return startId;
};

export const downloadUrl = (project, startId) =>
  `${API}/api/download/floor-plan/${project.slug}?vid=${getVisitorId()}&sid=${getSessionId()}&start=${startId}`;
