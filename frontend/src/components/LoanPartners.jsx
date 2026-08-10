/**
 * LoanPartners — compact, dark-native strip of our finance partners.
 * Official brand marks (transparent backgrounds, original brand colours)
 * paired with the institution name in bone typography — no white boxes.
 */
const PARTNERS = [
  { id: "icici", name: "ICICI Bank", mark: "/assets/partners/icici-mark.png" },
  { id: "sbi", name: "State Bank of India (SBI)", mark: "/assets/partners/sbi-mark.png" },
  { id: "lic", name: "LIC", mark: "/assets/partners/lic-mark.png" },
];

export const LoanPartners = ({ testidPrefix = "partner" }) => (
  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:gap-x-12">
    {PARTNERS.map((p) => (
      <div key={p.id} data-testid={`${testidPrefix}-${p.id}`} className="flex items-center gap-3">
        <img
          src={p.mark}
          alt={`${p.name} logo`}
          loading="lazy"
          className="h-7 md:h-8 w-auto object-contain"
        />
        <span className="font-display font-semibold text-[11px] md:text-xs uppercase tracking-[0.18em] text-bone/85 whitespace-nowrap">
          {p.name}
        </span>
      </div>
    ))}
  </div>
);

export default LoanPartners;
