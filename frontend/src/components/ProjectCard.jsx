import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const ProjectCard = ({ project, aspect = "aspect-[4/5]" }) => (
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
      <div className={`relative overflow-hidden bg-coal ${aspect}`}>
        <img
          src={project.texture}
          alt={project.title}
          loading="lazy"
          className="texture-img absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute top-4 left-4 font-display text-xs tracking-[0.3em] text-bone/60">
          {project.index}
        </span>
        <span
          className={`absolute top-4 right-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] ${
            project.status === "ongoing" ? "text-ember" : "text-beige/70"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              project.status === "ongoing" ? "bg-ember animate-pulse" : "bg-beige/50"
            }`}
          />
          {project.status}
        </span>
      </div>
      <div className="flex items-start justify-between pt-5 border-t border-transparent">
        <div>
          <h3 className="font-display text-lg md:text-xl font-medium uppercase tracking-tight text-bone group-hover:text-ember transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-xs text-concrete mt-1 tracking-wide">{project.location}</p>
        </div>
        <ArrowUpRight
          className="w-5 h-5 text-concrete group-hover:text-ember group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-[transform,color] duration-500"
          strokeWidth={1.5}
        />
      </div>
    </Link>
  </motion.div>
);

export default ProjectCard;
