"""Inject verified unitDetails (room names + dimensions from the actual plans)
and per-completed-project verified saleable SFT into projects.js."""
import re, json

# name|dims — dims exactly as printed on each project's approved plan
D = {
"my-dream-nest": {"sft": 14150, "units": [
  ("3 BHK", "1580 SFT", [("LIVING / DINING","24'-0\"×13'-0\""),("M. BED ROOM","13'-6\"×13'-6\""),("C. BED ROOM","13'-0\"×11'-0\""),("G. BED ROOM","10'-0\"×10'-6\""),("KITCHEN","9'-0\"×10'-0\""),("PUJA","6'-6\"×4'-0\""),("DRESS","4'-6\"×4'-0\""),("A. TOILET","8'-0\"×4'-0\""),("A. TOILET","4'-6\"×9'-6\""),("C. TOILET","4'-0\"×7'-6\""),("UTILITY","4'-0\" wide"),("BALCONY","4'-0\" wide"),("BALCONY","4'-0\" wide")]),
  ("2 BHK", "1250 SFT", [("FAMILY LIVING","11'-0\"×14'-6\""),("DINING","10'-6\"×10'-6\""),("M. BED ROOM","11'-0\"×15'-6\""),("C. BED ROOM","13'-0\"×11'-0\""),("KITCHEN","10'-0\"×8'-6\""),("PUJA","6'-0\"×4'-0\""),("A. TOILET","4'-6\"×11'-0\""),("A. TOILET","5'-6\"×7'-0\""),("UTILITY","5'-0\"×7'-6\""),("BALCONY","4'-0\" wide")]),
]},
"my-dream-casa": {"sft": 15000, "units": [
  ("3 BHK", "1675 SFT", [("LIVING / DINING","13'-0\"×20'-9\""),("M. BED ROOM","15'-6\"×11'-0\""),("C. BED ROOM","12'-6\"×12'-0\""),("STUDY ROOM","8'-0\"×8'-6\""),("KITCHEN","8'-6\"×9'-6\""),("UTILITY","7'-6\"×5'-3\""),("PUJA","4'-0\"×4'-6\""),("A. TOILET","7'-0\"×4'-6\""),("A. TOILET","4'-6\"×8'-0\""),("BALCONY","4'-9\" wide")]),
  ("2 BHK", "1325 SFT", [("LIVING / DINING","14'-0\"×22'-0\""),("M. BED ROOM","14'-6\"×11'-6\""),("G. BED ROOM","12'-6\"×10'-0\""),("C. BED ROOM","12'-6\"×11'-0\""),("KITCHEN","11'-0\"×9'-0\""),("PUJA","4'-0\"×6'-0\""),("C. TOILET","6'-0\"×4'-0\""),("A. TOILET","4'-6\"×8'-0\""),("A. TOILET","8'-0\"×4'-6\""),("UTILITY","4'-0\" wide"),("BALCONY","4'-0\" wide"),("BALCONY","4'-0\" wide")]),
]},
"my-dream-avasa": {"sft": 12000, "units": [
  ("2 BHK (FLAT 1)", "1200 SFT", [("LIVING / DINING","12'-6\"×23'-3\""),("M. BED ROOM","13'-0\"×11'-0\""),("C. BED ROOM","10'-6\"×13'-0\""),("KITCHEN","10'-0\"×7'-6\""),("SIT-OUT","7'-0\"×6'-6\""),("PUJA","4'-0\"×5'-6\""),("A. TOILET","10'-6\"×4'-0\""),("A. TOILET","8'-6\"×4'-6\"")]),
  ("2 BHK (FLAT 2)", "1200 SFT", [("FAMILY LIVING","15'-0\"×11'-0\""),("DINING","10'-0\"×11'-0\""),("M. BED ROOM","11'-0\"×13'-6\""),("C. BED ROOM","11'-0\"×12'-0\""),("KITCHEN","9'-3\"×10'-0\""),("PUJA","4'-0\"×5'-0\""),("DRESS","4'-3\"×4'-0\""),("A. TOILET","7'-6\"×4'-6\""),("A. TOILET","4'-3\"×7'-6\"")]),
]},
"my-dream-skylark": {"sft": 21125, "units": [
  ("3 BHK (EAST)", "1500 SFT", [("FAMILY LIVING","15'-0\"×11'-0\""),("M. BED ROOM","14'-6\"×11'-6\""),("C. BED ROOM","14'-0\"×11'-0\""),("G. BED ROOM","11'-6\"×10'-6\""),("KITCHEN","9'-0\"×11'-0\""),("PUJA","4'-0\"×4'-0\""),("C. TOILET","8'-0\"×4'-0\""),("A. TOILET","7'-6\"×5'-0\""),("A. TOILET","7'-0\"×5'-0\""),("BALCONY","4'-6\" wide")]),
  ("3 BHK (WEST)", "1500 SFT", [("FAMILY LIVING","12'-0\"×14'-0\""),("M. BED ROOM","11'-6\"×13'-0\""),("C. BED ROOM","12'-6\"×10'-0\""),("G. BED ROOM","11'-6\"×10'-0\""),("KITCHEN","10'-3\"×8'-6\""),("PUJA","4'-6\"×3'-6\""),("A. TOILET","4'-6\"×9'-0\""),("A. TOILET","5'-6\"×6'-6\""),("C. TOILET","8'-0\"×4'-0\""),("BALCONY","4'-0\" wide")]),
  ("2 BHK", "1225 SFT", [("FAMILY LIVING","15'-3\"×11'-0\""),("DINING","12'-6\"×10'-0\""),("M. BED ROOM","12'-0\"×13'-0\""),("C. BED ROOM","11'-0\"×13'-0\""),("KITCHEN","8'-0\"×11'-0\""),("A. TOILET","4'-6\"×8'-0\""),("A. TOILET","5'-6\"×6'-0\""),("BALCONY","4'-0\" wide")]),
]},
"my-dream-glenmore": {"sft": 12000, "units": [
  ("2 BHK (FLAT 1)", "1200 SFT", [("FAMILY LIVING","11'-0\"×15'-0\""),("KITCHEN / DINING","15'-0\"×14'-6\""),("M. BED ROOM","11'-0\"×13'-0\""),("C. BED ROOM","12'-6\"×10'-0\""),("PUJA","5'-3\"×4'-0\""),("A. TOILET","9'-6\"×4'-3\""),("A. TOILET","9'-6\"×5'-3\""),("UTILITY / BALCONY","4'-0\" wide")]),
  ("2 BHK (FLAT 2)", "1200 SFT", [("FAMILY LIVING","11'-6\"×13'-0\""),("DINING","15'-6\"×7'-6\""),("KITCHEN","9'-6\"×7'-0\""),("M. BED ROOM","13'-0\"×10'-6\""),("C. BED ROOM","11'-0\"×9'-6\""),("PUJA","3'-3\"×4'-0\""),("A. TOILET","7'-6\"×4'-0\""),("A. TOILET","7'-6\"×4'-0\""),("BALCONY","3'-6\" wide"),("UTILITY","4'-0\" wide")]),
]},
"my-dream-hillock": {"sft": 10750, "units": [
  ("2 BHK (FLAT 1)", "1100 SFT", [("LIVING / DINING","19'-3\"×12'-0\""),("M. BED ROOM","12'-0\"×12'-0\""),("C. BED ROOM","12'-9\"×9'-0\""),("KITCHEN","7'-6\"×12'-6\""),("PUJA","7'-0\"×3'-6\""),("A. TOILET","8'-0\"×4'-0\""),("UTILITY","5'-0\" wide"),("BALCONY","5'-6\" wide")]),
  ("2 BHK (FLAT 2)", "1050 SFT", [("LIVING / DINING","19'-3\"×12'-6\""),("M. BED ROOM","10'-0\"×14'-9\""),("C. BED ROOM","11'-6\"×10'-0\""),("KITCHEN","9'-0\"×8'-0\""),("PUJA","3'-6\"×4'-0\""),("A. TOILET","4'-0\"×7'-0\""),("UTILITY","6'-3\"×8'-3\""),("SIT-OUT","5'-0\"×6'-6\"")]),
]},
"my-dream-summit": {"sft": 20375, "units": [
  ("3 BHK", "1675 SFT", [("FAMILY LIVING","12'-0\"×21'-6\""),("DINING","10'-0\"×13'-6\""),("M. BED ROOM","14'-0\"×12'-0\""),("G. BED ROOM","12'-0\"×11'-0\""),("C. BED ROOM","10'-0\"×13'-6\""),("KITCHEN","11'-0\"×9'-0\""),("PUJA","4'-0\"×5'-6\""),("A. TOILET","4'-9\"×8'-6\""),("C. TOILET","4'-6\"×8'-6\""),("UTILITY","4'-0\"×7'-6\""),("BALCONY","4'-0\" wide")]),
  ("2 BHK (MIDDLE)", "1200 SFT", [("FAMILY LIVING","11'-0\"×16'-0\""),("DINING","11'-0\"×11'-0\""),("M. BED ROOM","11'-0\"×13'-0\""),("C. BED ROOM","10'-0\"×13'-0\""),("KITCHEN","9'-6\"×9'-0\""),("PUJA","4'-0\"×3'-0\""),("A. TOILET","9'-6\"×4'-0\""),("A. TOILET","4'-0\"×8'-6\""),("UTILITY","4'-0\"×7'-6\""),("BALCONY","4'-0\" wide")]),
  ("2 BHK (RIGHT)", "1200 SFT", [("FAMILY LIVING","11'-0\"×15'-0\""),("KITCHEN / DINING","10'-0\"×18'-6\""),("M. BED ROOM","13'-0\"×11'-0\""),("C. BED ROOM","13'-0\"×10'-6\""),("SIT-OUT","6'-0\"×4'-6\""),("A. TOILET","7'-6\"×4'-0\""),("A. TOILET","4'-0\"×8'-0\""),("BALCONY","4'-0\" wide")]),
]},
"my-dream-griffin": {"sft": 14100, "units": [
  ("3 BHK", "1600 SFT", [("LIVING / DINING","12'-0\"×18'-0\""),("M. BED ROOM","15'-0\"×10'-0\""),("C. BED ROOM","10'-0\"×13'-0\""),("STUDY ROOM","10'-0\"×7'-0\""),("KITCHEN","8'-6\"×10'-6\""),("UTILITY","7'-6\"×4'-3\""),("PUJA",None),("A. TOILET","7'-0\"×5'-6\""),("BALCONY","4'-0\" wide")]),
  ("2 BHK", "1220 SFT", [("LIVING / DINING","12'-0\"×23'-0\""),("M. BED ROOM","14'-0\"×12'-0\""),("C. BED ROOM","10'-6\"×12'-0\""),("KITCHEN","11'-0\"×9'-0\""),("PUJA","4'-0\"×6'-0\""),("A. TOILET","8'-0\"×4'-6\""),("BALCONY","4'-6\" wide")]),
]},
"my-dream-selene": {"sft": 16750, "units": [
  ("3 BHK (FLAT 1)", "1700 SFT", [("LIVING / DINING","22'-6\"×14'-0\""),("M. BED ROOM","15'-0\"×11'-6\""),("C. BED ROOM","13'-6\"×11'-6\""),("C. BED ROOM","11'-6\"×11'-0\""),("KITCHEN","10'-3\"×12'-6\""),("PUJA","6'-3\"×4'-0\""),("A. TOILET","9'-0\"×4'-6\""),("A. TOILET","7'-9\"×4'-0\""),("BALCONY","4'-0\" wide")]),
  ("3 BHK (FLAT 2)", "1650 SFT", [("LIVING / DINING","23'-0\"×14'-0\""),("M. BED ROOM","14'-6\"×11'-6\""),("C. BED ROOM","13'-0\"×11'-0\""),("C. BED ROOM","11'-6\"×11'-0\""),("KITCHEN","8'-0\"×12'-6\""),("PUJA","7'-0\"×4'-0\""),("A. TOILET","8'-0\"×4'-6\""),("A. TOILET","7'-6\"×4'-0\""),("BALCONY","4'-0\" wide")]),
]},
"my-dream-atlantis": {"sft": 15255, "units": [
  ("2 BHK (FLAT 1)", "1010 SFT", [("LIVING","17'-4\"×10'-0\""),("DINING","11'-6\"×5'-9\""),("KITCHEN","10'-3\"×6'-9\""),("M. BED ROOM","13'-7\"×10'-1\""),("C. BED ROOM","12'-0\"×10'-0\""),("UTILITY","10'-3\"×3'-0\""),("TOILET","6'-0\"×4'-2\""),("TOILET","6'-0\"×6'-2\""),("BALCONY","7'-4\"×5'-3\""),("BALCONY","7'-4\"×3'-6\"")]),
  ("2 BHK (FLAT 2)", "1010 SFT", [("LIVING","17'-4\"×10'-0\""),("DINING","9'-0\"×7'-4\""),("KITCHEN","8'-0\"×8'-0\""),("M. BED ROOM","13'-7\"×10'-1\""),("C. BED ROOM","12'-0\"×10'-0\""),("UTILITY","8'-4\"×3'-6\""),("TOILET","4'-0\"×6'-4\""),("BALCONY","9'-0\"×4'-6\"")]),
  ("2 BHK (FLAT 3)", "1031 SFT", [("LIVING","12'-0\"×11'-1\""),("DINING","8'-0\"×11'-1\""),("KITCHEN","8'-0\"×9'-1\""),("M. BED ROOM","11'-7\"×13'-6\""),("C. BED ROOM","13'-0\"×12'-0\""),("W.I.C","6'-3\"×4'-0\""),("UTILITY","6'-9\"×5'-4\""),("PUJA","2'-7\"×4'-0\""),("TOILET","8'-0\"×4'-0\""),("BALCONY","12'-9\"×4'-0\"")]),
]},
"my-dream-perch": {"sft": 12200, "units": [
  ("2 BHK (FLAT 1)", "1200 SFT", [("LIVING / DINING","13'-0\"×20'-0\""),("PUJA / KITCHEN","14'-6\"×8'-0\""),("M. BED ROOM","13'-0\"×11'-9\""),("C. BED ROOM","10'-6\"×12'-0\""),("A. TOILET","9'-0\"×4'-0\""),("A. TOILET","4'-6\"×7'-0\""),("BALCONY","5'-6\"×6'-6\"")]),
  ("2 BHK (FLAT 2)", "1240 SFT", [("LIVING / DINING","13'-0\"×20'-0\""),("PUJA / KITCHEN","14'-6\"×8'-6\""),("M. BED ROOM","13'-0\"×11'-6\""),("C. BED ROOM","10'-6\"×12'-0\""),("A. TOILET","9'-0\"×4'-0\""),("A. TOILET","4'-6\"×7'-6\""),("BALCONY","4'-6\" wide")]),
]},
"my-dream-solace": {"sft": 14750, "units": [
  ("3 BHK (FLAT 1)", "1675 SFT", [("FAMILY LIVING","15'-6\"×11'-0\""),("DINING","11'-0\"×12'-0\""),("M. BED ROOM","14'-0\"×12'-0\""),("C. BED ROOM","12'-6\"×11'-0\""),("KITCHEN","10'-6\"×8'-0\""),("PUJA",None),("A. TOILET","7'-0\"×5'-0\""),("A. TOILET","7'-0\"×5'-6\""),("UTILITY","4'-0\" wide"),("BALCONY","4'-9\" wide")]),
  ("3 BHK (FLAT 2)", "1275 SFT", [("FAMILY LIVING","11'-0\"×16'-6\""),("DINING","10'-0\"×15'-0\""),("M. BED ROOM","13'-6\"×13'-0\""),("C. BED ROOM","13'-0\"×12'-6\""),("C. BED ROOM","10'-0\"×13'-0\""),("KITCHEN","11'-0\"×10'-0\""),("PUJA","4'-0\"×4'-3\""),("A. TOILET","8'-0\"×4'-6\""),("A. TOILET","5'-0\"×8'-0\""),("C. TOILET","4'-0\"×7'-0\""),("UTILITY","4'-3\" wide"),("BALCONY","4'-9\" wide"),("BALCONY","4'-6\" wide")]),
]},
"my-dream-zenith": {"sft": 12450, "units": [
  ("3 BHK", "1265 SFT", [("FAMILY LIVING","16'-0\"×10'-0\""),("KITCHEN / DINING","17'-0\"×10'-0\""),("M. BED ROOM","14'-0\"×10'-0\""),("C. BED ROOM","12'-6\"×10'-0\""),("STUDY ROOM","5'-6\"×10'-0\""),("PUJA","3'-6\"×4'-6\""),("A. TOILET","7'-0\"×4'-6\""),("A. TOILET","7'-0\"×5'-6\""),("BALCONY","4'-6\" wide")]),
  ("2 BHK", "1225 SFT", [("FAMILY LIVING","16'-6\"×10'-0\""),("KITCHEN / DINING","18'-6\"×10'-0\""),("M. BED ROOM","14'-6\"×10'-0\""),("C. BED ROOM","13'-3\"×10'-0\""),("PUJA / STUDY","8'-0\"×10'-0\""),("PUJA","3'-0\"×3'-0\""),("SIT-OUT","9'-6\"×6'-0\""),("A. TOILET","8'-0\"×4'-6\""),("A. TOILET","8'-0\"×5'-0\""),("UTILITY","4'-0\" wide")]),
]},
"my-dream-aurelia": {"sft": None, "units": [
  ("2 BHK (FLAT 1)", "1250 SFT", [("FAMILY LIVING","16'-0\"×10'-0\""),("KITCHEN / DINING","15'-6\"×10'-0\""),("M. BED ROOM","13'-0\"×10'-0\""),("C. BED ROOM","12'-6\"×10'-0\""),("PUJA","4'-0\"×4'-0\""),("A. TOILET","6'-6\"×5'-0\""),("A. TOILET","6'-6\"×5'-0\""),("BALCONY","4'-0\" wide"),("UTILITY","4'-0\" wide")]),
  ("2 BHK (FLAT 2)", "1040 SFT", [("FAMILY LIVING","10'-0\"×14'-0\""),("DINING","11'-0\"×9'-0\""),("KITCHEN","8'-0\"×9'-0\""),("M. BED ROOM","11'-6\"×12'-0\""),("C. BED ROOM","9'-6\"×11'-6\""),("C. TOILET","5'-9\"×5'-3\""),("A. TOILET","5'-9\"×6'-0\""),("BALCONY","4'-0\" wide"),("UTILITY","4'-0\" wide")]),
  ("2 BHK (FLAT 3)", "1040 SFT", [("FAMILY LIVING","10'-0\"×14'-0\""),("DINING","11'-0\"×9'-0\""),("KITCHEN","8'-0\"×9'-0\""),("M. BED ROOM","11'-6\"×12'-0\""),("C. BED ROOM","9'-6\"×11'-6\""),("PUJA",None),("C. TOILET","5'-9\"×5'-3\""),("A. TOILET","5'-9\"×6'-0\""),("BALCONY","4'-0\" wide"),("UTILITY","4'-0\" wide")]),
]},
"my-dream-elysium": {"sft": None, "units": [
  ("2 BHK (FLAT 1)", "1250 SFT", [("LIVING","10'-0\"×15'-7½\""),("KITCHEN / DINING","10'-0\"×15'-9\""),("M. BED ROOM","10'-0\"×13'-0\""),("C. BED ROOM","10'-0\"×12'-1½\""),("PUJA","4'-0\"×4'-1½\""),("A. TOILET","5'-0\"×6'-6\""),("A. TOILET","5'-0\"×6'-6\""),("BALCONY","4'-0\" wide")]),
  ("2 BHK (FLAT 2)", "1040 SFT", [("LIVING","13'-0\"×10'-0\""),("DINING","9'-1½\"×11'-0\""),("KITCHEN","8'-3\"×8'-0\""),("M. BED ROOM","11'-3\"×11'-6\""),("C. BED ROOM","11'-0\"×9'-6\""),("PUJA","3'-0\"×2'-0\""),("UTILITY","3'-10½\"×9'-1½\""),("A. TOILET","6'-0\"×5'-9\""),("C. TOILET","5'-0\"×5'-9\""),("BALCONY","4'-0\" wide")]),
  ("2 BHK (FLAT 3)", "1040 SFT", [("LIVING","13'-0\"×10'-0\""),("DINING","9'-1½\"×11'-0\""),("KITCHEN","8'-3\"×8'-0\""),("M. BED ROOM","11'-3\"×11'-6\""),("C. BED ROOM","11'-0\"×9'-6\""),("PUJA","3'-0\"×2'-0\""),("UTILITY","3'-10½\"×9'-1½\""),("A. TOILET","6'-0\"×5'-9\""),("C. TOILET","5'-0\"×5'-9\""),("BALCONY","4'-0\" wide")]),
]},
"my-dream-aura": {"sft": None, "units": [
  ("3 BHK", "1680 SFT", [("LIVING","16'-3\"×10'-0\""),("M. BED ROOM","10'-6\"×13'-6\""),("G. BED ROOM","10'-3\"×10'-0\""),("KITCHEN","8'-6\"×10'-9\""),("PUJA","4'-9\"×4'-7½\""),("UTILITY","4'-7½\"×10'-4½\""),("A. TOILET","4'-3\"×7'-0\""),("A. TOILET","4'-3\"×6'-6\""),("BALCONY","3'-0\"×10'-0\"")]),
  ("2 BHK", "1200 SFT", [("LIVING","10'-0\"×14'-3\""),("DINING","12'-0\"×10'-0\""),("M. BED ROOM","11'-0\"×13'-0\""),("C. BED ROOM","10'-4½\"×12'-9\""),("KITCHEN","7'-4½\"×10'-6\""),("A. TOILET","6'-6\"×5'-3\""),("A. TOILET","7'-0\"×5'-0\""),("BALCONY","4'-0\"×10'-0\"")]),
]},
"my-dream-echelon": {"sft": None, "units": [
  ("2 BHK (FLAT 1)", "1180 SFT", [("LIVING / DINING","19'-3\"×13'-0\""),("MASTER BEDROOM","11'-3\"×13'-1½\""),("BEDROOM","12'-0\"×10'-6\""),("KITCHEN","7'-1½\"×10'-1½\""),("PUJA LOBBY","10'-10½\"×4'-9\""),("A. TOILET","7'-0\"×4'-9\""),("BALCONY","4'-0\"×10'-6\"")]),
  ("2 BHK (FLAT 2)", "1220 SFT", [("LIVING / DINING","19'-3\"×13'-0\""),("MASTER BEDROOM","11'-3\"×13'-1½\""),("BEDROOM","12'-0\"×10'-6\""),("KITCHEN","8'-0\"×10'-1½\""),("PUJA LOBBY","11'-9\"×4'-9\""),("WASH AREA","7'-9\"×4'-0\""),("SIT-OUT","4'-6\"×10'-10½\""),("A. TOILET","7'-6\"×4'-9\""),("A. TOILET","4'-0\"×10'-6\"")]),
]},
"my-dream-vale": {"sft": None, "units": [
  ("3 BHK", "1665 SFT", [("LIVING / DINING","23'-11½\"×13'-0\""),("M. BED ROOM","12'-0\"×13'-6\""),("C. BED ROOM","14'-0\"×10'-9\""),("G. BED ROOM","11'-1½\"×10'-10¼\""),("KITCHEN","8'-0\"×10'-7½\""),("PUJA","6'-0\"×4'-0\""),("UTILITY","8'-0\"×4'-6\""),("A. TOILET","4'-9\"×9'-0\""),("A. TOILET","7'-0\"×4'-6\""),("A. TOILET","7'-0\"×4'-6\""),("BALCONY","5'-0\"×13'-0\"")]),
  ("2.5 BHK", "1440 SFT", [("LIVING / DINING","20'-0\"×13'-0\""),("M. BED ROOM","14'-0\"×11'-6\""),("C. BED ROOM","10'-0\"×12'-3\""),("STUDY ROOM","7'-9\"×8'-9\""),("UTILITY","9'-0\"×5'-3\""),("A. TOILET","8'-0\"×5'-0\""),("A. TOILET","4'-6\"×8'-0\""),("BALCONY","7'-9\"×4'-0\""),("BALCONY","4'-0\"×13'-0\"")]),
]},
"my-dream-ivy": {"sft": None, "units": [
  ("3 BHK", "1600 SFT", [("FAMILY LIVING","10'-6\"×15'-3\""),("DINING","10'-0\"×14'-6½\""),("M. BED ROOM","10'-0\"×13'-0\""),("C. BED ROOM","10'-0\"×10'-0\""),("G. BED ROOM","11'-7½\"×10'-0\""),("KITCHEN","7'-9\"×10'-1½\""),("UTILITY","8'-1½\"×4'-0\""),("PUJA","4'-0\"×2'-0\""),("A. TOILET","4'-0\"×9'-0\""),("A. TOILET","7'-0\"×4'-0\""),("A. TOILET","5'-10½\"×5'-3\""),("BALCONY","4'-0\"×10'-0\"")]),
]},
}

