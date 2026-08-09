const pad = (n) => String(n).padStart(2, "0");

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

// Business achievement statistics — CENTRALIZED, editable here only.
// Replace the null placeholders with the verified figures when ready;
// the homepage statistics band reads from this single source.
export const BUSINESS_STATS = {
  totalFlatsSold: 145, // all 13 completed projects sold out & occupied (verified against audited flat counts)
  totalSftDelivered: completedProjectsSftTotal, // 190,905 SFT — sum of the 13 completed projects' verified saleable areas
};

// Public pricing — static, site-wide source of truth.
export const PRICING = {
  ratePerSft: "₹5,994",
  twoBhk: "₹55.6 L",
  threeBhk: "₹85 L",
};

const MY_DREAM_NEST = {
  id: 1,
  slug: "my-dream-nest",
  index: "01",
  title: "My Dream Nest",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2020",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK + 3 BHK",
  description:
    "My Dream Nest represents the beginning of the My Dream Projects journey. Completed in 2020, the residential development combines practical planning, comfortable living spaces and a contemporary architectural approach in Ameenpur.",
  cover: "/assets/projects/my-dream-nest/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-nest/elevation-day.webp",
    night: "/assets/projects/my-dream-nest/elevation-night.webp",
    width: 2804,
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=My+Dream+Nest%2C+Janachithanya+layout%2C+Aminpur+Rd%2C+Ameenpur%2C+Miyapur%2C+Telangana+502032&ftid=0x3bcb8d8279a3504d%3A0x913bb9b448c58929",
    lat: 17.5334039,
    lng: 78.3249575,
    embed: "https://www.google.com/maps?q=My+Dream+Nest,+Janachithanya+layout,+Aminpur+Rd,+Ameenpur,+Miyapur,+Telangana+502032&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-nest/floor-plan.pdf",
    preview: "/assets/projects/my-dream-nest/floor-plan-p1.jpg",
    fileName: "My-Dream-Nest-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK",
      saleableArea: "1580 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "24'-0\"\u00d713'-0\"", pos: [31, 54] },
        { name: "M. BED ROOM", dims: "13'-6\"\u00d713'-6\"", pos: [37, 79] },
        { name: "C. BED ROOM", dims: "13'-0\"\u00d711'-0\"", pos: [17, 30] },
        { name: "G. BED ROOM", dims: "10'-0\"\u00d710'-6\"", pos: [42, 19] },
        { name: "KITCHEN", dims: "9'-0\"\u00d710'-0\"", pos: [33, 62] },
        { name: "PUJA", dims: "6'-6\"\u00d74'-0\"", pos: [27, 19] },
        { name: "TOILETS \u00d73", dims: null, pos: [13, 24] },
        { name: "BALCONY \u00d72", dims: "4'-0\" wide", pos: [9, 45] },
      ],
    },
    {
      label: "2 BHK",
      saleableArea: "1250 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "11'-0\"\u00d714'-6\"", pos: [57, 45] },
        { name: "DINING", dims: "10'-6\"\u00d710'-6\"", pos: [74, 24] },
        { name: "M. BED ROOM", dims: "11'-0\"\u00d715'-6\"", pos: [63, 83] },
        { name: "C. BED ROOM", dims: "13'-0\"\u00d711'-0\"", pos: [76, 17] },
        { name: "KITCHEN", dims: "10'-0\"\u00d78'-6\"", pos: [65, 58] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [85, 45] },
        { name: "UTILITY", dims: "5'-0\"\u00d77'-6\"", pos: [72, 66] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [88, 20] },
      ],
    },
  ],
  sftDelivered: 14150,
  plan3d: {
    src: "/assets/projects/my-dream-nest/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-nest/plan-3d-800.webp 800w, /assets/projects/my-dream-nest/plan-3d.webp 1200w",
  },
};

const MY_DREAM_CASA = {
  id: 2,
  slug: "my-dream-casa",
  index: "02",
  title: "My Dream Casa",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2021",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK + 3 BHK",
  description:
    "My Dream Casa is a contemporary residential development designed to balance comfortable family living with efficient planning. Completed in 2021, its clean architectural lines, warm façade accents and thoughtfully planned residences create a modern and welcoming residential environment in Ameenpur.",
  cover: "/assets/projects/my-dream-casa/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-casa/elevation-day.webp",
    night: "/assets/projects/my-dream-casa/elevation-night.webp",
    width: 1536,
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=G8MF+CJC+My+Dream+-+Casa%2C+6%2C+Sai+Ambica+Colony+Rd%2C+Narendra+Nagar+Colony%2C+Ameenpur%2C+Miyapur%2C+Hyderabad%2C+Telangana+502032&ftid=0x3bcb8d36fc1e6821%3A0xe70e438ce3ffabf3",
    lat: 17.5345951,
    lng: 78.3249708,
    embed: "https://www.google.com/maps?q=G8MF+CJC+My+Dream+-+Casa,+6,+Sai+Ambica+Colony+Rd,+Narendra+Nagar+Colony,+Ameenpur,+Miyapur,+Hyderabad,+Telangana+502032&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-casa/floor-plan.pdf",
    preview: "/assets/projects/my-dream-casa/floor-plan-p1.jpg",
    fileName: "My-Dream-Casa-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK",
      saleableArea: "1675 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "13'-0\"\u00d720'-9\"", pos: [30, 30] },
        { name: "M. BED ROOM", dims: "15'-6\"\u00d711'-0\"", pos: [24, 17] },
        { name: "C. BED ROOM", dims: "12'-6\"\u00d712'-0\"", pos: [13, 27] },
        { name: "STUDY ROOM", dims: "8'-0\"\u00d78'-6\"", pos: [21, 9] },
        { name: "KITCHEN", dims: "8'-6\"\u00d79'-6\"", pos: [44, 15] },
        { name: "PUJA", dims: "4'-0\"\u00d74'-6\"", pos: [35, 42] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [10, 38] },
        { name: "BALCONY", dims: "4'-9\" wide", pos: [8, 12] },
      ],
    },
    {
      label: "2 BHK",
      saleableArea: "1325 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "14'-0\"\u00d722'-0\"", pos: [36, 70] },
        { name: "M. BED ROOM", dims: "14'-6\"\u00d711'-6\"", pos: [16, 87] },
        { name: "G. BED ROOM", dims: "12'-6\"\u00d710'-0\"", pos: [14, 60] },
        { name: "C. BED ROOM", dims: "12'-6\"\u00d711'-0\"", pos: [16, 75] },
        { name: "KITCHEN", dims: "11'-0\"\u00d79'-0\"", pos: [68, 58] },
        { name: "PUJA", dims: "4'-0\"\u00d76'-0\"", pos: [52, 52] },
        { name: "A. TOILETS \u00d72 + C. TOILET", dims: null, pos: [80, 68] },
        { name: "UTILITY", dims: "4'-0\" wide", pos: [88, 84] },
        { name: "BALCONY \u00d72", dims: "4'-0\" wide", pos: [10, 50] },
      ],
    },
  ],
  sftDelivered: 15000,
  plan3d: {
    src: "/assets/projects/my-dream-casa/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-casa/plan-3d-800.webp 800w, /assets/projects/my-dream-casa/plan-3d.webp 784w",
  },
};

