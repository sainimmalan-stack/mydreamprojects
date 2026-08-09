"""Generate premium dark-themed PDF brochures for all 19 projects.
Cover (night elevation) + 3D plan page + framed 2D technical plan page.
One-off build tool — outputs /assets/projects/<slug>/brochure.pdf
"""
import os, re, io
from fpdf import FPDF
from PIL import Image

ROOT = "/app/frontend/public/assets/projects"
SRC = open("/app/frontend/src/data/projects.js").read()

CHARCOAL = (18, 17, 16)
GRAPHITE = (27, 26, 23)
IVORY = (245, 241, 234)
GREY = (140, 136, 128)
CHAMPAGNE = (201, 168, 118)

PW, PH = 210, 297  # A4 portrait mm


def parse_projects():
    projects = []
    for m in re.finditer(r'const \w+ = \{\n(.*?)\n\};', SRC, re.S):
        block = m.group(1)
        def field(name):
            f = re.search(rf'{name}: "([^"]+)"', block)
            return f.group(1) if f else None
        slug = field("slug")
        if not slug:
            continue
        projects.append({
            "slug": slug,
            "index": field("index"),
            "title": field("title"),
            "status": field("status"),
            "configuration": field("configuration"),
            "flatMix": field("flatMix"),
            "floors": field("floors"),
        })
    return projects


def spaced(text):
    return " ".join(list(text.replace(" ", "  ")))


def fit(img_w, img_h, box_w, box_h):
    scale = min(box_w / img_w, box_h / img_h)
    return img_w * scale, img_h * scale


class Brochure(FPDF):
    def dark_page(self):
        self.add_page()
        self.set_fill_color(*CHARCOAL)
        self.rect(0, 0, PW, PH, "F")

    def footer(self):
        if self.page_no() == 0:
            return
        self.set_y(-16)
        self.set_font("helvetica", "", 6.5)
        self.set_text_color(*GREY)
        self.set_x(15)
        self.cell(0, 5, spaced("MY DREAM PROJECTS · AMEENPUR, HYDERABAD"), align="L")
        self.set_x(-35)
        self.cell(20, 5, f"{self.page_no():02d}", align="R")

    def header_row(self, title):
        self.set_y(14)
        self.set_font("helvetica", "", 6.5)
        self.set_text_color(*GREY)
        self.set_x(15)
        self.cell(0, 5, spaced("MY DREAM PROJECTS"), align="L")
        self.set_x(-75)
        self.set_text_color(*CHAMPAGNE)
        self.cell(60, 5, spaced(title), align="R")
        self.set_draw_color(60, 58, 54)
        self.set_line_width(0.2)
        self.line(15, 24, PW - 15, 24)


def cover(pdf, p, cover_img, has_night=True):
    pdf.dark_page()
    pdf.set_y(16)
    pdf.set_font("helvetica", "", 7)
    pdf.set_text_color(*GREY)
    pdf.set_x(15)
    pdf.cell(0, 5, spaced("MY DREAM PROJECTS"), align="L")
    pdf.set_x(-55)
    pdf.cell(40, 5, spaced(p["status"].upper()), align="R")

    im = Image.open(cover_img)
    w, h = fit(im.size[0], im.size[1], 176, 150)
    x = (PW - w) / 2
    pdf.image(cover_img, x=x, y=46, w=w, h=h)
    y_img_end = 46 + h

    pdf.set_y(y_img_end + 14)
    pdf.set_font("helvetica", "B", 24)
    pdf.set_text_color(*IVORY)
    pdf.cell(0, 10, p["title"].upper(), align="C")

    config = p["configuration"] or p["flatMix"] or ""
    suffix = "Residence" if p["configuration"] else "Residences"
    pdf.set_y(y_img_end + 28)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(*CHAMPAGNE)
    pdf.cell(0, 6, f"{config} {suffix}  ·  {p['floors']}  ·  Ameenpur, Hyderabad".upper(), align="C")

    pdf.set_y(y_img_end + 40)
    pdf.set_font("helvetica", "", 7)
    pdf.set_text_color(*GREY)
    contents = "NIGHT ELEVATION · 3D PLAN · TECHNICAL PLAN" if has_night else "3D PLAN · TECHNICAL PLAN"
    pdf.cell(0, 5, spaced(f"PROJECT PORTFOLIO · {contents}"), align="C")


def image_page(pdf, title, img_path, note=None, frame=False):
    pdf.dark_page()
    pdf.header_row(title)
    im = Image.open(img_path)
    w, h = fit(im.size[0], im.size[1], 170, 225)
    x, y = (PW - w) / 2, 32 + (232 - h) / 2
    if frame:
        pad = 3.2
        pdf.set_fill_color(*GRAPHITE)
        pdf.rect(x - pad, y - pad, w + 2 * pad, h + 2 * pad, "F")
        pdf.set_draw_color(*CHAMPAGNE)
        pdf.set_line_width(0.15)
        pdf.rect(x - 1.2, y - 1.2, w + 2.4, h + 2.4)
    pdf.image(img_path, x=x, y=y, w=w, h=h)
    if note:
        pdf.set_y(PH - 30)
        pdf.set_font("helvetica", "", 6.5)
        pdf.set_text_color(*GREY)
        pdf.cell(0, 5, spaced(note.upper()), align="C")


def build(p):
    slug = p["slug"]
    folder = f"{ROOT}/{slug}"
    night = f"{folder}/elevation-night.webp"
    plan3d = f"{folder}/plan-3d.jpg"
    plan2d = f"{folder}/floor-plan-p1.jpg"  # original full technical sheet
    if not (os.path.exists(plan3d) and os.path.exists(plan2d)):
        print("SKIP", slug)
        return
    has_night = os.path.exists(night)
    # fpdf2 needs jpg/png — convert the night webp once
    night_jpg = None
    if has_night:
        night_jpg = f"/tmp/{slug}-night.jpg"
        Image.open(night).convert("RGB").save(night_jpg, "JPEG", quality=90)

    pdf = Brochure(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(False)
    # ongoing projects have no elevation yet — the 3D visualization leads the cover
    cover(pdf, p, night_jpg if has_night else plan3d, has_night)
    if has_night:
        image_page(pdf, "Premium 3D Floor Plan", plan3d,
                   note="Artistic 3D visualization - the 2D plan remains the technical reference")
    image_page(pdf, "Typical Floor Plan - Technical Reference", plan2d, frame=True)
    out = f"{folder}/brochure.pdf"
    pdf.output(out)
    if night_jpg:
        os.remove(night_jpg)
    print("OK", slug, os.path.getsize(out) // 1024, "KB")


import sys
only = sys.argv[1:] if len(sys.argv) > 1 else None
for p in parse_projects():
    if only and p["slug"] not in only:
        continue
    build(p)
print("DONE")
