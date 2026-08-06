import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Marquee from "../components/Marquee";
import ProjectCard from "../components/ProjectCard";
import { projects, projectStats } from "../data/projects";

const EASE = [0.16, 1, 0.3, 1];

const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  return (
    <section ref={ref} data-testid="home-hero" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1637088059539-ad62cba57895?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGFyY2hpdGVjdHVyYWwlMjBtaW5pbWFsJTIwc2hhZG93fGVufDB8fHx8MTc4NjAyMjU4OHww&ixlib=rb-4.1.0&q=85"
          alt=""
          className="w-full h-[115%] object-cover texture-img opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      </motion.div>

      <motion.div style={{ y, opacity }} className="max-w-[1600px] w-full mx-auto px-5 md:px-10 pb-10 md:pb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-concrete mb-6 md:mb-10"
        >
          Residential Construction — Ameenpur, Hyderabad
        </motion.p>
        <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.92] text-[15vw] md:text-[10.5vw] lg:text-[9vw] text-bone">
          <MaskedLine delay={0.15}>You Dream.</MaskedLine>
          <MaskedLine delay={0.32}>
            <span className="text-ember">We Build.</span>
          </MaskedLine>
        </h1>
        <div className="flex items-end justify-between mt-8 md:mt-12 pt-6 border-t border-line">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex gap-8 md:gap-16 text-[10px] md:text-xs uppercase tracking-[0.3em] text-concrete"
          >
            <span>Est. 2020</span>
            <span>{projectStats.total} Projects</span>
            <span className="hidden sm:inline">Hyderabad</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <ArrowDown data-testid="hero-scroll-cue" className="w-5 h-5 text-ember animate-bounce" strokeWidth={1.5} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const CHAPTERS = [
  {
    n: "01",
    title: "Precision",
    copy: "Every line drawn is a promise kept. We plan obsessively so that what stands on site is exactly what was imagined on paper.",
  },
  {
    n: "02",
    title: "Material Honesty",
    copy: "Concrete, brick, timber and light — used as they are, finished as they deserve. Nothing hidden, nothing faked.",
  },
  {
    n: "03",
    title: "Built to Outlive",
    copy: "A home is a generational decision. We build structures meant to be inherited, not replaced.",
  },
];

const Manifesto = () => (
  <section data-testid="manifesto-section" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
    <div className="grid grid-cols-12 gap-6 mb-16 md:mb-28">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="col-span-12 md:col-span-3 text-[10px] uppercase tracking-[0.4em] text-ember"
      >
        The Manifesto
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.1, ease: EASE }}
        className="col-span-12 md:col-span-9 font-display font-semibold uppercase tracking-tighter leading-[1.05] text-3xl md:text-5xl lg:text-6xl text-bone"
      >
        We don't build houses.
        <br />
        <span className="text-concrete">We build the backdrop of your life.</span>
      </motion.h2>
    </div>
    <div className="border-t border-line">
      {CHAPTERS.map((c, i) => (
        <motion.div
          key={c.n}
          data-testid={`manifesto-chapter-${c.n}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
          className="grid grid-cols-12 gap-4 md:gap-6 py-10 md:py-16 border-b border-line items-start"
        >
          <span className="col-span-2 md:col-span-1 font-display text-ember text-sm md:text-base tracking-[0.2em]">
            {c.n}
          </span>
          <h3 className="col-span-10 md:col-span-4 font-display font-medium uppercase tracking-tight text-2xl md:text-4xl text-bone">
            {c.title}
          </h3>
          <p className="col-span-12 md:col-span-6 md:col-start-7 text-sm md:text-base text-concrete leading-relaxed max-w-xl">
            {c.copy}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

const FeaturedProjects = () => {
  const featured = projects.slice(0, 4);
  return (
    <section data-testid="featured-projects" className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24 md:pb-40">
      <div className="flex items-end justify-between mb-12 md:mb-20">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-4">Selected Work</p>
          <h2 className="font-display font-semibold uppercase tracking-tighter text-3xl md:text-5xl text-bone">
            The Projects
          </h2>
        </div>
        <Link
          to="/projects"
          data-testid="view-all-projects-link"
          className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-concrete hover:text-ember transition-colors duration-300"
        >
          View all {projectStats.total}
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {featured.map((p, i) => (
          <div key={p.slug} className={i % 2 === 1 ? "lg:mt-16" : ""}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
      <div className="mt-12 md:hidden">
        <Link
          to="/projects"
          data-testid="view-all-projects-link-mobile"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ember"
        >
          View all {projectStats.total} projects
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
};

const Stats = () => {
  const items = [
    { value: "2020", label: "Founded" },
    { value: String(projectStats.total), label: "Projects" },
    { value: String(projectStats.completed), label: "Completed" },
    { value: `0${projectStats.ongoing}`, label: "Ongoing" },
  ];
  return (
    <section data-testid="stats-band" className="border-y border-line bg-coal">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            className={`px-6 md:px-10 py-12 md:py-20 ${i > 0 ? "border-l border-line" : ""} ${i > 1 ? "border-t md:border-t-0 border-line" : ""}`}
          >
            <p className="font-display font-bold tracking-tighter text-5xl md:text-7xl text-bone">
              {s.value}
            </p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mt-3">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Cta = () => (
  <section data-testid="home-cta" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: EASE }}
      className="grid grid-cols-12 gap-6 items-end"
    >
      <h2 className="col-span-12 md:col-span-9 font-display font-bold uppercase tracking-tighter leading-[0.95] text-4xl md:text-6xl lg:text-7xl text-bone">
        Have a plot.
        <br />
        <span className="text-concrete">Have a dream?</span>
      </h2>
      <div className="col-span-12 md:col-span-3 md:justify-self-end">
        <Link
          to="/contact"
          data-testid="home-cta-button"
          className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-xs uppercase tracking-[0.2em] px-8 py-5 hover:bg-bone transition-colors duration-400"
        >
          Let's Talk
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
        </Link>
      </div>
    </motion.div>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Stats />
      <FeaturedProjects />
      <Cta />
    </>
  );
}
