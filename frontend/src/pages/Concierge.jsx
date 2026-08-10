import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MessageCircle, Map, Calculator, RotateCcw, Sparkles } from "lucide-react";
import { projects } from "../data/projects";
import { waLink } from "../data/contact";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];
const PRICE_PER_SFT = 5994; // verified ongoing-projects rate from project data

const QUESTIONS = [
  {
    id: "intent",
    title: "What are you looking for?",
    options: ["2 BHK", "3 BHK", "Villa / Independent Home", "Investment", "Joint Development"],
  },
  {
    id: "budget",
    title: "What is your preferred budget?",
    options: ["Under ₹75 Lakh", "₹75 L – ₹1 Cr", "₹1 Cr – ₹1.5 Cr", "Above ₹1.5 Cr"],
    custom: { label: "Custom amount", placeholder: "e.g. 9500000" },
  },
  {
    id: "location",
    title: "Which location do you prefer?",
    options: ["Ameenpur", "Hyderabad", "Other / Flexible"],
  },
  {
    id: "status",
    title: "Completed or ongoing project?",
    options: ["Completed", "Ongoing", "Either"],
  },
  {
    id: "loan",
    title: "Approximate loan requirement?",
    hint: "Optional — used only to pre-fill your EMI calculation.",
    options: ["₹20–40 Lakh", "₹40–70 Lakh", "₹70 Lakh +", "Skip for now"],
    custom: { label: "Custom amount", placeholder: "e.g. 5000000" },
  },
];

const BUDGET_BANDS = {
  "Under ₹75 Lakh": [0, 75e5],
  "₹75 L – ₹1 Cr": [75e5, 100e5],
  "₹1 Cr – ₹1.5 Cr": [100e5, 150e5],
  "Above ₹1.5 Cr": [150e5, Infinity],
};
const LOAN_PREFILLS = { "₹20–40 Lakh": 3000000, "₹40–70 Lakh": 5500000, "₹70 Lakh +": 8000000 };