const MY_DREAM_AVASA = {
  id: 3,
  slug: "my-dream-avasa",
  index: "03",
  title: "My Dream Avasa",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2022",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK",
  description:
    "My Dream Avasa is a contemporary residential development created around efficient planning and comfortable family living. Completed in 2022, its vertical architectural form, textured accents and thoughtfully designed homes give the project a distinctive modern identity in Ameenpur.",
  cover: "/assets/projects/my-dream-avasa/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-avasa/elevation-day.webp",
    night: "/assets/projects/my-dream-avasa/elevation-night.webp",
    width: 2250,
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=G8MF+PXG+MY+Dream+Avasa%2C+Sai+Ambica+Colony%2C+Ameenpur%2C+Miyapur%2C+Hyderabad%2C+Telangana+502032&ftid=0x3bcb8d007573cfe7%3A0x35268543df407da9",
    lat: 17.5343212,
    lng: 78.3249423,
    embed: "https://www.google.com/maps?q=G8MF+PXG+MY+Dream+Avasa,+Sai+Ambica+Colony,+Ameenpur,+Miyapur,+Hyderabad,+Telangana+502032&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-avasa/floor-plan.pdf",
    preview: "/assets/projects/my-dream-avasa/floor-plan-p1.jpg",
    fileName: "My-Dream-Avasa-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "2 BHK (FLAT 1)",
      saleableArea: "1200 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "12'-6\"\u00d723'-3\"", pos: [55, 22] },
        { name: "M. BED ROOM", dims: "13'-0\"\u00d711'-0\"", pos: [52, 12] },
        { name: "C. BED ROOM", dims: "10'-6\"\u00d713'-0\"", pos: [13, 17] },
        { name: "KITCHEN", dims: "10'-0\"\u00d77'-6\"", pos: [38, 8] },
        { name: "SIT-OUT", dims: "7'-0\"\u00d76'-6\"", pos: [15, 7] },
        { name: "PUJA", dims: "4'-0\"\u00d75'-6\"", pos: [72, 14] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [46, 21] },
      ],
    },
    {
      label: "2 BHK (FLAT 2)",
      saleableArea: "1200 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "15'-0\"\u00d711'-0\"", pos: [30, 60] },
        { name: "DINING", dims: "10'-0\"\u00d711'-0\"", pos: [52, 75] },
        { name: "M. BED ROOM", dims: "11'-0\"\u00d713'-6\"", pos: [20, 75] },
        { name: "C. BED ROOM", dims: "11'-0\"\u00d712'-0\"", pos: [70, 75] },
        { name: "KITCHEN", dims: "9'-3\"\u00d710'-0\"", pos: [55, 52] },
        { name: "PUJA", dims: "4'-0\"\u00d75'-0\"", pos: [63, 86] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [75, 60] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [45, 88] },
      ],
    },
  ],
  sftDelivered: 12000,
  plan3d: {
    src: "/assets/projects/my-dream-avasa/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-avasa/plan-3d-800.webp 800w, /assets/projects/my-dream-avasa/plan-3d.webp 634w",
  },
};

const MY_DREAM_SKYLARK = {
  id: 4,
  slug: "my-dream-skylark",
  index: "04",
  title: "My Dream Skylark",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2023",
  floors: "G+5",
  totalFlats: 15,
  flatMix: "2 BHK + 3 BHK",
  description:
    "My Dream Skylark is a contemporary residential development designed around spacious family living and modern architecture. Completed in 2023, its broad façade, warm material accents, generous balconies and thoughtfully planned residences give the project a distinctive architectural presence in Ameenpur.",
  cover: "/assets/projects/my-dream-skylark/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-skylark/elevation-day.webp",
    night: "/assets/projects/my-dream-skylark/elevation-night.webp",
    width: 2896,
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=My+Dream+Skylark%2C+Ameenpur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8d7c5806af6d%3A0xa98af901111f741c",
    lat: 17.5364912,
    lng: 78.3262729,
    embed: "https://www.google.com/maps?q=My+Dream+Skylark,+Ameenpur,+Hyderabad,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-skylark/floor-plan.pdf",
    preview: "/assets/projects/my-dream-skylark/floor-plan-p1.jpg",
    fileName: "My-Dream-Skylark-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK (EAST)",
      saleableArea: "1500 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "15'-0\"\u00d711'-0\"", pos: [88, 28] },
        { name: "M. BED ROOM", dims: "14'-6\"\u00d711'-6\"", pos: [66, 13] },
        { name: "C. BED ROOM", dims: "14'-0\"\u00d711'-0\"", pos: [79, 12] },
        { name: "G. BED ROOM", dims: "11'-6\"\u00d710'-6\"", pos: [82, 20] },
        { name: "KITCHEN", dims: "9'-0\"\u00d711'-0\"", pos: [74, 33] },
        { name: "PUJA", dims: "4'-0\"\u00d74'-0\"", pos: [76, 17] },
        { name: "TOILETS \u00d73", dims: null, pos: [84, 9] },
        { name: "BALCONY", dims: "4'-6\" wide", pos: [93, 16] },
      ],
    },
    {
      label: "3 BHK (WEST)",
      saleableArea: "1500 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "12'-0\"\u00d714'-0\"", pos: [33, 50] },
        { name: "M. BED ROOM", dims: "11'-6\"\u00d713'-0\"", pos: [30, 24] },
        { name: "C. BED ROOM", dims: "12'-6\"\u00d710'-0\"", pos: [11, 27] },
        { name: "G. BED ROOM", dims: "11'-6\"\u00d710'-0\"", pos: [30, 36] },
        { name: "KITCHEN", dims: "10'-3\"\u00d78'-6\"", pos: [13, 58] },
        { name: "PUJA", dims: "4'-6\"\u00d73'-6\"", pos: [22, 52] },
        { name: "TOILETS \u00d73", dims: null, pos: [11, 34] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [9, 46] },
      ],
    },
    {
      label: "2 BHK",
      saleableArea: "1225 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "15'-3\"\u00d711'-0\"", pos: [58, 38] },
        { name: "DINING", dims: "12'-6\"\u00d710'-0\"", pos: [46, 31] },
        { name: "M. BED ROOM", dims: "12'-0\"\u00d713'-0\"", pos: [41, 20] },
        { name: "C. BED ROOM", dims: "11'-0\"\u00d713'-0\"", pos: [57, 18] },
        { name: "KITCHEN", dims: "8'-0\"\u00d711'-0\"", pos: [44, 41] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [54, 24] },
      ],
    },
  ],
  sftDelivered: 21125,
  plan3d: {
    src: "/assets/projects/my-dream-skylark/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-skylark/plan-3d-800.webp 800w, /assets/projects/my-dream-skylark/plan-3d.webp 1376w",
  },
};

const MY_DREAM_GLENMORE = {
  id: 5,
  slug: "my-dream-glenmore",
  index: "05",
  title: "My Dream Glenmore",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2023",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK",
  description:
    "My Dream Glenmore is a contemporary residential development with a refined architectural character and thoughtfully planned homes. Completed in 2023, its striking dark façade, warm lighting accents and clean geometric composition give the project a distinctive modern identity in Ameenpur.",
  cover: "/assets/projects/my-dream-glenmore/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-glenmore/elevation-day.webp",
    night: "/assets/projects/my-dream-glenmore/elevation-night.webp",
    width: 2356,
    aspect: "aspect-[16/9]",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=G8PJ+7P7+My+Dream+Glenmore%2C+Ameenpur%2C+Miyapur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8d003d65dd9b%3A0x8592d5b9886688b7",
    lat: 17.5356631,
    lng: 78.3317983,
    embed: "https://www.google.com/maps?q=G8PJ+7P7+My+Dream+Glenmore,+Ameenpur,+Miyapur,+Hyderabad,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-glenmore/floor-plan.pdf",
    preview: "/assets/projects/my-dream-glenmore/floor-plan-p1.jpg",
    fileName: "My-Dream-Glenmore-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "2 BHK (FLAT 1)",
      saleableArea: "1200 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "11'-0\"\u00d715'-0\"", pos: [46, 20] },
        { name: "KITCHEN / DINING", dims: "15'-0\"\u00d714'-6\"", pos: [56, 40] },
        { name: "M. BED ROOM", dims: "11'-0\"\u00d713'-0\"", pos: [30, 45] },
        { name: "C. BED ROOM", dims: "12'-6\"\u00d710'-0\"", pos: [17, 21] },
        { name: "PUJA", dims: "5'-3\"\u00d74'-0\"", pos: [69, 17] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [19, 32] },
        { name: "UTILITY / BALCONY", dims: "4'-0\" wide", pos: [12, 12] },
      ],
    },
    {
      label: "2 BHK (FLAT 2)",
      saleableArea: "1200 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "11'-6\"\u00d713'-0\"", pos: [56, 66] },
        { name: "DINING", dims: "15'-6\"\u00d77'-6\"", pos: [42, 88] },
        { name: "KITCHEN", dims: "9'-6\"\u00d77'-0\"", pos: [66, 85] },
        { name: "M. BED ROOM", dims: "13'-0\"\u00d710'-6\"", pos: [23, 83] },
        { name: "C. BED ROOM", dims: "11'-0\"\u00d79'-6\"", pos: [37, 66] },
        { name: "PUJA", dims: "3'-3\"\u00d74'-0\"", pos: [73, 72] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [25, 75] },
        { name: "BALCONY", dims: "3'-6\" wide", pos: [9, 63] },
        { name: "UTILITY", dims: "4'-0\" wide", pos: [68, 80] },
      ],
    },
  ],
  sftDelivered: 12000,
  plan3d: {
    src: "/assets/projects/my-dream-glenmore/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-glenmore/plan-3d-800.webp 800w, /assets/projects/my-dream-glenmore/plan-3d.webp 593w",
  },
};

