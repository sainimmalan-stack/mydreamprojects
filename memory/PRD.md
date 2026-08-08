# My Dream Projects — PRD

## Original Problem Statement
Premium, production-quality responsive website for residential construction company **MY DREAM PROJECTS** (tagline: YOU DREAM. WE BUILD., founded 2020, Ameenpur, Hyderabad, founders Nimmala Sai & Kotapati Akhil, 19 projects: 13 completed / 6 ongoing). High-end architectural portfolio feel — NOT a generic Indian real-estate template. Palette: deep charcoal/near-black, warm off-white, concrete grey, warm beige, restrained orange accent. No stock apartment/construction imagery, no fake AI buildings, no excessive gradients/gold. Pages: Home, Projects, About, Contact + reusable project-detail template. Desktop nav: Logo | Home | Projects | About | Contact | LET'S TALK →. Full-screen mobile menu, iPhone-optimized. Focus: design system, navigation, page structure, reusable components. No invented project info, bios, testimonials, awards, or building images — real content/assets come in later steps.

## User Choices (confirmed)
- Single editable data file feeding Projects + detail pages
- Minimal abstract placeholders (concrete/architectural-shadow textures, duotone-treated) until real photos arrive
- Contact form is design-only for now
- Awwwards-level ambition: kinetic hero masked line reveal, editorial marquee, numbered manifesto chapters, framer-motion scroll reveals, lenis smooth scroll, hero parallax

## Architecture
- Frontend-only React SPA (no backend dependency yet)
- `src/data/projects.js` — single source of truth: 19 projects (13 completed, 6 ongoing), `getProject`, `getAdjacent`, `projectStats`
- `src/components/layout/Navbar.jsx` — sticky glass nav + full-screen animated mobile menu
- `src/components/layout/Footer.jsx` — sitemap, studio info, big tagline
- `src/components/Marquee.jsx` — slow editorial outline-text marquee (react-fast-marquee)
- `src/components/ProjectCard.jsx` — reusable card with duotone texture, index, status pill
- `src/pages/` — Home, Projects (filterable), About, Contact (design-only form), ProjectDetail (template with stats grid, placeholder gallery, prev/next)
- Motion: framer-motion (masked reveals, whileInView, hero parallax via useScroll/useTransform), lenis root smooth scroll
- Design tokens in tailwind.config.js: ink #0A0A0A, coal #121212, bone #F4F4F0, concrete #7A7A7A, beige #D9D4C7, ember #E85D22; fonts Outfit (display) + Manrope (body); film grain overlay + structural grid lines

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
