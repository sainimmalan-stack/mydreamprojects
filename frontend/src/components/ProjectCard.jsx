import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sun, Moon } from "lucide-react";

const TONES = [
  { surface: "bg-coal", index: "text-outline", title: "text-bone", meta: "text-concrete" },
  { surface: "bg-beige", index: "tone-index-light", title: "text-ink", meta: "text-ink/50" },
  { surface: "bg-[#17170f]", index: "text-outline", title: "text-bone", meta: "text-concrete" },
];

export const ProjectCard = ({ project, aspect = "aspect-[4/5]", tone = 0, note = true, homeMeta = false }) => {
  const t = TONES[tone % TONES.length];
  const [mode, setMode] = useState("day");
  const [nightTouched, setNightTouched] = useState(false);
  const modes = project.cover && project.elevationModes ? project.elevationModes : null;
  const cardSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        data-testid={`project-card-${project.slug}`}
        className="group block"
      >
        <div
          className={`relative overflow-hidden ${project.cover ? "bg-coal" : t.surface} ${aspect} border border-line group-hover:border-ember/40 transition-colors duration-500`}
        >
          {modes ? (
            <>
              <img
                {...(nightTouched
                  ? {
                      src: modes.night,
                      srcSet: `${modes.night.replace(".webp", "-800.webp")} 800w, ${modes.night} ${modes.width || 1402}w`,
                    }
                  : {})}
                sizes={cardSizes}
                alt=""
                aria-hidden="true"
                data-testid={`card-night-image-${project.slug}`}
                loading="lazy"
                onLoad={() => {
                  if (nightTouched) setMode("night");
                }}
                className="texture-img absolute inset-0 w-full h-full object-cover"
              />
              <img
                src={modes.day}
                srcSet={`${modes.day.replace(".webp", "-800.webp")} 800w, ${modes.day} ${modes.width || 1402}w`}
                sizes={cardSizes}
                alt={`${project.title} residential apartment elevation in Ameenpur — day view`}
                data-testid={`card-day-image-${project.slug}`}
                loading="lazy"
                className={`texture-img absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                  mode === "day" ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                data-testid={`card-daynight-toggle-${project.slug}`}
                role="group"
                aria-label={`${project.title} day night preview`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="absolute bottom-4 right-4 flex items-center rounded-full border border-bone/15 bg-ink/45 backdrop-blur-md p-0.5 shadow-lg shadow-ink/30"
              >
                <button
                  type="button"
                  data-testid={`card-day-button-${project.slug}`}
                  aria-pressed={mode === "day"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMode("day");
                  }}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 font-display font-semibold text-[9px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    mode === "day" ? "bg-ember text-ink" : "text-bone/75 hover:text-bone"
                  }`}
                >
                  <Sun className="w-3 h-3" strokeWidth={1.8} />
                  Day
                </button>
                <button
                  type="button"
                  data-testid={`card-night-button-${project.slug}`}
                  aria-pressed={mode === "night"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (nightTouched) setMode("night");
                    else setNightTouched(true);
                  }}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 font-display font-semibold text-[9px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    mode === "night" ? "bg-ember text-ink" : "text-bone/75 hover:text-bone"
                  }`}
                >
                  <Moon className="w-3 h-3" strokeWidth={1.8} />
                  Night
                </button>
              </div>
            </>
          ) : project.cover ? (
            <img
              src={project.cover}
              srcSet={`${project.cover.replace("elevation.jpg", "elevation-800.webp")} 800w, ${project.cover.replace("elevation.jpg", "elevation-1600.webp")} 1600w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={`${project.title} residential apartment elevation in Ameenpur`}
              loading="lazy"
              className="texture-img absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span
              className={`absolute -bottom-6 -left-2 font-display font-bold leading-none tracking-tighter text-[9rem] md:text-[11rem] select-none ${t.index} group-hover:-translate-y-2 transition-transform duration-700`}
            >
              {project.index}
            </span>
          )}
          <span
            className={`absolute top-4 right-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] ${
              project.cover ? "bg-ink/55 backdrop-blur px-2.5 py-1.5 text-bone" : project.status === "ongoing" ? "text-ember" : t.meta
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === "ongoing"
                  ? "bg-red-500 shadow-[0_0_7px_2px_rgba(239,68,68,0.45)] animate-pulse"
                  : "bg-emerald-400 shadow-[0_0_7px_2px_rgba(52,211,153,0.45)]"
              }`}
            />
            {project.status}
          </span>
          {note && !project.cover && (
            <span className={`absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.3em] ${t.meta} opacity-70`}>
              Photography coming soon
            </span>
          )}
        </div>
        <div className="flex items-start justify-between pt-5">
          <div>
            <h3 className="font-display text-lg md:text-xl font-medium uppercase tracking-tight text-bone group-hover:text-ember transition-colors duration-500">
              {project.title}
            </h3>
            <p className="text-xs text-concrete mt-1 tracking-wide">
              {homeMeta && project.year !== "—"
                ? `Ameenpur · Completed ${project.year}`
                : project.location}
            </p>
          </div>
          <ArrowUpRight
            className="w-5 h-5 text-concrete group-hover:text-ember group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-[transform,color] duration-500"
            strokeWidth={1.5}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
