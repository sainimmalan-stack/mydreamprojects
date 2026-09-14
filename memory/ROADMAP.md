# My Dream Projects — Roadmap

Prioritized backlog. Completed work lives in CHANGELOG.md.

## P0 — Blocked on user input
- **Meta WhatsApp credentials** for the landowner auto-reply flow (backend webhook ready in /app/backend/server.py; needs WhatsApp Business credentials to go live)
- **Founder review of source-data quirks**: solace flat-1 printed as 2 bedrooms under a 3BHK label; casa 2BHK printed with 3 bedrooms — transcribed exactly as printed on the approved plans; founders may want to confirm

## P1 — None currently

## P2 — Waiting on assets
- **Site Progress Updates**: dated construction progress galleries for each ongoing project — DO NOT implement until the user shares real site photos

## Recently completed (see CHANGELOG.md)
- 2026-09-14: Map details made bulletproof — mobile bottom sheet (fixed, outside map) + triple-redundant marker tap (click/Leaflet/touchend) + 52px pin separation; acceptance 6/6 markers on touch + desktop (needs redeploy)
- 2026-09-14: Site-wide floating WhatsApp enquiry button (context-aware messages, session-once prompt) + WhatsApp action in map info cards (iteration_49, 100% pass); Leaflet map confirmed live on production
- 2026-08-27: Maps rebuilt on Leaflet + keyless OpenStreetMap tiles (dark CSS-filtered) — production MapLibre race eliminated; real roads/labels/water render (iteration_48 + fixes, verified preview; production verify pending redeploy)
- 2026-08-27: Maps made fully keyless — "API KEY REQUIRED" watermark tiles eliminated; MapLibre + OpenFreeMap dark vector style everywhere (maplibre-gl pinned ^4.7.1, v6 broken here) (iteration_47, 100% pass)
- 2026-08-24: My Dream Projects® registered-trademark rollout — site-wide audit, superscript ® on display brand marks, ® in all meta/SEO/JSON-LD/WhatsApp strings (iteration_46, 100% pass)
- 2026-08-10: Official MDP logo now sits centrally in all 6 ongoing projects' "Elevation Coming Soon" placeholders (full logo desktop / icon mobile+cards) — iteration_45, 100% pass
- 2026-08-10: EMI result panel REVERTED to previous dark design per owner; only Loan Amount + Loan Tenure inputs got subtle lighter-grey highlight panels (self-tested desktop/mobile)
- 2026-08-10: EMI Calculator result section redesigned — light-grey premium financial panel on dark page, EMI-first hierarchy, iPad side-by-side layout (iteration_44, 100% pass)
- 2026-08-10: Official KCP (annual-report mosaic), KONE (official 4-square) & Vasavi (full Pvt. Ltd. wordmark) logos replaced everywhere + centered mobile spec rows (iteration_43, 100% pass)
- 2026-08-10: Mobile polish — Loan & Finance 2x2 bank grid + Brands & Specs visual-height balance (iteration_42, 100% pass)
- 2026-08-10: IDBI Bank 4th partner + Brands & Specifications board on all 19 projects with per-project lift brands (KONE: Summit/Skylark; Vasavi: rest) — owner-assigned
- 2026-08-10: Loan & Finance Options strip on all 19 project pages + dark-native official brand marks (white boxes removed) + Calculate EMI chip now on every project (19/19 verified)
- 2026-08-10: Selected Work now Nest/Skylark/Perch + AI Concierge fully removed + finance section renamed "Mortgage & Loan Partners" (self-tested)
- 2026-08-10: AI Property Concierge built then REMOVED same day per owner request (code in git history if ever wanted back)
- 2026-08-10: EMI loan minimum now ₹1 lakh + office gallery stacks full-width on iPad portrait (4 viewports measured)
- 2026-08-10: Stats card mobile overflow fixed + Avasa white line removed from asset + EMI quick-rate preset chips (self-tested, measured at 360/390px)
- 2026-08-10: Map "Expected 2027" labels + EMI WhatsApp share button + compact mobile menu + single-screen mobile EMI calculator (self-tested)
- 2026-08-10: Company email (adminmydreamprojects@gmail.com) across contact/footer + premium EMI Calculator page with nav + project-page Calculate EMI CTAs (iteration_40, 100% pass)
- 2026-08-09: Founder photo containers hard-locked identical 352×440 (3 breakpoints verified)
- 2026-08-09: Owner's 5 surgical fixes — ongoing year 2027, Casa/Griffin off home, compact sold-out cards, equal founder photos, footer logo distortion fix (iteration_39, 100% pass)
- 2026-08-09: Hero 3D slide removed + smoother asymmetric crossfade (owner request)
- 2026-08-09: Cinematic Ken Burns drift intro on 3D full-screen viewer (self-tested)
- 2026-08-09: Edge-to-edge 3D full-screen viewer + all 19 brochures regenerated clean/label-free (self-tested)
- 2026-08-09: 3D label overlays REMOVED site-wide per owner request — 3D plans are now purely visual (self-tested, desktop + mobile)
- 2026-08-09: 3D glass-label room overlays (later removed same day per owner request) — iteration_38
- 2026-08-09: Sold-out tags, real stats (145 flats sold, 1,90,905 SFT delivered), room data extraction — iteration_37
- 2026-08-09: Mobile 3D interaction fix, brochure contact pages — iteration_36
