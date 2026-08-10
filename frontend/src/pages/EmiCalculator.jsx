import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import LoanPartners from "../components/LoanPartners";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

const INR = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const fmtINR = (n) => `₹${INR.format(Math.round(n))}`;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const LIMITS = {
  amount: { min: 100000, max: 50000000, step: 50000, hintMin: "₹1 L", hintMax: "₹5 Cr" },
  rate: { min: 1, max: 20, step: 0.05, hintMin: "1%", hintMax: "20%" },
  years: { min: 1, max: 30, step: 1, hintMin: "1 yr", hintMax: "30 yrs" },
  months: { min: 6, max: 360, step: 6, hintMin: "6 mo", hintMax: "360 mo" },
};

const SliderField = ({ label, suffix, value, limits, onChange, testid }) => (
  <div data-testid={testid}>
    <div className="flex items-end justify-between gap-4 mb-4 md:mb-6">
      <p className="text-[10px] uppercase tracking-[0.35em] text-concrete">{label}</p>
      <div className="flex items-baseline gap-2.5">
        <input
          type="number"
          value={value}
          min={limits.min}
          max={limits.max}
          step={limits.step}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (Number.isFinite(v)) onChange(clamp(v, limits.min, limits.max));
          }}
          data-testid={`${testid}-input`}
          aria-label={label}
          className="field-input emi-num w-32 md:w-44 !py-1 text-right font-display font-semibold text-lg md:text-2xl tracking-tight text-bone"
        />
        <span className="text-[10px] uppercase tracking-[0.2em] text-concrete shrink-0">{suffix}</span>
      </div>
    </div>
    <input
      type="range"
      min={limits.min}
      max={limits.max}
      step={limits.step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      data-testid={`${testid}-slider`}
      aria-label={`${label} slider`}
      className="emi-slider"
    />
    <div className="flex justify-between mt-2 text-[9px] uppercase tracking-[0.2em] text-concrete/70">
      <span>{limits.hintMin}</span>
      <span>{limits.hintMax}</span>
    </div>
  </div>
);

const ResultRow = ({ label, value, testid, strong = false }) => (
  <div className="flex items-baseline justify-between gap-6">
    <span className="text-[10px] uppercase tracking-[0.25em] text-concrete">{label}</span>
    <span
      data-testid={testid}
      className={`font-display tracking-tight tabular-nums ${strong ? "text-xl md:text-2xl text-bone" : "text-lg text-bone/85"}`}
    >
      {value}
    </span>
  </div>
);

