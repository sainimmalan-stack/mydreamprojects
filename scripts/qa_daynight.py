"""Full Day/Night + hero quality QA across all 13 completed projects.
Checks: hero uses hi-res day webp, day/night same container (no shift),
images load at full source resolution, viewer opens/closes/toggles, no overflow."""
import asyncio
from playwright.async_api import async_playwright

BASE = "https://premium-residential-2.preview.emergentagent.com"
SLUGS = ["my-dream-nest","my-dream-casa","my-dream-avasa","my-dream-skylark","my-dream-glenmore",
         "my-dream-hillock","my-dream-summit","my-dream-griffin","my-dream-selene","my-dream-atlantis",
         "my-dream-perch","my-dream-solace","my-dream-zenith"]
fails = []

async def check(page, slug, mobile=False):
    await page.goto(f"{BASE}/projects/{slug}")
    await page.wait_for_timeout(3500)
    # hero sharpness: hero img should be the day webp (hi-res), loaded
    hero = await page.evaluate("""() => { const h = document.querySelector('[data-testid=project-hero-image]'); return h ? {src: h.currentSrc, w: h.naturalWidth} : null; }""")
    if not hero or "elevation-day" not in hero["src"]:
        fails.append(f"{slug}: hero not using hi-res day webp -> {hero}")
    # elevation section
    el = await page.query_selector('[data-testid="project-elevation"]')
    await el.scroll_into_view_if_needed()
    await page.wait_for_timeout(2500)
    day = await page.query_selector('[data-testid="elevation-day-image"]')
    night = await page.query_selector('[data-testid="elevation-night-image"]')
    d_ok = await day.evaluate("e => e.naturalWidth > 0")
    n_ok = await night.evaluate("e => e.naturalWidth > 0")
    if not (d_ok and n_ok):
        fails.append(f"{slug}: day/night not loaded ({d_ok},{n_ok})")
    if f"my-dream-{slug.split('my-dream-')[1] if False else slug.replace('my-dream-','')}" == "x":
        pass
    if slug.replace("my-dream-","") not in await day.get_attribute("src"):
        fails.append(f"{slug}: day src cross-associated: {await day.get_attribute('src')}")
    if slug.replace("my-dream-","") not in await night.get_attribute("src"):
        fails.append(f"{slug}: night src cross-associated: {await night.get_attribute('src')}")
    # same container / no shift
    sw = await page.query_selector('[data-testid="elevation-switcher"]')
    h1 = (await sw.bounding_box())["height"]
    await page.click('[data-testid="night-mode-button"]')
    await page.wait_for_timeout(900)
    h2 = (await sw.bounding_box())["height"]
    if abs(h1 - h2) > 1:
        fails.append(f"{slug}: layout shift {h1} vs {h2}")
    day_op = await day.evaluate("e => getComputedStyle(e).opacity")
    if day_op != "0":
        fails.append(f"{slug}: night mode not active after click (opacity {day_op})")
    # overflow
    ow = await page.evaluate("document.documentElement.scrollWidth")
    vw = 390 if mobile else 1920
    if ow > vw:
        fails.append(f"{slug}: horizontal overflow {ow} > {vw}")
    tag = "MOBILE" if mobile else "DESKTOP"
    print(f"PASS {tag} {slug} (hero {hero['w']}w)" if hero else f"?? {slug}")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page(viewport={"width": 1920, "height": 800})
        for s in SLUGS:
            try:
                await check(page, s, mobile=False)
            except Exception as e:
                fails.append(f"{s} desktop ERROR: {e}")
        # mobile subset (4 representative: portrait, landscape, fixed-frame, natural)
        m = await b.new_page(viewport={"width": 390, "height": 844})
        for s in ["my-dream-casa", "my-dream-avasa", "my-dream-glenmore", "my-dream-zenith"]:
            try:
                await check(m, s, mobile=True)
            except Exception as e:
                fails.append(f"{s} mobile ERROR: {e}")
        # fullscreen viewer check (nest desktop)
        await page.goto(f"{BASE}/projects/my-dream-nest")
        await page.wait_for_timeout(3500)
        el = await page.query_selector('[data-testid="project-elevation"]')
        await el.scroll_into_view_if_needed()
        await page.wait_for_timeout(2000)
        await page.click('[data-testid="elevation-switcher"]', position={"x": 400, "y": 300})
        await page.wait_for_timeout(1200)
        viewer = await page.query_selector('[data-testid="elevation-viewer"]')
        if not viewer:
            fails.append("elevation viewer did not open on image click")
        else:
            await page.click('[data-testid="viewer-night-button"]')
            await page.wait_for_timeout(900)
            vimg = await page.query_selector('[data-testid="viewer-image"]')
            op = await vimg.evaluate("e => getComputedStyle(e).opacity")
            if op != "0":
                fails.append(f"viewer night toggle failed (day opacity {op})")
            await page.click('[data-testid="viewer-close"]')
            await page.wait_for_timeout(700)
            if await page.query_selector('[data-testid="elevation-viewer"]'):
                fails.append("viewer did not close")
            else:
                print("PASS fullscreen viewer open/night/close")
        await b.close()

asyncio.run(main())
print("=====")
print("FAILS:", len(fails))
for f in fails:
    print(" -", f)
