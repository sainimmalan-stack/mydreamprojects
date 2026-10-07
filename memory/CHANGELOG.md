# My Dream Projects — Changelog

Dated implementation log. Core requirements: PRD.md. Pending work: ROADMAP.md.

## Implemented (2026-08-06)
- Full design system, routing, 4 pages + project detail template
- Kinetic hero with masked line-by-line reveal + parallax
- Editorial marquee, stats band, reusable components
- Projects index with All/Completed(13)/Ongoing(6) filters + animated grid
- Full-screen mobile menu, verified at iPhone 390px (no horizontal overflow)
- Design-only contact form with preview note

## Iteration 2 (2026-08-06) — Real logo + homepage rebuild- Extracted real logo from uploaded vector PDF (unmodified): logo-full.png, logo-full-dark.png (reversed for dark UI, orange mark untouched), logo-stacked-dark.png, logo-icon.png, favicon.png, apple-touch-icon.png — all in `/app/frontend/public/assets/`
- Logo now in navbar (icon + wordmark), mobile menu (full logo), footer (full logo), favicon
- Homepage rebuilt to user spec: full-screen hero (MY DREAM PROJECTS / YOU DREAM. / WE BUILD. / tagline / Ameenpur, Hyderabad · Since 2020 / EXPLORE OUR PROJECTS → + GET IN TOUCH), count-up stats (2020/19/13/06) immediately below hero, WHO WE ARE — BUILDING MORE THAN HOMES with exact supplied copy + OUR STORY →, SELECTED WORK placeholders (no imagery), WHAT WE'RE BUILDING NEXT ongoing rows
- ALL stock imagery removed site-wide (no Unsplash anywhere): project cards and detail headers are now solid architectural blocks with oversized outline index numbers, awaiting real photography
- Hero background: reserved slot at `/assets/hero-elevation.jpg` with graceful dark blueprint-line fallback — awaiting the actual elevation image (was NOT included in the logo PDF; user to upload)

## Verified
- Desktop: home hero/manifesto/projects sections, projects filters (6 ongoing cards), detail page nav, contact page
- Mobile (390×844 emulation): hero, hamburger → full-screen menu → projects nav, no h-overflow

## Iteration 3 (2026-08-06) — Project 01: My Dream Nest
- First real project added to centralized data (`src/data/projects.js`): slug `my-dream-nest`, Completed, 2020, G+5, Residential Apartment, Ameenpur
- Real assets live in `/app/frontend/public/assets/projects/my-dream-nest/` — `elevation.jpg` (cover/hero + full uncropped Elevation section), `floor-plan.pdf` + rendered `floor-plan-p1.jpg` preview
- Project detail template extended: conditional cover hero with meta chips (COMPLETED · 2020 / G+5 · Residential Apartment), 5-stat grid incl. Floors, About the Project, Floor Plan section with preview + VIEW FULL PLAN (new tab) + DOWNLOAD PDF
- ProjectCard supports cover images (placeholders keep solid blocks); Projects index + home Selected Work now show My Dream Nest with real elevation
- Verified: /projects/my-dream-nest renders, assets return 200, download href correct, assets referenced ONLY by My Dream Nest

## Iteration 4 (2026-08-06) — Project 02: My Dream Casa
- Added Casa (Completed, 2021, G+5, Residential Apartment, Ameenpur) at slug `my-dream-casa`, chronologically after Nest in `src/data/projects.js`
- Casa assets isolated in `/app/frontend/public/assets/projects/my-dream-casa/` (elevation.jpg, floor-plan.pdf, floor-plan-p1.jpg); Nest assets untouched (md5-verified)
- Same template: cover hero + meta chips, 5-stat band, About the Project, full Elevation, Floor Plan preview + VIEW FULL PLAN + DOWNLOAD PDF
- Fixed mobile h-overflow on project detail pages (12-col grid gap-10 overflowed 390px; now gap-6)
- Verified programmatically: Nest and Casa each reference ONLY their own assets; both pages clean on desktop and 390px mobile, no cross-association

## Iteration 5 (2026-08-06) — Projects 03 & 04: My Dream Avasa + My Dream Skylark
- Avasa (Completed, 2022, G+5) at `/projects/my-dream-avasa`; Skylark (Completed, 2023, G+5) at `/projects/my-dream-skylark` — chronological order Nest 2020 → Casa 2021 → Avasa 2022 → Skylark 2023
- Assets isolated per project: `/assets/projects/my-dream-avasa/` and `/assets/projects/my-dream-skylark/` (elevation.jpg, floor-plan.pdf, rendered floor-plan-p1.jpg); mapping verified by filename + content (Avasa = vertical form/textured accents; Skylark = broad façade/balconies)
- Full 4-project asset-integrity check automated and passed (desktop + 390px mobile): hero, elevation, plan preview, VIEW FULL PLAN and DOWNLOAD PDF each point only at their own project folder; index shows exactly 4 real covers + 15 placeholders = 19 total

## Iteration 6 (2026-08-06) — Projects 05 & 06: My Dream Glenmore + My Dream Hillock
- Glenmore (Completed, 2023, G+5) at `/projects/my-dream-glenmore`; Hillock (Completed, 2024, G+5) at `/projects/my-dream-hillock` — added sequentially with per-step verification as requested
- Chronological index now: Nest 2020 → Casa 2021 → Avasa 2022 → Skylark 2023 → Glenmore 2023 → Hillock 2024, then 13 placeholders (19 total)
- Full automated 6-project integrity sweep passed (desktop + mobile): every hero/elevation/preview/VIEW FULL PLAN/DOWNLOAD PDF points only at its own project folder; index shows exactly 6 real covers

## Iteration 7 (2026-08-06) — Projects 07 & 08: My Dream Summit + My Dream Griffin
- Summit (Completed, 2024, G+5) at `/projects/my-dream-summit`; Griffin (Completed, 2024, G+5) at `/projects/my-dream-griffin` — added sequentially with per-step verification
- Chronological index: Nest 2020 → Casa 2021 → Avasa 2022 → Skylark 2023 → Glenmore 2023 → Hillock 2024 → Summit 2024 → Griffin 2024, then 11 placeholders (19 total)
- Full automated 8-project integrity sweep passed (desktop + 390px mobile): all heroes, elevations, plan previews, VIEW FULL PLAN and DOWNLOAD PDF buttons point only at own project folders; index shows exactly 8 real covers

## Iteration 8 (2026-08-06) — Projects 09 & 10: My Dream Selene + My Dream Atlantis
- Selene (Completed, 2025, G+5) at `/projects/my-dream-selene`; Atlantis (Completed, 2025, G+5) at `/projects/my-dream-atlantis` — sequential with per-step verification
- Atlantis arrived as two JPGs (elevation + plan) rather than one PDF; the supplied plan image was packaged losslessly into `floor-plan.pdf` so VIEW FULL PLAN / DOWNLOAD PDF work identically to other projects; hero uses the elevation image (verified it is NOT the plan page)
- Chronological index: Nest 2020 → Casa 2021 → Avasa 2022 → Skylark 2023 → Glenmore 2023 → Hillock 2024 → Summit 2024 → Griffin 2024 → Selene 2025 → Atlantis 2025, then 9 placeholders (19 total)
- Full automated 10-project integrity sweep passed (desktop + mobile); index shows exactly 10 real covers

## Iteration 9 (2026-08-06) — Projects 11 & 12: My Dream Perch + My Dream Solace
- Perch (Completed, 2026, G+5) at `/projects/my-dream-perch`; Solace (Completed, 2026, G+5) at `/projects/my-dream-solace` — sequential with per-step verification
- Solace data rule honored: NO residence/flat count displayed anywhere (template stats show only Status/Location/Type/Floors/Year); sweep asserts "flats" appears on no project page
- Chronological index: Nest 2020 → … → Perch 2026 → Solace 2026, then 7 placeholders (19 total; 12 real covers)
- Full automated 12-project integrity sweep passed (desktop + mobile)

## Iteration 10 (2026-08-06) — Project 13: My Dream Zenith (final completed project)
- Zenith (Completed, 2026, G+5) at `/projects/my-dream-zenith`; placeholders are now 14–19 all "ongoing" (6), so counts are exactly 13 completed / 6 ongoing and the Completed/Ongoing filters read (13)/(6)
- Zenith data rule honored: no residence/flat count anywhere (asserted in sweep)
- Full 13-project integrity sweep passed (desktop + mobile): all assets self-referential, heroes are elevations, no overflow

## Iteration 11 (2026-08-06) — Completed Projects Verification Audit
- Full audit PASSED with zero errors found — nothing was changed
- Reusable audit script saved at `/app/scripts/audit_projects.py` (39 checks: all 13 completed pages + 6 placeholders on desktop AND mobile, index counts/filters/links)
- File-level: md5 of all 13 elevations, 13 PDFs, 13 previews all unique (no cross-copied files); Nest files match original upload checksums
- Page-level: every project shows correct title, year chip, Ameenpur Hyderabad, G+5 · Residential Apartment, 5-stat band; every hero/elevation/preview/VIEW FULL PLAN/DOWNLOAD PDF self-referential; no "flats" text anywhere (Solace/Zenith rule); Atlantis uses only its own folder (packaged plan PDF from supplied JPG); all PDFs and elevations return HTTP 200

## Iteration 12 (2026-08-06) — Project 14: My Dream Aurelia (Ongoing 1 of 6)
- First ONGOING project: `/projects/my-dream-aurelia` (G+5, Residential Apartment, no completion year shown — not provided)
- Plan-only asset: `/assets/projects/my-dream-aurelia/` (floor-plan.pdf + preview); NO elevation exists — dedicated premium "ARCHITECTURAL ELEVATION / COMING SOON" placeholder section (blueprint-line panel, ghost outline type, ember pulse dot) renders when a project has a plan but no cover; to add the real elevation later, drop `elevation.jpg` in the folder and set `cover` in data — page structure unchanged
- Template tweaks: status chip now always renders (ONGOING in ember when active; "STATUS · YEAR" when year known); generic "photography coming soon" block now only for projects with neither cover nor plan
- Aurelia appears in Ongoing filter + first in homepage "What We're Building Next"; Completed filter still exactly 13
- Full 39-check audit re-run and passed (script updated: project-14 moved from placeholders to ongoing-real)

## Iteration 13 (2026-08-06) — Project 15: My Dream Elysium (Ongoing 2 of 6)
- `/projects/my-dream-elysium` (ONGOING, G+5, Residential Apartment, no year) with plan-only assets in `/assets/projects/my-dream-elysium/` and the same COMING SOON elevation placeholder as Aurelia
- Elysium follows Aurelia in the Ongoing filter and homepage "What We're Building Next"; placeholders now 16–19 (4 remaining)
- Full 39-check audit re-run and passed — Projects 01–14 unchanged

## Iteration 14 (2026-08-06) — Project 16: My Dream Aura (Ongoing 3 of 6)
- `/projects/my-dream-aura` (ONGOING, G+5, Residential Apartment, no year) — plan-only assets in `/assets/projects/my-dream-aura/`, same COMING SOON elevation placeholder
- Ongoing order: Aurelia → Elysium → Aura; placeholders now 17–19 (3 remaining); site = 13 completed + 3 ongoing with real content
- Full 39-check audit re-run and passed — Projects 01–15 unchanged

## Iteration 15 (2026-08-06) — Project 17: My Dream Echelon (Ongoing 4 of 6)
- `/projects/my-dream-echelon` (ONGOING, G+5, Residential Apartment, no year) — plan-only assets in `/assets/projects/my-dream-echelon/`, same COMING SOON elevation placeholder
- Ongoing order: Aurelia → Elysium → Aura → Echelon; placeholders now 18–19 (Vale and Ivy awaiting content per user); site = 13 completed + 4 ongoing with real content
- Full 39-check audit re-run and passed — Projects 01–16 unchanged

## Iteration 16 (2026-08-06) — Project 18: My Dream Vale (Ongoing 5 of 6)
- `/projects/my-dream-vale` (ONGOING, G+5, Residential Apartment, no year) — plan-only assets in `/assets/projects/my-dream-vale/`, same COMING SOON elevation placeholder
- Ongoing order: Aurelia → Elysium → Aura → Echelon → Vale; only placeholder 19 (My Dream Ivy) remains; site = 13 completed + 5 ongoing with real content
- Full 39-check audit re-run and passed — Projects 01–17 unchanged

## Iteration 17 (2026-08-06) — Project 19: My Dream Ivy (Ongoing 6 of 6, FINAL)
- `/projects/my-dream-ivy` (ONGOING, G+4, 3 BHK, Residential Apartment, no year) — plan-only assets in `/assets/projects/my-dream-ivy/`
- Exclusive-but-restrained concept presentation via new optional data fields: `headline` ("ONE HOME. ONE FLOOR."), `headlineSub` ("Private Living, Elevated."), `configuration` ("3 BHK" in chips), `glance` (Project at a Glance 4-cell grid: G+4 / 3 BHK / 1,600 SQ.FT. / ONE HOME PER FLOOR), `planTagline` ("One thoughtfully planned residence. An entire floor to call your own.")
- Same COMING SOON elevation placeholder; no placeholders remain — ALL 19 PROJECTS HAVE REAL CONTENT (13 completed + 6 ongoing)
- Verified: G+4 not G+5, headline/subline/glance present, ongoing order Aurelia→Elysium→Aura→Echelon→Vale→Ivy, full 39-check audit green (Projects 01–18 unchanged)

## Iteration 18 (2026-08-06) — Full 19-Project Portfolio Audit
- Comprehensive audit script: `/app/scripts/audit_full.py` — 41 checks, ALL PASS (desktop + 390px mobile)
- Coverage: asset mapping (per-folder isolation + cross-association scan + md5 uniqueness of all 13 elevations & 19 PDFs), all 19 URLs, title/location/status/floors/type/about/year rules, plan previews render, VIEW FULL PLAN + DOWNLOAD PDF (HTTP 200 + content-type pdf), filters ALL=19/COMPLETED=13(chronological)/ONGOING=6(Aurelia→…→Ivy), card links, Ivy special data (G+4, 3 BHK, 1,600 SQ.FT., ONE HOME. ONE FLOOR., no G+5), Solace/Zenith no-flat-count, mobile no-overflow + tap targets ≥40px
- Filesystem: ongoing folders contain ONLY plan files (no elevations anywhere fake)
- One audit-side fix only: lazy-loaded previews required scrolling before assertion — test script corrected (settle/scroll step); NO website changes were needed

## Iteration 19 (2026-08-06) — About page finalized with real office photography
- About rebuilt per spec: OUR STORY ("DREAMS, DRAWN INTO REALITY." + exact copy), OUR JOURNEY minimal timeline (2020 founded → 2020 Nest → 2021–2023 → 2024–2025 → 2026: 19 Projects / 13 Completed · 06 Ongoing), FOUNDERS (Nimmala Sai + Kotapati Akhil, typography-only monogram blocks, no invented bios), OUR OFFICE ("THE SPACE WE BUILT FOR OURSELVES / DESIGNED BY US. BUILT BY US. HOME TO US." + exact copy), closing OUR PHILOSOPHY with EXPLORE OUR PROJECTS → /projects
- Office gallery uses the 3 REAL uploaded photos (unmodified, no filters): exterior night w/ illuminated signage = primary large panel; garden + interior = stacked secondaries; files at `/assets/office/office-exterior.webp`, `office-garden.webp`, `office-interior.webp`
- OfficeImage uses load-fade pattern with premium coming-soon fallback behind (robust to transient load races)
- Verified desktop + mobile: all copy blocks, founder names, counts, CTA href, 3 photos loaded (naturalWidth>500), no overflow; no emails/bios/stock added