const MY_DREAM_HILLOCK = {
  id: 6,
  slug: "my-dream-hillock",
  index: "06",
  title: "My Dream Hillock",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2024",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK",
  description:
    "My Dream Hillock is a contemporary residential development characterized by bold architectural lines, contrasting façade elements and generous balconies. Completed in 2024, the project combines efficient residential planning with a distinctive modern exterior designed for comfortable family living.",
  cover: "/assets/projects/my-dream-hillock/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-hillock/elevation-day.webp",
    night: "/assets/projects/my-dream-hillock/elevation-night.webp",
    width: 2654,
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=Phase+2%2C+My+Dream+Hillock%2C+Ameenpur%2C+Ramachandrapuram+%28BHEL+Township%29%2C+Miyapur%2C+Telangana+502033&ftid=0x3bcb8d001cc9ab45%3A0x6baddd4ce0c55bac",
    lat: 17.5324672,
    lng: 78.3262888,
    embed: "https://www.google.com/maps?q=Phase+2,+My+Dream+Hillock,+Ameenpur,+Ramachandrapuram+(BHEL+Township),+Miyapur,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-hillock/floor-plan.pdf",
    preview: "/assets/projects/my-dream-hillock/floor-plan-p1.jpg",
    fileName: "My-Dream-Hillock-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "2 BHK (FLAT 1)",
      saleableArea: "1100 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "19'-3\"\u00d712'-0\"", pos: [40, 22] },
        { name: "M. BED ROOM", dims: "12'-0\"\u00d712'-0\"", pos: [50, 17] },
        { name: "C. BED ROOM", dims: "12'-9\"\u00d79'-0\"", pos: [18, 41] },
        { name: "KITCHEN", dims: "7'-6\"\u00d712'-6\"", pos: [31, 39] },
        { name: "PUJA", dims: "7'-0\"\u00d73'-6\"", pos: [42, 10] },
        { name: "A. TOILET", dims: "8'-0\"\u00d74'-0\"", pos: [26, 22] },
        { name: "UTILITY", dims: "5'-0\" wide", pos: [26, 52] },
        { name: "BALCONY", dims: "5'-6\" wide", pos: [17, 55] },
      ],
    },
    {
      label: "2 BHK (FLAT 2)",
      saleableArea: "1050 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "19'-3\"\u00d712'-6\"", pos: [72, 42] },
        { name: "M. BED ROOM", dims: "10'-0\"\u00d714'-9\"", pos: [75, 32] },
        { name: "C. BED ROOM", dims: "11'-6\"\u00d710'-0\"", pos: [61, 62] },
        { name: "KITCHEN", dims: "9'-0\"\u00d78'-0\"", pos: [79, 62] },
        { name: "PUJA", dims: "3'-6\"\u00d74'-0\"", pos: [82, 26] },
        { name: "A. TOILET", dims: "4'-0\"\u00d77'-0\"", pos: [68, 25] },
        { name: "UTILITY", dims: "6'-3\"\u00d78'-3\"", pos: [70, 55] },
        { name: "SIT-OUT", dims: "5'-0\"\u00d76'-6\"", pos: [68, 78] },
      ],
    },
  ],
  sftDelivered: 10750,
  plan3d: {
    src: "/assets/projects/my-dream-hillock/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-hillock/plan-3d-800.webp 800w, /assets/projects/my-dream-hillock/plan-3d.webp 1191w",
  },
};

const MY_DREAM_SUMMIT = {
  id: 7,
  slug: "my-dream-summit",
  index: "07",
  title: "My Dream Summit",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2024",
  floors: "G+5",
  totalFlats: 15,
  flatMix: "2 BHK + 3 BHK",
  description:
    "My Dream Summit is a contemporary residential development designed around spacious layouts and comfortable family living. Completed in 2024, its strong geometric façade, warm architectural accents and generous balconies create a distinctive modern identity in Ameenpur.",
  cover: "/assets/projects/my-dream-summit/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-summit/elevation-day.webp",
    night: "/assets/projects/my-dream-summit/elevation-night.webp",
    width: 2508,
    aspect: "aspect-[2/1]",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=G8C8+Q9C+My+Dream+Summit%2C+Ameenpur%2C+Miyapur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8d0031b068a5%3A0x990f1965bc2227f",
    lat: 17.5219264,
    lng: 78.3158885,
    embed: "https://www.google.com/maps?q=G8C8+Q9C+My+Dream+Summit,+Ameenpur,+Miyapur,+Hyderabad,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-summit/floor-plan.pdf",
    preview: "/assets/projects/my-dream-summit/floor-plan-p1.jpg",
    fileName: "My-Dream-Summit-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK",
      saleableArea: "1675 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "12'-0\"\u00d721'-6\"", pos: [66, 57] },
        { name: "DINING", dims: "10'-0\"\u00d713'-6\"", pos: [53, 50] },
        { name: "M. BED ROOM", dims: "14'-0\"\u00d712'-0\"", pos: [67, 36] },
        { name: "G. BED ROOM", dims: "12'-0\"\u00d711'-0\"", pos: [51, 37] },
        { name: "C. BED ROOM", dims: "10'-0\"\u00d713'-6\"", pos: [66, 43] },
        { name: "KITCHEN", dims: "11'-0\"\u00d79'-0\"", pos: [51, 59] },
        { name: "PUJA", dims: "4'-0\"\u00d75'-6\"", pos: [74, 45] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [61, 32] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [79, 60] },
      ],
    },
    {
      label: "2 BHK (MIDDLE)",
      saleableArea: "1200 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "11'-0\"\u00d716'-0\"", pos: [41, 14] },
        { name: "DINING", dims: "11'-0\"\u00d711'-0\"", pos: [33, 22] },
        { name: "M. BED ROOM", dims: "11'-0\"\u00d713'-0\"", pos: [19, 12] },
        { name: "C. BED ROOM", dims: "10'-0\"\u00d713'-0\"", pos: [34, 44] },
        { name: "KITCHEN", dims: "9'-6\"\u00d79'-0\"", pos: [19, 22] },
        { name: "PUJA", dims: "4'-0\"\u00d73'-0\"", pos: [44, 20] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [31, 11] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [45, 7] },
      ],
    },
    {
      label: "2 BHK (RIGHT)",
      saleableArea: "1200 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "11'-0\"\u00d715'-0\"", pos: [33, 62] },
        { name: "KITCHEN / DINING", dims: "10'-0\"\u00d718'-6\"", pos: [22, 57] },
        { name: "M. BED ROOM", dims: "13'-0\"\u00d711'-0\"", pos: [19, 40] },
        { name: "C. BED ROOM", dims: "13'-0\"\u00d710'-6\"", pos: [34, 44] },
        { name: "SIT-OUT", dims: "6'-0\"\u00d74'-6\"", pos: [14, 47] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [30, 36] },
      ],
    },
  ],
  sftDelivered: 20375,
  plan3d: {
    src: "/assets/projects/my-dream-summit/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-summit/plan-3d-800.webp 800w, /assets/projects/my-dream-summit/plan-3d.webp 864w",
  },
};

