"""Restore Glenmore from backup and re-redact with token-based matching
(only known contact words inside the anchor region are redacted)."""
import os
import fitz
from PIL import Image

NAME = "my-dream-glenmore"
BACKUP = f"/app/backups/plan_originals/{NAME}/floor-plan.pdf"
DEST = f"/app/frontend/public/assets/projects/{NAME}/floor-plan.pdf"
CONTACT_TOKENS = {"GUNNAM", "GROUP", "ARCHITECTS", "&", "PLANNERS", "KPHB,HYDERABAD",
                  "email:-architect_ashokbabu@yahoo.com", "+91-9000444255"}

# restore original
import shutil
shutil.copy(BACKUP, DEST)

doc = fitz.open(DEST)
for page in doc:
    for a in page.search_for("GUNNAM"):
        R = fitz.Rect(a.x0 - 95, a.y0 - 60, a.x0 + 135, a.y0 + 75)
        n = 0
        for w in page.get_text("words"):
            wr = fitz.Rect(w[:4])
            if R.contains(wr) and w[4] in CONTACT_TOKENS:
                page.add_redact_annot(wr, fill=(1, 1, 1))
                n += 1
        logo = fitz.Rect(a.x0 - 45, a.y0 - 15, a.x0 - 4, a.y0 + 40)
        page.add_redact_annot(logo, fill=(1, 1, 1))
        page.apply_redactions(
            images=fitz.PDF_REDACT_IMAGE_NONE,
            graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
            text=fitz.PDF_REDACT_TEXT_REMOVE,
        )
        print(f"redacted {n} contact words")
doc.save(DEST + ".tmp", garbage=4, deflate=True)
doc.close()
os.replace(DEST + ".tmp", DEST)

doc = fitz.open(DEST)
pix = doc[0].get_pixmap(dpi=150)
Image.frombytes("RGB", (pix.width, pix.height), pix.samples).save(
    f"/app/frontend/public/assets/projects/{NAME}/floor-plan-p1.jpg", quality=90)
print("preview re-rendered", pix.width, "x", pix.height)

# verify nothing but contact words removed
from pypdf import PdfReader
old = PdfReader(BACKUP).pages[0].extract_text()
new = PdfReader(DEST).pages[0].extract_text()
for tok in ["PROPOSED", "RESIDENTIAL", "APARTMENT", "DREEM", "AMEENPUR"]:
    print(tok, "kept:", tok in new)
print("contact gone:", all(t not in new for t in ["GUNNAM", "ashokbabu", "9000444255", "KPHB", "PLANNERS"]))
