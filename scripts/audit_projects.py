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
PLACEHOLDERS = [f"project-{n:02d}" for n in range(16, 20)]
ONGOING_REAL = [("14", "my-dream-aurelia", "MY DREAM AURELIA"), ("15", "my-dream-elysium", "MY DREAM ELYSIUM")]
FOLDERS = [s for _, s, _, _ in COMPLETED] + [s for _, s, _ in ONGOING_REAL]
results = []

def http200(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        return urllib.request.urlopen(req, timeout=20).status == 200
    except Exception:
        return False

async def audit_completed(page, idx, slug, title, year, mobile=False):
    r = await page.goto(f"{BASE}/projects/{slug}", wait_until="domcontentloaded")
    assert r.status == 200, f"{slug} HTTP {r.status}"
    await page.wait_for_timeout(3500)
    h1 = (await page.locator("h1").first.inner_text()).replace("\n", " ").strip()
    assert h1.upper() == title, f"{slug} title wrong: {h1!r}"
    body = await page.evaluate("document.body.innerText")
    low = body.lower()
    assert "AMEENPUR, HYDERABAD" in body.upper(), f"{slug} location missing"
    assert "G+5" in body and "RESIDENTIAL APARTMENT" in body.upper(), f"{slug} floors/type missing"
    chip1 = await page.locator('[data-testid="project-meta-status-year"]').inner_text()
    chip2 = await page.locator('[data-testid="project-meta-floors-type"]').inner_text()
    assert f"COMPLETED · {year}" in chip1.upper(), f"{slug} chip1: {chip1}"
    assert "G+5" in chip2 and "RESIDENTIAL APARTMENT" in chip2.upper(), f"{slug} chip2: {chip2}"
    hero = await page.locator('[data-testid="project-hero-image"]').get_attribute("src")
    elev = await page.locator('[data-testid="project-elevation-image"]').get_attribute("src")
    prev = await page.locator('[data-testid="floor-plan-preview"] img').get_attribute("src")
    dl = await page.locator('[data-testid="download-plan-button"]').get_attribute("href")
    view = await page.locator('[data-testid="view-full-plan-button"]').get_attribute("href")
    for label, val in [("hero", hero), ("elevation", elev), ("preview", prev), ("download", dl), ("view", view)]:
        assert f"/assets/projects/{slug}/" in val, f"{slug} {label} WRONG FOLDER: {val}"
        for o in FOLDERS:
            if o != slug:
                assert o not in val, f"{slug} {label} CROSS-> {o}"
    assert "elevation.jpg" in hero, f"{slug} hero not elevation"
    assert dl.endswith("floor-plan.pdf") and view.endswith("floor-plan.pdf")
    for stat, want in [("status", "COMPLETED"), ("location", "AMEENPUR"), ("type", "RESIDENTIAL APARTMENT"), ("floors", "G+5"), ("year", year)]:
        v = await page.locator(f'[data-testid="project-stat-{stat}"]').inner_text()
        assert want in v.upper(), f"{slug} stat {stat}: {v!r}"
    assert "flats" not in low, f"{slug} shows flat count"
    if not mobile:
        assert http200(BASE + dl), f"{slug} pdf not 200"
        assert http200(hero if hero.startswith("http") else BASE + hero), f"{slug} elevation not 200"
    overflow = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
    assert not overflow, f"{slug} h-overflow"
    results.append(f"PASS {idx} {title} ({year})" + (" [mobile]" if mobile else ""))

async def audit_placeholder(page, slug, mobile=False):
    r = await page.goto(f"{BASE}/projects/{slug}", wait_until="domcontentloaded")
    assert r.status == 200
    await page.wait_for_timeout(2500)
    assert await page.locator('[data-testid="project-hero-image"]').count() == 0, f"{slug} unexpectedly has cover"
    assert await page.locator('[data-testid="floor-plan-preview"]').count() == 0, f"{slug} unexpectedly has plan"
    body = (await page.evaluate("document.body.innerText")).upper()
    assert "ONGOING" in body, f"{slug} not marked ongoing"
    overflow = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
    assert not overflow
    results.append(f"PASS placeholder {slug} (ongoing, no assets)" + (" [mobile]" if mobile else ""))

async def audit_ongoing_real(page, idx, slug, title, mobile=False):
    r = await page.goto(f"{BASE}/projects/{slug}", wait_until="domcontentloaded")
    assert r.status == 200
    await page.wait_for_timeout(3500)
    h1 = (await page.locator("h1").first.inner_text()).replace("\n", " ").strip()
    assert h1.upper() == title, f"{slug} title: {h1!r}"
    chip1 = await page.locator('[data-testid="project-meta-status-year"]').inner_text()
    assert chip1.strip().upper() == "ONGOING", f"{slug} chip1: {chip1!r}"
    assert await page.locator('[data-testid="project-hero-image"]').count() == 0, f"{slug} unexpected hero image"
    assert await page.locator('[data-testid="elevation-coming-soon"]').count() == 1, f"{slug} coming-soon missing"
    prev = await page.locator('[data-testid="floor-plan-preview"] img').get_attribute("src")
    dl = await page.locator('[data-testid="download-plan-button"]').get_attribute("href")
    view = await page.locator('[data-testid="view-full-plan-button"]').get_attribute("href")
    for label, val in [("preview", prev), ("download", dl), ("view", view)]:
        assert f"/assets/projects/{slug}/" in val, f"{slug} {label} WRONG: {val}"
        for o in FOLDERS:
            if o != slug:
                assert o not in val, f"{slug} {label} CROSS-> {o}"
    assert "—" in await page.locator('[data-testid="project-stat-year"]').inner_text(), f"{slug} year invented"
    low = (await page.evaluate("document.body.innerText")).lower()
    assert "flats" not in low
    overflow = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
    assert not overflow
    results.append(f"PASS {idx} {title} (ongoing, coming-soon elevation, own plan)" + (" [mobile]" if mobile else ""))

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path="/root/bin/chromium", args=["--no-sandbox"])
        page = await (await browser.new_context(viewport={"width": 1920, "height": 900})).new_page()
        for idx, slug, title, year in COMPLETED:
            await audit_completed(page, idx, slug, title, year)
        for idx, slug, title in ONGOING_REAL:
            await audit_ongoing_real(page, idx, slug, title)
        for slug in PLACEHOLDERS:
            await audit_placeholder(page, slug)
        await page.goto(f"{BASE}/projects", wait_until="domcontentloaded")
        await page.wait_for_timeout(3500)
        total = await page.evaluate("document.querySelectorAll('[data-testid^=\"project-card-\"]').length")
        real = await page.evaluate("document.querySelectorAll('[data-testid^=\"project-card-\"] img').length")
        assert total == 19 and real == 13, f"index {real}/{total}"
        fcomp = await page.locator('[data-testid="filter-completed-button"]').inner_text()
        fong = await page.locator('[data-testid="filter-ongoing-button"]').inner_text()
        assert "(13)" in fcomp and "(6)" in fong
        links = await page.evaluate("Array.from(document.querySelectorAll('[data-testid^=\"project-card-\"]')).map(a => a.getAttribute('href'))")
        expect = [f"/projects/{s}" for _, s, _, _ in COMPLETED] + [f"/projects/{s}" for _, s, _ in ONGOING_REAL] + [f"/projects/{s}" for s in PLACEHOLDERS]
        assert links == expect, f"card links mismatch: {links}"
        await page.click('[data-testid="filter-completed-button"]', force=True)
        await page.wait_for_timeout(1000)
        n = await page.evaluate("document.querySelectorAll('[data-testid^=\"project-card-\"]').length")
        assert n == 13, f"completed filter {n}"
        await page.click('[data-testid="filter-ongoing-button"]', force=True)
        await page.wait_for_timeout(1000)
        n = await page.evaluate("document.querySelectorAll('[data-testid^=\"project-card-\"]').length")
        assert n == 6, f"ongoing filter {n}"
        results.append("PASS index: 19 cards, 13 real covers, filters 13/6, all card hrefs correct")
        mp = await (await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)).new_page()
        for idx, slug, title, year in COMPLETED:
            await audit_completed(mp, idx, slug, title, year, mobile=True)
        for idx, slug, title in ONGOING_REAL:
            await audit_ongoing_real(mp, idx, slug, title, mobile=True)
        for slug in PLACEHOLDERS:
            await audit_placeholder(mp, slug, mobile=True)
        await browser.close()

asyncio.run(main())
print("\n===== AUDIT REPORT =====")
for r in results: print(r)
print(f"Total checks passed: {len(results)}")