const MY_DREAM_GRIFFIN = {
  id: 8,
  slug: "my-dream-griffin",
  index: "08",
  title: "My Dream Griffin",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2024",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK + 3 BHK",
  description:
    "My Dream Griffin is a contemporary residential development defined by clean vertical lines, layered balconies and warm architectural accents. Completed in 2024, thoughtful planning combines comfortable interiors with a distinctive modern façade and strong architectural presence.",
  cover: "/assets/projects/my-dream-griffin/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-griffin/elevation-day.webp",
    night: "/assets/projects/my-dream-griffin/elevation-night.webp",
    width: 2508,
    aspect: "aspect-[2/1]",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=G8HF+QRW+My+Dream+Griffin%2C+Road+No.+2%2C+PNR+Colony%2C+Ameenpur%2C+Miyapur%2C+Hyderabad%2C+Telangana+502032&ftid=0x3bcb8d7325541845%3A0xa596a1c545c643be",
    lat: 17.5294786,
    lng: 78.3245638,
    embed: "https://www.google.com/maps?q=G8HF+QRW+My+Dream+Griffin,+Road+No.+2,+PNR+Colony,+Ameenpur,+Miyapur,+Hyderabad,+Telangana+502032&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-griffin/floor-plan.pdf",
    preview: "/assets/projects/my-dream-griffin/floor-plan-p1.jpg",
    fileName: "My-Dream-Griffin-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK",
      saleableArea: "1600 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "12'-0\"\u00d718'-0\"", pos: [71, 28] },
        { name: "M. BED ROOM", dims: "15'-0\"\u00d710'-0\"", pos: [61, 19] },
        { name: "C. BED ROOM", dims: "10'-0\"\u00d713'-0\"", pos: [85, 36] },
        { name: "STUDY ROOM", dims: "10'-0\"\u00d77'-0\"", pos: [69, 8] },
        { name: "KITCHEN", dims: "8'-6\"\u00d710'-6\"", pos: [91, 22] },
        { name: "PUJA", dims: null, pos: [80, 12] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [94, 34] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [55, 10] },
      ],
    },
    {
      label: "2 BHK",
      saleableArea: "1220 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "12'-0\"\u00d723'-0\"", pos: [39, 54] },
        { name: "M. BED ROOM", dims: "14'-0\"\u00d712'-0\"", pos: [28, 45] },
        { name: "C. BED ROOM", dims: "10'-6\"\u00d712'-0\"", pos: [61, 63] },
        { name: "KITCHEN", dims: "11'-0\"\u00d79'-0\"", pos: [57, 48] },
        { name: "PUJA", dims: "4'-0\"\u00d76'-0\"", pos: [51, 66] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [71, 55] },
        { name: "BALCONY", dims: "4'-6\" wide", pos: [18, 58] },
      ],
    },
  ],
  sftDelivered: 14100,
  plan3d: {
    src: "/assets/projects/my-dream-griffin/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-griffin/plan-3d-800.webp 800w, /assets/projects/my-dream-griffin/plan-3d.webp 1184w",
  },
};

const MY_DREAM_SELENE = {
  id: 9,
  slug: "my-dream-selene",
  index: "09",
  title: "My Dream Selene",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2025",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "3 BHK",
  description:
    "My Dream Selene is a contemporary residential development combining spacious homes with a bold and elegant architectural expression. Completed in 2025, its layered balconies, warm façade accents and thoughtfully planned interiors create a refined environment for modern family living.",
  cover: "/assets/projects/my-dream-selene/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-selene/elevation-day.webp",
    night: "/assets/projects/my-dream-selene/elevation-night.webp",
    width: 2508,
    aspect: "aspect-[2.2/1]",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=MY+DREAM+SELENE%2C+Sai+Rajeshwari+phase+2%2C+Ameenpur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8dbc938ad3b9%3A0x8096477f0ac3f976",
    lat: 17.5334676,
    lng: 78.3293553,
    embed: "https://www.google.com/maps?q=MY+DREAM+SELENE,+Sai+Rajeshwari+phase+2,+Ameenpur,+Hyderabad,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-selene/floor-plan.pdf",
    preview: "/assets/projects/my-dream-selene/floor-plan-p1.jpg",
    fileName: "My-Dream-Selene-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK (FLAT 1)",
      saleableArea: "1700 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "22'-6\"\u00d714'-0\"", pos: [35, 60] },
        { name: "M. BED ROOM", dims: "15'-0\"\u00d711'-6\"", pos: [17, 43] },
        { name: "C. BED ROOM", dims: "13'-6\"\u00d711'-6\"", pos: [32, 32] },
        { name: "C. BED ROOM", dims: "11'-6\"\u00d711'-0\"", pos: [39, 81] },
        { name: "KITCHEN", dims: "10'-3\"\u00d712'-6\"", pos: [34, 69] },
        { name: "PUJA", dims: "6'-3\"\u00d74'-0\"", pos: [36, 36] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [8, 35] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [10, 60] },
      ],
    },
    {
      label: "3 BHK (FLAT 2)",
      saleableArea: "1650 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "23'-0\"\u00d714'-0\"", pos: [62, 44] },
        { name: "M. BED ROOM", dims: "14'-6\"\u00d711'-6\"", pos: [63, 17] },
        { name: "C. BED ROOM", dims: "13'-0\"\u00d711'-0\"", pos: [52, 30] },
        { name: "C. BED ROOM", dims: "11'-6\"\u00d711'-0\"", pos: [72, 58] },
        { name: "KITCHEN", dims: "8'-0\"\u00d712'-6\"", pos: [86, 41] },
        { name: "PUJA", dims: "7'-0\"\u00d74'-0\"", pos: [67, 21] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [65, 50] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [79, 69] },
      ],
    },
  ],
  sftDelivered: 16750,
  plan3d: {
    src: "/assets/projects/my-dream-selene/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-selene/plan-3d-800.webp 800w, /assets/projects/my-dream-selene/plan-3d.webp 976w",
  },
};

