import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CinematicProjectCard from "../components/CinematicProjectCard";
import { projects, projectStats } from "../data/projects";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];

const FILTERS = [
  { key: "all", label: "All", count: projectStats.total },
  { key: "completed", label: "Completed", count: projectStats.completed },
  { key: "ongoing", label: "Ongoing", count: projectStats.ongoing },
];

// Cinematic rhythm across the 12-col grid: a full-bleed hero row, then
// asymmetric wide/tall pairs with a dropped second column — looping.
// [span, variant, drop]
const RHYTHM = [
  [12, "hero", false],
  [7, "wide", false],
  [5, "tall", true],
  [5, "tall", false],
  [7, "wide", true],
];

// literal classes so Tailwind can see them
const SPAN_CLASS = {
  12: "md:col-span-12",
  7: "md:col-span-7",
  5: "md:col-span-5",
};

export default function Projects() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(() =>
    searchParams.get("filter") === "ongoing" ? "ongoing" : "all"
  );
  const visible =
    filter === "all"
      ? projects
      : filter === "ongoing"
        ? projects
            .filter((p) => p.status === "ongoing")
            .sort((a, b) => parseInt(b.index, 10) - parseInt(a.index, 10))
        : projects.filter((p) => p.status === filter);

  useSeo({
    title: "Projects | My Dream Projects® — Ameenpur, Hyderabad",
    description:
      "Browse all 19 My Dream Projects® residential developments in Ameenpur, Hyderabad — 13 completed and 6 ongoing, with real elevations and floor plans.",
  });

  return (
    <div data-testid="projects-page" className="pt-28 md:pt-40">
      <header className="max-w-[1600px] mx-auto px-5 md:px-10 pb-12 md:pb-16 border-b border-line">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6"
        >
          The Index — {projectStats.total} Projects
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-[13vw] md:text-[8vw] text-bone">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: EASE }}
              >
                Projects
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="text-xs md:text-sm text-concrete tracking-wide leading-relaxed md:text-right md:pb-3 max-w-xs"
          >
            {projectStats.completed} completed &amp; occupied · {projectStats.ongoing} rising in
            Ameenpur, Hyderabad
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="flex gap-2.5 mt-10 md:mt-14 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              aria-current={filter === f.key ? "page" : undefined}
              data-testid={`filter-${f.key}-button`}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border transition-[color,background-color,border-color] duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${
                filter === f.key
                  ? "bg-ember border-ember text-ink font-semibold"
                  : "border-line text-concrete hover:text-bone hover:border-bone/30"
              }`}
            >
              {f.label}
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  filter === f.key ? "bg-ink/20" : "bg-bone/5 text-concrete"
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </motion.div>
      </header>

      <section className="max-w-[1600px] mx-auto px-5 md:px-10 pt-14 md:pt-20 pb-24 md:pb-40">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24 md:gap-x-10">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const [span, variant, drop] = RHYTHM[i % RHYTHM.length];
              // a lone tail item should close the index full-bleed, not stranded
              const finalSpan = i === visible.length - 1 && span !== 12 && (i % 2 === 0) ? 12 : span;
              return (
                <motion.div
                  key={p.slug}
                  layout
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className={`${SPAN_CLASS[finalSpan]} ${drop && finalSpan !== 12 ? "md:mt-20" : ""}`}
                >
                  <CinematicProjectCard
                    project={p}
                    variant={finalSpan === 12 ? "hero" : variant}
                    drop={false}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
