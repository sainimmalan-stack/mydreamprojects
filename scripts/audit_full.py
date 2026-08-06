import asyncio, urllib.request
from playwright.async_api import async_playwright

BASE = "https://premium-residential-2.preview.emergentagent.com"
COMPLETED = [
    ("01", "my-dream-nest", "MY DREAM NEST", "2020"),
    ("02", "my-dream-casa", "MY DREAM CASA", "2021"),
    ("03", "my-dream-avasa", "MY DREAM AVASA", "2022"),
    ("04", "my-dream-skylark", "MY DREAM SKYLARK", "2023"),
    ("05", "my-dream-glenmore", "MY DREAM GLENMORE", "2023"),
    ("06", "my-dream-hillock", "MY DREAM HILLOCK", "2024"),
    ("07", "my-dream-summit", "MY DREAM SUMMIT", "2024"),
    ("08", "my-dream-griffin", "MY DREAM GRIFFIN", "2024"),
    ("09", "my-dream-selene", "MY DREAM SELENE", "2025"),
    ("10", "my-dream-atlantis", "MY DREAM ATLANTIS", "2025"),
    ("11", "my-dream-perch", "MY DREAM PERCH", "2026"),
    ("12", "my-dream-solace", "MY DREAM SOLACE", "2026"),
    ("13", "my-dream-zenith", "MY DREAM ZENITH", "2026"),
]
ONGOING = [
    ("14", "my-dream-aurelia", "MY DREAM AURELIA", "G+5"),
    ("15", "my-dream-elysium", "MY DREAM ELYSIUM", "G+5"),
    ("16", "my-dream-aura", "MY DREAM AURA", "G+5"),
    ("17", "my-dream-echelon", "MY DREAM ECHELON", "G+5"),
    ("18", "my-dream-vale", "MY DREAM VALE", "G+5"),
    ("19", "my-dream-ivy", "MY DREAM IVY", "G+4"),
]
ALL_SLUGS = [s for _, s, _, _ in COMPLETED] + [s for _, s, _, _ in ONGOING]
fails = []
passes = []

def ok(msg): passes.append(msg); print("PASS", msg)
def bad(msg): fails.append(msg); print("FAIL", msg)

