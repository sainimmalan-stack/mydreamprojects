import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { projects, projectStats } from "../data/projects";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];

const FILTERS = [
  { key: "all", label: "All", count: projectStats.total },
  { key: "completed", label: "Completed", count: projectStats.completed },
  { key: "ongoing", label: "Ongoing", count: projectStats.ongoing },
];

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
    title: "Projects | My Dream Projects — Ameenpur, Hyderabad",
    description:
      "Browse all 19 My Dream Projects residential developments in Ameenpur, Hyderabad — 13 completed and 6 ongoing, with real elevations and floor plans.",
  });

  return (
    <div data-testid="projects-page" className="pt-28 md:pt-40">
      <header className="max-w-[1600px] mx-auto px-5 md:px-10 pb-14 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6"
        >
          The Index — {projectStats.total} Projects
        </motion.p>
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="flex flex-wrap gap-2 md:gap-3 mt-10 md:mt-14"
          role="tablist"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              data-testid={`filter-${f.key}-button`}
              onClick={() => setFilter(f.key)}
              className={`font-display text-[11px] uppercase tracking-[0.25em] px-5 py-2.5 border transition-[color,background-color,border-color] duration-400 ${
                filter === f.key
                  ? "bg-ember border-ember text-ink font-semibold"
                  : "border-line text-concrete hover:text-bone hover:border-bone/30"
              }`}
            >
              {f.label} <span className="opacity-60">({f.count})</span>
            </button>
          ))}
        </motion.div>
      </header>

      <section className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24 md:pb-40">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, delay: Math.min(i * 0.04, 0.3), ease: EASE }}
                className={i % 3 === 1 ? "lg:mt-14" : ""}
              >
                <ProjectCard project={p} aspect="aspect-[4/5]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