const MY_DREAM_ATLANTIS = {
  id: 10,
  slug: "my-dream-atlantis",
  index: "10",
  title: "My Dream Atlantis",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2025",
  floors: "G+5",
  totalFlats: 15,
  flatMix: "2 BHK",
  description:
    "My Dream Atlantis is a contemporary residential development designed around spacious living, thoughtful planning and modern architectural detailing. Completed in 2025 and located near Ameenpur Lake, the project combines well-planned residences with a sophisticated façade and comfortable residential setting.",
  cover: "/assets/projects/my-dream-atlantis/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-atlantis/elevation-day.webp",
    night: "/assets/projects/my-dream-atlantis/elevation-night.webp",
    width: 2690,
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=G8MJ+J5R+My+Dream+Atlantis%2C+Shanthi+Sree+Nagar+Colony%2C+Ameenpur%2C+Miyapur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8d003b5bbaf7%3A0xda2a75fbf62b8b9a",
    lat: 17.533505,
    lng: 78.3301387,
    embed: "https://www.google.com/maps?q=G8MJ+J5R+My+Dream+Atlantis,+Shanthi+Sree+Nagar+Colony,+Ameenpur,+Miyapur,+Hyderabad,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-atlantis/floor-plan.pdf",
    preview: "/assets/projects/my-dream-atlantis/floor-plan-p1.jpg",
    fileName: "My-Dream-Atlantis-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "2 BHK (FLAT 1)",
      saleableArea: "1010 SFT",
      labels: [
        { name: "LIVING", dims: "17'-4\"\u00d710'-0\"", pos: [45, 9] },
        { name: "DINING", dims: "11'-6\"\u00d75'-9\"", pos: [31, 26] },
        { name: "KITCHEN", dims: "10'-3\"\u00d76'-9\"", pos: [47, 27] },
        { name: "M. BED ROOM", dims: "13'-7\"\u00d710'-1\"", pos: [19, 13] },
        { name: "C. BED ROOM", dims: "12'-0\"\u00d710'-0\"", pos: [18, 30] },
        { name: "TOILETS \u00d72", dims: null, pos: [8, 16] },
        { name: "BALCONY \u00d72", dims: null, pos: [8, 40] },
      ],
    },
    {
      label: "2 BHK (FLAT 2)",
      saleableArea: "1010 SFT",
      labels: [
        { name: "LIVING", dims: "17'-4\"\u00d710'-0\"", pos: [46, 63] },
        { name: "DINING", dims: "9'-0\"\u00d77'-4\"", pos: [40, 59] },
        { name: "KITCHEN", dims: "8'-0\"\u00d78'-0\"", pos: [45, 80] },
        { name: "M. BED ROOM", dims: "13'-7\"\u00d710'-1\"", pos: [15, 66] },
        { name: "C. BED ROOM", dims: "12'-0\"\u00d710'-0\"", pos: [18, 48] },
        { name: "TOILET", dims: "4'-0\"\u00d76'-4\"", pos: [8, 51] },
        { name: "BALCONY", dims: "9'-0\"\u00d74'-6\"", pos: [38, 92] },
      ],
    },
    {
      label: "2 BHK (FLAT 3)",
      saleableArea: "1031 SFT",
      labels: [
        { name: "LIVING", dims: "12'-0\"\u00d711'-1\"", pos: [85, 37] },
        { name: "DINING", dims: "8'-0\"\u00d711'-1\"", pos: [87, 30] },
        { name: "KITCHEN", dims: "8'-0\"\u00d79'-1\"", pos: [92, 60] },
        { name: "M. BED ROOM", dims: "11'-7\"\u00d713'-6\"", pos: [74, 13] },
        { name: "C. BED ROOM", dims: "13'-0\"\u00d712'-0\"", pos: [81, 17] },
        { name: "TOILET", dims: "8'-0\"\u00d74'-0\"", pos: [98, 68] },
        { name: "BALCONY", dims: "12'-9\"\u00d74'-0\"", pos: [90, 11] },
      ],
    },
  ],
  sftDelivered: 15255,
  plan3d: {
    src: "/assets/projects/my-dream-atlantis/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-atlantis/plan-3d-800.webp 800w, /assets/projects/my-dream-atlantis/plan-3d.webp 1199w",
  },
};

const MY_DREAM_PERCH = {
  id: 11,
  slug: "my-dream-perch",
  index: "11",
  title: "My Dream Perch",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2026",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK",
  description:
    "My Dream Perch is a thoughtfully designed residential development combining contemporary architecture with efficient, comfortable living spaces. Completed in 2026, its warm façade textures, framed balconies and clean vertical elements create an elegant architectural identity for modern family living.",
  cover: "/assets/projects/my-dream-perch/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-perch/elevation-day.webp",
    night: "/assets/projects/my-dream-perch/elevation-night.webp",
    width: 2508,
    aspect: "aspect-[2/1]",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=My+Dream+Perch%2C+Sai+Rajeswari+Phase+II%2C+Ameenpur+Coco+Cola+Road%2C+Ameenpur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8d003ac406f7%3A0x52371ac9b8618938",
    lat: 17.5333656,
    lng: 78.3276148,
    embed: "https://www.google.com/maps?q=My+Dream+Perch,+Sai+Rajeswari+Phase+II,+Ameenpur+Coco+Cola+Road,+Ameenpur,+Hyderabad,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-perch/floor-plan.pdf",
    preview: "/assets/projects/my-dream-perch/floor-plan-p1.jpg",
    fileName: "My-Dream-Perch-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "2 BHK (FLAT 1)",
      saleableArea: "1200 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "13'-0\"\u00d720'-0\"", pos: [30, 55] },
        { name: "PUJA / KITCHEN", dims: "14'-6\"\u00d78'-0\"", pos: [42, 15] },
        { name: "M. BED ROOM", dims: "13'-0\"\u00d711'-9\"", pos: [15, 63] },
        { name: "C. BED ROOM", dims: "10'-6\"\u00d712'-0\"", pos: [39, 80] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [37, 90] },
        { name: "BALCONY", dims: "5'-6\"\u00d76'-6\"", pos: [62, 97] },
      ],
    },
    {
      label: "2 BHK (FLAT 2)",
      saleableArea: "1240 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "13'-0\"\u00d720'-0\"", pos: [72, 45] },
        { name: "PUJA / KITCHEN", dims: "14'-6\"\u00d78'-6\"", pos: [63, 16] },
        { name: "M. BED ROOM", dims: "13'-0\"\u00d711'-6\"", pos: [73, 90] },
        { name: "C. BED ROOM", dims: "10'-6\"\u00d712'-0\"", pos: [50, 55] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [46, 68] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [13, 30] },
      ],
    },
  ],
  sftDelivered: 12200,
  plan3d: {
    src: "/assets/projects/my-dream-perch/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-perch/plan-3d-800.webp 800w, /assets/projects/my-dream-perch/plan-3d.webp 896w",
  },
};

const MY_DREAM_SOLACE = {
  id: 12,
  slug: "my-dream-solace",
  index: "12",
  title: "My Dream Solace",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2026",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "3 BHK",
  description:
    "My Dream Solace is a contemporary residential development designed to offer spacious, comfortable homes within a refined architectural setting. Completed in 2026, its elegant vertical façade, generous balconies and contrasting material finishes create a sophisticated residential identity.",
  cover: "/assets/projects/my-dream-solace/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-solace/elevation-day.webp",
    night: "/assets/projects/my-dream-solace/elevation-night.webp",
    width: 2364,
    aspect: "aspect-[9/5]",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=My+Dream+Solace%2C+Ameenpur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8d0059e43605%3A0x82606448b8b5712b",
    lat: 17.5366479,
    lng: 78.326096,
    embed: "https://www.google.com/maps?q=My+Dream+Solace,+Ameenpur,+Hyderabad,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-solace/floor-plan.pdf",
    preview: "/assets/projects/my-dream-solace/floor-plan-p1.jpg",
    fileName: "My-Dream-Solace-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK (FLAT 1)",
      saleableArea: "1675 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "15'-6\"\u00d711'-0\"", pos: [35, 20] },
        { name: "DINING", dims: "11'-0\"\u00d712'-0\"", pos: [30, 36] },
        { name: "M. BED ROOM", dims: "14'-0\"\u00d712'-0\"", pos: [32, 14] },
        { name: "C. BED ROOM", dims: "12'-6\"\u00d711'-0\"", pos: [20, 12] },
        { name: "KITCHEN", dims: "10'-6\"\u00d78'-0\"", pos: [20, 27] },
        { name: "PUJA", dims: null, pos: [45, 15] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [12, 20] },
        { name: "UTILITY", dims: "4'-0\" wide", pos: [38, 30] },
        { name: "BALCONY", dims: "4'-9\" wide", pos: [10, 45] },
      ],
    },
    {
      label: "3 BHK (FLAT 2)",
      saleableArea: "1275 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "11'-0\"\u00d716'-6\"", pos: [72, 70] },
        { name: "DINING", dims: "10'-0\"\u00d715'-0\"", pos: [62, 60] },
        { name: "M. BED ROOM", dims: "13'-6\"\u00d713'-0\"", pos: [32, 85] },
        { name: "C. BED ROOM", dims: "13'-0\"\u00d712'-6\"", pos: [24, 63] },
        { name: "C. BED ROOM", dims: "10'-0\"\u00d713'-0\"", pos: [47, 72] },
        { name: "KITCHEN", dims: "11'-0\"\u00d710'-0\"", pos: [72, 90] },
        { name: "PUJA", dims: "4'-0\"\u00d74'-3\"", pos: [62, 73] },
        { name: "A. TOILETS \u00d72 + C. TOILET", dims: null, pos: [18, 80] },
        { name: "UTILITY", dims: "4'-3\" wide", pos: [85, 85] },
        { name: "BALCONY \u00d72", dims: null, pos: [55, 95] },
      ],
    },
  ],
  sftDelivered: 14750,
  plan3d: {
    src: "/assets/projects/my-dream-solace/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-solace/plan-3d-800.webp 800w, /assets/projects/my-dream-solace/plan-3d.webp 896w",
  },
};

