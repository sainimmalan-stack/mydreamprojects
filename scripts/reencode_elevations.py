"""Re-encode all Day/Night elevations at maximum practical quality from the
original uploads in /tmp (no upscaling, no filtering — pure high-quality encode)."""
from PIL import Image

BASE = "/app/frontend/public/assets/projects"
JOBS = [
    ("nest", "/tmp/img1.png", "/tmp/img2.png"),
    ("casa", "/tmp/casa_day.png", "/tmp/casa_night.png"),
    ("avasa", "/tmp/avasa_day.webp", "/tmp/avasa_night.webp"),
    ("skylark", "/tmp/skylark_day.png", "/tmp/skylark_night.png"),
    ("glenmore", "/tmp/new_glenmore_day.jpg", "/tmp/new_glenmore_night.jpg"),
    ("hillock", "/tmp/new_hillock_day.png", "/tmp/new_hillock_night.png"),
    ("summit", "/tmp/new_summit_day.jpg", "/tmp/new_summit_night.jpg"),
    ("griffin", "/tmp/new_griffin_day.jpg", "/tmp/new_griffin_night.jpg"),
    ("selene", "/tmp/new_selene_day.jpg", "/tmp/new_selene_night.jpg"),
    ("atlantis", "/tmp/new_atlantis_day.png", "/tmp/new_atlantis_night.png"),
    ("perch", "/tmp/new_perch_day.jpg", "/tmp/new_perch_night.jpg"),
    ("solace", "/tmp/new_solace_day.jpg", "/tmp/new_solace_night.jpg"),
    ("zenith", "/tmp/new_zenith_day.jpg", "/tmp/new_zenith_night.jpg"),
]

for slug, day_src, night_src in JOBS:
    for src, mode in [(day_src, "day"), (night_src, "night")]:
        im = Image.open(src).convert("RGB")
        full = f"{BASE}/my-dream-{slug}/elevation-{mode}.webp"
        im.save(full, quality=92, method=6)  # max practical fidelity
        small = im.resize((800, round(im.height * 800 / im.width)), Image.LANCZOS)
        small.save(full.replace(".webp", "-800.webp"), quality=88, method=6)
        print(f"{slug} {mode}: {im.size[0]}x{im.size[1]} re-encoded")
print("ALL DONE")