const parseINR = (v) => {
  const n = Number(String(v).replace(/[^0-9]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
};
const minArea = (p) => Math.min(...(p.unitDetails || []).map((u) => parseFloat(u.saleableArea) || Infinity));
const areaList = (p) => [...new Set((p.unitDetails || []).map((u) => u.saleableArea))].join(" / ");
const estimate = (p) => (p.pricePerSft ? PRICE_PER_SFT * minArea(p) : null);
const hasBhk = (p, bhk) =>
  (p.unitDetails || []).some((u) => u.label.includes(bhk)) ||
  (bhk === "2 BHK" && (p.unitDetails || []).some((u) => u.label.includes("2.5 BHK")));

const scoreProject = (p, a) => {
  let s = 0;
  if (a.intent === "2 BHK" || a.intent === "3 BHK") s += hasBhk(p, a.intent) ? 4 : -3;
  if (a.intent === "Investment") s += p.status === "ongoing" ? 4 : 1;
  if (a.status === "completed" || a.status === "ongoing") s += p.status === a.status ? 3 : -2;
  else s += 1;
  if (a.location === "Ameenpur" || a.location === "Hyderabad") s += 1;
  const band = BUDGET_BANDS[a.budget];
  const customBudget = a.budgetCustom;
  const est = estimate(p);
  if (est !== null) {
    if (customBudget) s += est <= customBudget ? 3 : est <= customBudget * 1.15 ? 1 : -2;
    else if (band) s += est >= band[0] && est < band[1] ? 3 : est < band[0] ? 1 : -2;
  }
  return s;
};

const Chip = ({ children, onClick, testid, active = false }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testid}
    aria-pressed={active}
    className={`px-5 py-3 border font-display font-semibold text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
      active
        ? "border-ember bg-ember/10 text-ember"
        : "border-bone/20 text-bone/80 hover:border-ember hover:text-ember"
    }`}
  >
    {children}
  </button>
);

export default function Concierge() {
  useSeo({
    title: "AI Property Concierge | Find Your Home | My Dream Projects",
    description:
      "Answer five simple questions and the My Dream Projects AI Property Concierge recommends the most suitable 2 & 3 BHK residences in Ameenpur, Hyderabad from our real portfolio.",
    image: "/assets/og-image.jpg",
  });

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState("questions"); // questions | analyzing | results
  const [customOpen, setCustomOpen] = useState(null);
  const [customValue, setCustomValue] = useState("");

  const question = QUESTIONS[step];

  const answer = (qid, value, customAmount = null) => {
    const next = { ...answers, [qid]: value };
    if (customAmount) next[`${qid}Custom`] = customAmount;
    setAnswers(next);
    setCustomOpen(null);
    setCustomValue("");
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("analyzing");
      setTimeout(() => setPhase("results"), 1100);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setPhase("questions");
    setCustomOpen(null);
    setCustomValue("");
  };

  const results = useMemo(() => {
    if (phase !== "results") return null;
    if (answers.intent === "Joint Development") return { kind: "joint" };
    let pool = [...projects];
    let note = null;
    if (answers.intent === "Villa / Independent Home") {
      note =
        "Our current portfolio is boutique apartment residences — here are the most spacious homes, closest to independent-home living.";
      pool.sort((a, b) => scoreProject(b, answers) + Math.max(...(b.unitDetails || []).map((u) => parseFloat(u.saleableArea) || 0)) / 1000 - (scoreProject(a, answers) + Math.max(...(a.unitDetails || []).map((u) => parseFloat(u.saleableArea) || 0)) / 1000));
    } else {
      pool.sort((a, b) => scoreProject(b, answers) - scoreProject(a, answers));
    }
    return { kind: "projects", note, picks: pool.slice(0, 3) };
  }, [phase, answers]);

  const loanPrefill =
    LOAN_PREFILLS[answers.loan] || (answers.loanCustom ? Math.round(answers.loanCustom / 100000) * 100000 : null);

  const waSummary = waLink(
    [
      "Hello My Dream Projects, I used your AI Property Concierge.",
      `Looking for: ${answers.intent || "—"}`,
      `Budget: ${answers.budgetCustom ? `₹${answers.budgetCustom.toLocaleString("en-IN")}` : answers.budget || "—"}`,
      `Location: ${answers.location || "—"}`,
      `Preference: ${answers.status || "—"}`,
      results?.kind === "projects" ? `Suggested: ${results.picks.map((p) => p.title).join(", ")}` : null,
      "I'd like to take this forward.",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return (
    <div data-testid="concierge-page" className="pt-24 md:pt-40">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24 md:pb-40">
        <header className="pb-10 md:pb-16 max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-4 md:mb-6 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            AI Property Concierge
          </p>
          <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-[9vw] md:text-[4.5vw] text-bone">
            Find the right home for you.
          </h1>
          <p className="mt-5 md:mt-6 text-sm md:text-base text-bone/70 leading-relaxed max-w-xl">
            Five simple questions. Recommendations drawn only from our real, verified portfolio in
            Ameenpur, Hyderabad — no sign-up, no obligation.
          </p>
        </header>

        <div className="max-w-3xl border border-line bg-coal/60">
          {/* transcript of answered questions */}
          <div className="px-6 md:px-10 pt-8 md:pt-10 space-y-6">
            {QUESTIONS.slice(0, step).map((q) => (
              <div key={q.id} data-testid={`concierge-answered-${q.id}`} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line/60 pb-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-concrete w-full md:w-auto md:min-w-56">{q.title}</p>
                <p className="font-display font-semibold text-sm uppercase tracking-[0.15em] text-ember">
                  {answers[`${q.id}Custom`] ? `₹${answers[`${q.id}Custom`].toLocaleString("en-IN")}` : answers[q.id]}
                </p>
              </div>
            ))}
          </div>

          <div className="px-6 md:px-10 py-8 md:py-10">
            <AnimatePresence mode="wait">
              {phase === "questions" && question && (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  data-testid={`concierge-question-${question.id}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mb-3" data-testid="concierge-progress">
                    Question {String(step + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
                  </p>
                  <h2 className="font-display font-bold uppercase tracking-tight text-2xl md:text-4xl text-bone">
                    {question.title}
                  </h2>
                  {question.hint && <p className="mt-2 text-xs text-concrete">{question.hint}</p>}
                  <div className="flex flex-wrap gap-3 mt-7">
                    {question.options.map((opt) => (
                      <Chip
                        key={opt}
                        testid={`concierge-option-${opt.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                        onClick={() => answer(question.id, opt)}
                      >
                        {opt}
                      </Chip>
                    ))}
                    {question.custom && (
                      <Chip
                        testid={`concierge-option-custom-${question.id}`}
                        active={customOpen === question.id}
                        onClick={() => setCustomOpen(customOpen === question.id ? null : question.id)}
                      >
                        {question.custom.label}
                      </Chip>
                    )}
                  </div>
                  {question.custom && customOpen === question.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="mt-5 flex items-center gap-3"
                    >
                      <span className="text-concrete text-lg">₹</span>
                      <input
                        type="number"
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        placeholder={question.custom.placeholder}
                        data-testid={`concierge-custom-input-${question.id}`}
                        className="field-input emi-num flex-1 max-w-xs font-display text-lg text-bone"
                      />
                      <button
                        type="button"
                        data-testid={`concierge-custom-submit-${question.id}`}
                        onClick={() => {
                          const v = parseINR(customValue);
                          if (v) answer(question.id, "Custom amount", v);
                        }}
                        className="bg-ember text-ink font-display font-semibold text-[10px] uppercase tracking-[0.2em] px-5 py-3 hover:bg-bone transition-colors duration-300"
                      >
                        Continue
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {phase === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  data-testid="concierge-analyzing"
                  className="py-10 text-center"
                >
                  <p className="text-[10px] uppercase tracking-[0.35em] text-ember animate-pulse">
                    Studying our portfolio for you…
                  </p>
                </motion.div>
              )}

              {phase === "results" && results && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  data-testid="concierge-results"
                >
                  {results.kind === "joint" ? (
                    <div>
                      <h2 className="font-display font-bold uppercase tracking-tight text-2xl md:text-4xl text-bone">
                        Joint development starts with a conversation.
                      </h2>
                      <p className="mt-4 text-sm text-bone/70 leading-relaxed max-w-xl">
                        Every My Dream Projects address began as a landowner partnership. If you own
                        land in or around Ameenpur, our founders would love to walk the site with
                        you and explore a joint development.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-display font-bold uppercase tracking-tight text-2xl md:text-4xl text-bone">
                        Based on your requirements, these projects may be a good match.
                      </h2>
                      {results.note && <p className="mt-4 text-sm text-bone/70 leading-relaxed max-w-xl">{results.note}</p>}
                      <div className="mt-8 space-y-4">
                        {results.picks.map((p) => (
                          <div
                            key={p.slug}
                            data-testid={`concierge-result-${p.slug}`}
                            className="border border-line bg-ink flex flex-col sm:flex-row group"
                          >
                            <div className="sm:w-2/5 overflow-hidden">
                              <img
                                src={p.cover || p.elevationModes?.night || p.plan3d?.src}
                                srcSet={!p.cover && !p.elevationModes?.night ? p.plan3d?.srcSet : undefined}
                                sizes="(max-width: 640px) 100vw, 380px"
                                alt={`${p.title} — ${p.flatMix} residences in Ameenpur`}
                                loading="lazy"
                                className="w-full h-44 sm:h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s]"
                                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                              />
                            </div>
                            <div className="flex-1 p-5 md:p-6">
                              <p className="font-display font-bold uppercase tracking-tight text-lg md:text-xl text-bone">
                                {p.title}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-3 text-[9px] uppercase tracking-[0.2em]">
                                <span className="border border-bone/15 px-2.5 py-1 text-bone/70">{p.flatMix}</span>
                                <span className="border border-bone/15 px-2.5 py-1 text-bone/70">{areaList(p)}</span>
                                <span className="border border-bone/15 px-2.5 py-1 text-bone/70">{p.location}</span>
                                <span className={`border px-2.5 py-1 ${p.status === "ongoing" ? "border-ember/50 text-ember" : "border-bone/15 text-bone/70"}`}>
                                  {p.status === "ongoing" ? `Ongoing · Expected ${p.year}` : `Completed ${p.year}`}
                                </span>
                              </div>
                              <Link
                                to={`/projects/${p.slug}`}
                                data-testid={`concierge-view-${p.slug}`}
                                className="group/link mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ember"
                              >
                                View Project
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-10 border-t border-line pt-8">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mb-5">Quick actions</p>
                    <div className="flex flex-wrap gap-3">
                      {results.kind === "projects" && (
                        <Link
                          to="/project-map"
                          data-testid="concierge-action-map"
                          className="inline-flex items-center gap-2 border border-bone/25 text-bone/85 font-display font-semibold text-[10px] uppercase tracking-[0.2em] px-5 py-3.5 hover:border-ember hover:text-ember transition-colors duration-300"
                        >
                          <Map className="w-4 h-4" strokeWidth={1.5} />
                          View Our Map
                        </Link>
                      )}
                      <Link
                        to={loanPrefill ? `/emi-calculator?amount=${loanPrefill}` : "/emi-calculator"}
                        data-testid="concierge-action-emi"
                        className="inline-flex items-center gap-2 border border-bone/25 text-bone/85 font-display font-semibold text-[10px] uppercase tracking-[0.2em] px-5 py-3.5 hover:border-ember hover:text-ember transition-colors duration-300"
                      >
                        <Calculator className="w-4 h-4" strokeWidth={1.5} />
                        Calculate EMI
                      </Link>
                      <Link
                        to="/contact"
                        data-testid="concierge-action-contact"
                        className="inline-flex items-center gap-2 border border-bone/25 text-bone/85 font-display font-semibold text-[10px] uppercase tracking-[0.2em] px-5 py-3.5 hover:border-ember hover:text-ember transition-colors duration-300"
                      >
                        Talk to Us
                      </Link>
                      <a
                        href={waSummary}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="concierge-action-whatsapp"
                        className="inline-flex items-center gap-2 bg-ember text-ink font-display font-semibold text-[10px] uppercase tracking-[0.2em] px-5 py-3.5 hover:bg-bone transition-colors duration-300"
                      >
                        <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                        WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={restart}
                        data-testid="concierge-restart"
                        className="inline-flex items-center gap-2 text-concrete font-display font-semibold text-[10px] uppercase tracking-[0.2em] px-5 py-3.5 hover:text-bone transition-colors duration-300"
                      >
                        <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
                        Start over
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
