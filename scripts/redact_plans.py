"""Redact architect contact info (GUNNAM GROUP block) from floor-plan PDFs
and regenerate the website preview JPGs at 150 DPI. Drawings/dimensions/room
labels are untouched: only words fully inside the contact cluster rect are
redacted, plus vector line-art fully covered by the logo rect."""
import os, sys
import fitz
from PIL import Image

BASE = "/app/frontend/public/assets/projects"
TARGETS = ["my-dream-aurelia", "my-dream-avasa", "my-dream-casa", "my-dream-glenmore",
           "my-dream-griffin", "my-dream-hillock", "my-dream-nest", "my-dream-perch",
           "my-dream-selene", "my-dream-skylark", "my-dream-solace", "my-dream-summit",
           "my-dream-zenith"]

for name in TARGETS:
    pdf_path = os.path.join(BASE, name, "floor-plan.pdf")
    doc = fitz.open(pdf_path)
    total_redacted = 0
    for page in doc:
        anchors = page.search_for("GUNNAM")
        if not anchors:
            print(f"{name}: no GUNNAM anchor on page {page.number} — SKIPPED")
            continue
        for a in anchors:
            # cluster rect: covers firm name/role/address/phone/email + ARCHITECTS label
            R = fitz.Rect(a.x0 - 95, a.y0 - 60, a.x0 + 135, a.y0 + 75)
            # text: redact every word fully inside the cluster
            for w in page.get_text("words"):
                wr = fitz.Rect(w[:4])
                if R.contains(wr):
                    page.add_redact_annot(wr, fill=(1, 1, 1))
                    total_redacted += 1
            # logo: vector art left of the firm name, fully-covered line art removed
            logo = fitz.Rect(a.x0 - 78, a.y0 - 18, a.x0 - 4, a.y0 + 62)
            page.add_redact_annot(logo, fill=(1, 1, 1))
            page.apply_redactions(
                images=fitz.PDF_REDACT_IMAGE_NONE,
                graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
                text=fitz.PDF_REDACT_TEXT_REMOVE,
            )
    doc.save(pdf_path + ".tmp", garbage=4, deflate=True)
    doc.close()
    os.replace(pdf_path + ".tmp", pdf_path)

    # regenerate preview at 150 DPI (matches original render size)
    doc = fitz.open(pdf_path)
    pix = doc[0].get_pixmap(dpi=150)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    img.save(os.path.join(BASE, name, "floor-plan-p1.jpg"), quality=90)
    doc.close()
    print(f"{name}: redacted {total_redacted} text items, preview re-rendered {pix.width}x{pix.height}")
print("DONE")