const MY_DREAM_ZENITH = {
  id: 13,
  slug: "my-dream-zenith",
  index: "13",
  title: "My Dream Zenith",
  status: "completed",
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "2026",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK + 3 BHK",
  description:
    "My Dream Zenith is a contemporary residential development characterized by bold geometric forms, clean façade lines and thoughtfully planned living spaces. Completed in 2026, its modern architectural language and practical layouts create a distinctive residential environment designed around comfortable family living.",
  cover: "/assets/projects/my-dream-zenith/elevation.jpg",
  elevationModes: {
    day: "/assets/projects/my-dream-zenith/elevation-day.webp",
    night: "/assets/projects/my-dream-zenith/elevation-night.webp",
    width: 2574,
    aspect: "aspect-[2.15/1]",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=My+Dream+Zenith%2C+Rajeshwari%2C+Phase+2%2C+Ameenpur%2C+Miyapur%2C+Hyderabad%2C+Telangana+502033&ftid=0x3bcb8d0056500ccb%3A0x5547acfdc25dc8a7",
    lat: 17.533623,
    lng: 78.328863,
    embed: "https://www.google.com/maps?q=My+Dream+Zenith,+Rajeshwari,+Phase+2,+Ameenpur,+Miyapur,+Hyderabad,+Telangana+502033&output=embed",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-zenith/floor-plan.pdf",
    preview: "/assets/projects/my-dream-zenith/floor-plan-p1.jpg",
    fileName: "My-Dream-Zenith-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK",
      saleableArea: "1265 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "16'-0\"\u00d710'-0\"", pos: [62, 11] },
        { name: "KITCHEN / DINING", dims: "17'-0\"\u00d710'-0\"", pos: [52, 26] },
        { name: "M. BED ROOM", dims: "14'-0\"\u00d710'-0\"", pos: [29, 12] },
        { name: "C. BED ROOM", dims: "12'-6\"\u00d710'-0\"", pos: [27, 26] },
        { name: "STUDY ROOM", dims: "5'-6\"\u00d710'-0\"", pos: [44, 10] },
        { name: "PUJA", dims: "3'-6\"\u00d74'-6\"", pos: [46, 18] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [18, 12] },
        { name: "BALCONY", dims: "4'-6\" wide", pos: [75, 16] },
      ],
    },
    {
      label: "2 BHK",
      saleableArea: "1225 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "16'-6\"\u00d710'-0\"", pos: [70, 45] },
        { name: "KITCHEN / DINING", dims: "18'-6\"\u00d710'-0\"", pos: [66, 60] },
        { name: "M. BED ROOM", dims: "14'-6\"\u00d710'-0\"", pos: [23, 64] },
        { name: "C. BED ROOM", dims: "13'-3\"\u00d710'-0\"", pos: [32, 49] },
        { name: "PUJA / STUDY", dims: "8'-0\"\u00d710'-0\"", pos: [56, 46] },
        { name: "SIT-OUT", dims: "9'-6\"\u00d76'-0\"", pos: [79, 55] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [17, 44] },
        { name: "UTILITY", dims: "4'-0\" wide", pos: [74, 70] },
      ],
    },
  ],
  sftDelivered: 12450,
  plan3d: {
    src: "/assets/projects/my-dream-zenith/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-zenith/plan-3d-800.webp 800w, /assets/projects/my-dream-zenith/plan-3d.webp 848w",
  },
};

const MY_DREAM_AURELIA = {
  id: 14,
  slug: "my-dream-aurelia",
  index: "14",
  title: "My Dream Aurelia",
  status: "ongoing",
  pricePerSft: PRICING.ratePerSft,
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "—",
  floors: "G+5",
  totalFlats: 15,
  flatMix: "2 BHK",
  description:
    "My Dream Aurelia is an upcoming residential development by My Dream Projects in Ameenpur, thoughtfully planned for contemporary family living. The project is currently under development, with its architectural elevation to be revealed soon.",
  floorPlan: {
    pdf: "/assets/projects/my-dream-aurelia/floor-plan.pdf",
    preview: "/assets/projects/my-dream-aurelia/floor-plan-p1.jpg",
    fileName: "My-Dream-Aurelia-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "2 BHK (FLAT 1)",
      saleableArea: "1250 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "16'-0\"\u00d710'-0\"", pos: [62, 14] },
        { name: "KITCHEN / DINING", dims: "15'-6\"\u00d710'-0\"", pos: [60, 25] },
        { name: "M. BED ROOM", dims: "13'-0\"\u00d710'-0\"", pos: [38, 16] },
        { name: "C. BED ROOM", dims: "12'-6\"\u00d710'-0\"", pos: [27, 26] },
        { name: "PUJA", dims: "4'-0\"\u00d74'-0\"", pos: [77, 10] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [23, 13] },
        { name: "BALCONY / UTILITY", dims: "4'-0\" wide", pos: [70, 18] },
      ],
    },
    {
      label: "2 BHK (FLAT 2)",
      saleableArea: "1040 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "10'-0\"\u00d714'-0\"", pos: [37, 43] },
        { name: "DINING", dims: "11'-0\"\u00d79'-0\"", pos: [28, 56] },
        { name: "KITCHEN", dims: "8'-0\"\u00d79'-0\"", pos: [32, 70] },
        { name: "M. BED ROOM", dims: "11'-6\"\u00d712'-0\"", pos: [22, 44] },
        { name: "C. BED ROOM", dims: "9'-6\"\u00d711'-6\"", pos: [28, 70] },
        { name: "TOILETS \u00d72", dims: null, pos: [20, 55] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [14, 36] },
      ],
    },
    {
      label: "2 BHK (FLAT 3)",
      saleableArea: "1040 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "10'-0\"\u00d714'-0\"", pos: [72, 44] },
        { name: "DINING", dims: "11'-0\"\u00d79'-0\"", pos: [65, 56] },
        { name: "KITCHEN", dims: "8'-0\"\u00d79'-0\"", pos: [78, 67] },
        { name: "M. BED ROOM", dims: "11'-6\"\u00d712'-0\"", pos: [58, 44] },
        { name: "C. BED ROOM", dims: "9'-6\"\u00d711'-6\"", pos: [66, 70] },
        { name: "PUJA", dims: null, pos: [62, 50] },
        { name: "TOILETS \u00d72", dims: null, pos: [56, 55] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [86, 60] },
      ],
    },
  ],
  plan3d: {
    src: "/assets/projects/my-dream-aurelia/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-aurelia/plan-3d-800.webp 800w, /assets/projects/my-dream-aurelia/plan-3d.webp 816w",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=17.5351890%2C78.3342360",
    lat: 17.535189,
    lng: 78.334236,
    embed: "https://www.google.com/maps?q=17.5351890,78.3342360&output=embed",
  },
};

