import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    { label: "Year", value: project.year },
  ];

  return (
    <div data-testid="project-detail-page" className="pt-20 md:pt-24">
      <section className="relative h-[70svh] md:h-[85svh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          src={project.texture}
          alt={project.title}
          className="texture-img absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
        <div className="absolute inset-x-0 bottom-0 max-w-[1600px] mx-auto px-5 md:px-10 pb-10 md:pb-16">
          <Link
            to="/projects"
            data-testid="back-to-projects-link"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-concrete hover:text-ember transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            All Projects
          </Link>
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
            <span className="hidden md:block font-display text-outline text-8xl font-bold leading-none select-none">
              {project.index}
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              data-testid={`project-stat-${s.label.toLowerCase()}`}
              className={`px-5 md:px-10 py-8 md:py-12 ${i > 0 ? "border-l border-line" : ""} ${i > 1 ? "border-t md:border-t-0 border-line" : ""}`}
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
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Overview</p>
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
