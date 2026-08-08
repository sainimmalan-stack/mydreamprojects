import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpDown, LogOut, RefreshCw, Lock } from "lucide-react";
import useSeo from "../hooks/useSeo";

const API = process.env.REACT_APP_BACKEND_URL;
const EASE = [0.16, 1, 0.3, 1];

const fmtTime = (iso) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true }) +
    " — " +
    d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const EVENT_LABEL = {
  PROJECT_VIEW: "Project Viewed",
  FLOOR_PLAN_VIEW: "Floor Plan Opened",
  FLOOR_PLAN_DOWNLOAD_START: "Download Started",
  FLOOR_PLAN_DOWNLOAD_SUCCESS: "Download Confirmed",
  FLOOR_PLAN_DOWNLOAD_FAILURE: "Download Failed",
};

const EVENT_DOT = {
  PROJECT_VIEW: "bg-bone/70",
  FLOOR_PLAN_VIEW: "bg-bone",
  FLOOR_PLAN_DOWNLOAD_START: "bg-ember/80",
  FLOOR_PLAN_DOWNLOAD_SUCCESS: "bg-ember",
  FLOOR_PLAN_DOWNLOAD_FAILURE: "bg-concrete",
};

/* ---------------------------------- login --------------------------------- */

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/analytics/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Login failed");
      }
      const data = await res.json();
      localStorage.setItem("mdp_admin_token", data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-5" data-testid="admin-login">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="w-full max-w-sm border border-line bg-coal p-8 md:p-10"
      >
        <Lock className="w-5 h-5 text-ember mb-6" strokeWidth={1.5} />
        <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-2">Internal</p>
        <h1 className="font-display font-semibold uppercase tracking-tight text-2xl text-bone">
          Analytics
        </h1>
        <div className="space-y-5 mt-8">
          <div>
            <label htmlFor="admin-email" className="block text-[10px] uppercase tracking-[0.3em] text-concrete mb-2">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="admin-email-input"
              className="w-full bg-ink border border-line text-bone text-sm px-4 py-3.5 outline-none focus:border-ember/60 transition-colors duration-300"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-[10px] uppercase tracking-[0.3em] text-concrete mb-2">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="admin-password-input"
              className="w-full bg-ink border border-line text-bone text-sm px-4 py-3.5 outline-none focus:border-ember/60 transition-colors duration-300"
              autoComplete="current-password"
            />
          </div>
        </div>
        {error && (
          <p data-testid="admin-login-error" className="text-ember text-xs mt-5 tracking-wide">{error}</p>
        )}
        <button
          type="submit"
          disabled={busy}
          data-testid="admin-login-button"
          className="w-full mt-8 bg-ember text-ink font-display font-semibold text-[11px] uppercase tracking-[0.25em] py-4 hover:bg-bone transition-colors duration-400 disabled:opacity-50"
        >
          {busy ? "Signing In…" : "Sign In"}
        </button>
      </motion.form>
    </div>
  );
};

/* -------------------------------- dashboard -------------------------------- */

const Stat = ({ label, value, sub }) => (
  <div className="border border-line bg-coal p-5 md:p-7">
    <p className="text-[9px] uppercase tracking-[0.3em] text-concrete">{label}</p>
    <p className="font-display font-semibold tracking-tighter text-3xl md:text-4xl text-bone mt-2">{value}</p>
    {sub && <p className="text-[10px] uppercase tracking-[0.2em] text-ember mt-1.5">{sub}</p>}
  </div>
);

const COLUMNS = [
  { key: "projectName", label: "Project" },
  { key: "views", label: "Views", num: true },
  { key: "planViews", label: "Plan Views", num: true },
  { key: "downloadStarts", label: "Starts", num: true },
  { key: "downloadConfirmed", label: "Confirmed", num: true },
  { key: "viewToPlanPct", label: "View → Plan", num: true },
  { key: "planToDownloadPct", label: "Plan → DL", num: true },
  { key: "overallPct", label: "Overall Conv.", num: true },
];