const MY_DREAM_ELYSIUM = {
  id: 15,
  slug: "my-dream-elysium",
  index: "15",
  title: "My Dream Elysium",
  status: "ongoing",
  pricePerSft: PRICING.ratePerSft,
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "—",
  floors: "G+5",
  totalFlats: 15,
  flatMix: "2 BHK",
  description:
    "My Dream Elysium is an ongoing residential development by My Dream Projects in Ameenpur, thoughtfully planned to combine contemporary living with efficient and comfortable residential spaces. Its architectural elevation is currently under development and will be revealed soon.",
  floorPlan: {
    pdf: "/assets/projects/my-dream-elysium/floor-plan.pdf",
    preview: "/assets/projects/my-dream-elysium/floor-plan-p1.jpg",
    fileName: "My-Dream-Elysium-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "2 BHK (FLAT 1)",
      saleableArea: "1250 SFT",
      labels: [
        { name: "LIVING", dims: "10'-0\"\u00d715'-7\u00bd\"", pos: [14, 25] },
        { name: "KITCHEN / DINING", dims: "10'-0\"\u00d715'-9\"", pos: [28, 30] },
        { name: "M. BED ROOM", dims: "10'-0\"\u00d713'-0\"", pos: [19, 63] },
        { name: "C. BED ROOM", dims: "10'-0\"\u00d712'-1\u00bd\"", pos: [27, 57] },
        { name: "PUJA", dims: "4'-0\"\u00d74'-1\u00bd\"", pos: [12, 13] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [10, 75] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [10, 45] },
      ],
    },
    {
      label: "2 BHK (FLAT 2)",
      saleableArea: "1040 SFT",
      labels: [
        { name: "LIVING", dims: "13'-0\"\u00d710'-0\"", pos: [46, 20] },
        { name: "DINING", dims: "9'-1\u00bd\"\u00d711'-0\"", pos: [59, 25] },
        { name: "KITCHEN", dims: "8'-3\"\u00d78'-0\"", pos: [70, 20] },
        { name: "M. BED ROOM", dims: "11'-3\"\u00d711'-6\"", pos: [45, 35] },
        { name: "C. BED ROOM", dims: "11'-0\"\u00d79'-6\"", pos: [80, 36] },
        { name: "PUJA", dims: "3'-0\"\u00d72'-0\"", pos: [62, 45] },
        { name: "TOILETS \u00d72", dims: null, pos: [57, 34] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [60, 10] },
      ],
    },
    {
      label: "2 BHK (FLAT 3)",
      saleableArea: "1040 SFT",
      labels: [
        { name: "LIVING", dims: "13'-0\"\u00d710'-0\"", pos: [47, 70] },
        { name: "DINING", dims: "9'-1\u00bd\"\u00d711'-0\"", pos: [59, 67] },
        { name: "KITCHEN", dims: "8'-3\"\u00d78'-0\"", pos: [72, 65] },
        { name: "M. BED ROOM", dims: "11'-3\"\u00d711'-6\"", pos: [45, 83] },
        { name: "C. BED ROOM", dims: "11'-0\"\u00d79'-6\"", pos: [82, 68] },
        { name: "TOILETS \u00d72", dims: null, pos: [58, 77] },
        { name: "BALCONY", dims: "4'-0\" wide", pos: [60, 58] },
      ],
    },
  ],
  plan3d: {
    src: "/assets/projects/my-dream-elysium/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-elysium/plan-3d-800.webp 800w, /assets/projects/my-dream-elysium/plan-3d.webp 1170w",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=17.5324900%2C78.3343810",
    lat: 17.53249,
    lng: 78.334381,
    embed: "https://www.google.com/maps?q=17.5324900,78.3343810&output=embed",
  },
};

const MY_DREAM_AURA = {
  id: 16,
  slug: "my-dream-aura",
  index: "16",
  title: "My Dream Aura",
  status: "ongoing",
  pricePerSft: PRICING.ratePerSft,
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "—",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK + 3 BHK",
  description:
    "My Dream Aura is an ongoing residential development by My Dream Projects in Ameenpur, planned around comfortable family living, efficient spaces and contemporary residential design. The project’s architectural elevation is currently under development and will be revealed soon.",
  floorPlan: {
    pdf: "/assets/projects/my-dream-aura/floor-plan.pdf",
    preview: "/assets/projects/my-dream-aura/floor-plan-p1.jpg",
    fileName: "My-Dream-Aura-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK",
      saleableArea: "1680 SFT",
      labels: [
        { name: "LIVING", dims: "16'-3\"\u00d710'-0\"", pos: [75, 69] },
        { name: "M. BED ROOM", dims: "10'-6\"\u00d713'-6\"", pos: [71, 35] },
        { name: "G. BED ROOM", dims: "10'-3\"\u00d710'-0\"", pos: [68, 44] },
        { name: "KITCHEN", dims: "8'-6\"\u00d710'-9\"", pos: [51, 52] },
        { name: "PUJA", dims: "4'-9\"\u00d74'-7\u00bd\"", pos: [77, 75] },
        { name: "UTILITY", dims: "4'-7\u00bd\"\u00d710'-4\u00bd\"", pos: [60, 55] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [82, 28] },
        { name: "BALCONY", dims: "3'-0\"\u00d710'-0\"", pos: [85, 60] },
      ],
    },
    {
      label: "2 BHK",
      saleableArea: "1200 SFT",
      labels: [
        { name: "LIVING", dims: "10'-0\"\u00d714'-3\"", pos: [28, 46] },
        { name: "DINING", dims: "12'-0\"\u00d710'-0\"", pos: [33, 30] },
        { name: "M. BED ROOM", dims: "11'-0\"\u00d713'-0\"", pos: [48, 25] },
        { name: "C. BED ROOM", dims: "10'-4\u00bd\"\u00d712'-9\"", pos: [42, 11] },
        { name: "KITCHEN", dims: "7'-4\u00bd\"\u00d710'-6\"", pos: [20, 38] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [25, 21] },
        { name: "BALCONY", dims: "4'-0\"\u00d710'-0\"", pos: [55, 75] },
      ],
    },
  ],
  plan3d: {
    src: "/assets/projects/my-dream-aura/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-aura/plan-3d-800.webp 800w, /assets/projects/my-dream-aura/plan-3d.webp 1200w",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=17.5361670%2C78.3327710",
    lat: 17.536167,
    lng: 78.332771,
    embed: "https://www.google.com/maps?q=17.5361670,78.3327710&output=embed",
  },
};

const MY_DREAM_ECHELON = {
  id: 17,
  slug: "my-dream-echelon",
  index: "17",
  title: "My Dream Echelon",
  status: "ongoing",
  pricePerSft: PRICING.ratePerSft,
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "—",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2 BHK",
  description:
    "My Dream Echelon is an ongoing residential development by My Dream Projects in Ameenpur, thoughtfully planned around contemporary family living, efficient layouts and comfortable residential spaces. The project’s architectural elevation is currently under development and will be revealed soon.",
  floorPlan: {
    pdf: "/assets/projects/my-dream-echelon/floor-plan.pdf",
    preview: "/assets/projects/my-dream-echelon/floor-plan-p1.jpg",
    fileName: "My-Dream-Echelon-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "2 BHK (FLAT 1)",
      saleableArea: "1180 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "19'-3\"\u00d713'-0\"", pos: [30, 35] },
        { name: "MASTER BEDROOM", dims: "11'-3\"\u00d713'-1\u00bd\"", pos: [25, 55] },
        { name: "BEDROOM", dims: "12'-0\"\u00d710'-6\"", pos: [38, 10] },
        { name: "KITCHEN", dims: "7'-1\u00bd\"\u00d710'-1\u00bd\"", pos: [38, 10] },
        { name: "PUJA LOBBY", dims: "10'-10\u00bd\"\u00d74'-9\"", pos: [45, 30] },
        { name: "A. TOILET", dims: "7'-0\"\u00d74'-9\"", pos: [33, 49] },
        { name: "BALCONY", dims: "4'-0\"\u00d710'-6\"", pos: [15, 70] },
      ],
    },
    {
      label: "2 BHK (FLAT 2)",
      saleableArea: "1220 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "19'-3\"\u00d713'-0\"", pos: [62, 45] },
        { name: "MASTER BEDROOM", dims: "11'-3\"\u00d713'-1\u00bd\"", pos: [52, 60] },
        { name: "BEDROOM", dims: "12'-0\"\u00d710'-6\"", pos: [80, 40] },
        { name: "KITCHEN", dims: "8'-0\"\u00d710'-1\u00bd\"", pos: [63, 29] },
        { name: "PUJA LOBBY", dims: "11'-9\"\u00d74'-9\"", pos: [58, 38] },
        { name: "WASH AREA", dims: "7'-9\"\u00d74'-0\"", pos: [68, 34] },
        { name: "SIT-OUT", dims: "4'-6\"\u00d710'-10\u00bd\"", pos: [30, 75] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [75, 47] },
      ],
    },
  ],
  plan3d: {
    src: "/assets/projects/my-dream-echelon/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-echelon/plan-3d-800.webp 800w, /assets/projects/my-dream-echelon/plan-3d.webp 1200w",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=17.5334550%2C78.3300480",
    lat: 17.533455,
    lng: 78.330048,
    embed: "https://www.google.com/maps?q=17.5334550,78.3300480&output=embed",
  },
};

