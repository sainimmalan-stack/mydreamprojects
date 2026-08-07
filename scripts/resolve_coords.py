"""Resolve each project's exact Google Maps link to its lat/lng in a real browser.
Google Maps rewrites the URL to .../@lat,lng,zoom after load."""
import asyncio, json, re
from playwright.async_api import async_playwright

LINKS = {
    "my-dream-nest": "https://maps.app.goo.gl/xyW7NFt7epe782966?g_st=ic",
    "my-dream-casa": "https://maps.app.goo.gl/WQvmq3LFSyWB5nMM9?g_st=ic",
    "my-dream-avasa": "https://maps.app.goo.gl/VuYbWjcUoZxPMcdw7?g_st=ic",
    "my-dream-skylark": "https://maps.app.goo.gl/VXZCpHzKvFzrJr717?g_st=ic",
    "my-dream-glenmore": "https://maps.app.goo.gl/Mfog5oGVdqRZTp9r7?g_st=ic",
    "my-dream-hillock": "https://maps.app.goo.gl/8btoDtghTJtTwWBm7?g_st=ic",
    "my-dream-summit": "https://maps.app.goo.gl/XSiRLgM3bvgYk8yZ6?g_st=ic",
    "my-dream-griffin": "https://maps.app.goo.gl/n4baoGjFLi1yEzzM6?g_st=ic",
    "my-dream-selene": "https://maps.app.goo.gl/zwRTdaahm97KMpRy8?g_st=ic",
    "my-dream-atlantis": "https://maps.app.goo.gl/9GnZ5a8ZdT9iACzVA?g_st=ic",
    "my-dream-perch": "https://maps.app.goo.gl/kUNaT2Qcbtp11dEe9?g_st=ic",
    "my-dream-solace": "https://maps.app.goo.gl/RAaGeQa5no16juuJ6?g_st=ic",
    "my-dream-zenith": "https://maps.app.goo.gl/p9xH9LbbQWnG8emi6?g_st=ic",
}

async def main():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page()
        for slug, url in LINKS.items():
            try:
                await page.goto(url, timeout=30000)
                await page.wait_for_timeout(5000)
                final = page.url
                m = re.search(r"@(-?\d+\.\d+),(-?\d+\.\d+)", final)
                if m:
                    out[slug] = [float(m.group(1)), float(m.group(2))]
                    print(slug, "->", m.group(1), m.group(2))
                else:
                    # place pages: coords live in the page state
                    html = await page.content()
                    m2 = re.search(r"(-?\d{2}\.\d{5,}),(-?\d{2}\.\d{5,})", html)
                    cand = re.findall(r"(17\.\d{4,}),(78\.\d{4,})", html)
                    if cand:
                        out[slug] = [float(cand[0][0]), float(cand[0][1])]
                        print(slug, "-> (html)", cand[0])
                    else:
                        print(slug, "FAILED", final[:120])
            except Exception as e:
                print(slug, "ERROR", e)
        await b.close()
    json.dump(out, open("/app/scripts/project_coords.json", "w"), indent=1)
    print("saved", len(out), "coords")

asyncio.run(main())
