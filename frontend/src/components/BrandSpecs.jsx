/**
 * BrandSpecs — premium architectural specification board.
 * Standard construction brands are shared across the portfolio; the lift
 * system is project-specific and renders ONLY when project.liftBrand is set
 * ("kone" | "vasavi") in projects.js — assign per project once confirmed.
 * All marks are official logos on transparent backgrounds, dark-native.
 */
const SPEC_BOARD = [
  { id: "paints", label: "Paints", brands: [{ name: "Asian Paints", logo: "/assets/brands/asian-paints.png" }] },
  {
    id: "sanitary",
    label: "Sanitary & Plumbing",
    brands: [
      { name: "Hindware", logo: "/assets/brands/hindware.png", h: "h-5 md:h-6" },
      { name: "CERA", logo: "/assets/brands/cera.png" },
      { name: "Ashirvad", logo: "/assets/brands/ashirvad.png", h: "h-7 md:h-8" },
    ],
  },
  { id: "windows", label: "uPVC Windows", brands: [{ name: "VEKA", logo: "/assets/brands/veka.png", h: "h-12 md:h-14" }] },
  {
    id: "lighting",
    label: "Lighting",
    brands: [
      { name: "Syska", logo: "/assets/brands/syska.png" },
      { name: "Crompton", logo: "/assets/brands/crompton.png" },
    ],
  },
  {
    id: "cement",
    label: "Cement",
    brands: [
      { name: "KCP", logo: "/assets/brands/kcp.png", h: "h-11 md:h-14" },
      { name: "UltraTech", logo: "/assets/brands/ultratech.png" },
    ],
  },
  { id: "wiring", label: "Wiring", brands: [{ name: "Polycab", logo: "/assets/brands/polycab.png", h: "h-11 md:h-14" }] },
  { id: "switches", label: "Switches", brands: [{ name: "Legrand", logo: "/assets/brands/legrand.png" }] },
  // typography only — no tile company logo, per owner
  { id: "tiles", label: "Tiles", text: "Vitrified Tiles" },
];

const LIFT_BRANDS = {
  kone: { name: "KONE", logo: "/assets/brands/kone.png", h: "h-10 md:h-12" },
  vasavi: { name: "Vasavi Elevators", logo: "/assets/brands/vasavi.png", h: "h-10 md:h-12" },
};

export const BrandSpecs = ({ liftBrand = null }) => {
  const rows = [...SPEC_BOARD];
  const lift = liftBrand ? LIFT_BRANDS[liftBrand] : null;
  if (lift) rows.push({ id: "lifts", label: "Automatic Lifts", brands: [lift] });

  return (
    <section data-testid="project-specs" className="border-b border-line">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 mb-8 md:mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Brands &amp; Specifications</p>
          <p className="text-[9px] uppercase tracking-[0.25em] text-concrete/70">
            Specification partners may vary by project
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-14 border-t border-line">
          {rows.map((r) => (
            <div
              key={r.id}
              data-testid={`spec-${r.id}`}
              className="flex flex-col items-center text-center gap-3.5 py-5 md:py-6 border-b border-line sm:flex-row sm:text-left sm:items-center sm:justify-between sm:gap-6"
            >
              <p className="text-[9px] uppercase tracking-[0.3em] text-concrete shrink-0">{r.label}</p>
              <div className="flex items-center justify-center gap-5 flex-wrap sm:justify-end">
                {r.brands?.map((b) => (
                  <img
                    key={b.name}
                    src={b.logo}
                    alt={`${b.name} logo`}
                    title={b.name}
                    loading="lazy"
                    className={`${b.h || "h-6 md:h-7"} w-auto object-contain`}
                  />
                ))}
                {r.text && (
                  <span className="font-display font-semibold text-sm tracking-wide text-bone/85">{r.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSpecs;