const MY_DREAM_VALE = {
  id: 18,
  slug: "my-dream-vale",
  index: "18",
  title: "My Dream Vale",
  status: "ongoing",
  pricePerSft: PRICING.ratePerSft,
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "—",
  floors: "G+5",
  totalFlats: 10,
  flatMix: "2½ BHK + 3 BHK",
  description:
    "My Dream Vale is an ongoing residential development by My Dream Projects in Ameenpur, thoughtfully planned to provide comfortable family living through efficient layouts and contemporary residential design. The project’s architectural elevation is currently under development and will be revealed soon.",
  floorPlan: {
    pdf: "/assets/projects/my-dream-vale/floor-plan.pdf",
    preview: "/assets/projects/my-dream-vale/floor-plan-p1.jpg",
    fileName: "My-Dream-Vale-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK",
      saleableArea: "1665 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "23'-11\u00bd\"\u00d713'-0\"", pos: [35, 33] },
        { name: "M. BED ROOM", dims: "12'-0\"\u00d713'-6\"", pos: [40, 64] },
        { name: "C. BED ROOM", dims: "14'-0\"\u00d710'-9\"", pos: [36, 20] },
        { name: "G. BED ROOM", dims: "11'-1\u00bd\"\u00d710'-10\u00bc\"", pos: [20, 35] },
        { name: "KITCHEN", dims: "8'-0\"\u00d710'-7\u00bd\"", pos: [30, 50] },
        { name: "PUJA", dims: "6'-0\"\u00d74'-0\"", pos: [26, 26] },
        { name: "UTILITY", dims: "8'-0\"\u00d74'-6\"", pos: [34, 72] },
        { name: "A. TOILETS \u00d73", dims: null, pos: [27, 41] },
        { name: "BALCONY \u00d72", dims: null, pos: [18, 58] },
      ],
    },
    {
      label: "2.5 BHK",
      saleableArea: "1440 SFT",
      labels: [
        { name: "LIVING / DINING", dims: "20'-0\"\u00d713'-0\"", pos: [60, 42] },
        { name: "M. BED ROOM", dims: "14'-0\"\u00d711'-6\"", pos: [63, 17] },
        { name: "C. BED ROOM", dims: "10'-0\"\u00d712'-3\"", pos: [63, 30] },
        { name: "STUDY ROOM", dims: "7'-9\"\u00d78'-9\"", pos: [73, 13] },
        { name: "UTILITY", dims: "9'-0\"\u00d75'-3\"", pos: [68, 66] },
        { name: "A. TOILETS \u00d72", dims: null, pos: [52, 50] },
        { name: "BALCONY \u00d72", dims: null, pos: [80, 60] },
      ],
    },
  ],
  plan3d: {
    src: "/assets/projects/my-dream-vale/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-vale/plan-3d-800.webp 800w, /assets/projects/my-dream-vale/plan-3d.webp 1148w",
  },
  siteLocation: {
    url: "https://www.google.com/maps?q=17.5353830%2C78.3208010",
    lat: 17.535383,
    lng: 78.320801,
    embed: "https://www.google.com/maps?q=17.5353830,78.3208010&output=embed",
  },
};

const MY_DREAM_IVY = {
  id: 19,
  slug: "my-dream-ivy",
  index: "19",
  title: "My Dream Ivy",
  status: "ongoing",
  pricePerSft: PRICING.ratePerSft,
  location: "Ameenpur, Hyderabad",
  type: "Residential Apartment",
  year: "—",
  floors: "G+4",
  totalFlats: 4,
  flatMix: "3 BHK",
  configuration: "3 BHK",
  description:
    "My Dream Ivy is an intimate residential development designed around privacy, spacious living and practical family needs. With one generously planned 3BHK residence on each residential floor, the project offers an exclusive living experience with thoughtfully arranged family living, dining, puja, utility and balcony spaces.",
  headline: "One Home. One Floor.",
  headlineSub: "Private Living, Elevated.",
  glance: [
    { value: "G+4", label: "Floors" },
    { value: "3 BHK", label: "Configuration" },
    { value: "1,600 sq.ft.", label: "Residence Size" },
    { value: "One Home per Floor", label: "Private Residential Concept" },
  ],
  planTagline: "One thoughtfully planned residence. An entire floor to call your own.",
  plan3d: {
    src: "/assets/projects/my-dream-ivy/plan-3d.jpg",
    srcSet:
      "/assets/projects/my-dream-ivy/plan-3d-800.webp 800w, /assets/projects/my-dream-ivy/plan-3d.webp 864w",
  },
  floorPlan: {
    pdf: "/assets/projects/my-dream-ivy/floor-plan.pdf",
    preview: "/assets/projects/my-dream-ivy/floor-plan-p1.jpg",
    fileName: "My-Dream-Ivy-Floor-Plan.pdf",
  },
  unitDetails: [
    {
      label: "3 BHK",
      saleableArea: "1600 SFT",
      labels: [
        { name: "FAMILY LIVING", dims: "10'-6\"\u00d715'-3\"", pos: [35, 58] },
        { name: "DINING", dims: "10'-0\"\u00d714'-6\u00bd\"", pos: [40, 37] },
        { name: "KITCHEN", dims: "7'-9\"\u00d710'-1\u00bd\"", pos: [20, 21] },
        { name: "UTILITY", dims: "8'-1\u00bd\"\u00d74'-0\"", pos: [19, 8] },
        { name: "PUJA", dims: "4'-0\"\u00d72'-0\"", pos: [21, 31] },
        { name: "M. BED ROOM", dims: "10'-0\"\u00d713'-0\"", pos: [75, 17] },
        { name: "C. BED ROOM", dims: "10'-0\"\u00d710'-0\"", pos: [70, 31] },
        { name: "G. BED ROOM", dims: "11'-7\u00bd\"\u00d710'-0\"", pos: [61, 56] },
        { name: "A. TOILETS \u00d73", dims: null, pos: [80, 44] },
        { name: "BALCONY", dims: "4'-0\"\u00d710'-0\"", pos: [14, 40] },
      ],
    },
  ],
  siteLocation: {
    url: "https://www.google.com/maps?q=17.5324690%2C78.3203350",
    lat: 17.532469,
    lng: 78.320335,
    embed: "https://www.google.com/maps?q=17.5324690,78.3203350&output=embed",
  },
};

export const projects = [MY_DREAM_NEST, MY_DREAM_CASA, MY_DREAM_AVASA, MY_DREAM_SKYLARK, MY_DREAM_GLENMORE, MY_DREAM_HILLOCK, MY_DREAM_SUMMIT, MY_DREAM_GRIFFIN, MY_DREAM_SELENE, MY_DREAM_ATLANTIS, MY_DREAM_PERCH, MY_DREAM_SOLACE, MY_DREAM_ZENITH, MY_DREAM_AURELIA, MY_DREAM_ELYSIUM, MY_DREAM_AURA, MY_DREAM_ECHELON, MY_DREAM_VALE, MY_DREAM_IVY];

export const projectStats = {
  total: projects.length,
  completed: projects.filter((p) => p.status === "completed").length,
  ongoing: projects.filter((p) => p.status === "ongoing").length,
};

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const getAdjacent = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};