def js_str(s):
    return "null" if s is None else json.dumps(s)

src = open("/app/frontend/src/data/projects.js").read()
for slug, data in D.items():
    lines = ["  unitDetails: ["]
    for label, area, rooms in data["units"]:
        lines.append("    {")
        lines.append(f"      label: {json.dumps(label)},")
        lines.append(f"      saleableArea: {json.dumps(area)},")
        lines.append("      rooms: [")
        for name, dims in rooms:
            lines.append(f"        {{ name: {json.dumps(name)}, dims: {js_str(dims)} }},")
        lines.append("      ],")
        lines.append("    },")
    lines.append("  ],")
    if data["sft"]:
        lines.append(f"  sftDelivered: {data['sft']},")
    block = "\n".join(lines) + "\n"
    anchor = f'    preview: "/assets/projects/{slug}/floor-plan-p1.jpg",'
    idx = src.find(anchor)
    assert idx != -1, slug
    close = src.find("  },", idx)
    assert close != -1, slug
    src = src[:close + 4] + "\n" + block.rstrip("\n") + src[close + 4:]

# centralized SFT calculation
calc = """
// Verified TOTAL SALEABLE AREA (SFT) per completed project — from each project's
// approved saleable area statement, cross-checked as per-unit areas x floors.
export const COMPLETED_PROJECT_SFT = {
  "my-dream-nest": 14150,
  "my-dream-casa": 15000,
  "my-dream-avasa": 12000,
  "my-dream-skylark": 21125,
  "my-dream-glenmore": 12000,
  "my-dream-hillock": 10750,
  "my-dream-summit": 20375,
  "my-dream-griffin": 14100,
  "my-dream-selene": 16750,
  "my-dream-atlantis": 15255,
  "my-dream-perch": 12200,
  "my-dream-solace": 14750,
  "my-dream-zenith": 12450,
};
export const completedProjectsSftTotal = Object.values(COMPLETED_PROJECT_SFT).reduce((a, b) => a + b, 0);
"""
anchor2 = "// Business achievement statistics"
src = src.replace(anchor2, calc.strip() + "\n\n" + anchor2, 1)
src = src.replace("totalSftDelivered: null, // TODO: set verified number, e.g. 185000",
                  "totalSftDelivered: completedProjectsSftTotal, // 190,905 SFT — sum of the 13 completed projects' verified saleable areas")
open("/app/frontend/src/data/projects.js", "w").write(src)
print("injected unitDetails for", len(D), "projects; SFT total =", sum(v["sft"] for v in D.values() if v["sft"]))
