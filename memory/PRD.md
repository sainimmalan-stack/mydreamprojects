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
