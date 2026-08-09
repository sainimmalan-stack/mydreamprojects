const pad = (n) => String(n).padStart(2, "0");

// Business achievement statistics — CENTRALIZED, editable here only.
// Replace the null placeholders with the verified figures when ready;
// the homepage statistics band reads from this single source.
export const BUSINESS_STATS = {
  totalFlatsSold: null, // TODO: set verified number, e.g. 128
  totalSftDelivered: null, // TODO: set verified number, e.g. 185000
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