## Iteration 20 (2026-08-06) — Contact / Visit Us finalized
- Contact page: "LET'S BUILD SOMETHING TOGETHER." hero + exact copy; CONTACT DETAILS (Nimmala Sai +91 77804 29845, Kotapati Akhil +91 95660 67922, both tel: links); CHAT ON WHATSAPP → wa.me/917780429845 with pre-filled greeting; VISIT OUR OFFICE + GET DIRECTIONS → exact goo.gl link (new tab); NO embedded map (shortened URL can't embed reliably, coordinates not guessed); NO email anywhere
- Enquiry form: Name/Phone/Message required + project select (6 ongoing + General Enquiry) → SEND ENQUIRY validates then opens WhatsApp with formatted message (verified popup URL contents)
- Mobile: non-floating CALL / WHATSAPP / DIRECTIONS quick-action row under the hero (mobile only)
- Footer: both phones as tel: links + Get Directions link added; logo (wordmark + tagline), address, sitemap retained
- Fixed one real bug found in verification: 12-col grid gap-10 caused 461px mobile overflow on contact page → gap-6
- Verified: desktop + 390px mobile; all projects + About re-verified unchanged

## Iteration 21 (2026-08-06) — Full-screen floor plan viewer (all 19 projects)
- New reusable `src/components/FloorPlanViewer.jsx`: portal-mounted (escapes main stacking context), dark backdrop, title auto per project ("MY DREAM X — FLOOR PLAN"), controls − / % / + / RESET / ×, OPEN ORIGINAL PDF secondary link, ESC close
- Interactions: button zoom, wheel zoom anchored at cursor (desktop), pointer-drag pan when zoomed, two-pointer pinch zoom + midpoint pan (mobile), scroll lock via lenis.stop() + body overflow (restored on close), touch-action none so the page never moves while inspecting
- ProjectDetail: preview click and VIEW FULL PLAN now open the viewer; DOWNLOAD PDF unchanged; viewer shows the high-res rendered plan (faithful to source, no enhancement)
- Two real bugs found & fixed in verification: viewer trapped under site header (main's z-10 stacking context → createPortal), Lenis momentum moving background on open (→ lenis.stop())
- Verified: dedicated viewer suite (desktop Nest+Atlantis; mobile Nest, Atlantis, Aurelia, Ivy — pinch via CDP touch) + full 41-check audit green; zero data/asset changes

## Iteration 22 (2026-08-06) — Final homepage polish
- Hero now uses the REAL My Dream Skylark elevation (1200×900, widest composition) with a light readability overlay — building fully visible; new copy + EXPLORE PROJECTS → and VIEW ONGOING PROJECTS (→ /projects?filter=ongoing, deep-link supported via useSearchParams)
- Flow: Hero → Stats (19/13/6/2020, count-up) → Building With Purpose (OUR STORY + VIEW ALL PROJECTS) → Selected Work (6 real-elevation cards: Griffin, Selene, Zenith, Solace, Skylark, Glenmore; meta "Ameenpur · Completed YEAR") → Journey (2020 Nest → 2026 19 Projects) → What We're Building Next (6 rows with floors/config meta — Ivy shows G+4 · 3 BHK) → Office teaser (real exterior photo → About) → Final CTA (WhatsApp / Call / Directions)
- Shared contact constants moved to `src/data/contact.js` (Contact.jsx imports them; no behavior change)
- Real bug fixed: stats count-up used framer useInView which never fired for left-column cells on mobile → replaced with hand-rolled IntersectionObserver
- Marquee retired from homepage per pacing spec; no banned marketing phrases; no invented stats
- Verified: dedicated home suite desktop+mobile (hero image=Skylark naturalWidth 1200, stats, card links/order/meta, ongoing rows incl. Ivy identity, office teaser, CTA hrefs, deep link, no overflow) + full 41-check portfolio audit green

## Iteration 23 (2026-08-06) — Launch readiness pass
- Performance: responsive WebP variants (800w/1600w, q86, originals untouched) for all 13 elevations + 3 office photos, wired via srcset/sizes; hero fetchPriority=high; below-fold images lazy; route-based code splitting (lazy pages); OG share image (1200×630 from real office exterior, signage preserved)
- SEO: exact homepage title/description; per-page useSeo hook (dynamic titles/descriptions/og for all 19 projects — own elevation as og:image, branded fallback for ongoing); JSON-LD HomeAndConstructionBusiness (name, 2020, Ameenpur, founders, both phones — no invented fields); favicon = real logo mark (already)
- A11y: skip-to-content link, ember focus-visible rings, viewer focus management (focus close on open, Tab trap, focus restore, ESC), aria on mobile menu, contrast bump concrete #7A7A7A→#8C8C8C, natural alt text everywhere
- 404 page: "404 / THIS ONE ISN'T IN THE PLAN." + BACK TO HOME (route * → NotFound)
- Real bugs fixed: 12-col grid gap overflow at 360px (footer + project About grid → gap-6)
- Final QA: 8/8 site-wide suites + 41/41 portfolio audit + all 24 routes clean at 360px/390px


## Iteration 24 (2026-08-07) — Final pre-launch visual & content consistency pass
- Visual QA: analyzed full screenshot batch (desktop 1920px + mobile 390px) across Home, Projects, Project Detail (Nest/Skylark/Ivy/Zenith), About, Contact
- One real nit found & fixed: navbar was fully transparent at scroll-top, washing out nav links over bright hero elevations → subtle top scrim gradient (`bg-gradient-to-b from-ink/70 via-ink/40 to-transparent`) when not scrolled; verified on desktop + mobile home hero
- Two suspected nits confirmed as screenshot artifacts (no fix needed): Ivy/Skylark back-link + overline stack correctly (mb-8), Zenith elevation renders full uncropped building (earlier shot was mid-scroll/lazy-load)
- Full 41-check audit (`/app/scripts/audit_full.py`) re-run post-fix: 41 PASS / 0 FAIL
- Microcopy double-space sweep clean; tel:/wa.me links verified; OG/SEO hook verified
- FINAL PRE-LAUNCH CHECK report printed to user; site handed over for owner review — no further changes per user instruction


## Iteration 25 (2026-08-07) — Office gallery reduced to exactly 2 photos
- Per user: office gallery now contains ONLY (1) exterior night photo with car (primary) and (2) interior photo with desk/chairs/wall logo (secondary); garden/moon photo removed (files deleted) and the "WORKSPACE INTERIOR — COMING SOON" placeholder removed entirely
- Root cause of placeholder: interior srcSet pointed at a non-existent `-1600.webp` (source is 1500×2000 portrait) so the image 404'd and the loading fallback stayed visible — fixed with an explicit correct srcSet
- `OfficeImage` rewritten: natural aspect ratios (exterior 4:3, interior 3:4), no cropping, no fallback overlay, per-image srcSet/sizes; layout = flex row on desktop (62%/38%, top-aligned), stacked full-width on mobile
- Verified desktop 1920 + mobile 390: exactly 2 images, both load, no "Coming Soon"/garden text, no horizontal overflow; all office asset URLs 200

## Backlog

## Iteration 99 (2026-08-08) — Hero swap REVERTED (owner request)
- Owner asked to remove the previous change; homepage hero restored to the Skylark night elevation (elevation-night.webp) with original alt text — exact state before iteration 98. The office night photo remains in use at: Home office teaser, Contact office section, Our Map office popup
- Verified: hero serves my-dream-skylark/elevation-night.webp, loaded, correct alt, zero pageerrors (same configuration fully covered by iteration_13 tests)
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 98 (2026-08-08) — Homepage hero swapped to night office photo
- HERO_IMAGE now /assets/office/office-exterior.webp (the new night office photo with lit signage — owner-chosen, overrides the earlier Skylark-night hero pin); alt text updated; -800 srcSet variant serves mobile automatically
- Verified: testing-agent iteration_25 = 100% PASS desktop + mobile (correct file per viewport, headline/buttons legible, no overflow, Skylark day/night toggle intact, zero pageerrors)
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 97 (2026-08-08) — Analytics system FULLY ROLLED BACK (owner request)
- Owner reversed the analytics feature entirely. Removed: analytics/tracker.js, pages/Admin.jsx, /admin route, backend routes/analytics.py (whole routes dir), server.py mount + startup hook, JWT_SECRET/ADMIN_EMAIL/ADMIN_PASSWORD env vars, and dropped Mongo collections analytics_events/users/login_attempts
- Restored: ProjectDetail downloads are plain static asset links again (no backend), VIEW FULL PLAN is a plain viewer open, /admin renders the site's 404 page, /api back to scaffold-only
- Verified: download link plain asset + viewer works, /admin → 404, zero analytics references in src, backend 404 on old endpoints, Our Map (20 markers + office) and all pages regression-clean, production build passes (15.7s), zero pageerrors
- test_credentials.md updated: site has NO authentication anywhere
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 96 (2026-08-08) — Internal analytics system + admin dashboard
- Anonymous tracking (no PII): visitor UUID (localStorage mdp_vid) + session UUID (sessionStorage mdp_sid). Events: PROJECT_VIEW (once/session/project — StrictMode-safe dedupe), FLOOR_PLAN_VIEW (once/session/project, carries sinceProjectViewMs + related view ts), FLOOR_PLAN_DOWNLOAD_START (every click, beacon, carries sincePlanViewMs/sinceProjectViewMs), DOWNLOAD_SUCCESS / DOWNLOAD_FAILURE recorded SERVER-SIDE by the new streaming download endpoint GET /api/download/floor-plan/{slug} (success only after the full PDF is transferred; failure on client disconnect). Instrumentation in ProjectDetail (view effect, openPlan, startDownload)
- Backend routes/analytics.py: POST /api/analytics/track (validated, anonymous), GET /api/analytics/summary (admin-only, Bearer JWT), download streamer with outcome recording. JWT admin auth per playbook: bcrypt hash in users collection, seeded from env (ADMIN_EMAIL/ADMIN_PASSWORD/JWT_SECRET in backend/.env), 12h tokens, 5-fail 15-min lockout with auto-reset after window
- Admin dashboard at /admin (not in nav): login gate, overall stat cards, animated funnel (view → plan → start → confirmed with counts + %), sortable project performance table, time-to-download table (avg + median per stage), recent activity feed (anonymous). Dark/ember premium styling matching the site
- Verified: testing-agent iteration_24 = 100% PASS (real browsing generated the funnel — zenith + perch view/plan/download on desktop + mobile, reload dedupe confirmed, download confirmed only on full transfer, auth 401/lockout/logout, sorting both directions, no PII leaked, zero pageerrors). Review fixes applied: duplicate 'Median' React keys, lockout count auto-reset. Production build passes (19s)
- TEST DATA WIPED — dashboard starts empty for the owner; only real visitor events will appear
- Admin credentials: admin@mydreamprojects.in / Mdp@Admin#2026 (also in test_credentials.md)
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 95 (2026-08-08) — Blueprint treatment on Our Map popup tile
- Blueprint SVG exported from ComingSoonElevation and reused in the map InfoCard fallback tile (map-thumb-blueprint-<slug>) for the 6 ongoing projects — silhouette linework behind the COMING SOON label; completed projects keep photo thumbnails; office card photo unchanged
- Verified: testing-agent iteration_23 = 100% PASS mobile + desktop (unique silhouettes per project in tiles, photos intact for completed, office photo intact, zero pageerrors)
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 94 (2026-08-08) — Ongoing project blueprint placeholders
- New shared component components/ComingSoonElevation.jsx: premium architectural "Elevation Coming Soon" treatment — dark ink background, faint technical grid, per-project seeded stepped wireframe silhouette (6 unique profiles via index-seeded rng), floor lines driven by G+5/G+4 data, dimension ticks, sparing ember accent on tallest step. Hierarchy: PROJECT NN → name (detail version) → ELEVATION / COMING SOON outline → ONGOING ember pulse
- REPLACEABLE ASSET design: renders only while project has no cover/elevationModes — uploading a real elevation later auto-replaces the placeholder everywhere with zero layout changes
- Wired into ProjectDetail elevation section (full) + ProjectCard (compact, cards on listing/home). Old placeholder (blank box, ghost index number, "Photography coming soon" note) fully removed; stale `note` prop cleaned from ProjectCard + Home caller
- Home "On Site, Right Now" ongoing section is a text-list (no imagery) — untouched by design
- Verified: testing-agent iteration_22 = 100% PASS — all 6 detail pages (correct numbers 14-19, names, no day/night toggle, floor plans + TOTAL FLATS intact), 6 unique card silhouettes, completed projects untouched, mobile clean, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 93 (2026-08-08) — Founder tap-to-call links
- CALL SAI / CALL AKHIL links beside each founder's WhatsApp link on About profile cards + Home teaser cards; tel:+917780429845 (Sai) / tel:+919566067922 (Akhil) from PHONE_SAI/PHONE_AKHIL constants; Phone lucide icon, matching subtle styling, tap targets ~39px after padding bump
- Two hot-reload race bugs caught and fixed mid-task (About import line, Akhil tel field) — verified fixed
- Verified: testing-agent iteration_21 = 100% PASS desktop + mobile (all 8 tel: hrefs exact, WhatsApp links preserved, About section order intact, zero pageerrors)
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 92 (2026-08-08) — Founder WhatsApp cards
- One-tap founder messaging: About founder profile cards ("MESSAGE SAI/AKHIL ON WHATSAPP", after bios) + Home founders teaser cards ("MESSAGE SAI/AKHIL", under focus line) link to each founder's own number — Sai wa.me/917780429845, Akhil wa.me/919566067922 — with a personalized pre-filled message via new contact.js helpers (WHATSAPP_NUMBER_AKHIL, waLinkTo, founderIntroMessage)
- Review polish applied: Home mobile tap target 15px → 31px (py-2), named group/link hover scoping on both pages
- Verified: testing-agent iteration_20 = 100% PASS desktop + mobile (all 4 links correct numbers/messages/new-tab) + existing WhatsApp flows (contact greeting, form submit, availability enquiry) regression-clean; post-polish self-check: tap heights 31px, links intact, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 91 (2026-08-08) — About page order: Intro → Founders → Our Story
- About flow is now: intro headline (Dreams, drawn into reality.) → MEET THE FOUNDERS (photos + full bios, unchanged) → OUR STORY (single section: "From engineering friends to building dreams together." + friendship narrative + the 2020 founding text, all existing copy preserved) → Journey → Philosophy
- The founders-internal "Our Story" sub-block was moved out of the founders section and merged with the top founding narrative — eliminating what would have become two "Our Story" eyebrows; exactly one remains. No text rewritten or removed
- /about#founders deep link + Home OUR STORY button still land precisely on founders
- Verified: testing-agent iteration_19 = 100% PASS desktop + mobile (order, single Our Story label, bios/photos intact, merged content complete, deep-link scroll exact, Contact order regression clean, zero pageerrors)
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 90 (2026-08-08) — Contact page order: Details → Office → Form
- Contact page restructured: (1) contact details + phones + WhatsApp, (2) VISIT OUR OFFICE photo section, (3) enquiry form as the FINAL section before the footer. The old mini "Visit Our Office" block inside the details column was removed to avoid a duplicate heading/directions button (office-section-directions covers it with the same MAPS_URL). Form fields/functionality untouched; MapPin import cleaned up
- About page already clean from iteration 89 (no office section); re-verified
- Verified: testing-agent iteration_18 = 100% PASS desktop + mobile — section order confirmed (details 951 → office 1082 → form 2333 desktop; same on mobile), single Visit Our Office heading, office photos + ftid directions intact, form submits correct wa.me URL, empty-field error works, no overflow, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 89 (2026-08-08) — Office section moved About → Contact
- Contact page gained contact-office section after the contact grid: VISIT OUR OFFICE eyebrow, user-specified copy, exterior photo primary (62%) + interior secondary (38%), "MY DREAM PROJECTS — OFFICE / STUDIO / Ameenpur, Hyderabad" caption + ember GET DIRECTIONS (exact office MAPS_URL). New OfficePhoto/OfficeSection components in Contact.jsx replicate the About gallery treatment
- About page: entire about-office section + now-unused OfficeImage helper + stale useState import removed; founders/bios/story/journey/philosophy untouched; /about#founders deep link still works. Home office teaser is separate and remains
- Verified: testing-agent iteration_17 = 100% PASS desktop + mobile (exact copy, image sizes/order, directions href with ftid, About clean with founders intact, zero pageerrors)
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 88 (2026-08-08) — Office photos replaced with 2 new uploads
- New night-exterior (lit signage, 1448×1086) now at office-exterior.webp + -800/-1600 variants; new interior (1672×941) at office-interior.webp + -800 — re-encoded webp q90-92, same file paths so every surface updated at once (Home office teaser, About office gallery ×2, Our Map office popup thumb = night exterior as primary). srcSet descriptors corrected to real widths (1448w/1672w). No AI edits, no layout/design/link/coordinate changes; orange office marker unchanged
- Verified: testing-agent iteration_16 = 100% PASS desktop + mobile — all 3 surfaces show the new photos sharp/undistorted, zero old imagery anywhere, office GET DIRECTIONS intact, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 87 (2026-08-08) — Nav cleanup + PROJECT MAP → OUR MAP rename
- Mobile menu numeric labels (01–05) removed — menu now reads HOME / PROJECTS / OUR MAP / ABOUT / CONTACT; desktop nav unchanged in structure
- Every visible "Project Map" renamed "Our Map": Navbar LINKS, Footer footer-map-link, ProjectDetail VIEW ON OUR MAP button, ProjectMap SEO/browser title "Our Map — My Dream Projects". Route /project-map, sitemap URL, all map functionality/coordinates/markers/filters unchanged
- Verified: testing-agent iteration_15 = 100% PASS — mobile menu (no numerics, Let's Talk + Est. 2020 footer intact), desktop nav + active state, footer link, detail-page button + deep link, ZERO remaining visible "PROJECT MAP" instances across all pages, full map regression clean, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 86 (2026-08-08) — Global ongoing status colour: red → brand ember orange
- Ongoing indicators now use the ember design token (#E85D22 / bg-ember, glow rgba(232,93,34)) everywhere: ProjectCard dots, Home "Now Shaping" dots, ProjectMap STATUS_DOT (markers, legend, sidebar, info cards). Completed stays emerald-400 green. Status data/numbers/coordinates/office marker untouched. Only remaining red-* in src: shadcn toast destructive variant (unrelated)
- Verified: testing-agent iteration_14 = 100% PASS desktop + mobile — 6 ongoing dots orange and 13 completed green on /projects; 40 status dots on /project-map (13 ember + 27 emerald, 0 red); detail pages clean; zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 85 (2026-08-08) — Home hero now Skylark NIGHT elevation
- HERO_IMAGE swapped elevation-day.webp → elevation-night.webp (existing approved file, unaltered, 4:3 framing identical to day pair so hero composition/proportions unchanged; -800 srcSet variant serves mobile)
- Verified: testing-agent iteration_13 = 100% PASS — hero serves night webp on desktop (1448w) and night-800 on mobile via srcSet, no day image anywhere in hero, all hero text/buttons intact, Skylark project page Day|Night toggle untouched and working, zero pageerrors/console errors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 84 (2026-08-08) — MEET THE FOUNDERS homepage section
- New home-founders section between office teaser and CTA: ember eyebrow, "The people behind My Dream Projects." H2, supporting line "Built by two engineering friends. Driven by a shared vision.", two founder cards with existing portraits (nimmala-sai.webp, kotapati-akhil.jpg — separate 4:5 crops, same treatment, hover scale + ember border), names + CO-FOUNDER + focus lines (Sai: Creative Direction · Design · Branding · Vision; Akhil: Operations · Site Execution · Customer Experience), no bios
- OUR STORY outlined button → /about#founders; About page gained only id="about-founders" + a 120ms-deferred hash-scroll effect (zero visual change, plain /about still lands at top)
- Verified: testing-agent iteration_12 = 100% PASS desktop + mobile — section placement, portraits load undistorted, hover interactions, deep-link lands on founders with bios, all home sections + About content intact, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 83 (2026-08-08) — Office map card uses real office photo
- OfficeCard left cell now shows the real office photo (/assets/office/office-exterior-800.webp, map-office-thumb, object-cover crop into the existing 92/104px area — no distortion); unused Building2 import removed; orange icon map marker, card text, buttons, coordinates, project data all unchanged
- Verified: testing-agent iteration_11 = 100% PASS mobile + desktop (photo HTTP 200, 800×600 natural, clean crop, directions href still exact office place URL, zero pageerrors)
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 82 (2026-08-08) — Office marker compact polish
- Office marker reduced to a 28×28 icon-only ember pill (building icon, text label removed) — same visual weight as numbered pins, distinct via orange; selected state keeps the ember glow; card/location/links/filters unchanged
- Verified: testing-agent iteration_10 = 100% PASS — mobile 390px (marker visible at initial fit, tap → bottom card auto-scrolls into view, directions/contact links correct, persists under all filters, no overflow) + desktop sanity, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy

## Iteration 81 (2026-08-08) — Office marker added to Project Map (20 markers total)
- OFFICE {lat 17.5346875, lng 78.3262031} added to contact.js — coordinates decoded offline from the plus code (G8MG+VFG → 7J9WG8MG+VFG) embedded in the office's own configured Google Maps place link (no guessed location)
- ProjectMap: distinctive ember pill marker with building icon + OFFICE label (map-marker-office), never numbered, always rendered regardless of filter, included in auto-fit bounds + collision spiderfying; tapping opens a premium office card (OFFICE / STUDIO, My Dream Projects, Ameenpur Hyderabad, GET DIRECTIONS → resolved office place URL, CONTACT US → /contact); office selection survives filter switches; VIEW ALL PROJECTS works from office selection
- Counters/filters/projects untouched: ALL 19 / COMPLETED 13 / ONGOING 06; office excluded from counts, sidebar and mobile chips
- Verified: testing-agent iteration_9 = 100% PASS desktop + mobile (390px): 20 markers render, card contents/links correct, office visible under all 3 filters, project regression clean, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy to mydreamprojects.in

## Iteration 80 (2026-08-08) — Office Get Directions link fixed
- MAPS_URL in contact.js: resolved the office goo.gl short link to its canonical HTTPS destination — the registered Google Place "MY DREAM PROJECTS, Ameenpur Coco Cola Road, Narendra Nagar Colony, Ameenpur, Miyapur, Hyderabad 502033" (ftid 0x3bcb8d6d4959d47b:0xe454901ec9e2e003), tracking params stripped. Address unchanged
- Footer.jsx was hardcoding the old short link — now imports MAPS_URL from contact.js (single source of truth). All office-directions touchpoints verified on a production build: Contact page (quick-directions-link + get-directions-link), Footer on every page (footer-directions-link), Home final CTA (cta-directions-button) — all identical resolved URL, HTTP 200, zero pageerrors
- LIVE NOTE: preview-only until user's next Deploy to mydreamprojects.in

## Iteration 79 (2026-08-08) — Google Maps "Unsupported link" fix (all 19 project links)
- CAUSE: the supplied maps.app.goo.gl short links carried an iOS share parameter (?g_st=ic) that triggers Google's "Unsupported link" error in several browsers/contexts
- FIX: resolved every short link to its final google.com/maps HTTPS destination (curl -L with mobile UA) and stored the cleaned canonical URL (kept only q + ftid params, tracking params stripped) as siteLocation.url in projects.js. Completed projects now point to their exact registered Google Places (place name + ftid place ID); ongoing projects point to exact coordinate URLs (q=lat,lng — asserted identical to stored coordinates, no name searches used)
- Coordinates, embeds, markers, pages: UNCHANGED. Map info-card GET DIRECTIONS and detail-page GET DIRECTIONS both read siteLocation.url so both fixed at once
- Verified: all 19 URLs return HTTP 200 with correct destination (13 place+ftid, 6 coords); production build (craco build, 16s) served statically and smoke-tested — Nest detail GD link + Ivy map-card GD link use resolved URLs, 19 markers, zero pageerrors
- KNOWN SAME-CLASS ISSUE (out of scope, not changed): the OFFICE Get Directions link (footer + Contact page, MAPS_URL in contact.js) still uses a goo.gl short link — same fix available on request
- LIVE NOTE: fix is in preview; reaches mydreamprojects.in on the user's next Deploy

## Iteration 78 (2026-08-08) — Deployment failure fixed (Node engine incompatibility)
- CAUSE: production deploy failed at frontend-build-push during yarn install — transitive dep @mapbox/jsonlint-lines-primitives@2.0.3 (chain: maplibre-gl → @maplibre/maplibre-gl-style-spec@26.2.1 → ^2.0.3) declares engines node>=22; the build image runs Node 20.18.1 → hard install error. Preview was unaffected (modules pre-installed)
- FIX: pinned "@mapbox/jsonlint-lines-primitives": "2.0.2" (engines node>=0.6, API-compatible) via the existing resolutions field in frontend/package.json; yarn.lock regenerated (resolves 2.0.2 for the ^2.0.3 specifier). Zero code/asset/map changes
- VERIFIED: full production build (craco build) succeeded in 16.5s, warnings only (pre-existing tailwind class ambiguity + intentional exhaustive-deps); production bundle served statically and smoke-tested — /project-map renders all 19 markers, Vale detail page shows TOTAL FLATS + mix + CHECK AVAILABILITY + view-on-map link, zero pageerrors. Mobile parity guaranteed (same source as mobile-tested preview)
- Deployment readiness re-scan: PASS (one non-blocking WARN — unused scaffold /api/status endpoint query limit, unchanged by choice)
- READY TO PUBLISH: user presses Deploy

## Iteration 77 (2026-08-08) — Availability Enquiry + Shareable Map Links
- Availability Enquiry: Total Flats stat cell on all 19 detail pages is now a WhatsApp link (wa.me/917780429845 via shared waLink helper) pre-filled with "Hello My Dream Projects, I'm interested in <Project> (Ameenpur, Hyderabad). Could you please share which units are currently available in this project?" — subtle CHECK AVAILABILITY ↗ microcopy under the flat mix, ember on hover, opens new tab (data-testid availability-enquiry-link)
- Shareable Map Links: every detail page's Visit Project Site section gained a bordered secondary VIEW ON PROJECT MAP button → /project-map?project=<slug> (data-testid view-on-map-link); ProjectMap reads the ?project= param (useSearchParams, re-fires on param change, ignores invalid slugs) → selects the pin (ember glow), flies to zoom 16, opens the info card, auto-scrolls on mobile
- Bug caught in verification: waLink import initially lost (hot-reload race) causing 'waLink is not defined' crashes on detail pages — re-added and re-verified
- Verified: testing-agent iteration_8 = 100% PASS — all 19 pages have correct per-project WhatsApp hrefs + view-on-map links, deep links (zenith/ivy/solace desktop, casa mobile) auto-open correct cards, invalid param degrades gracefully, plain /project-map unchanged, zero pageerrors
- NOTE: goes live on mydreamprojects.in on next redeploy (Deploy button)

## Iteration 76 (2026-08-07) — Flat mix sub-line + deployment readiness
- flatMix added to all 19 projects in projects.js, rendered as a small uppercase sub-line under the TOTAL FLATS value in the stats grid (e.g. "2 BHK + 3 BHK"): 2+3 BHK — Nest, Casa, Skylark, Summit, Griffin, Zenith, Aura; 2 BHK only — Avasa, Glenmore, Hillock, Atlantis, Perch, Aurelia, Elysium, Echelon; 3 BHK only — Selene, Solace, Ivy; Vale special: "2½ BHK + 3 BHK" (plan explicitly labels unit 02 as 2½-BHK 1,440 sft — verified visually after text extraction garbled it)
- Vale's plan read visually to resolve the garbled label — no invented data
- Verified: testing-agent iteration_7 = 38/38 checks PASS (19 pages × desktop+mobile), ½ unicode renders correctly, regression clean
- Deployment readiness check: PASS, zero blockers — awaiting user's Deploy button press to push flat counts + flat mix + polished map to mydreamprojects.in

## Iteration 75 (2026-08-07) — TOTAL FLATS added to all 19 project pages
- Full plan audit: text-extracted all 19 floor-plan PDFs (PyMuPDF) + visually inspected drawings; per-floor unit counts cross-verified against each plan's own saleable-area arithmetic (area/floor × floors = stated total)
- Three internally-contradictory plans (Summit & Aurelia summary labels said "-10" while drawing + area math + flats column said 3/floor=15; Atlantis image-plan with 3 architect-numbered units, no area statement) were flagged to the owner — owner confirmed 15/15/15
- Final verified counts stored as `totalFlats` in projects.js (data-only change): 10 flats — Nest, Casa, Avasa, Glenmore, Hillock, Griffin, Selene, Perch, Solace, Zenith, Aura, Echelon, Vale (13 projects); 15 flats — Skylark, Summit, Atlantis, Aurelia, Elysium (5 projects); 4 flats — Ivy (1/floor × 4, matches ONE HOME. ONE FLOOR.)
- ProjectDetail stats grid: TOTAL FLATS cell between FLOORS and YEAR, identical typography/borders; grid extended to md:grid-cols-6 (mobile stays 2-col, 3 clean rows)
- Verified: testing-agent iteration_6 = 19/19 desktop + 19/19 mobile exact-value PASS, regression clean (day/night, floor plan viewer, visit site, Ivy G+4 + glance), zero pageerrors
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 74 (2026-08-07) — PROJECT MAP marker refinement round (UI-only)
- Markers ~25-30% smaller (pl-1.5 pr-2 py-1, text-[9px], 4px status dots, touch-manipulation) — rendered ~36×30px, numbers still legible on mobile; collision relaxation MIN tightened 40→32px to match
- Selected marker now gets subtle ember glow `shadow-[0_0_12px_2px_rgba(232,93,34,0.5)]`; completed pins keep green dots, ongoing keep red dots
- Map contrast raised slightly (raster brightness-min 0.09, contrast 0.15) — still the reliable raster implementation
- doubleClickZoom disabled + touch-manipulation on pins — rapid marker taps on touch devices no longer cause accidental zoom (verified: zoom caps at intentional 16)
- Mobile ergonomics: tapping a pin/chip auto-scrolls the map container into viewport (block:'center') so the bottom card is never below the fold; closing the card now refits the map to the full footprint (zoom returns to ~14.35 overview)
- Verified: testing-agent iteration_4 = exhaustive ALL-19-marker individual click test (name, number, status, exact GET DIRECTIONS URL, thumbnail/COMING SOON per project) 19/19 PASS + filters desktop+mobile + regression clean; iteration_5 targeted retest of the two ergonomics changes = 100% PASS, zero pageerrors, no mismatches reported
- Coordinates, Google Maps links, names, numbering, statuses, filters, routing and all other pages: UNCHANGED
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 73 (2026-08-07) — PROJECT MAP premium polish pass (UI/UX only, zero data changes)
- Top spacing: pt-28 → pt-36 mobile (md:pt-44) — intro (OUR FOOTPRINT / BUILT AROUND AMEENPUR. / 19-developments copy) fully clear of fixed navbar on iPhone
- Readability: retina @2x Carto dark_all tiles (tileSize 512) + raster paint (brightness-min 0.07, contrast 0.12, saturation -0.1) — roads/water/locality names crisp; STILL the reliable raster implementation (no vector)
- ROOT-CAUSE bug found & fixed: custom marker elements lacked position:absolute (maplibre v6 doesn't add it) — all pins were stacking in normal flow, displaced ~34px × index from their true spots. Added `absolute top-0 left-0` to marker className (creation + highlight effect)
- Collision handling: iterative relaxation spiderfy (pins <40px apart pushed apart over ≤40 iterations, screen-space offsets only — coordinates NEVER altered); overview + fly-to now flat (pitch 0) so offsets are exact; min pin separation verified 39px; every pin individually tappable
- Auto-fit: cameraForBounds over all visible projects + responsive padding (mobile 48/96/24, desktop 90/60) + maxZoom 15.5; runs on init and every filter change; VIEW ALL PROJECTS reset control (map-view-all) appears while a project is selected
- Mobile: map height 58vh → 68svh; selected-project card is a bottom sheet over the lower map (bottom-4 left-4 right-4), fly-to offset lifts the pin above the card; chips selector unchanged
- Typography nit fixed: ongoing projects no longer show "ONGOING · —" (year "—" in data treated as no-year in map UI only; data file untouched)
- Attribution preserved (compact OSM/CARTO, bottom-right, never obscured); zoom controls top-right
- Verified: testing-agent iteration_3 = 100% PASS (mobile 390 + desktop 1920): header visible, 0 overflow, 19 markers auto-fit, filters 19/13/6, bottom card, view-all reset, exact GD URLs, attribution visible, regression clean (home, /projects, nest, ivy); plus main-agent cluster-click sweep (10 dense pins all select correctly)
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 72 (2026-08-07) — PROJECT MAP page fixed + critical ongoing-pages crash fixed
- MapLibre blank/black canvas FIXED: replaced remote Carto vector style.json (glyph/sprite fetches failed) with an inline raster style using Carto Dark Matter raster tiles (a–d subdomains, OSM/CARTO attribution); added map 'error' + 'load' console diagnostics; smoke-verified styleLoaded=true, tilesLoaded=true, 19 markers render
- CRITICAL regression found & fixed: ALL 6 ongoing project detail pages (Aurelia, Elysium, Aura, Echelon, Vale, Ivy) were crashing blank with "Cannot read properties of undefined (reading 'replace')" — ProjectDetail.jsx computed heroSrcSet via project.cover.replace() unconditionally, but ongoing projects have no cover (introduced in Iteration 71 hero srcSet change). Fixed: heroSrcSet returns undefined when no cover. Ivy's G+4 / 3 BHK / ONE HOME. ONE FLOOR. / glance grid all render again; Solace/Zenith no-flat-count rules hold
- Overlapping marker fix: Nest/Casa/Avasa pins are ~100m apart and overlap at fit-bounds zoom — pins now raise z-index on hover/selection, and repeated clicks at a stacked spot (<28px screen distance) cycle through the stack (Casa → Avasa → …), so every pin is reachable without moving any pin off its exact coordinates
- Code review items applied: marker rebuild effect dep simplified to [filter]; window.__map now dev-only (NODE_ENV guard)
- Testing: full testing-agent pass x2 — iteration_1 (found crash + overlap issues), fixes applied, iteration_2 retest = 100% PASS, 0 pageerrors across home, /projects, /project-map, all 6 ongoing + 2 completed detail pages, desktop + mobile 390px; filters 19/13/6, sidebar/chip selection, info card links, GET DIRECTIONS hrefs all verified
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 26 (2026-08-07) — Footer heading rename
- Footer column heading "STUDIO" → "OUR OFFICE"; address, phones, Get Directions, layout, typography and all other footer elements unchanged; verified live (heading present, STUDIO absent)


## Iteration 27 (2026-08-07) — Founder 1 portrait: Nimmala Sai
- Uploaded portrait saved UNMODIFIED (no retouch/crop/re-encode) at `/app/frontend/public/assets/founders/nimmala-sai.png` (941×1672 PNG, 0.563 ratio)
- Founders section: Sai's card is now an editorial split card — portrait at natural aspect (zero cropping: full-width h-auto on mobile, h-[440px] w-auto on desktop) + "NIMMALA SAI / CO-FOUNDER"; Kotapati Akhil's monogram card untouched (portrait NOT added yet, per user)
- No biography added (awaiting approved bio); no other part of the site changed
- Verified desktop 1920 + mobile 390: image loads, display ratio exactly 0.563 both viewports, no overflow, Akhil card intact

## Iteration 28 (2026-08-07) — Founder 1 portrait replaced
- Nimmala Sai portrait swapped per user: old PNG deleted completely, new uploaded image saved unmodified as `/app/frontend/public/assets/founders/nimmala-sai.webp` (1125×2000, 0.562 ratio)
- Only change in code: file extension in FOUNDERS data (.png → .webp); section design, typography, spacing, layout untouched; Akhil card untouched
- Verified desktop (248×440 @ 0.562) + mobile 390 (348×619 @ natural ratio, no overflow): new mountain portrait renders, old image gone

## Iteration 29 (2026-08-07) — Nimmala Sai portrait display refined
- Display-only change (original webp untouched): mobile now uses `aspect-[4/5] object-cover object-[50%_45%]` — tasteful head-to-mid-thigh framing, face fully visible, mountain background preserved, no stretch/distortion; desktop unchanged (natural ratio, h-[440px] w-auto)
- Founder cards confirmed identical height on desktop (442px each); typography/section design unchanged; nothing else touched
- Verified: mobile 348×435 (0.8 ratio), no overflow at 390px; desktop 248×440 @ natural 0.562

## Iteration 30 (2026-08-07) — Founder 2 portrait: Kotapati Akhil
- Uploaded photo saved UNMODIFIED at `/app/frontend/public/assets/founders/kotapati-akhil.jpg` (960×1280, 3:4)
- Akhil's card now uses the same photo-card branch as Sai (identical crop style/spacing/typography: KOTAPATI AKHIL / CO-FOUNDER); mobile 4:5 object-cover crop (348×435 — identical to Sai's), desktop natural h-[440px] (330×440); both cards exactly 442px tall and balanced
- Portrait img testid made dynamic (`{testid}-portrait`) to avoid duplicates; no bio added; Sai's card and rest of site untouched

## Iteration 31 (2026-08-07) — Founder section upgraded with real story & bios
- Founders section now structured per user spec: header → OUR STORY ("From engineering friends to building dreams together." + 3 supplied paragraphs, Chennai 2013 origin, complementary strengths) → founder photo cards (photographs and card design untouched) each paired below with a profile block → closing statement
- Profile blocks: ember focus line ("CO-FOUNDER · CREATIVE & BRAND DIRECTION" / "CO-FOUNDER · PROJECT EXECUTION & OPERATIONS") + 4 short supplied bio paragraphs each (first two in bone, personal notes in concrete); family details (Amulya/Aadhyant, Yamuna/Ayaansh) included exactly as provided — no invented claims
- Closing: "TWO FRIENDS. TWO COMPLEMENTARY STRENGTHS. ONE SHARED DREAM." (ember accent) + "Since 2013, a friendship built on trust — now building homes together."
- Monogram fallback branch removed (both founders have photos — dead code); mobile pairing = Sai card → Sai bio → Akhil card → Akhil bio

## Iteration 32 (2026-08-07) — SEO sitemap + robots.txt
- Created `/app/frontend/public/sitemap.xml`: 23 URLs (Home, Projects, About, Contact + all 19 project pages) under https://mydreamprojects.in with lastmod 2026-08-07, changefreq (weekly: home/projects/ongoing; monthly: rest) and priorities (1.0 home → 0.7 projects); XML validated
- Created `/app/frontend/public/robots.txt`: `User-agent: * Allow: /` + `Sitemap: https://mydreamprojects.in/sitemap.xml`
- Verified in preview: /sitemap.xml → 200 application/xml (23 locs), /robots.txt → 200 text/plain with our block present (preview domain also shows a platform-level Cloudflare block — not present on the custom domain)
- Deployment readiness check: PASS, no blockers. NOTE: production deploy is user-triggered (Deploy button) — changes go live on mydreamprojects.in after redeploy

## Iteration 33 (2026-08-07) — Sitemap/robots production verification + Googlebot
- Production (https://mydreamprojects.in) initially served a cached platform placeholder sitemap (sitemapindex, 1 URL, http) — confirmed it was CDN cache (max-age=300); production now serves the real files: 23-URL https urlset sitemap + correct robots.txt
- robots.txt updated to explicitly allow Googlebot (`User-agent: Googlebot / Allow: /`) alongside `User-agent: * Allow: /` and `Sitemap: https://mydreamprojects.in/sitemap.xml`
- Verified: sitemap XML valid, 23 URLs all https://mydreamprojects.in, sampled live routes all return 200; preview serves updated robots.txt

## Iteration 34 (2026-08-07) — Deployment health check + production verification
- Deployment agent readiness check: PASS (no blockers; one non-blocking WARN — scaffold `/api/status` endpoint uses `.to_list(1000)`, unused by the frontend, revisit only if that collection ever grows)
- Production verified after user's redeploy: https://mydreamprojects.in home 200, robots.txt now includes explicit Googlebot allow + https sitemap reference, sitemap.xml serving all 23 URLs

## Iteration 35 (2026-08-07) — Safari "server can't be found" diagnosis (no changes made)
- User reported Safari error on https://mydreamprojects.in/sitemap.xml while homepage worked; diagnosed without modifying anything
- Findings: sitemap serves 200 application/xml with 23 URLs, zero redirects, same hostname; http→https 301 and www→apex 308 both clean; DNS A records correct for apex + www; no broken AAAA; TLS cert valid; robots.txt correct
- Conclusion: server-side is perfect — error is client-side DNS resolution failure, almost certainly negative DNS caching / incomplete propagation (custom domain was connected the same day); advised airplane-mode toggle / DNS flush / wait; escalate to Emergent Support only if it persists 24-48h across networks

## Iteration 36 (2026-08-07) — Aurelia: VISIT PROJECT SITE section
- Added conditional "Visit Project Site" section to ProjectDetail.jsx (renders ONLY when `project.siteLocation` exists — currently Aurelia only, single occurrence in projects.js)
- Exact supplied link on GET DIRECTIONS ↗: https://maps.app.goo.gl/VqmwyFVcZNFkjSi76?g_st=ic (target _blank — opens Google Maps app/browser naturally on mobile); resolved the supplied pin (17.5351890, 78.3342360) for a clean embedded map preview via google.com/maps?q=...&output=embed — no location guessed or substituted
- Display: VISIT PROJECT SITE overline / MY DREAM AURELIA / Ameenpur, Hyderabad / ember GET DIRECTIONS button + bordered map panel (grid 4/8, matches floor-plan section language)
- Verified desktop 1920 + mobile 390: exact href, map shows the exact pin, no overflow; floor plan and all other project data untouched; no other project renders the section
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 37 (2026-08-07) — Elysium: VISIT PROJECT SITE section
- Added `siteLocation` to Elysium only: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/tNxdZWptsQZUD8A5A?g_st=ic (_blank); embedded map preview uses the resolved exact pin 17.5324900,78.3343810 (distinct from Aurelia's 17.5351890,78.3342360 — verified different)
- Reuses the same conditional visit-site section (renders only for projects with siteLocation — now Aurelia + Elysium only); Elysium floor plan, COMING SOON elevation and description untouched
- Verified desktop 1920 + mobile 390: exact href, Elysium coords in embed, all display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 38 (2026-08-07) — Ivy: VISIT PROJECT SITE section
- Added `siteLocation` to Ivy only: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/cs9kAFywur9v2sH68?g_st=ic (_blank); embedded map uses resolved exact pin 17.5324690,78.3203350 (distinct from Aurelia + Elysium — verified)
- Ivy rules re-verified intact: ONGOING, G+4, ONE HOME. ONE FLOOR., 3 BHK, floor plan untouched; no other project renders the section (siteLocation now on Aurelia, Elysium, Ivy only)
- Verified desktop 1920 + mobile 390: exact href, Ivy coords in embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 39 (2026-08-07) — Vale: VISIT PROJECT SITE section
- Added `siteLocation` to Vale only: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/TViJG2MA5VW5vc3T8?g_st=ic (_blank); embedded map uses resolved exact pin 17.5353830,78.3208010 (distinct from Aurelia/Elysium/Ivy — verified)
- Vale data re-verified intact: ONGOING · G+5 · Residential Apartment, floor plan + COMING SOON elevation + description untouched; siteLocation now on Aurelia, Elysium, Ivy, Vale only
- Verified desktop 1920 + mobile 390: exact href, Vale coords in embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 40 (2026-08-07) — Architect contact info removed from all floor plans
- 13 plan PDFs (aurelia, avasa, casa, glenmore, griffin, hillock, nest, perch, selene, skylark, solace, summit, zenith) contained an embedded architect block: "GUNNAM GROUP / ARCHITECTS & PLANNERS / KPHB, HYDERABAD / architect_ashokbabu@yahoo.com / +91-9000444255" + GG vector logo
- Surgical PDF redaction via PyMuPDF (`/app/scripts/redact_plans.py`): only the 9 contact words + logo line-art removed; drawings, dimensions, room labels, area statements, "PROPOSED RESIDENTIAL APARTMENT FOR…" lines and north arrows untouched; previews re-rendered at 150 DPI
- Glenmore initially over-redacted (its block sits higher — caught the PROPOSED line) → restored from backup and re-redacted token-based (`/app/scripts/fix_glenmore.py`); originals backed up at `/app/backups/plan_originals/` (outside public/, not served)
- Other 6 plans verified clean already: atlantis (image-based, no block), aura/echelon/elysium/ivy/vale (title blocks have only client/project info)
- Verified: text extraction of ALL 19 PDFs shows zero contact patterns with room labels/dimensions intact; visual checks of nest/skylark/glenmore/aurelia/zenith clean; site plan preview + download work (200s)
- FUTURE PLANS: run `/app/scripts/redact_plans.py` pattern (token-based redaction) on any new plan PDF before upload so no architect contact details ever appear

## Iteration 41 (2026-08-07) — Aura: VISIT PROJECT SITE section
- Added `siteLocation` to Aura only: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/3kcuMTU8QhjjJ5Xr7?g_st=ic (_blank); embedded map uses resolved exact pin 17.5361670,78.3327710 (distinct from all other project pins — verified)
- Aura data re-verified intact: ONGOING · G+5 · Residential Apartment, floor plan, COMING SOON elevation, description untouched; siteLocation now on Aurelia, Elysium, Ivy, Vale, Aura
- Verified desktop 1920 + mobile 390: exact href, Aura coords in embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 42 (2026-08-07) — Echelon: VISIT PROJECT SITE section (all 6 ongoing complete)
- Added `siteLocation` to Echelon only: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/Ty6BEn1S7gRjMEzHA?g_st=ic (_blank); embedded map uses resolved exact pin 17.5334550,78.3300480 (distinct from all other pins — verified)
- Echelon data re-verified intact: ONGOING · G+5 · Residential Apartment, floor plan, COMING SOON elevation, description untouched
- ALL 6 ongoing projects now have exact Visit Project Site locations: Aurelia, Elysium, Aura, Echelon, Vale, Ivy
- Verified desktop 1920 + mobile 390: exact href, Echelon coords in embed, display texts, no overflow

## Iteration 43 (2026-08-07) — Day/Night elevation switcher (reusable component)
- New reusable `src/components/DayNightImage.jsx`: minimal glass pill toggle (lucide Sun/Moon, "DAY | NIGHT", active = ember) overlaid top-right; Day default; 0.7s opacity cross-fade (night image is the static base, day absolute overlay fades out); identical container/dimensions/crop → zero layout shift; aria-pressed buttons; no reload
- Nest uploads processed: day (1402×1122) + night (1402×1122) saved as `elevation-day.webp` / `elevation-night.webp` + `-800.webp` variants in the nest folder; wired via new optional `elevationModes` field in projects.js (Nest only)
- ProjectDetail elevation section renders DayNightImage when `elevationModes` exists, else the original single image — all other 18 projects unchanged (Casa verified)
- Verified desktop + mobile: day default (aria-pressed), mid-fade opacity ~0.16 at 350ms, final 0, container height identical before/after (1214.83px desktop / 278.48px mobile), no overflow at 390px
- TO EXTEND: drop `elevation-day.webp`/`elevation-night.webp` (+800 variants) into any project folder and add `elevationModes` to its data entry

## Iteration 44 (2026-08-07) — Day/Night toggle refined
- Toggle redesigned per spec: compact rounded-full segmented pill (translucent ink/45 + backdrop-blur, subtle border + shadow, 3px sun/moon icons, 9-10px labels); selected mode keeps ember accent
- Mobile: bottom-center of the elevation image, 16px from bottom, 154×36px; desktop: compact 167×37px at top-right
- Only the toggle classes changed in DayNightImage.jsx — images, transition, layout untouched; verified fade still works + no overflow at 390px
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 45 (2026-08-07) — Casa: Day/Night elevation
- Casa uploads (elevation_day.png / elevation_night.png, both 768×1024) processed to `elevation-day.webp` / `elevation-night.webp` + `-800.webp` variants in the casa folder; `elevationModes` added to Casa data with `width: 768`
- DayNightImage component made width-agnostic (`fullWidth` prop, default 1402 = Nest) so srcSet descriptors stay accurate per project
- Verified desktop 1920 (day default, night click, heights identical 2024.62px — no shift) + mobile 390 (pill bottom-center 16px gap, 154×36, tap works, no overflow); Nest unchanged
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 46 (2026-08-07) — Avasa + Skylark: Day/Night elevations
- Uploads matched strictly by filename: Avasa Day/Night (1125×2000) → my-dream-avasa folder; Skylark Day/Night (1448×1086) → my-dream-skylark folder; each saved as elevation-day.webp / elevation-night.webp + -800.webp variants; brightness-verified day vs night content
- `elevationModes` added to Avasa (width 1125) and Skylark (width 1448) only; Nest + Casa untouched
- Verified individually on desktop + mobile: Avasa DAY→Avasa Day image, NIGHT→Avasa Night image; Skylark DAY→Skylark Day, NIGHT→Skylark Night; default day, 0.7s cross-fade, identical container heights (no shift), pill bottom-center 16px on mobile, no overflow at 390px
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 47 (2026-08-07) — Footer layout rebalanced
- Layout-only refinement (no content/color/link changes): logo reduced (w-52/64 → w-40/48) and centered on mobile; mobile grid now 2 equal columns (SITEMAP | OUR OFFICE — verified tops exactly aligned at same y, equal 159px widths); desktop keeps 6/3/3 with smaller logo
- Consistent rhythm: both column headers mb-6; link lists space-y-3.5; office groups mt-6 with space-y-3.5; slightly tightened block padding (pb-16/24 → pb-14/20); mobile edge padding px-5 → px-6
- Verified mobile 390 (centered logo, aligned equal columns), tablet 834, desktop 1920 — all text, phones, address, links, colors unchanged
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 48 (2026-08-07) — Footer final spacing refinements (footer APPROVED/finished)
- Tightened bottom portion: content-grid bottom padding pb-14/20 → pb-10/14; copyright/founders gap-3 → gap-2; divider keeps same left/right margins as content (shared container); comfortable pb-8 bottom padding kept
- Logo size, two-column layout, typography, colors, content untouched; verified mobile 390 + desktop 1920
- Footer considered FINISHED per user
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 49 (2026-08-07) — Status indicator LEDs: green completed / red ongoing
- ProjectCard status dot: completed → emerald-400 with subtle glow `0 0 7px 2px rgba(52,211,153,.45)`; ongoing → red-500 with `rgba(239,68,68,.45)` glow (kept existing pulse); badge size/position/typography/text untouched (dot-only change, tone-based dot colors removed)
- Homepage "What We're Building Next" ongoing row dot: ember → red-500 + same red glow
- ProjectDetail pages have no dot (text chip only) — unchanged, per "if applicable"
- Verified computed styles on desktop (Nest=green+glow, Ivy=red+glow) and mobile (Aurelia red glow visible); status text/logic unchanged

## Iteration 50 (2026-08-07) — Homepage Selected Work lineup changed
- SELECTED_SLUGS in Home.jsx now: Nest, Casa, Hillock, Griffin, Solace (removed Selene, Zenith, Glenmore, Skylark from homepage ONLY — all remain on Projects page + detail pages; projects.js untouched, 19 slugs intact)
- Card design/layout/animations untouched; verified desktop: exactly 5 cards, each image/name/link matches its project, all images loaded, removed names absent from section
- NOTE: goes live on mydreamprojects.in on next redeploy


## Iteration 51 (2026-08-07) — Nest: VISIT PROJECT SITE section
- Added `siteLocation` to Nest: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/xyW7NFt7epe782966?g_st=ic (_blank); this link resolves to a registered Google Maps PLACE ("My Dream Nest, Janachithanya layout, Aminpur Rd, Ameenpur") so the embed uses that exact place query — map preview even shows the place card with its rating
- First completed project with a site location; section design identical to ongoing projects; Nest elevation/floor plan/day-night/description untouched
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 52 (2026-08-07) — Casa: VISIT PROJECT SITE section
- Added `siteLocation` to Casa: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/WQvmq3LFSyWB5nMM9?g_st=ic (_blank); resolves to registered place "My Dream - Casa" so the embed uses that exact place query (map shows the official place card)
- Casa elevation/day-night/floor plan/description untouched; siteLocation now on all 6 ongoing + Nest + Casa
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 53 (2026-08-07) — Avasa: VISIT PROJECT SITE section
- Added `siteLocation` to Avasa: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/VuYbWjcUoZxPMcdw7?g_st=ic (_blank); resolves to registered place "MY Dream Avasa" so the embed uses that exact place query (distinct pin from Nest/Casa — visible separately on the map)
- Avasa elevation/day-night/floor plan/description/status/year untouched; siteLocation now on all 6 ongoing + Nest + Casa + Avasa
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 54 (2026-08-07) — Skylark: VISIT PROJECT SITE section
- Added `siteLocation` to Skylark: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/VXZCpHzKvFzrJr717?g_st=ic (_blank); resolves to registered place "My Dream Skylark" (4.7★) — embed uses that exact place query
- Skylark elevation/day-night/floor plan/description/status/year untouched; siteLocation now on all 6 ongoing + Nest + Casa + Avasa + Skylark
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 55 (2026-08-07) — Glenmore: VISIT PROJECT SITE section
- Added `siteLocation` to Glenmore: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/Mfog5oGVdqRZTp9r7?g_st=ic (_blank); resolves to registered place "My Dream Glenmore" (4.8★) — embed uses that exact place query
- Glenmore elevation/floor plan/description/status/year untouched; siteLocation now on all 6 ongoing + Nest + Casa + Avasa + Skylark + Glenmore
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 56 (2026-08-07) — Hillock: VISIT PROJECT SITE section
- Added `siteLocation` to Hillock: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/8btoDtghTJtTwWBm7?g_st=ic (_blank); resolves to registered place "My Dream Hillock" (5.0★) — embed uses that exact place query
- Hillock elevation/floor plan/description/status/year untouched; siteLocation now on all 6 ongoing + Nest, Casa, Avasa, Skylark, Glenmore, Hillock
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 57 (2026-08-07) — Summit: VISIT PROJECT SITE section
- Added `siteLocation` to Summit: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/XSiRLgM3bvgYk8yZ6?g_st=ic (_blank); resolves to registered place "My Dream Summit" (near Ameenpur Lake) — embed uses that exact place query
- Summit elevation/floor plan/description/status/year untouched; siteLocation now on all 6 ongoing + Nest, Casa, Avasa, Skylark, Glenmore, Hillock, Summit
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 58 (2026-08-07) — Griffin: VISIT PROJECT SITE section
- Added `siteLocation` to Griffin: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/n4baoGjFLi1yEzzM6?g_st=ic (_blank); resolves to registered place "My Dream Griffin" (5.0★) — embed uses that exact place query
- Griffin elevation/floor plan/description/status/year untouched; siteLocation now on all 6 ongoing + Nest, Casa, Avasa, Skylark, Glenmore, Hillock, Summit, Griffin
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 59 (2026-08-07) — Selene: VISIT PROJECT SITE section
- Added `siteLocation` to Selene: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/zwRTdaahm97KMpRy8?g_st=ic (_blank); resolves to registered place "MY DREAM SELENE" (5.0★) — embed uses that exact place query
- Selene elevation/floor plan/description/status/year untouched; siteLocation now on all 6 ongoing + Nest, Casa, Avasa, Skylark, Glenmore, Hillock, Summit, Griffin, Selene
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 60 (2026-08-07) — Atlantis: VISIT PROJECT SITE section
- Added `siteLocation` to Atlantis: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/9GnZ5a8ZdT9iACzVA?g_st=ic (_blank); resolves to registered place "My Dream Atlantis" (4.7★) — embed uses that exact place query
- Atlantis elevation/floor plan/PDF asset mapping/description/status/year untouched; siteLocation now on all 6 ongoing + Nest, Casa, Avasa, Skylark, Glenmore, Hillock, Summit, Griffin, Selene, Atlantis
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 61 (2026-08-07) — Perch: VISIT PROJECT SITE section
- Added `siteLocation` to Perch: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/kUNaT2Qcbtp11dEe9?g_st=ic (_blank); resolves to registered place "My Dream Perch" — embed uses that exact place query
- Perch elevation/floor plan/description/status/year untouched; siteLocation now on all 6 ongoing + Nest, Casa, Avasa, Skylark, Glenmore, Hillock, Summit, Griffin, Selene, Atlantis, Perch
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 62 (2026-08-07) — Solace: VISIT PROJECT SITE section
- Added `siteLocation` to Solace: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/RAaGeQa5no16juuJ6?g_st=ic (_blank); resolves to registered place "My Dream Solace" (5.0★) — embed uses that exact place query
- Solace elevation/floor plan/description/status/year untouched; no residence/flat count added (rule re-verified); siteLocation now on all 6 ongoing + all completed except Zenith
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 63 (2026-08-07) — Zenith: VISIT PROJECT SITE section (ALL 19 COMPLETE)
- Added `siteLocation` to Zenith: GET DIRECTIONS ↗ opens exact supplied link https://maps.app.goo.gl/p9xH9LbbQWnG8emi6?g_st=ic (_blank); resolves to registered place "My Dream Zenith" (5.0★) — embed uses that exact place query
- Zenith elevation/floor plan/description/status/year untouched; no residence/flat count added (rule re-verified)
- MILESTONE: ALL 19 projects now have their exact Visit Project Site locations (13 completed + 6 ongoing)
- Verified desktop 1920 + mobile 390: exact href, place embed, display texts, no overflow

## Iteration 64 (2026-08-07) — Homepage cards: Day/Night quick-preview
- ProjectCard (reusable component) now shows a mini DAY | NIGHT pill (top-right, below the status badge, rounded-full translucent ink/45 + blur, ember active, 3px sun/moon icons) ONLY when `homeMeta` (homepage) AND `project.elevationModes` exist — currently Nest + Casa cards; Hillock/Griffin/Solace and all Projects-page cards unchanged
- Per-card local state; day default; tapping NIGHT cross-fades only that card's image (0.7s opacity) with preventDefault/stopPropagation so the card link does NOT fire; tapping elsewhere still navigates to the project page (verified: lands on /projects/my-dream-casa)
- Verified desktop 1920 + mobile 390: default day, night swap without reload, no toggle on single-elevation/ongoing projects, Projects page unchanged; detail-page Day/Night switchers untouched
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 65 (2026-08-07) — Day/Night card toggle extended to Projects page + performance
- `homeMeta` gate removed: card toggle now appears on ANY ProjectCard with `elevationModes` — homepage Selected Work (Nest, Casa) AND Projects page (Nest, Casa, Avasa, Skylark); ongoing + single-elevation cards show none
- Toggle repositioned to bottom-right corner of the card image (latest user preference), same compact pill design
- Performance: night image has NO src until first Night tap (0 night-image requests on initial load — verified via request listener); on first tap it loads then onLoad triggers the 0.7s cross-fade; cached afterwards
- Verified: Projects page desktop (4 eligible toggles, 0 preload requests, night tap fades without navigation), homepage mobile (day→night→day, card body tap still navigates to detail page)

## Iteration 66 (2026-08-07) — Glenmore + Hillock: Day/Night elevations
- 4 uploads matched by filename AND cross-verified against existing elevations (Glenmore = white-Audi building 1178×751 day / 1178×580 night; Hillock = gate/red-Audi building 1322×1190 day / 1327×1186 night); saved as webp + 800 variants in correct folders only
- DayNightImage gained optional `aspect` prop (fixed frame, both images object-cover, equal crop) for mismatched pairs — Glenmore uses aspect-[16/9]; Hillock pair is same-ratio so natural mode; images never altered
- `elevationModes` added to Glenmore (width 1178 + aspect) and Hillock (width 1327) → toggles now live on detail pages, homepage cards (Hillock is in Selected Work), and Projects page cards automatically
- Full PASS/FAIL checklist verified (desktop + mobile): Glenmore Day PASS, Glenmore Night PASS, Hillock Day PASS, Hillock Night PASS, Homepage Toggle PASS, Projects Page Toggle PASS, Project Detail Toggle PASS (both), Mobile Toggle PASS, Correct Asset Mapping PASS; no layout shift (identical heights), toggle tap never navigates, card tap navigates correctly

## Iteration 67 (2026-08-07) — Summit + Griffin: Day/Night elevations
- 4 uploads matched by filename AND cross-verified against existing elevations (Summit = brown/black stacked w/ white SUV 1252×628 day, 1254×615 night; Griffin = white louvers + roof sign w/ white Audi 1252×686 day, 1254×559 night); saved as webp + 800 variants in correct folders only
- Both pairs have slightly mismatched aspects → both use `aspect-[2/1]` fixed frame (equal crop, no distortion, buildings preserved); elevationModes added (width 1254)
- Toggles live on: both detail pages, Projects page cards (both), homepage (Griffin only — Summit correctly NOT in Selected Work, unchanged)
- Full checklist verified (desktop + mobile): Summit Day PASS, Summit Night PASS, Griffin Day PASS, Griffin Night PASS, Homepage PASS (Griffin only), Projects Page PASS (both), Detail Pages PASS, Mobile PASS, Asset Mapping PASS; no layout shift, toggle taps never navigate

## Iteration 68 (2026-08-07) — Selene + Atlantis: Day/Night elevations
- 4 uploads matched by filename AND cross-verified against existing elevations (Selene = grey/beige stacked balconies 1252×643 day, 1254×494 night; Atlantis = tan/cream corner w/ MY DREAM sign 1343×1171 day, 1345×1169 night); webp + 800 variants saved in correct folders only
- Selene pair mismatched aspect → `aspect-[2.2/1]` fixed frame; Atlantis pair near-identical aspect → natural mode; elevationModes added (widths 1254 / 1345)
- Neither is in Selected Work → homepage correctly unchanged; toggles live on both detail pages + Projects page cards
- Full checklist: Selene Day/Night PASS, Atlantis Day/Night PASS, Homepage PASS (n/a — not in Selected Work), Projects Page PASS, Detail Pages PASS, Mobile PASS, Asset Mapping PASS, Atlantis Floor Plan/PDF Preserved PASS (href verified unchanged)
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 69 (2026-08-07) — Perch + Solace: Day/Night elevations
- 4 uploads matched by filename (note: night file was named "Solacd night.jpg" — typo, it IS the Solace night) AND cross-verified against existing elevations (Perch = white/tan MYDREAM-sign building 1252×665 day, 1254×576 night; Solace = black/white/brown w/ black SUV 1182×714 day, 1182×591 night); webp + 800 variants in correct folders only
- Both pairs mismatched aspect → fixed frames: Perch `aspect-[2/1]`, Solace `aspect-[9/5]` (equal crop, no distortion); elevationModes added (widths 1254 / 1182)
- Toggles live: both detail pages, both Projects page cards, homepage Solace card (Solace IS in Selected Work; Perch correctly NOT on homepage)
- Full checklist: Perch Day/Night PASS, Solace Day/Night PASS, Homepage PASS (Solace only), Projects Page PASS, Detail Pages PASS, Mobile PASS, Asset Mapping PASS; Solace no-flat-count rule re-verified

## Iteration 70 (2026-08-07) — Zenith: Day/Night elevation (ALL 13 completed projects done)
- Zenith pair matched by filename + cross-verified against existing elevation (white/brown building, white SUV, MY DREAM CONSTRUCTIONS wall); day 1287×633 (2.03), night 1287×571 (2.25) → `aspect-[2.15/1]` fixed frame (minimal equal crop, full building, no excessive foreground — addresses Zenith's known cropping concern)
- elevationModes added to Zenith (width 1287); toggles live on detail page + Projects page card; Zenith NOT in Selected Work → homepage untouched
- Full checklist: Zenith Day PASS, Night PASS, Projects Page PASS, Detail PASS, Homepage PASS (n/a), Mobile PASS, Framing Match PASS, Asset Mapping PASS; no-flat-count rule re-verified
- MILESTONE: all 13 completed projects now have Day/Night (Nest, Casa, Avasa, Skylark, Glenmore, Hillock, Summit, Griffin, Selene, Atlantis, Perch, Solace, Zenith)
- NOTE: goes live on mydreamprojects.in on next redeploy

## Iteration 71 (2026-08-07) — FINAL elevation image quality & alignment pass (all 13 completed)
- Re-encoded ALL 26 day/night elevations from the pristine originals at max practical quality (full-size q92 webp, 800w q88) — no upscaling, no sharpening/filters, architecture untouched; originals preserved at /app/backups/elevation_originals/ (26 files, persistent)
- Detail-page HEROES now serve the hi-res day webp (were low-res 560–1206px elevation.jpg bases); homepage hero switched to skylark elevation-day.webp (1448w) with corrected srcset — verified text contrast intact
- NEW: full-screen ElevationViewer (ElevationViewer.jsx) — tap the elevation on any completed project's detail page → fullscreen premium viewer with DAY | NIGHT pill + close button, wheel/pinch/drag zoom (1-5x), dblclick reset, Esc/scroll-lock; toggle taps isolated from image click
- Alignment: pairs with mismatched source aspects use per-project fixed frames (glenmore 16/9, summit/griffin/perch 2/1, selene 2.2/1, solace 9/5, zenith 2.15/1) so buildings stay stationary across day/night; same-aspect pairs use natural frames
- Performance: night images load on demand on cards (0 preload requests — verified), lazy below fold elsewhere, day-first
- Automated QA sweep (qa_daynight.py): 13 desktop + 4 mobile projects + viewer = ALL PASS, 0 fails (hero hi-res, day/night loaded full-res, no cross-association, no layout shift, no overflow)
- SOURCE-LIMITED ASSETS (original upload resolution, not upscaled): Casa 768×1024 (softest on large desktop), Glenmore night 1178×580, Selene night 1254×494, Perch night 1254×576, Summit night 1254×615, Solace 1182w pair, Zenith 1287w pair; best: Skylark 1448w, Nest 1402w, Atlantis ~1345w, Hillock ~1325w
- NOTE: goes live on mydreamprojects.in on next redeploy


- NOTE: goes live on mydreamprojects.in on next redeploy


- NOTE: goes live on mydreamprojects.in on next redeploy

- NOTE: goes live on mydreamprojects.in on next redeploy

- NOTE: goes live on mydreamprojects.in on next redeploy


- NOTE: goes live on mydreamprojects.in on next redeploy













- NOTE: goes live on mydreamprojects.in on next redeploy






- NOTE: goes live on mydreamprojects.in on next redeploy

- NOTE: goes live on mydreamprojects.in on next redeploy


- NOTE: goes live on mydreamprojects.in on next redeploy







- NOTE: the Googlebot-explicit robots.txt reaches production on the user's next redeploy (current prod robots already allows all + https sitemap line)

- PENDING from before: Site Progress Updates feature — awaiting user's answers (photos availability, layout choice, homepage badge)

- Verified desktop + mobile 390: all story/bio/closing copy present, photos unchanged, no overflow, no walls of text

- Verified desktop + mobile 390: both portraits load, face fully visible, subject in frame, no distortion, no overflow



- STOPPED per user instruction — waiting for biography + second founder

- P0: **Architectural elevation image for hero** — upload it; code auto-picks it from `/assets/hero-elevation.jpg`
- P0: Real project names, locations, years, descriptions, photography (drop into `src/data/projects.js`)
- P0: Founder photos/bios, phone/email on Contact
- P1: Wire contact form to backend/email delivery
- P1: OG image per page, SEO meta
- P2: Project gallery lightbox, floor-plan viewer, site-progress updates

## Next Tasks
1. Receive real content/assets and populate projects data file
2. Replace logo wordmark with final logo asset
3. Backend enquiry endpoint + email notification

## 2026-08-08 — Homepage Pricing + Landowner Partnership (DONE, tested iteration_26)
- Pricing section on Home (after Selected Work): ₹5,994 Per Sq.Ft. · 2 BHK from ₹55.6 L · 3 BHK from ₹85 L, disclaimer + "Get Exact Pricing" WhatsApp CTA. Static values via `PRICING` export in `src/data/projects.js` (user confirmed: public-only, no backend/admin).
- ₹5,994 / Sq.Ft. label on all 6 ongoing projects: `pricePerSft` field → ProjectCard price line, Home "Building Next" rows, ProjectDetail hero chip. Completed projects show no price.
- Landowner Partnership section on Home (before final CTA): "YOUR LAND. OUR EXPERTISE. LET'S BUILD TOGETHER." + 3 value cells + "Discuss Your Land With Us" dialog form (Name/Phone/Email/Land Location/Land Area/Message) → validates, opens WhatsApp pre-fill to founders, success state with reopen link.
- Verified: desktop + mobile 390px, no overflow, dialog clean; testing agent 7/7 pass, no console errors.

## Still Pending
- P2: Site Progress Updates (dated construction photos per ongoing project) — awaiting user assets/answers

## 2026-08-08 — Landowner Auto-Reply (Meta WhatsApp Cloud API) — BACKEND READY, AWAITING META CREDENTIALS
- New endpoint `POST /api/enquiries/landowner` in `backend/server.py`: validates (opt-in required, Indian E.164 phone via phonenumbers), stores enquiry in `landowner_enquiries` collection, then sends WhatsApp confirmation via Meta Cloud API Utility template `landowner_enquiry_confirmation` (params: {{1}} name, {{2}} location).
- Reads `META_ACCESS_TOKEN` + `META_PHONE_NUMBER_ID` from backend/.env; returns whatsapp: accepted | not_configured | 502 failed. Graph API pinned to v26.0.
- Frontend landowner form: added mandatory opt-in checkbox, submits to backend BEFORE wa.me handoff, success copy varies on whether auto-reply was accepted.
- Approved template text (user-approved draft): "Hi {{1}}, thank you for reaching out to My Dream Projects about your land at {{2}}. Sai or Akhil will personally call you within 24 hours to discuss the partnership. — My Dream Projects, Ameenpur"
- PENDING USER: Meta for Developers app + Coexistence onboarding for +91 77804 29845 (keeps Business app working), System User token, Phone Number ID, template creation+approval. Tested: valid/invalid curl cases, full browser flow, DB persistence.

## 2026-08-09 — Homepage Refinement: Hyderabad copy, Night-default, Hero Night Slideshow (DONE, tested iteration_27)
- A) Landowner paragraph only: "around Ameenpur" → "around Hyderabad". All other Ameenpur references untouched (verified 8 remain on Home).
- B) Night mode is now the DEFAULT everywhere: ProjectCard, DayNightImage, ElevationViewer start in night; ProjectDetail hero uses elevation-night.webp. Day images lazy-load only after the first Day toggle click (dayTouched gating). Toggles unchanged and fully reversible.
- C) Home hero is now an automatic crossfade slideshow of all 13 completed projects' NIGHT images. Order: skylark → nest → casa → avasa → griffin → selene → glenmore → zenith → summit → perch → solace → hillock → atlantis (HERO_SLIDE_ORDER in Home.jsx). 5.5s/slide, 2s crossfade, subtle 1→1.04 scale drift (disabled for reduced-motion), loops. Renders only prev/active/next slides; next slide preloads in-viewport; advancing is gated on image load (no blank frames). Skylark night keeps fetchPriority="high". Hero content/overlay unchanged.
- Verified: exact slide order (Skylark→Nest→Casa), ZERO elevation-day requests on initial loads, toggles work, ongoing Coming Soon placeholders unaffected, no console errors, desktop+mobile 390px.
- NOTE: goes live on mydreamprojects.in on user's next redeploy.

## Still Pending
- P0 (user action): Meta WhatsApp credentials (Access Token + Phone Number ID) + template approval to activate landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — Slideshow Update: 8 Projects, 3s Cadence, Captions + Akhil Photo Swap (DONE, tested iteration_28)
- Hero slideshow trimmed to EXACTLY 8 completed projects: skylark → nest → casa → avasa → hillock → griffin → perch → solace → loop (HERO_SLIDE_ORDER in Home.jsx; no other projects mount).
- Cadence ~3s/slide (SLIDE_MS=3000), 1.6s crossfade, subtle 1→1.02 scale drift. Full loop verified by polling (measured deltas 2.6-3.5s).
- New per-slide project-name caption top-right of hero (data-testid=hero-caption-<slug>): ember tick + small bone uppercase text, fades with slide, no overlap with headline/CTAs/navbar (desktop + 390px verified).
- Akhil founder photo replaced globally: /assets/founders/kotapati-akhil.jpg → new provided image cropped to 4:5 (941x1176, q92), full face visible; used on Home + About. Sai's photo, all names/bios unchanged. Old file backed up at /tmp/kotapati-akhil-backup.jpg (not in repo).
- Night default from iteration_27 remains intact. 0 console errors.
- NOTE: goes live on mydreamprojects.in on user's next redeploy.

## Still Pending
- P0 (user action): Meta WhatsApp credentials (Access Token + Phone Number ID) + template approval to activate landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — Caption Deep-Links + Premium Plan Presentation System (DONE, tested iteration_29)
- Hero captions are now tappable deep-links to each project page (rendered above the background layer, z-10; inactive captions pointer-events-none). Verified real-click navigation for skylark + nest.
- New reusable component `src/components/PlanSheet.jsx` — unified premium plan presentation for ALL 19 projects: ivory sheet, hairline charcoal frame, header (brand · TYPICAL FLOOR PLAN / project name / config line — singular "Residence" for ivy), original untouched drawing, footer (brand · location + Sheet <index>).
- ProjectDetail floor-plan section: added UNIT DETAILS panel (real data only: Type, Floors, Total Residences; Flat Mix row only when different from Type). Drawings + PDFs untouched. FloorPlanViewer (zoom/pan/pinch) unchanged.
- User confirmed scope: presentation layer only; drawing internals to be re-drafted by their architect later (will drop into PlanSheet unchanged). North arrows deferred (no verified orientation data). No carpet/saleable areas (not in data — left out, not invented).
- Verified: consistency across skylark/nest/aurelia/ivy, viewer open/zoom/ESC, PDF download hrefs, mobile 390px no overflow, 0 console errors.

## Still Pending
- P0 (user action): Meta WhatsApp credentials (Access Token + Phone Number ID) + template approval to activate landowner auto-reply
- P1 (user action): Re-drafted plan drawings from architect → drop into PlanSheet
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — 3D Floor Plan Pilot (My Dream Ivy) + Unified 2D/3D System (DONE, tested iteration_30)
- User-approved pilot: AI-generated (Gemini gemini-3-pro-image-preview via Emergent universal key) premium 3D dollhouse render for My Dream Ivy from its real 2D plan. No text/labels/dimensions inside render per user decision. Two passes; perspective version chosen.
- Render installed: /assets/projects/my-dream-ivy/plan-3d.jpg (+ .webp, -800.webp). NOTE: AI output is 864x1222 — NOT true 4K (model limitation).
- plan3d field added to ivy in projects.js. PlanSheet auto-shows 2D PLAN | 3D PLAN toggle only when plan3d exists (future projects inherit by adding data + asset). 3D mode shows disclaimer "Artistic 3D visualization — the 2D plan remains the technical reference".
- FloorPlanViewer opens current mode's image; title suffix "3D Floor Plan"; PDF link hidden in 3D mode. Zoom/pan/pinch unchanged.
- Verified: toggle states, viewer both modes, no toggle on other 18 projects, mobile 390px, 0 console errors.
- AWAITING USER VERDICT on pilot quality/accuracy before any decision on the other 18 projects.

## Still Pending
- P0 (user decision): Approve/reject Ivy 3D pilot → then decide AI renders for remaining 18 (accuracy caveats) or studio-commissioned renders
- P0 (user action): Meta WhatsApp credentials to activate landowner auto-reply
- P1 (user action): Re-drafted 2D plan drawings from architect (optional)
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — Dark Luxury Plan Presentation (DONE, tested iteration_31)
- PlanSheet restyled light→dark: charcoal gradient (#1b1a17→#121110), white/10 hairlines, ivory text, champagne #C9A876 accent ONLY on config line + selected toggle underline. 2D/3D toggle restyled dark (selected #0c0b0a + champagne underline). 2D drawings unchanged (white paper by design, dark frame around).
- Ivy 3D render replaced with dark-background version (AI relight of the cropped render; geometry QC'd against light version — faithful). Model occupancy ~79% of frame. plan-3d.jpg 688x1506 (+webp variants).
- FloorPlanViewer: removed white bg-bone backdrop so dark render blends (2D plans have white baked in — unaffected).
- Verified: dark theme on Ivy+Skylark, toggle both directions, viewer both modes no white bands, mobile 390px, 0 console errors, champagne accent audit clean.

## Still Pending
- P0 (user decision): Ivy 3D pilot verdict → approve/adjust/discard; then remaining 18 renders or studio route
- P0 (user action): Meta WhatsApp credentials to activate landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — 2D Plan Viewer Redesign: Content-Cropped Display Derivatives (DONE, tested iteration_32)
- All 19 projects: generated floor-plan-display.jpg (+ -800.webp) — auto-cropped to drawing content bbox (noise-filtered, 1% safety pad). Originals floor-plan-p1.jpg + floor-plan.pdf byte-identical/untouched; PDF download still serves full original sheet.
- PlanSheet 2D uses display derivative (path derived from preview via .replace). Framed-document treatment shared by 2D+3D: graphite border, slim dark mat #0d0c0a, champagne #C9A876/25 keyline. Sheet drawing padding reduced (p-3 md:p-6) → plans display larger.
- FloorPlanViewer 2D mode uses display derivative too. 2D/3D now share identical frame/controls/typography.
- Verified: 5 projects deep-checked (incl. atlantis full-bleed uncropped edge case), no content cut, mobile 390px clean, 0 console errors.

## Still Pending
- P0 (user decision): Ivy 3D pilot verdict → remaining 18 renders or studio route
- P0 (user action): Meta WhatsApp credentials for landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — 3D Renders Batch 1: 9/19 Projects Live (DONE, tested iteration_33)
- User approved Ivy pilot. Batch-generated dark-studio 3D dollhouse renders (single call per project, dark bg direct) from floor-plan-display.jpg inputs.
- LIVE WITH 3D (9): ivy, skylark, casa, avasa, glenmore, hillock, griffin, solace, elysium. plan3d entries in projects.js; toggle appears automatically.
- PENDING (10) — universal key budget exhausted ("Budget exceeded, max ~$1.00"): nest (failed QC — duplicate floating models; needs regen with "exactly one model" prompt), summit, selene, atlantis, perch, zenith, aurelia, aura, echelon, vale.
- RESUME: cd /app/backend && python3 gen3d_batch.py (skips existing gen3d/*.jpg) after user tops up at Profile → Manage plan → Universal Key → Add Balance. Then run crop/install + projects.js injection (same script pattern as this batch), QC each render.
- Verified iteration_33: all 9 toggles work, renders single-model/no-text/dark-bg, 10 non-3D projects show no toggle, viewers correct per mode, mobile clean, 0 console errors.

## Still Pending
- P0 (user action): Top up universal key → then resume remaining 10 renders (nest, summit, selene, atlantis, perch, zenith, aurelia, aura, echelon, vale)
- P0 (user action): Meta WhatsApp credentials for landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — 3D Rollout COMPLETE: All 19 Projects (DONE, tested iteration_34)
- After user topped up the universal key, rendered the remaining 10 (nest + vale regenerated with "exactly one model" prompt after first-pass QC failures). ALL 19 projects now have dark-studio 3D dollhouse renders + 2D/3D toggle.
- Consistency note for future renders: same prompt family (dark charcoal studio bg, ~45° three-quarter or near-top-down with wall height, no text), crop to ~80-90% occupancy, install as plan-3d.jpg/.webp/-800.webp, add plan3d entry to projects.js.
- Verified iteration_34: 19/19 toggles + assets load, all 10 new renders single-model/no-text/dark-bg, viewers correct, mobile clean, 0 console errors.
- Batch tooling (gen3d_batch.py) removed after use; masters deleted (installed copies are canonical).

## Still Pending
- P0 (user action): Meta WhatsApp credentials (Access Token + Phone Number ID) + template approval to activate landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — Visual Quality + Ordering + Stats + Teasers + Brochures (DONE, tested iteration_35)
- Hero slideshow: crossfade now 2.4s ease-in-out (slides + captions), same 8 projects/3s cadence/loop; verified no blank frames (opacities overlap to ~1.0).
- Ongoing projects display descending (ivy 19 → aurelia 14) in /projects?filter=ongoing AND Home BuildingNext.
- Stats band: 6 cells; new TOTAL FLATS SOLD + TOTAL SFT DELIVERED read from centralized BUSINESS_STATS in projects.js — currently null → renders "—" (user-authorized placeholders, no invented numbers). USER ACTION: provide real figures to replace placeholders.
- All 26 day/night elevations upscaled 2x (PIL Lanczos + unsharp; pixel-faithful, no AI regen) + elevationModes.width synced in projects.js → heroes/cards serve full res; 800w mobile variants unchanged.
- ProjectCard: "3D PLAN" chip (bottom-left) + hover crossfade to plan3d render (loads on first pointerenter).
- Brochures: /assets/projects/<slug>/brochure.pdf for all 19 (fpdf2; cover night elevation — or 3D render for ongoing — + 3D page + framed original 2D sheet). "Download Brochure" button in every project's plan section. Generator: /app/backend/make_brochures.py (rerun for future projects).

## Still Pending
- P0 (user action): Provide real totalFlatsSold + totalSftDelivered values to replace "—" placeholders
- P0 (user action): Meta WhatsApp credentials for landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — Mobile 3D Fix + Real Stats (145 sold) + Brochure Contact Page (DONE, tested iteration_36)
- FIXED mobile touch bug: removed hover-based 3D overlay from ProjectCard entirely (touch taps triggered sticky hover, hiding elevations). Card is a plain Link again; the "3D PLAN" chip is now a BUTTON — the only trigger — opening FloorPlanViewer with the 3D render directly from any card (mobile + desktop). Day/Night toggles untouched.
- BUSINESS_STATS.totalFlatsSold = 145 (all 13 completed sold out per user; computed from audited totalFlats). totalSftDelivered still null → "—" placeholder. USER ACTION: provide SFT figure.
- All 19 brochures regenerated with final GET IN TOUCH page: founder tel: links, wa.me WhatsApp link, Google Maps office link, mydreamprojects.in. Regenerate via /app/backend/make_brochures.py.

## Still Pending
- P0 (user action): Provide verified TOTAL SFT DELIVERED figure to replace "—"
- P0 (user action): Meta WhatsApp credentials for landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — Sold-Out Tags, Contact Placeholder, Room Details, SFT Delivered (DONE, tested iteration_37)
- Completed projects show "Sold Out & Occupied" (card chips + detail Status stat).
- Contact Message placeholder → "Imagine it. We'll help you build it." (field-input--refined style, App.css).
- projects.js: unitDetails for ALL 19 projects (per-unit label, saleableArea, rooms with exact plan dimensions) — extracted via guided multi-pass reading of the actual plans; nest/casa/solace verified by direct visual inspection; all completed totals cross-checked against printed saleable area statements.
- PlanSheet 3D mode: ROOM DETAILS panel (unit tabs for multi-flat floors, numbered rooms, saleable area). 2D mode intentionally clean.
- SFT: COMPLETED_PROJECT_SFT map + completedProjectsSftTotal = 190,905 → BUSINESS_STATS.totalSftDelivered (displays 1,90,905 via en-IN CountUp). Atlantis 15,255 computed from verified per-unit areas ×5 floors (no sheet total printed).
- Known source-data quirks (printed plans vs sold config): solace flat-1 shows 2 bedrooms under a 3BHK label; casa 2BHK shows 3 bedrooms — transcribed as printed, founders may want to review.

## Still Pending
- P0 (user action): Meta WhatsApp credentials for landowner auto-reply
- P2: Site Progress Updates — awaiting user photos

## 2026-08-09 — 3D Glass-Label Room Overlays (DONE, tested iteration_38)
- User request (M567): removed the detached ROOM DETAILS list below the 3D plan; room info now floats directly on the 3D renders as glass-label chips (name + dimensions), like a premium architectural presentation board. User choices: labels ALWAYS visible; labels ALSO in the full-screen viewer, scaling with zoom.
- Executed /app/backend/inject_labels.py (fixed an f-string syntax error first): injected curated per-unit `labels: [{name, dims, pos:[x%,y%]}]` into unitDetails of all 19 projects in projects.js (324 labels). Positions were hand-mapped against each 3D render in the previous session.
- Deleted the now-unused unitDetails[].rooms arrays (42 blocks) — labels supersede them.
- New component /app/frontend/src/components/PlanLabels.jsx: pointer-transparent glass chips (bg-black/55, backdrop-blur, hairline white/20 border, ivory name + champagne dims), centered at pos%.
- PlanSheet.jsx: labels overlay inside a relative wrapper around the 3D img; old room-details panel replaced by a slim plan-unit-bar (unit tabs for multi-flat floors + "Saleable Area" chip). Unit state now controlled via props.
- FloorPlanViewer.jsx: accepts units/unitIdx/onUnitChange; renders a labels layer sized to the measured image box (onLoad + resize) with the same translate/scale transform as the image → labels pan/zoom in perfect sync; viewer-unit-bar with tabs + saleable area added under the header.
- ProjectDetail.jsx: lifted planUnitIdx state shared between PlanSheet and FloorPlanViewer (unit selection stays in sync when opening the viewer). ProjectCard.jsx: 3D teaser viewer also gets units (uncontrolled internal state).
- Testing: iteration_38 — 10/10 scenarios PASS (nest/ivy/skylark sheets, tab swaps, viewer zoom sync, state sync, 2D regression, card teaser, mobile 390px, zero console errors).

## 2026-08-09 — 3D Label Overlays FULLY REMOVED (owner request, self-tested)
- Owner stopped the label-refinement task mid-way and ordered: 3D plans must be purely visual — no room names, dimensions, labels, annotations or boxes over any 3D image, site-wide.
- Removed: PlanLabels overlay from PlanSheet 3D mode, labels layer + unit tab bar from FloorPlanViewer, unit bar (tabs + saleable chip) from PlanSheet, lifted planUnitIdx state from ProjectDetail, units prop from ProjectCard teaser.
- Deleted: /app/frontend/src/components/PlanLabels.jsx, /app/backend/inject_labels.py, and all 42 `labels` arrays (324 positioned labels) from projects.js.
- Kept unchanged: 2D PLAN / 3D PLAN switch, full-screen viewer (zoom/pan/reset/Escape), 2D original-PDF link, disclaimer line under 3D render.
- unitDetails in projects.js now holds only {label, saleableArea} per unit (verified factual data, currently unused by UI).
- NOTE for future: a partially-completed refined coordinate set exists only in this session's scratch (/tmp/refined.json — nest/ivy/casa done; skylark units were found SCRAMBLED: u0/u1/u2 labels were each mapped one physical unit to the right; skylark middle unit is the 2BHK and has no G.BED). If labels ever return, remap from scratch against the 2D plans.
- Verified via browser automation: 0 overlays in sheet + viewer (desktop & mobile 390px), zoom works, 2D intact, no console errors, no horizontal overflow.

## 2026-08-09 — Edge-to-Edge 3D Viewer + Brochure Refresh (DONE, self-tested)
- FloorPlanViewer: new `edgeToEdge` prop — 3D renders now fill the viewer edge-to-edge (w-full h-full object-contain between header and toolbar) instead of the inset 92%/88% frame. Applied from ProjectDetail (3D mode only) and ProjectCard 3D teaser. 2D plans keep the classic framed fit with the Open Original PDF link. Zoom/pan/reset unchanged (verified 130% zoom, desktop + mobile).
- Brochures: regenerated all 19 PDFs via /app/backend/make_brochures.py. Verified pages render clean and label-free (3D page on completed projects, 3D-led cover on ongoing projects) and all download links return 200.

## 2026-08-09 — Cinematic Ken Burns 3D Intro (DONE, self-tested)
- FloorPlanViewer: when a 3D render opens (edgeToEdge mode — project detail 3D + card teaser), a slow 12s ease-out Ken Burns drift plays (100% → 112% with a gentle diagonal move, driven by requestAnimationFrame so zoom state stays truthful).
- Any interaction cancels it instantly and cleanly: pointer down, wheel, zoom buttons, reset. Skipped for prefers-reduced-motion users. 2D plans never drift.
- Verified via browser automation: drift progresses 103%→110% without input; manual zoom-in mid-intro takes over at 143% and holds; reset returns 100%; 2D viewer stays 100%.

## 2026-08-09 — Homepage Hero 3D Teaser Slide (DONE, self-tested)
- Added a single 3D floor-plan slide (My Dream Nest render) to the homepage hero slideshow, second in the rotation right after Skylark's night elevation.
- The 3D slide plays a subtle Ken Burns drift while active (scale 1→1.06 with a gentle diagonal translate, linear over ~5s) — more pronounced than the elevation slides' 1.02 drift to catch the eye; skipped for reduced-motion users.
- Slide caption "MY DREAM NEST · 3D PLAN" deep-links to /projects/my-dream-nest. Slide objects now carry explicit link/srcSet fields.
- Verified: slide activates at ~3s (opacity 1), transform samples confirm drift progression, caption/link correct, cycle continues normally. data-testids: hero-slide-my-dream-nest-3d, hero-caption-my-dream-nest-3d.

## 2026-08-09 — Hero 3D Slide REMOVED + Crossfade Smoothness (owner request, self-tested)
- Removed the homepage hero 3D slide (owner request) — hero is back to 8 night-elevation slides only, Skylark leading. Slide objects keep the explicit link/srcSet fields.
- Smoothed the hero crossfade: dwell 3s→4s per slide; fade 2.4s→1.6s with ASYMMETRIC easing (incoming ease-out / outgoing ease-in) eliminating the mid-fade dark dip; caption fades match; Ken Burns drift retimed to SLIDE_MS+FADE_MS.
- Verified: mid-fade frame shows no dark dip (incoming ≈ fully opaque by mid-fade), slides advance skylark→nest→casa cleanly, no console errors.

## 2026-08-09 — Owner's 5 Surgical Fixes (DONE, tested iteration_39, 100% pass)
1. Ongoing projects: year "—" → "2027" for all 6 ongoing (projects.js replace-all). Flows everywhere automatically: detail Year stat, "ongoing · 2027" meta, Our Map popups/sidebar.
2. Home page: removed my-dream-casa + my-dream-griffin from HERO_SLIDE_ORDER (now 6 slides) and SELECTED_SLUGS (now Nest, Hillock, Solace — clean 3-card row). Both projects remain on Projects page and elsewhere.
3. Projects page: completed (Sold Out & Occupied) cards now square aspect-[1/1], ongoing stay portrait aspect-[4/5] — completed visibly more compact, all card info intact (Projects.jsx conditional aspect prop).
4. About founders: removed md:aspect-auto from founder portrait — Sai & Akhil render in IDENTICAL 352x440 boxes on desktop/tablet, equal 4:5 on mobile; faces safe via object-position 50% 45%.
5. Footer logo: root-caused flexbox align-stretch squashing logo-full-dark.png (rendered 0.893 vs natural 1.413) — added self-start; now pixel-perfect 1.413.
- Testing: iteration_39 full responsive sweep (1920/834/390) — 100% pass, zero console errors, no overflow/overlaps. Mobile founder 7px delta was confirmed a mid-animation artifact (settled: both exactly 348x435).

## 2026-08-09 — Expected 2027 Label + Availability/Brochure Button Logic (DONE, all 19 pages verified)
- Ongoing project pages now read "Expected 2027": hero meta chip ("ONGOING · EXPECTED 2027") and Year stat ("EXPECTED 2027"). Completed pages unchanged (plain year).
- Check Availability (WhatsApp enquiry on the Total Flats stat) is now status-based: ONLY ongoing projects render it (enquire link + "Check Availability →" line); completed projects show Total Flats as a plain stat — stats grid column logic unaffected (count unchanged), no empty space.
- Download Brochure button removed from ALL project pages (the only place it existed). Brochure PDFs remain on disk but are no longer linked anywhere. View Full Plan + Download PDF buttons remain.
- Verified via automation loop over all 19 project pages: completed → 0 availability links / 0 brochure buttons; ongoing → 1 availability link / 0 brochure buttons; Download PDF intact everywhere; zero console errors.

## 2026-08-09 — Founder Photo Containers HARD-LOCKED (DONE, self-tested 3 breakpoints)
- Owner saw unequal founder photos on the LIVE site (stale deploy — preview already had the fix) and asked for bulletproof symmetry.
- About.jsx founders: the image CONTAINER now carries fixed identical dimensions (mobile: w-full aspect-[4/5]; md+: exactly 352x440px, shrink-0, self-start) and the img simply fills it (w-full h-full object-cover, object-position 50% 45%). No computed aspect inference — containers can never drift apart or stretch with card content.
- Measured: desktop 1920 both 352x440 same top; tablet 834 both 352x440; mobile 390 both 348x435. Faces natural on both.
- NOTE: live site (mydreamprojects.in) needs a REDEPLOY to pick up this and the previous founder fix.

## 2026-08-10 — Company Email + Premium EMI Calculator (DONE, tested iteration_40, 100% pass)
- COMPANY_EMAIL = adminmydreamprojects@gmail.com in data/contact.js; surfaced at Contact Details (contact-email-link), note under enquiry form (contact-form-email-link), Footer office column (footer-email-link). Founder phones untouched.
- New /emi-calculator page (src/pages/EmiCalculator.jsx): loan amount slider+input (₹5L–₹5Cr), interest rate 1–20% p.a., tenure with years/months toggle (auto-converts); instant reducing-balance EMI + total interest + total payable, en-IN ₹ formatting, principal/interest split bar, indicative-estimate disclaimer note. Custom .emi-slider styling in App.css (square ember thumb, hairline track).
- Navigation: "EMI Calculator" in desktop nav (between Projects and Our Map), mobile menu, footer sitemap. Route lazy-loaded in App.js.
- Project pages: "Calculate EMI" chip in hero meta row next to the ₹/Sq.Ft. chip — ongoing projects ONLY — deep-links to /emi-calculator?amount=<ratePerSft × first-unit saleable area, rounded to nearest lakh> which pre-fills the calculator. Completed projects show no CTA.
- Verified: exact EMI math (₹50L/8.5%/20y = ₹43,391), instant recalc, clamps, prefills for all 6 ongoing, CTA absent on all 13 completed, responsive 390/834, zero console errors.

## 2026-08-10 — Map Expected 2027 + EMI WhatsApp Share + Mobile Compaction (DONE, self-tested)
- Our Map: ongoing entries now read "ONGOING · EXPECTED 2027" in both the sidebar rows and the marker popup card (ProjectMap.jsx 2 spots). Completed keep plain years.
- EMI Calculator: "Share this EMI on WhatsApp" button (emi-whatsapp-share) in the results panel — opens wa.me share picker with a formatted estimate (amount, rate, tenure, EMI, interest, total + disclaimer + mydreamprojects.in/emi-calculator link).
- Mobile menu compacted: links text-4xl→text-3xl, py-3→py-2, gap-2→gap-1, CTA pt-8→pt-6 — full menu + CTA ends at 645px on a 390x844 phone.
- EMI page mobile compaction: page pt-24, header tightened (eyebrow mb-4, H1 8.5vw, description hidden on mobile), field spacing space-y-7, label rows mb-4, value inputs text-lg, results panel p-6 with Monthly EMI text-4xl, tighter bar/rows/note. Result: all 3 inputs + Monthly EMI figure visible within one 390x844 screen (result top at 813px). Desktop layout unchanged.
- Verified: share text content exact, menu fits, map strings present, desktop EMI unchanged, zero console errors.

## 2026-08-10 — Stats Mobile Overflow Fix + Avasa Line Fix + EMI Rate Presets (DONE, self-tested)
1. Stats band (Home.jsx): numbers now scale responsively (clamp(1.5rem,7.6vw,3rem) on mobile, md:text-6xl lg:text-7xl unchanged), whitespace-nowrap, cells px-5/min-w-0 — "1,90,905" fits inside its card at 390px AND 360px with zero page horizontal overflow; labels wrap cleanly. Verified numerically (number 106px in 195px cell).
2. Avasa white vertical line: root-caused to the ASSET itself — elevation-night.webp had an 8px near-white strip baked into its left edge (brightness ~240 vs ~44 overall). Cropped the strip from elevation-night.webp (2250→2242) and elevation-night-800.webp (800→797); updated elevationModes.width to 2242. Day/cover variants were clean (broad sky, no line). Card edge now clean.
3. EMI rate presets: "Quick rates" chips 8.5% / 9% / 9.5% under the interest slider (emi-rate-preset-*); one tap sets the rate, active chip highlighted ember. Verified: 9.5% → ₹46,607, 8.5% → ₹43,391.

## 2026-08-10 — EMI Min ₹1 Lakh + iPad Office Gallery Fix (DONE, self-tested 4 viewports)
- EMI Calculator: loan amount minimum ₹5,00,000 → ₹1,00,000 (LIMITS.amount.min + "₹1 L" hint). Verified ₹1,00,000 @ 8.5% / 20y = ₹868/month; slider min attribute 100000.
- Contact office gallery (Contact.jsx OfficeSection): side-by-side split moved from md: to lg: breakpoint — iPad portrait (768–1023px) now stacks both office photos full-width at natural aspect ratios (exterior 1.33, interior 1.78), eliminating the interior photo's squeezed-strip rendering with dead space below. iPad landscape/desktop keep the 62/38 pair; mobile unchanged. Measured ratios preserved at 390/768/1024/1920; zero horizontal overflow.

## 2026-08-10 — AI Property Concierge + Map Deep-Link + Finance Options + Tenure Presets (DONE, tested iteration_41, 100% pass)
- Tenure quick chips (10/15/20/30 yrs) on EMI calculator; tapping switches to years mode and recalcs (₹50L/8.5%/15y = ₹49,237 verified).
- Contact "MY DREAM PROJECTS" heading → Link to /project-map?focus=office; ProjectMap load handler deep-links: auto focusOffice() (flyTo zoom 16 + office card opens). Phones/email untouched.
- "Loan & Finance Options" section at bottom of /emi-calculator: official logos (ICICI SVG + SBI SVG from Wikimedia Commons; LIC PNG from licindia.in official site) in /assets/partners/, equal-height bone chips, non-endorsement disclaimer. Neutral title chosen per owner's own fallback rule (partnership unconfirmed).
- NEW /concierge page (src/pages/Concierge.jsx): 5-question guided consultation (intent/budget+custom/location/status/loan+custom) → deterministic scoring over real project data → top-3 recommendation cards (image, BHK, SFT, location, status, VIEW PROJECT). Joint Development → conversation panel (no cards). Villa → honest boutique-apartments note + most spacious picks. Quick actions: Our Map, Calculate EMI (loan-prefilled), Talk to Us, WhatsApp (summary message), Start over. Entry points: nav "Concierge", footer sitemap, Home teaser section (home-concierge, before final CTA), mobile-only floating button (hidden on /concierge).
- Concierge card images: completed → night elevation; ongoing → 3D render fallback (cover is null for ongoing).
- Verified: all flows, custom amounts (Indian grouping), EMI prefill exact, map deep-link from both direct URL and Contact link, responsive 390/834 (no overflow), zero console errors.

## 2026-08-10 — Selected Work Swap + Concierge Removal + Partners Rename (DONE, self-tested)
- Home Selected Work: Hillock + Solace replaced by Skylark + Perch (SELECTED_SLUGS = nest, skylark, perch). Layout/stagger unchanged, verified visually.
- AI Property Concierge FULLY removed per owner request: deleted src/pages/Concierge.jsx, /concierge route, FloatingConcierge (App.js), nav + mobile menu + footer sitemap links, Home ConciergeTeaser section, Sparkles import. /concierge now 404s. Zero remaining references (grep-verified).
- Finance section renamed to "Mortgage & Loan Partners" (owner confirmed genuine association); copy updated to "associated banking and finance partners"; non-endorsement disclaimer removed.
- Verified: Selected Work trio + links, concierge fully gone (0 refs), partners section renders with new title, compile clean.

## 2026-08-10 — Loan Partners on Every Project + Dark-Native Logos (DONE, 19/19 verified)
- New shared component src/components/LoanPartners.jsx: official brand MARKS with transparent backgrounds (ICICI orange "i", SBI blue keyhole, LIC blue hands emblem — cropped from the official SVG/PNG assets) paired with bone institution names. NO white boxes — fully dark-native per owner requirement.
- ProjectDetail: new compact "LOAN & FINANCE OPTIONS" strip (project-finance) between the stats grid and concept section — eyebrow + neutral assistance note + LoanPartners + Calculate EMI link. On ALL 19 pages (completed + ongoing). Wording neutral (no approval/tie-up claims).
- Calculate EMI hero chip now shows on EVERY project (completed link to plain /emi-calculator; ongoing keep price-prefill ?amount=). Min loan ₹1L unchanged.
- EMI page "Mortgage & Loan Partners" section restyled from bone chips to the same dark-native LoanPartners strip (white boxes removed site-wide).
- Assets: /assets/partners/{icici,sbi,lic}-mark.png (+ original full logos kept).
- Verified: 19/19 pages have strip + 3 marks + CTA; marks load; mobile 390px no overflow; desktop strip layout clean.

## 2026-08-10 — IDBI Bank + Brands & Specifications Board (DONE, self-tested all breakpoints)
- IDBI Bank added as 4th partner: official IDBI_Logo.svg (en.wikipedia), orange circle mark extracted → partners/idbi-mark.png; appears in LoanPartners (all 19 project strips + EMI page section).
- NEW BrandSpecs component (src/components/BrandSpecs.jsx): premium dark spec board on every project page (before Visit Project Site). Rows: Paints→Asian Paints; Sanitary & Plumbing→Hindware·CERA·Ashirvad; uPVC Windows→VEKA; Lighting→Syska·Crompton; Cement→KCP·UltraTech; Wiring→Polycab; Switches→Legrand; Tiles→"Vitrified Tiles" (typography only, no logo per owner); Automatic Lifts→project-specific.
- Lifts: per-project `liftBrand` field in projects.js — KONE: my-dream-summit, my-dream-skylark; Vasavi Elevators: other 17. Row renders only when set (owner-assigned mapping).
- Logo sourcing (all official, no AI/recreations): Wikimedia Commons/Wikipedia (Asian Paints, VEKA, Legrand, KONE 2023, Crompton RGB, UltraTech, Syska-RED, Polycab, IDBI); official sites (CERA cera-india.com, Ashirvad ashirvad.com, Hindware white variant from hindware.com, KCP kcp.co.in, Vasavi vasavielevators.com). Dark-bg treatment: transparent marks, white flood-removal only where official asset had white bg (Vasavi/KCP); Hindware uses their own white variant; Legrand cropped to red wordmark (dark L-mark invisible on black).
- Verified: 0 broken images, tiles row typography, lifts hidden when null + KONE on skylark + Vasavi on ivy, 4 partners everywhere, mobile 390 no overflow.

## 2026-08-10 — KONE Logo Correction + VEKA/Polycab Rebalance (DONE, self-tested)
- KONE: replaced the 2023-variant tile logo with the CURRENT official artwork extracted from kone.com's own inline SVG (flush bright-blue tile bar, white letters) → brands/kone.png.
- BrandSpecs now supports per-brand height overrides (b.h class): VEKA h-10/md:h-12 (was h-6/7 — tall diamond looked small), Polycab h-9/md:h-11 (wide wordmark+tagline), KONE h-7/md:h-8. Others unchanged. Verified: Polycab renders 44px vs 28px default; 0 broken images; board visually balanced, dark-native.

## 2026-08-10 — Official KCP / KONE / Vasavi Logo Replacement + Centered Mobile Specs (DONE, iteration_43 100% pass)
- KCP: sourced the AUTHENTIC "The KCP Limited" mosaic logo (golden grid + navy "kcp" letters) — verified against kcp.co.in and KCP cement bags; extracted high-res (589x592) from KCP's official Annual Report PDF cover, cover-blue background keyed out → transparent PNG. Old low-res 91x91 file replaced.
- KONE: official KONE logo (4 blue squares #1450F5, white letters) from official KONE branding SVG (Wikimedia, sourced from kone.com) rendered at 1600px → transparent PNG. Previous recreated version removed.
- Vasavi: full official Vasavi Elevators Pvt. Ltd. logo (cube icon + wordmark + tagline) downloaded from vasavielevators.in, white background flood-keyed to transparent (930x259). Previous icon-only/generic mark removed.
- BrandSpecs presentation per owner: category label centered ABOVE logos on mobile with logos centered underneath (desktop keeps label-left / logos-right); KCP bumped to h-11/md:h-14, lifts to h-10/md:h-12 — visually comparable to other brands, aspect ratios preserved (verified <0.0005 rendered-vs-natural diff), no white wrapper boxes.
- Same filenames (kcp.png/kone.png/vasavi.png) so the fix applies to all 19 project pages automatically; project lift assignments unchanged (KONE: Skylark/Summit; Vasavi: rest).

## 2026-08-10 — EMI Calculator Result Panel Redesign (DONE, iteration_44 100% pass, 16/16)
- Result area rebuilt as a separated premium light-grey financial panel (bg #E7E5DE, ink text, deep soft shadow) floating on the dark page — page itself stays dark.
- Hierarchy: MONTHLY EMI = largest number (ink, ember accent rule); principal/interest split bar (ink + ember); Principal Amount + Total Interest side-by-side; Total Amount Payable full-width emphasized; subtle ink/15 dividers; orange used only for accents.
- WhatsApp share button restyled for light panel (ember outline); note + all testids unchanged.
- Layout breakpoints: two-column inputs/results now from md (iPad portrait side-by-side, was lg); mobile stays compact single column.
- Inputs untouched: Loan Amount (min ₹1,00,000), Interest Rate, Tenure + presets + orange sliders; EMI formula unchanged (verified ₹50L/8.5%/20y → ₹43,391; live recalc + clamp verified).
- Deleted unused ResultRow component.

## 2026-08-10 — EMI Calculator Revert + Subtle Input Highlights (DONE, self-tested desktop/mobile)
- REVERTED the light-grey result panel per owner request: result card is back to the previous dark version (bg-coal, border-line, ember Monthly EMI, bone/ember split bar, ResultRow rows restored, lg: two-column breakpoints restored).
- ONLY change kept: Loan Amount and Loan Tenure input areas now sit on subtle slightly-lighter grey panels (bg-bone/[0.045] + hairline border-bone/[0.08], p-5/md:p-8) — data-testids emi-amount-panel / emi-tenure-panel. Interest Rate section deliberately left plain.
- Calculation logic, min ₹1,00,000, sliders, presets, typography, orange accents — all unchanged.

## 2026-08-10 — EMI Interest Rate Panel Highlight (DONE, self-tested desktop/mobile)
- Interest Rate (P.A.) section (slider + quick-rate buttons) wrapped in the same subtle grey highlight panel as Loan Amount and Loan Tenure (bg-bone/[0.045], border-bone/[0.08], p-5/md:p-8) — data-testid emi-rate-panel.
- All three input sections now visually consistent; 8.5% default, orange slider, 1%–20% range, quick rates, calculation and result section untouched.

## 2026-08-10 — EMI Inputs Merged Into One Continuous Grey Block (DONE, self-tested desktop/mobile)
- Three separate highlight panels merged into ONE outer container (data-testid="emi-inputs-panel"; same bg-bone/[0.045] + border-bone/[0.08] + p-5/md:p-8 treatment) holding Loan Amount, Interest Rate and Loan Tenure.
- Inner sections keep their testids (emi-amount-panel / emi-rate-panel / emi-tenure-panel), now separated only by subtle horizontal hairline dividers (border-t border-bone/[0.08], mt-7/pt-7, md:mt-10/md:pt-10) — no individual boxes.
- All sliders, presets, toggles, limits and calculations unchanged; result panel unchanged; no horizontal overflow at 390px.

## 2026-08-10 — Branded Logo in Ongoing-Project Elevation Placeholders (DONE, iteration_45 100% pass)
- ComingSoonElevation blueprint placeholders now carry the official MDP logo centrally: full stacked light logo (logo-full-dark.png, h-14 lg:h-24) on desktop detail pages, small icon mark (logo-icon.png h-7) on mobile detail, icon (h-9/md:h-10) centered on compact project cards.
- Position tuned per breakpoint (top-[40%] mobile / top-[36%] md / centered lg+) so the logo never overlaps the title or ELEVATION / COMING SOON / ONGOING messaging; blueprint linework, 3D PLAN button and all text unchanged.
- Renders ONLY where no real elevation exists (all 6 ongoing: aurelia, elysium, aura, echelon, vale, ivy); completed projects with real photography untouched. No distortion — w-auto object-contain, pointer-events-none, aria-hidden.

## 2026-08-13 — Production DB Write-Path Audit (DONE — no fix needed, verified live)
- Audited backend/server.py: MongoDB is fully env-driven (os.environ['MONGO_URL'] + os.environ['DB_NAME'], no hardcoding, no defaults). Preview .env: mongodb://localhost:27017 / test_database. Production gets managed values injected at deploy time.
- Root cause of "Production Databases: 0": MongoDB creates databases/collections LAZILY on first write — no enquiry had ever been submitted on the live site, so the production DB simply did not exist yet. Not a misconfiguration.
- Live production proof: POST https://mydreamprojects.in/api/status wrote a marked doc (PRODUCTION-DB-WRITE-PATH-TEST-2026-08-10) and GET read it back. POST /api/enquiries/landowner returned id 6a7d596f457c750488819794 with whatsapp:"not_configured" (Meta creds absent in production — no WhatsApp sent; test used founder's own number, clearly marked "DB Write-Path Test (Emergent)", safe to delete).
- DB-backed flows: landowner_enquiries + status_checks only. Project data is static (projects.js); admin creds are env-only with no DB routes — nothing else needed production DB wiring.

## 2026-08-13 — Admin Enquiry Cleanup Endpoint + Live Production Form Verified (DONE)
- Added admin-guarded endpoints to backend/server.py (header X-Admin-Key must equal ADMIN_PASSWORD env): GET /api/admin/enquiries (list, ObjectId-safe), DELETE /api/admin/enquiries/{id} (404-safe), DELETE /api/admin/status-checks/{id}. Tested in preview: 401 without/with wrong key, list+delete+404 verified; preview test enquiry removed.
- LIVE production form test: submitted the real landowner enquiry dialog on https://mydreamprojects.in (name "Live Form Verification (Emergent)", founder phone) — success state confirmed, record saved to production landowner_enquiries. No WhatsApp auto-send (Meta creds not configured in production).
- PENDING: deleting the old "DB Write-Path Test (Emergent)" record from PRODUCTION requires the admin endpoint to exist there — needs a redeploy (or one-click delete in the MongoDB Viewer). After redeploy: DELETE with X-Admin-Key header cleans both test records.

## 2026-08-20 — GSC 403 on /emi-calculator: Root Cause Found + Code Fixes (edge fix pending platform)
- ROOT CAUSE: Emergent-managed Cloudflare edge in production returns 403 to crawler user-agents (Googlebot AND Bingbot) on EXACT path "/emi-calculator" only. Trailing-slash variant and all other routes return 200 for bots; normal visitors get 200 everywhere; preview returns 200 for Googlebot on the same path. App code has no UA/path logic — block happens at the edge before the app. robots.txt is clean (Cloudflare managed content-signals block only AI-training bots; Googlebot explicitly allowed).
- CODE FIXES APPLIED (preview; need redeploy): added /emi-calculator to sitemap.xml; new route-aware CanonicalUrl component in App.js (link rel=canonical = origin+pathname, trailing-slash normalized); meta robots "index, follow" in index.html. Verified in preview: canonical renders, robots meta served, page 200.
- PLATFORM ACTION NEEDED: Emergent support (support@emergent.sh) must whitelist/adjust the WAF bot rule for path /emi-calculator on the production deployment. Evidence matrix ready to send.
- Also completed: production test-record cleanup via new admin API — landowner_enquiries already empty (user removed via viewer), status_checks test doc deleted; production DB verified clean ([]).
- User instructed: do NOT click "Validate Fix" in GSC until platform clears the 403.

## 2026-08-24 — Registered Trademark Rollout: My Dream Projects® (DONE, iteration_46 100% pass, 9/9)
- Site-wide audit + update: every visible/legal/SEO brand reference now shows "My Dream Projects®" (® not ™). ~60 occurrences across 15 files.
- Display spots use subtle superscript via new src/components/BrandMark.jsx (Reg: sup, 0.5em, align-super, aria-hidden): navbar wordmark, hero eyebrow, plan-sheet header/footer, contact office caption, Home "My Dream Projects." span, Marquee item.
- Plain ® char in: body copy, alt/aria, page titles, meta descriptions, OG/Twitter tags, JSON-LD org name (index.html), WhatsApp/EMI share message strings, data files (contact.js OFFICE.name + greetings, projects.js descriptions).
- Intentionally UNCHANGED (technical): URLs/routes, slugs, filenames, testids, adminmydreamprojects@gmail.com, Google Maps URL, logo artwork assets (no duplicate ® on logo images).
- Verified: no unmarked occurrences, no ®®, no ™, project names (My Dream Nest etc.) correctly carry NO ®, zero console errors, no layout shifts desktop+mobile.

## 2026-08-27 — Keyless Dark Maps: API-KEY Watermark Eliminated (DONE, iteration_47 100% pass, 7/7)
- ROOT CAUSE: CARTO Dark Matter raster endpoint (basemaps.cartocdn.com) started serving "API KEY REQUIRED" watermark tiles; project site sections also used Google keyless embed iframes (risk of Google overlays).
- FIX: all maps now use MapLibre GL + OpenFreeMap dark vector style (tiles.openfreemap.org/styles/dark, OpenStreetMap data) — fully keyless, no API key/token anywhere.
- maplibre-gl pinned DOWN to ^4.7.1: v6.2.0 empirically failed to request vector tiles here (0 pbf requests, black canvas, no errors); v4 renders perfectly. Do NOT upgrade without re-testing.
- New components/SiteMap.jsx renders per-project site maps (dark basemap, ember marker, zoom controls, drag-pan; compact attribution force-collapsed on <640px containers). ProjectMap.jsx now imports shared MAP_STYLE/MAP_ATTRIBUTION from components/mapStyle.js.
- Removed all 19 Google `embed` fields from projects.js (dead data). No user-facing API-key text remains anywhere.
- Verified desktop+mobile: streets/labels readable, 19 pins + office pin on /project-map, filters + popups work, zero console errors, no "API KEY REQUIRED" in DOM, no horizontal overflow.

## 2026-08-27 — Maps Rebuilt on Leaflet + OpenStreetMap (DONE, iteration_48 11/12 + fixes verified)
- PRODUCTION ROOT CAUSE (why markers showed on black): production build raced inside MapLibre's vector pipeline — tiles fetched (pbf 200s) but every tile render threw "Cannot read properties of undefined (reading 'openmaptiles')"; preview worked (dev StrictMode double-mount masked the race). Combined with v6's silent vector failure, MapLibre was abandoned.
- FINAL STACK: Leaflet 1.9.4 + keyless OSM raster tiles (tile.openstreetmap.org), dark-tuned via pointwise CSS filter (.mdp-dark-tile in index.css: invert/hue/brightness — no seams, markers unaffected). maplibre-gl package removed entirely.
- Full behavior port to Leaflet: 19 numbered pins + ember office pin (divIcons), filters, pin info cards + office card, View All reset, fly-to with mobile offset emulation, collision relaxation (screen-space el transforms, geo untouched), deep links (?focus=office, ?project=slug), mobile chips, per-project SiteMap with ember teardrop pin, dark zoom controls, compact OSM attribution.
- Fixed post-test: deep-link init moved from map.on('load') → map.whenReady() (verified: focus=office centers 17.5347,78.3262 @z16, card renders).
- Verified preview desktop+mobile: real streets/localities/Ameenpur Lake render, zero console errors, no API-key text anywhere, pin clicks + cards work.
- PENDING: production verification after user redeploys (production currently runs the broken maplibre build).

## 2026-09-14 — Site-Wide WhatsApp Float + Map Card WhatsApp Button (DONE, iteration_49 100% pass)
- New components/WhatsAppFloat.jsx mounted in App.js (after Footer): fixed bottom-right ember button (w-12/14, z-40) on EVERY page; context-aware wa.me message (project pages include project title, others generic; target +91 77804 29845). Session-once "Chat with us on WhatsApp" prompt (2.8s in, auto-minimises at 6s, X dismiss, sessionStorage mdp-wa-prompt-seen). Verified: no horizontal overflow, no overlap with map chips/footer, dialogs (z-50) cover it, focus ring + aria-labels.
- /project-map InfoCard gained "WhatsApp" action (data-testid map-info-whatsapp) beside View Project/Get Directions with project-specific message.
- Also confirmed: production mydreamprojects.in/project-map now renders the Leaflet+OSM map correctly (28 tiles, pins, info cards) — the Leaflet rebuild is live.

## 2026-09-14 — Map Marker Tap Root Cause Fixed: Clustered Pins Swallowing Taps (DONE)
- ROOT CAUSE (user-reported "popup not opening" on production): on mobile viewports the pin collision-relaxation minimum gap (32px) was SMALLER than the pill width (~36px) and far below finger size (~44px), so clustered markers (01-04 around office, 15-17, etc.) physically overlapped — taps hit a neighbouring pin (e.g. tap 03 AVASA → opened NEST card; tap 15 AURA → GLENMORE card), looking like a broken/wrong popup. Desktop clicks were fine.
- FIX (no library change, no design change): responsive collision separation in resolveCollisions (52px below 768px, 32px desktop) + invisible tap halo (.mdp-pin button::before inset:-8px, scoped to mobile only via media query) so every pin has a ~52px touch target without visual change. Desktop untouched.
- ACCEPTANCE VERIFIED on preview with genuine CDP touch taps at 390px: 01 NEST, 02 CASA, 03 AVASA, 06 SOLACE, 08 GRIFFIN, 12 GLENMORE — each opens the CORRECT project card; touch-close works. Desktop real-click pass on same six: all correct. Zero console errors.
- NOTE: earlier desktop "failure" in one run was test-harness timing (clicking while map flyTo was animating), not an app bug.
- PENDING: user redeploy to ship to production.

## 2026-09-14 — Map Project Details: Bulletproof Mobile Bottom Sheet (DONE, acceptance 6/6 touch + desktop)
- ROOT CAUSES found by tracing marker→state→render on production + iPhone-class emulation:
  1. Pin cluster overlap: collision gap (32px) < pill width (~36px) < finger (~44px) → taps hit NEIGHBOURING pins (tap AVASA opened NEST; tap AURA opened GLENMORE) — looked like "details don't open".
  2. Details card rendered INSIDE the Leaflet container (overflow-hidden + pane z-indexes 400-700 vs card z-20) — fragile compositing on iOS Safari.
- FIX (map library, tiles, design, markers all preserved):
  - attachReliableTap(): native click + Leaflet marker tap + guarded iOS touchend (12px move guard so drags still pan). Re-entry guards via selectedRef prevent double-fire.
  - Mobile collision separation 52px + invisible 8px tap halo (mobile-only CSS pseudo).
  - Details UI split by viewport (isDesktop matchMedia): desktop = existing in-map card; mobile = NEW fixed bottom sheet (map-project-sheet / map-office-sheet, z-70, ember top border, drag handle, safe-area padding) rendered OUTSIDE the map — cannot be clipped/covered. Same `selected` state drives markers, chips, list, sheet.
  - Fly-to lift raised to 0.22h so the pin stays visible above the sheet.
- VERIFIED (genuine CDP touch taps @390px): 01 NEST/02 CASA/03 AVASA/06 SOLACE/08 GRIFFIN/12 GLENMORE — each opens correct sheet; close via touch X; switch without closing (CASA→AVASA); chip tap → same sheet; VIEW PROJECT → /projects/<slug>; WhatsApp href contains project name; office pin → office sheet. Desktop: in-map card + View All intact. Zero console errors.
- PENDING: redeploy to production.

## 2026-09-14 — Bottom Sheet Portal Fix (float overlap eliminated) (DONE)
- ROOT CAUSE of "floating WhatsApp button covers the sheet's WhatsApp action": the sheet (z-70) was trapped inside a framer-motion transform ancestor's stacking context, so the root-level float (z-40) painted ABOVE it. Measured: float rect overlapped the sheet's WhatsApp link rect.
- FIX: sheet now rendered via createPortal to document.body at z-[80] — escapes every ancestor stacking context; the opaque sheet fully covers the float while open. Verified by hit-test: elementFromPoint on the sheet's WhatsApp link returns the link itself.
- ACCEPTANCE re-run @390px touch: 01 NEST/02 CASA/03 AVASA/06/08/12 — sheet opens per marker, title visible (23px), image visible, VIEW PROJECT/WHATSAPP/GET DIRECTIONS all visible & hittable, touch-close works, no horizontal overflow, map stays usable above the sheet. Desktop in-map card unaffected.
- PENDING: redeploy.

## 2026-09-14 — Final Map Interaction Verification (NO CHANGES NEEDED, all user requirements already satisfied)
- Full acceptance matrix @390px touch on preview: 01 NEST, 02 CASA, 03 AVASA, plus Solace/Glenmore/Griffin — tapped pin highlights ember, sheet eyebrow ("PROJECT 12" for Solace etc.) + title + image + status all correspond to the tapped marker (note: test initially mis-mapped slugs to numbers — actual data: 05=Glenmore, 06=Hillock, 12=Solace; app is internally consistent).
- close → tap another → new details: PASS (Casa→Nest). Chip tap shares same state/panel: PASS. Close leaves clean map: PASS.
- Float-vs-sheet overlap: eliminated via portal (previous entry).
- No code changes this round — user's list already satisfied by the sheet+portal build. PENDING: redeploy.

## 2026-10-06 — Projects Listing Cinematic Redesign (PREVIEW ONLY — awaiting owner review, NOT deployed)
- /projects rebuilt as a "Cinematic Asymmetrical Grid" (design blueprint in /app/design_guidelines.json): 12-col rhythm [hero 12 → wide 7 + tall 5 (dropped) → tall 5 + wide 7 (dropped)] looping; final item closes full-bleed. Desktop-only spans (literal Tailwind classes), mobile single column.
- New components/CinematicProjectCard.jsx (old ProjectCard.jsx UNTOUCHED — still used by homepage): ghost index number behind media, slow 1.5s hover zoom, hover scrim, blur-rise scroll reveals, title→ember hover. Preserved ALL existing card functionality: day/night toggle (lazy day load), 3D Plan chip + FloorPlanViewer, status badges (green sold-out / ember ongoing pulse), price line.
- VIDEO-READY: cards support `project.video` — a dormant <video> layer (hover-play on desktop, IntersectionObserver-play on mobile, poster-first). No video assets exist in the workspace yet (checked: assets DB has only images/PDFs) — owner to provide the ZIP videos later; no dummy data added.
- Header: existing eyebrow + giant PROJECTS title + right-aligned stat line; filters now rounded-full pills with count badges, horizontally scrollable on mobile (existing filter behavior/URLs unchanged).
- Verified: grid geometry exact (200px margins, 7/5 splits), no overflow desktop+mobile, filters 13/6 counts, card→detail navigation, homepage untouched. NOT deployed per owner instruction.

## 2026-10-07 — 19 Project Videos Connected to Cinematic Index (PREVIEW ONLY — awaiting owner approval, NOT deployed)
- Extracted Emergent Film.zip (129MB, 22 MP4s): 19 project videos mapped strictly by folder number → slug; OFFICE EXTERIOR / OFFICE INTERIOR / OUR MAP / logo excluded.
- Videos are 720p24 H.264, 3.5-8MB, no audio — already the mobile-friendly target; used ORIGINAL streams unaltered (stream-copy + faststart moov for instant start). No fake 1080p upscale (would add size, zero quality).
- Saved to /app/frontend/public/assets/videos/<slug>.mp4; projects.js gained `video:` on all 19 (verified index↔slug↔file 19/19 OK).
- CinematicProjectCard video layer: lazy-arm (IntersectionObserver 400px rootMargin — zero video requests on page open), autoplay muted/loop/playsInline when ≥55% visible, pause on scroll-away; elevation image remains as poster until first frame (and if video unavailable).
- Single playback: centralized ratio-based manager (module registry + rAF-throttled settle picks the MOST-VISIBLE card ≥0.55 ratio; all others pause; late play() resolutions re-verify). Fixes the deterministic pair-row case (two cards visible → highest-visibility wins).
- DEBUG NOTE: Playwright's bundled Chromium lacks H.264 codecs (false "no supported streams") — video tests must run with executable_path=/usr/bin/google-chrome. Test scripts in /tmp (verify_videos2.py, verify_playback.py) — ephemeral.
- Verified (real Chrome): 19/19 mapped+decodable desktop+mobile; lazy (0-2 reqs at open, rest on scroll); ≤1 playing; pause on scroll-away; no overflow; card→detail navigation intact; day/night + 3D chips + filters unchanged. Screenshots show real footage mid-play.

## 2026-10-07 — Remove elevation-image flash before project videos
- User reported: on /projects cards, the static elevation image flashed ~0.5-1s before the video started.
- Fix (CinematicProjectCard.jsx only): video cards no longer render elevation/cover/ComingSoon images; the <video> now carries a poster frame extracted from the SAME video, visible instantly until playback begins (muted, inline, loop, single-playback manager unchanged).
- Generated 19 poster JPGs (representative frames sampled at 15/30/45% of duration, richest frame picked) into frontend/public/assets/videos/posters/ via ffmpeg; no video files or project data modified.
- Day/night toggle on listing cards is hidden for video projects (video covered those images anyway); elevation images remain on detail pages/galleries.
- Verified: 0 elevation imgs in video cards (desktop+mobile DOM assertions), posters render immediately, assets serve 200. NOTE: headless test Chromium cannot decode H.264 (DEMUXER_ERROR) — live playback re-verified by user in real browser. NOT published (user request).

## 2026-10-07 — Slimmer mobile filter buttons on /projects
- User request: ALL/COMPLETED/ONGOING pills felt ~15-20% too heavy on mobile.
- Change (Projects.jsx only): mobile padding px-5 py-2.5 -> px-4 py-2; desktop unchanged via md:px-5 md:py-2.5. Fonts, colours, orange active state, counts, single-row scroll all preserved.
- Verified at 375px: height 39.5->35.5px, padX 20->16px, padY 10->8px, all three on one row, active bg rgb(232,93,34); desktop measurements unchanged. Not published.