const Dashboard = ({ token, onLogout }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [sortKey, setSortKey] = useState("views");
  const [sortDir, setSortDir] = useState(-1);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/analytics/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("mdp_admin_token");
        onLogout();
        return;
      }
      if (!res.ok) throw new Error("Failed to load analytics");
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, onLogout]);

  useEffect(() => {
    load();
  }, [load]);

  const sortBy = (key) => {
    if (sortKey === key) setSortDir((d) => -d);
    else {
      setSortKey(key);
      setSortDir(-1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-5">
        <p className="text-ember text-sm" data-testid="admin-error">{error}</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <p className="text-concrete text-[10px] uppercase tracking-[0.4em] animate-pulse">Loading…</p>
      </div>
    );
  }

  const { totals, funnel, projects, recent } = data;
  const sorted = [...projects].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
    return cmp * sortDir;
  });

  return (
    <div className="min-h-screen bg-ink" data-testid="admin-dashboard">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pt-28 md:pt-36 pb-24">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-3">Internal</p>
            <h1 className="font-display font-semibold uppercase tracking-tighter text-3xl md:text-5xl text-bone">
              Analytics
            </h1>
            <p className="text-xs text-concrete mt-3">
              Anonymous usage tracking — floor plan engagement across all projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={load}
              disabled={loading}
              data-testid="admin-refresh-button"
              className="inline-flex items-center gap-2 border border-bone/20 text-bone font-display font-semibold text-[10px] uppercase tracking-[0.2em] px-5 py-3 hover:border-ember hover:text-ember transition-colors duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} strokeWidth={1.8} />
              Refresh
            </button>
            <button
              type="button"
              onClick={onLogout}
              data-testid="admin-logout-button"
              className="inline-flex items-center gap-2 border border-bone/20 text-bone/60 font-display font-semibold text-[10px] uppercase tracking-[0.2em] px-5 py-3 hover:border-ember hover:text-ember transition-colors duration-300"
            >
              <LogOut className="w-3.5 h-3.5" strokeWidth={1.8} />
              Logout
            </button>
          </div>
        </div>

        {/* overall */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mt-10" data-testid="admin-overall">
          <Stat label="Project Views" value={totals.projectViews} />
          <Stat label="Floor Plan Views" value={totals.planViews} />
          <Stat label="Download Starts" value={totals.downloadStarts} />
          <Stat label="Confirmed Downloads" value={totals.downloadConfirmed} />
          <Stat label="Failed Downloads" value={totals.downloadFailures} />
          <Stat label="Overall Conversion" value={`${totals.conversionPct}%`} sub="View → Download" />
        </div>

        {/* funnel */}
        <section className="mt-14 md:mt-20" data-testid="admin-funnel">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">Funnel</p>
          <div className="border border-line bg-coal divide-y divide-line">
            {funnel.map((stage, i) => (
              <div key={stage.stage} className="flex items-center gap-5 md:gap-8 px-5 md:px-8 py-5" data-testid={`funnel-stage-${i}`}>
                <span className="text-[10px] uppercase tracking-[0.25em] text-concrete w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display font-semibold uppercase tracking-tight text-sm md:text-base text-bone w-36 md:w-52 shrink-0">
                  {stage.stage}
                </span>
                <div className="flex-1 h-1.5 bg-ink relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.pct}%` }}
                    transition={{ duration: 1, delay: 0.15 * i, ease: EASE }}
                    className="absolute inset-y-0 left-0 bg-ember"
                  />
                </div>
                <span className="font-display font-semibold text-lg md:text-xl text-bone w-14 text-right shrink-0">
                  {stage.count}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-ember w-16 text-right shrink-0">
                  {stage.pct}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* project performance */}
        <section className="mt-14 md:mt-20" data-testid="admin-projects">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">Project Performance</p>
          <div className="border border-line bg-coal overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-line">
                  {COLUMNS.map((c) => (
                    <th key={c.key} className="px-4 md:px-6 py-4">
                      <button
                        type="button"
                        onClick={() => sortBy(c.key)}
                        data-testid={`sort-${c.key}`}
                        className={`inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                          sortKey === c.key ? "text-ember" : "text-concrete hover:text-bone"
                        }`}
                      >
                        {c.label}
                        {sortKey === c.key ? (
                          sortDir === -1 ? (
                            <ArrowDown className="w-3 h-3" strokeWidth={2} />
                          ) : (
                            <ArrowUp className="w-3 h-3" strokeWidth={2} />
                          )
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" strokeWidth={2} />
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={COLUMNS.length} className="px-6 py-10 text-center text-concrete text-xs uppercase tracking-[0.3em]">
                      No events recorded yet
                    </td>
                  </tr>
                )}
                {sorted.map((p) => (
                  <tr key={p.projectId} className="hover:bg-ink/50 transition-colors duration-300" data-testid={`admin-row-${p.projectId}`}>
                    <td className="px-4 md:px-6 py-4 font-display font-semibold uppercase tracking-tight text-sm text-bone">
                      {p.projectName}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-bone/80">{p.views}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-bone/80">{p.planViews}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-bone/80">{p.downloadStarts}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-ember font-medium">{p.downloadConfirmed}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-bone/80">{p.viewToPlanPct}%</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-bone/80">{p.planToDownloadPct}%</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-ember font-medium">{p.overallPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* time to download */}
        <section className="mt-14 md:mt-20" data-testid="admin-timing">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">Time To Download</p>
          <div className="border border-line bg-coal overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-line">
                  {["Project", "Avg View → Plan", "Median", "Avg Plan → DL", "Median", "Avg View → DL", "Median"].map((h) => (
                    <th key={h} className="px-4 md:px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-concrete">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-concrete text-xs uppercase tracking-[0.3em]">
                      No timing data yet
                    </td>
                  </tr>
                )}
                {sorted.map((p) => (
                  <tr key={`t-${p.projectId}`} className="hover:bg-ink/50 transition-colors duration-300">
                    <td className="px-4 md:px-6 py-4 font-display font-semibold uppercase tracking-tight text-sm text-bone">
                      {p.projectName.replace("My Dream ", "")}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-bone/80">{p.avgViewToPlan?.label || "—"}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-concrete">{p.medianViewToPlan?.label || "—"}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-bone/80">{p.avgPlanToDownload?.label || "—"}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-concrete">{p.medianPlanToDownload?.label || "—"}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-bone/80">{p.avgViewToDownload?.label || "—"}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-concrete">{p.medianViewToDownload?.label || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* recent activity */}
        <section className="mt-14 md:mt-20" data-testid="admin-recent">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">Recent Activity</p>
          <div className="border border-line bg-coal divide-y divide-line/60">
            {recent.length === 0 && (
              <p className="px-6 py-10 text-center text-concrete text-xs uppercase tracking-[0.3em]">
                No activity yet
              </p>
            )}
            {recent.map((ev, i) => (
              <div key={i} className="flex items-center gap-4 px-5 md:px-8 py-4">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${EVENT_DOT[ev.type] || "bg-concrete"}`} />
                <span className="text-[11px] text-concrete w-40 shrink-0">{fmtTime(ev.ts)}</span>
                <span className="font-display font-semibold uppercase tracking-tight text-sm text-bone">
                  {ev.projectName.replace("My Dream ", "")}
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-bone/60 ml-auto text-right">
                  {EVENT_LABEL[ev.type] || ev.type}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default function Admin() {
  useSeo({ title: "Analytics — My Dream Projects" });
  const [token, setToken] = useState(() => localStorage.getItem("mdp_admin_token"));
  return token ? (
    <Dashboard
      token={token}
      onLogout={() => {
        localStorage.removeItem("mdp_admin_token");
        setToken(null);
      }}
    />
  ) : (
    <Login onLogin={setToken} />
  );
}