export default function EmiCalculator() {
  useSeo({
    title: "EMI Calculator | Home Loan EMI in Ameenpur | My Dream Projects",
    description:
      "Calculate your home loan EMI instantly with the My Dream Projects EMI calculator. Adjust loan amount, interest rate and tenure to see your monthly EMI, total interest and total payable in ₹.",
    image: "/assets/og-image.jpg",
  });

  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(() => {
    const pre = Number(searchParams.get("amount"));
    return Number.isFinite(pre) && pre > 0
      ? clamp(Math.round(pre), LIMITS.amount.min, LIMITS.amount.max)
      : 5000000;
  });
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [unit, setUnit] = useState("years");

  const { emi, interest, total, months } = useMemo(() => {
    const m = unit === "years" ? tenure * 12 : tenure;
    const r = rate / 1200;
    const e = r === 0 ? amount / m : (amount * r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1);
    const t = e * m;
    return { emi: e, interest: t - amount, total: t, months: m };
  }, [amount, rate, tenure, unit]);

  const interestShare = total > 0 ? clamp((interest / total) * 100, 0, 100) : 0;
  const tenureLimits = unit === "years" ? LIMITS.years : LIMITS.months;

  const shareUrl = `https://wa.me/?text=${encodeURIComponent(
    [
      "Home Loan EMI Estimate — My Dream Projects",
      `Loan Amount: ${fmtINR(amount)}`,
      `Interest Rate: ${rate}% p.a.`,
      `Tenure: ${unit === "years" ? `${tenure} years` : `${tenure} months`} (${months} months)`,
      `Monthly EMI: ${fmtINR(emi)}`,
      `Total Interest: ${fmtINR(interest)}`,
      `Total Amount Payable: ${fmtINR(total)}`,
      "",
      "Indicative estimate — actual EMI may vary based on lender terms, interest rate and applicable charges.",
      "Calculate yours: https://mydreamprojects.in/emi-calculator",
    ].join("\n")
  )}`;

  const switchUnit = (next) => {
    if (next === unit) return;
    setTenure((t) =>
      next === "months"
        ? clamp(t * 12, LIMITS.months.min, LIMITS.months.max)
        : clamp(Math.round(t / 12), LIMITS.years.min, LIMITS.years.max)
    );
    setUnit(next);
  };

  return (
    <div data-testid="emi-page" className="pt-24 md:pt-40">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24 md:pb-40">
        <header className="pb-6 md:pb-24">
          <Reveal className="text-[10px] uppercase tracking-[0.4em] text-ember mb-4 md:mb-6">
            <p>EMI Calculator</p>
          </Reveal>
          <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-[8.5vw] md:text-[6.2vw] text-bone">
            <span className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: EASE }}>
                Plan your home loan,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block text-concrete" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.25, ease: EASE }}>
                beautifully.
              </motion.span>
            </span>
          </h1>
          <Reveal delay={0.35} className="hidden md:block mt-5 md:mt-8 max-w-xl">
            <p className="text-sm md:text-base text-bone/75 leading-relaxed">
              Estimate the monthly outgo for your My Dream residence — instantly, with no
              sign-up. Adjust the loan amount, interest rate and tenure to see your EMI in
              real time.
            </p>
          </Reveal>
        </header>

        <div className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-y-14 border-t border-line pt-6 md:pt-20">
          <Reveal className="col-span-12 lg:col-span-7 space-y-7 md:space-y-16 lg:pr-14">
            <SliderField
              label="Loan Amount"
              suffix="₹"
              value={amount}
              limits={LIMITS.amount}
              onChange={setAmount}
              testid="emi-amount"
            />
            <div className="space-y-4">
              <SliderField
                label="Interest Rate (P.A.)"
                suffix="%"
                value={rate}
                limits={LIMITS.rate}
                onChange={setRate}
                testid="emi-rate"
              />
              <div data-testid="emi-rate-presets" className="flex flex-wrap items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.25em] text-concrete/70 mr-1">Quick rates</span>
                {[8.5, 9, 9.5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    data-testid={`emi-rate-preset-${String(r).replace(".", "-")}`}
                    aria-pressed={rate === r}
                    onClick={() => setRate(r)}
                    className={`px-3.5 py-1.5 border font-display font-semibold text-[10px] tracking-[0.15em] tabular-nums transition-colors duration-300 ${
                      rate === r
                        ? "border-ember bg-ember/10 text-ember"
                        : "border-white/15 text-bone/50 hover:text-bone hover:border-bone/40"
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-6 mb-2">
                <span className="text-[9px] uppercase tracking-[0.25em] text-concrete/70">Tenure in</span>
                <div
                  data-testid="emi-tenure-toggle"
                  role="group"
                  aria-label="Tenure unit"
                  className="inline-flex border border-white/15"
                >
                  {["years", "months"].map((u) => (
                    <button
                      key={u}
                      type="button"
                      data-testid={`emi-tenure-${u}`}
                      aria-pressed={unit === u}
                      onClick={() => switchUnit(u)}
                      className={`px-4 py-2 font-display font-semibold text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                        unit === u ? "bg-[#0c0b0a] text-bone shadow-[inset_0_-2px_0_0_rgba(232,93,34,0.85)]" : "text-bone/45 hover:text-bone/75"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <SliderField
                label="Loan Tenure"
                suffix={unit === "years" ? "Yrs" : "Mo"}
                value={tenure}
                limits={tenureLimits}
                onChange={setTenure}
                testid="emi-tenure"
              />
              <div data-testid="emi-tenure-presets" className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-[9px] uppercase tracking-[0.25em] text-concrete/70 mr-1">Quick tenures</span>
                {[10, 15, 20, 30].map((t) => (
                  <button
                    key={t}
                    type="button"
                    data-testid={`emi-tenure-preset-${t}`}
                    aria-pressed={unit === "years" && tenure === t}
                    onClick={() => {
                      if (unit !== "years") setUnit("years");
                      setTenure(t);
                    }}
                    className={`px-3.5 py-1.5 border font-display font-semibold text-[10px] tracking-[0.15em] tabular-nums transition-colors duration-300 ${
                      unit === "years" && tenure === t
                        ? "border-ember bg-ember/10 text-ember"
                        : "border-white/15 text-bone/50 hover:text-bone hover:border-bone/40"
                    }`}
                  >
                    {t} yrs
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/projects?filter=ongoing"
                data-testid="emi-browse-projects-link"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-concrete hover:text-ember transition-colors duration-300"
              >
                Browse our ongoing projects
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="col-span-12 lg:col-span-5">
            <div className="border border-line bg-coal p-6 md:p-12 lg:sticky lg:top-28">
              <p className="text-[10px] uppercase tracking-[0.35em] text-concrete">Monthly EMI</p>
              <p
                data-testid="emi-result-monthly"
                className="font-display font-bold tracking-tighter text-4xl md:text-6xl text-ember mt-3 tabular-nums"
              >
                {fmtINR(emi)}
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-concrete mt-2">
                per month · {months} months
              </p>

              <div className="mt-6 md:mt-10">
                <div className="flex h-1.5 w-full bg-bone/10" data-testid="emi-split-bar">
                  <div className="bg-bone/70 transition-[width] duration-500" style={{ width: `${100 - interestShare}%` }} />
                  <div className="bg-ember transition-[width] duration-500" style={{ width: `${interestShare}%` }} />
                </div>
                <div className="flex justify-between mt-3 text-[9px] uppercase tracking-[0.2em] text-concrete/80">
                  <span>Principal</span>
                  <span>Interest</span>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-line pt-6 md:mt-8 md:pt-8">
                <ResultRow label="Principal Amount" value={fmtINR(amount)} testid="emi-result-principal" />
                <ResultRow label="Total Interest Payable" value={fmtINR(interest)} testid="emi-result-interest" />
                <ResultRow label="Total Amount Payable" value={fmtINR(total)} testid="emi-result-total" strong />
              </div>

              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="emi-whatsapp-share"
                className="group mt-6 md:mt-8 inline-flex w-full items-center justify-center gap-2.5 border border-ember/60 text-ember font-display font-semibold text-[10px] uppercase tracking-[0.25em] px-6 py-4 hover:bg-ember hover:text-ink transition-[color,background-color] duration-400"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Share this EMI on WhatsApp
              </a>

              <p data-testid="emi-note" className="mt-6 md:mt-10 text-[10px] leading-relaxed tracking-wide text-concrete border-t border-line pt-6">
                EMI shown is an indicative estimate. Actual EMI may vary based on lender terms,
                interest rate and applicable charges.
              </p>
            </div>
          </Reveal>
        </div>

        <div data-testid="finance-partners" className="mt-20 md:mt-28 border-t border-line pt-12 md:pt-16">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-5">Mortgage &amp; Loan Partners</p>
            <p className="text-sm md:text-base text-bone/75 leading-relaxed max-w-xl">
              Home-loan assistance for My Dream Projects buyers is available through our
              associated banking and finance partners.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <LoanPartners />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
