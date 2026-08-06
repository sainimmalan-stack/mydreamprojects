import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, getAdjacent } from "../data/projects";

const EASE = [0.16, 1, 0.3, 1];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/projects" replace />;
  const { prev, next } = getAdjacent(slug);

  const stats = [
    { label: "Status", value: project.status },
    { label: "Location", value: project.location },
    { label: "Type", value: project.type },
    ...(project.floors ? [{ label: "Floors", value: project.floors }] : []),
    { label: "Year", value: project.year },
  ];

  return (
    <div data-testid="project-detail-page" className="pt-20 md:pt-24">
      <section className="relative h-[62svh] md:h-[80svh] overflow-hidden bg-coal border-b border-line">
        {project.cover ? (
          <motion.img
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
            src={project.cover}
            alt={`${project.title} elevation`}
            data-testid="project-hero-image"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute -bottom-10 right-0 font-display font-bold leading-none tracking-tighter text-[42vw] md:text-[26vw] text-outline select-none"
          >
            {project.index}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/40" />
        <div className="absolute inset-x-0 bottom-0 max-w-[1600px] mx-auto px-5 md:px-10 pb-10 md:pb-16">
          <Link
            to="/projects"
            data-testid="back-to-projects-link"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-concrete hover:text-ember transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            All Projects
          </Link>
          <p className={`inline-block text-[10px] md:text-xs uppercase tracking-[0.4em] text-ember mb-4 ${project.cover ? "bg-ink/50 backdrop-blur px-2.5 py-1.5" : ""}`}>
            Project {project.index} — {project.location}
          </p>
          <div className="flex items-end justify-between gap-6">
            <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-[11vw] md:text-[7vw] text-bone">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: EASE }}
                >
                  {project.title}
                </motion.span>
              </span>
            </h1>
          </div>
          {(project.year !== "—" || project.floors) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="flex flex-wrap gap-3 mt-7"
            >
              {project.year !== "—" && (
                <span
                  data-testid="project-meta-status-year"
                  className="border border-bone/25 bg-ink/40 backdrop-blur text-bone/90 text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-4 py-2"
                >
                  {project.status} · {project.year}
                </span>
              )}
              {project.floors && (
                <span
                  data-testid="project-meta-floors-type"
                  className="border border-bone/25 bg-ink/40 backdrop-blur text-bone/90 text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-4 py-2"
                >
                  {project.floors} · {project.type}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <section className="border-b border-line">
        <div
          data-testid="project-stats-grid"
          className={`max-w-[1600px] mx-auto grid grid-cols-2 ${stats.length === 5 ? "md:grid-cols-5" : "md:grid-cols-4"}`}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              data-testid={`project-stat-${s.label.toLowerCase()}`}
              className={`px-5 md:px-10 py-8 md:py-12 ${i > 0 ? "md:border-l border-line" : ""} ${i > 1 ? "border-t md:border-t-0 border-line" : ""} ${i % 2 === 1 ? "border-l md:border-l" : ""}`}
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mb-2.5">{s.label}</p>
              <p className={`font-display uppercase tracking-tight text-base md:text-xl ${s.label === "Status" && project.status === "ongoing" ? "text-ember" : "text-bone"}`}>
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-20 md:py-32 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember">About the Project</p>
        </div>
        <div className="col-span-12 md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            data-testid="project-description"
            className="text-base md:text-xl text-bone/85 leading-relaxed max-w-2xl"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {project.cover && (
        <section data-testid="project-elevation" className="max-w-[1600px] mx-auto px-5 md:px-10 pb-20 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-6">Elevation</p>
            <div className="border border-line overflow-hidden">
              <img
                src={project.cover}
                alt={`${project.title} — architectural elevation`}
                data-testid="project-elevation-image"
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </section>
      )}

      {project.floorPlan && (
        <section data-testid="project-floor-plan" className="border-t border-line bg-coal">
          <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-20 md:py-32 grid grid-cols-12 gap-6 md:gap-8 items-start">
            <div className="col-span-12 md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">Floor Plan</p>
              <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-4xl text-bone">
                The plan.
              </h2>
              <p className="text-sm text-concrete leading-relaxed mt-5 max-w-sm">
                Typical floor layout. Open the full-resolution plan for dimensions and details.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href={project.floorPlan.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="view-full-plan-button"
                  className="group inline-flex items-center gap-3 border border-bone/25 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.2em] px-6 py-4 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
                >
                  View Full Plan
                  <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-400" strokeWidth={2} />
                </a>
                <a
                  href={project.floorPlan.pdf}
                  download={project.floorPlan.fileName}
                  data-testid="download-plan-button"
                  className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-[11px] uppercase tracking-[0.2em] px-6 py-4 hover:bg-bone transition-colors duration-400"
                >
                  Download PDF
                  <ArrowRight className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-400" strokeWidth={2} />
                </a>
              </div>
            </div>
            <motion.a
              href={project.floorPlan.pdf}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="floor-plan-preview"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="col-span-12 md:col-span-8 block border border-line bg-bone p-2 md:p-3 hover:border-ember/50 transition-colors duration-500"
            >
              <img
                src={project.floorPlan.preview}
                alt={`${project.title} floor plan preview`}
                className="w-full h-auto block"
                loading="lazy"
              />
            </motion.a>
          </div>
        </section>
      )}

      {!project.cover && (
      <section className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24 md:pb-32">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-8 aspect-[16/10] bg-coal border border-line flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-concrete">Photography coming soon</span>
          </div>
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4 md:gap-6">
            <div className="bg-coal border border-line flex items-center justify-center min-h-[140px]">
              <span className="text-[10px] uppercase tracking-[0.4em] text-concrete">Plan</span>
            </div>
            <div className="bg-coal border border-line flex items-center justify-center min-h-[140px]">
              <span className="text-[10px] uppercase tracking-[0.4em] text-concrete">Detail</span>
            </div>
          </div>
        </div>
      </section>
      )}

      <nav className="border-t border-line">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2">
          <Link
            to={`/projects/${prev.slug}`}
            data-testid="prev-project-link"
            className="group px-5 md:px-10 py-10 md:py-16 border-r border-line hover:bg-coal transition-colors duration-500"
          >
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-concrete mb-3">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-400" strokeWidth={1.5} />
              Previous
            </span>
            <span className="font-display font-medium uppercase tracking-tight text-lg md:text-3xl text-bone group-hover:text-ember transition-colors duration-400">
              {prev.title}
            </span>
          </Link>
          <Link
            to={`/projects/${next.slug}`}
            data-testid="next-project-link"
            className="group px-5 md:px-10 py-10 md:py-16 text-right hover:bg-coal transition-colors duration-500"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.3em] text-concrete mb-3">
              Next
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={1.5} />
            </span>
            <span className="font-display font-medium uppercase tracking-tight text-lg md:text-3xl text-bone group-hover:text-ember transition-colors duration-400">
              {next.title}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