def http_status(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        r = urllib.request.urlopen(req, timeout=25)
        return r.status, r.headers.get("Content-Type", "")
    except Exception as e:
        return 0, str(e)

async def settle(page):
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    await page.wait_for_timeout(2500)
    await page.evaluate("window.scrollTo(0, 0)")
    await page.wait_for_timeout(800)

async def check_completed(page, idx, slug, title, year, mobile=False):
    tag = f"{slug}" + (" [mob]" if mobile else "")
    try:
        r = await page.goto(f"{BASE}/projects/{slug}", wait_until="domcontentloaded")
        assert r.status == 200, f"HTTP {r.status}"
        await page.wait_for_timeout(3500)
        await settle(page)
        h1 = (await page.locator("h1").first.inner_text()).replace("\n", " ").strip()
        assert h1.upper() == title, f"h1={h1!r}"
        body = await page.evaluate("document.body.innerText")
        up = body.upper()
        for want in ["AMEENPUR, HYDERABAD", "G+5", "RESIDENTIAL APARTMENT", "ABOUT THE PROJECT", "ELEVATION", "FLOOR PLAN"]:
            assert want in up, f"missing {want}"
        chip1 = await page.locator('[data-testid="project-meta-status-year"]').inner_text()
        assert f"COMPLETED · {year}" in chip1.upper(), f"chip1={chip1!r}"
        hero = await page.locator('[data-testid="project-hero-image"]').get_attribute("src")
        elev = await page.locator('[data-testid="project-elevation-image"]').get_attribute("src")
        prev_img = page.locator('[data-testid="floor-plan-preview"] img')
        prev = await prev_img.get_attribute("src")
        dl = await page.locator('[data-testid="download-plan-button"]').get_attribute("href")
        view = await page.locator('[data-testid="view-full-plan-button"]').get_attribute("href")
        for label, val in [("hero", hero), ("elevation", elev), ("preview", prev), ("download", dl), ("view", view)]:
            assert f"/assets/projects/{slug}/" in val, f"{label} wrong folder: {val}"
            for o in ALL_SLUGS:
                if o != slug:
                    assert o not in val, f"{label} CROSS->{o}"
        assert "elevation.jpg" in hero
        for stat, want in [("status", "COMPLETED"), ("location", "AMEENPUR"), ("type", "RESIDENTIAL APARTMENT"), ("floors", "G+5"), ("year", year)]:
            v = await page.locator(f'[data-testid="project-stat-{stat}"]').inner_text()
            assert want in v.upper(), f"stat {stat}={v!r}"
        assert "flats" not in body.lower(), "flat count shown"
        # images actually render
        nw_hero = await page.locator('[data-testid="project-hero-image"]').evaluate("e => e.naturalWidth")
        nw_prev = await prev_img.evaluate("e => e.naturalWidth")
        assert nw_hero > 100 and nw_prev > 100, "image not rendering"
        overflow = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        assert not overflow, "h-overflow"
        if not mobile:
            s1, ct1 = http_status(BASE + dl)
            assert s1 == 200 and "pdf" in ct1.lower(), f"pdf {s1} {ct1}"
            s2, _ = http_status(hero if hero.startswith("http") else BASE + hero)
            assert s2 == 200, "elevation not 200"
        ok(f"{idx} {title} {year}" + (" [mobile]" if mobile else ""))
    except Exception as e:
        bad(f"{tag}: {e}")

async def check_ongoing(page, idx, slug, title, floors, mobile=False):
    tag = f"{slug}" + (" [mob]" if mobile else "")
    try:
        r = await page.goto(f"{BASE}/projects/{slug}", wait_until="domcontentloaded")
        assert r.status == 200, f"HTTP {r.status}"
        await page.wait_for_timeout(3500)
        await settle(page)
        h1 = (await page.locator("h1").first.inner_text()).replace("\n", " ").strip()
        assert h1.upper() == title, f"h1={h1!r}"
        body = await page.evaluate("document.body.innerText")
        up = body.upper()
        for want in ["AMEENPUR, HYDERABAD", floors, "RESIDENTIAL APARTMENT", "ABOUT THE PROJECT", "FLOOR PLAN"]:
            assert want in up, f"missing {want}"
        assert "COMPLETED ·" not in up, "invented completion"
        assert await page.locator('[data-testid="project-hero-image"]').count() == 0, "fake hero image"
        assert await page.locator('[data-testid="project-elevation-placeholder"]').count() == 1, "no coming-soon"
        cs = await page.locator('[data-testid="project-elevation-placeholder"]').inner_text()
        assert "ARCHITECTURAL ELEVATION" in cs.upper() and "COMING SOON" in cs.upper()
        chip1 = await page.locator('[data-testid="project-meta-status-year"]').inner_text()
        assert chip1.strip().upper() == "ONGOING", f"chip1={chip1!r}"
        assert "—" in await page.locator('[data-testid="project-stat-year"]').inner_text(), "year invented"
        prev_img = page.locator('[data-testid="floor-plan-preview"] img')
        prev = await prev_img.get_attribute("src")
        dl = await page.locator('[data-testid="download-plan-button"]').get_attribute("href")
        view = await page.locator('[data-testid="view-full-plan-button"]').get_attribute("href")
        for label, val in [("preview", prev), ("download", dl), ("view", view)]:
            assert f"/assets/projects/{slug}/" in val, f"{label} wrong: {val}"
            for o in ALL_SLUGS:
                if o != slug:
                    assert o not in val, f"{label} CROSS->{o}"
        nw_prev = await prev_img.evaluate("e => e.naturalWidth")
        assert nw_prev > 100, "preview not rendering"
        assert "flats" not in body.lower(), "flat count shown"
        overflow = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        assert not overflow, "h-overflow"
        if not mobile:
            s1, ct1 = http_status(BASE + dl)
            assert s1 == 200 and "pdf" in ct1.lower(), f"pdf {s1} {ct1}"
        # tappable buttons
        for tid in ["view-full-plan-button", "download-plan-button"]:
            bb = await page.locator(f'[data-testid="{tid}"]').bounding_box()
            assert bb and bb["height"] >= 40 and bb["width"] >= 100, f"{tid} too small"
        ok(f"{idx} {title} ({floors})" + (" [mobile]" if mobile else ""))
    except Exception as e:
        bad(f"{tag}: {e}")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path="/root/bin/chromium", args=["--no-sandbox"])
        page = await (await browser.new_context(viewport={"width": 1920, "height": 900})).new_page()

        for idx, slug, title, year in COMPLETED:
            await check_completed(page, idx, slug, title, year)
        for idx, slug, title, floors in ONGOING:
            await check_ongoing(page, idx, slug, title, floors)

        # Ivy special data
        try:
            await page.goto(f"{BASE}/projects/my-dream-ivy", wait_until="domcontentloaded")
            await page.wait_for_timeout(3500)
            up = (await page.evaluate("document.body.innerText")).upper()
            for want in ["G+4", "3 BHK", "1,600 SQ.FT.", "ONE HOME. ONE FLOOR.", "PRIVATE LIVING, ELEVATED.", "ONE HOME PER FLOOR"]:
                assert want in up, f"ivy missing {want}"
            assert "G+5" not in up, "ivy shows G+5"
            chip2 = await page.locator('[data-testid="project-meta-floors-type"]').inner_text()
            assert chip2.upper() == "G+4 · 3 BHK · RESIDENTIAL APARTMENT"
            ok("ivy special data (G+4, 3BHK, 1600sqft, headline, no G+5)")
        except Exception as e:
            bad(f"ivy special: {e}")

        # Index audit
        try:
            await page.goto(f"{BASE}/projects", wait_until="domcontentloaded")
            await page.wait_for_timeout(3500)
            ids = await page.evaluate("Array.from(document.querySelectorAll('[data-testid^=\"project-card-\"]')).map(a => a.dataset.testid.replace('project-card-',''))")
            assert ids == ALL_SLUGS, f"ALL order: {ids}"
            links = await page.evaluate("Array.from(document.querySelectorAll('[data-testid^=\"project-card-\"]')).map(a => a.getAttribute('href'))")
            assert links == [f"/projects/{s}" for s in ALL_SLUGS], "card links"
            await page.click('[data-testid="filter-completed-button"]', force=True)
            await page.wait_for_timeout(1200)
            ids = await page.evaluate("Array.from(document.querySelectorAll('[data-testid^=\"project-card-\"]')).map(a => a.dataset.testid.replace('project-card-',''))")
            assert ids == [s for _, s, _, _ in COMPLETED], f"completed order: {ids}"
            await page.click('[data-testid="filter-ongoing-button"]', force=True)
            await page.wait_for_timeout(1200)
            ids = await page.evaluate("Array.from(document.querySelectorAll('[data-testid^=\"project-card-\"]')).map(a => a.dataset.testid.replace('project-card-',''))")
            assert ids == [s for _, s, _, _ in ONGOING], f"ongoing order: {ids}"
            fcomp = await page.locator('[data-testid="filter-completed-button"]').inner_text()
            fong = await page.locator('[data-testid="filter-ongoing-button"]').inner_text()
            fall = await page.locator('[data-testid="filter-all-button"]').inner_text()
            assert "(19)" in fall and "(13)" in fcomp and "(6)" in fong
            ok("index: ALL=19 chronological, COMPLETED=13 chrono, ONGOING=6 in order, links correct")
        except Exception as e:
            bad(f"index: {e}")

        # Mobile audit: required pages at 390 + index
        mp = await (await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)).new_page()
        for idx, slug, title, year in COMPLETED:
            await check_completed(mp, idx, slug, title, year, mobile=True)
        for idx, slug, title, floors in ONGOING:
            await check_ongoing(mp, idx, slug, title, floors, mobile=True)
        try:
            await mp.goto(f"{BASE}/projects", wait_until="domcontentloaded")
            await mp.wait_for_timeout(3000)
            overflow = await mp.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
            assert not overflow
            ok("projects index [mobile 390px] no overflow")
        except Exception as e:
            bad(f"index mobile: {e}")
        await browser.close()

asyncio.run(main())
print("\n===== FULL PORTFOLIO AUDIT =====")
print(f"PASSED: {len(passes)}  FAILED: {len(fails)}")
if fails:
    print("FAILURES:")
    for f in fails: print(" -", f)
