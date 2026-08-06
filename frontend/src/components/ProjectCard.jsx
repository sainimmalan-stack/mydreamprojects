import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const TONES = [
  { surface: "bg-coal", index: "text-outline", title: "text-bone", meta: "text-concrete" },
  { surface: "bg-beige", index: "tone-index-light", title: "text-ink", meta: "text-ink/50" },
  { surface: "bg-[#17170f]", index: "text-outline", title: "text-bone", meta: "text-concrete" },
];

export const ProjectCard = ({ project, aspect = "aspect-[4/5]", tone = 0, note = true, homeMeta = false }) => {
  const t = TONES[tone % TONES.length];
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
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.title}
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
                project.status === "ongoing" ? "bg-ember animate-pulse" : tone % 3 === 1 && !project.cover ? "bg-ink/40" : "bg-beige/50"
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
