/**
 * LoanPartners — compact, dark-native strip of our finance partners.
 * Official brand marks (transparent backgrounds, original brand colours)
 * paired with the institution name in bone typography — no white boxes.
 */
const PARTNERS = [
  { id: "icici", name: "ICICI Bank", mark: "/assets/partners/icici-mark.png" },
  { id: "sbi", name: "State Bank of India (SBI)", mark: "/assets/partners/sbi-mark.png" },
  { id: "lic", name: "LIC", mark: "/assets/partners/lic-mark.png" },
  { id: "idbi", name: "IDBI Bank", mark: "/assets/partners/idbi-mark.png" },
];

export const LoanPartners = ({ testidPrefix = "partner" }) => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10 md:gap-x-12 sm:gap-y-4">
    {PARTNERS.map((p) => (
      <div
        key={p.id}
        data-testid={`${testidPrefix}-${p.id}`}
        className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3"
      >
        <img
          src={p.mark}
          alt={`${p.name} logo`}
          loading="lazy"
          className="h-8 md:h-9 w-auto object-contain"
        />
        <span className="font-display font-semibold text-[10px] md:text-xs uppercase tracking-[0.18em] text-bone/85">
          {p.name}
        </span>
      </div>
    ))}
  </div>
);

export default LoanPartners;
