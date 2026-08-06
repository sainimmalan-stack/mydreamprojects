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

## Backlog
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
