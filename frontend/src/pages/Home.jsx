import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, animate, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
  const [hasElevation, setHasElevation] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section ref={ref} data-testid="home-hero" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 elevation-fallback" />
        {hasElevation && (
          <img
            src="/assets/hero-elevation.jpg"
            alt="Architectural elevation by My Dream Projects"
            data-testid="hero-elevation-image"
            className="absolute inset-0 w-full h-[112%] object-cover"
            onError={() => setHasElevation(false)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/55" />
      </motion.div>

      <motion.div style={{ y }} className="max-w-[1600px] w-full mx-auto px-5 md:px-10 pb-10 md:pb-16">
        <MaskedLine delay={0.1}>
          <span className="inline-block font-display text-[10px] md:text-xs font-semibold uppercase tracking-[0.45em] text-ember mb-6 md:mb-8">
            My Dream Projects
          </span>
        </MaskedLine>
        <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.92] text-[14.5vw] md:text-[10vw] lg:text-[8.6vw] text-bone">
          <MaskedLine delay={0.22}>You Dream.</MaskedLine>
          <MaskedLine delay={0.38}>
            <span className="text-ember">We Build.</span>
          </MaskedLine>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
          className="mt-6 md:mt-8 max-w-md text-sm md:text-base text-bone/75 leading-relaxed"
        >
          Thoughtfully designed residential spaces, built around the way people live.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-center gap-4 mt-8 md:mt-10"
        >
          <Link
            to="/projects"
            data-testid="hero-explore-projects-button"
            className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-[11px] md:text-xs uppercase tracking-[0.2em] px-7 py-4 md:px-8 md:py-5 hover:bg-bone transition-colors duration-400"
          >
            Explore Our Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
          </Link>
          <Link
            to="/contact"
            data-testid="hero-get-in-touch-button"
            className="inline-flex items-center gap-3 border border-bone/25 text-bone font-display font-semibold text-[11px] md:text-xs uppercase tracking-[0.2em] px-7 py-4 md:px-8 md:py-5 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
          >
            Get In Touch
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 md:mt-14 pt-6 border-t border-line"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-concrete">
            Ameenpur, Hyderabad · Since 2020
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

const CountUp = ({ value, pad = 0 }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(String(0).padStart(pad, "0"));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(String(value).padStart(pad, "0"));
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(pad, "0")),
    });
    return () => controls.stop();
  }, [inView, value, pad, reduce]);

  return <span ref={ref} data-testid={`stat-number-${value}`}>{display}</span>;
};

const Stats = () => {
  const items = [
    { value: 2020, pad: 0, label: "Founded" },
    { value: projectStats.total, pad: 0, label: "Projects" },
    { value: projectStats.completed, pad: 0, label: "Completed" },
    { value: projectStats.ongoing, pad: 2, label: "Ongoing" },
  ];
  return (
    <section data-testid="stats-band" className="border-b border-line bg-coal">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <div
            key={s.label}
            data-testid={`stat-${s.label.toLowerCase()}`}
            className={`px-6 md:px-10 py-12 md:py-20 ${i > 0 ? "border-l border-line" : ""} ${i > 1 ? "border-t md:border-t-0 border-line" : ""}`}
          >
            <p className="font-display font-bold tracking-tighter text-5xl md:text-7xl text-bone tabular-nums">
              <CountUp value={s.value} pad={s.pad} />
            </p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mt-3">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

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

const WhoWeAre = () => (
  <section data-testid="who-we-are" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
    <div className="grid grid-cols-12 gap-6">
      <Reveal className="col-span-12 md:col-span-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Who We Are</p>
      </Reveal>
      <div className="col-span-12 md:col-span-9">
        <Reveal delay={0.1}>
          <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-5xl lg:text-6xl text-bone">
            Building more
            <br />
            <span className="text-concrete">than homes.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 md:mt-14 max-w-2xl">
          <p className="text-base md:text-lg text-bone/85 leading-relaxed">
            Founded in 2020, My Dream Projects was built around a simple belief: good homes
            begin with thoughtful planning.
          </p>
          <p className="text-sm md:text-base text-concrete leading-relaxed mt-6">
            Led by Nimmala Sai and Kotapati Akhil, we create residential spaces that balance
            contemporary architecture, practical layouts and comfortable everyday living.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Link
            to="/about"
            data-testid="our-story-button"
            className="group inline-flex items-center gap-3 border border-bone/25 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.25em] px-7 py-4 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
          >
            Our Story
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const SelectedWork = () => {
  const featured = projects.filter((p) => p.status === "completed").slice(0, 3);
  return (
    <section data-testid="selected-work" className="border-t border-line">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-24">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Selected Work</p>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 md:col-span-9">
            <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-5xl lg:text-6xl text-bone">
              Homes we've
              <br />
              <span className="text-concrete">brought to life.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((p, i) => (
            <div key={p.slug} className={i === 1 ? "lg:mt-16" : ""}>
              <ProjectCard project={p} tone={i} />
            </div>
          ))}
        </div>
        <Reveal className="mt-12 md:mt-16">
          <Link
            to="/projects"
            data-testid="selected-work-view-all"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-concrete hover:text-ember transition-colors duration-300"
          >
            View all {projectStats.total} projects
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

const BuildingNext = () => {
  const ongoing = projects.filter((p) => p.status === "ongoing");
  return (
    <section data-testid="building-next" className="border-t border-line bg-coal">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-20">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.4em] text-ember">What We're Building Next</p>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 md:col-span-9">
            <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-5xl text-bone">
              On site,
              <br />
              <span className="text-concrete">right now.</span>
            </h2>
          </Reveal>
        </div>
        <div className="border-t border-line">
          {ongoing.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 0.05, 0.25)}>
              <Link
                to={`/projects/${p.slug}`}
                data-testid={`ongoing-row-${p.slug}`}
                className="group grid grid-cols-12 gap-4 items-center py-7 md:py-10 border-b border-line hover:bg-ink/60 transition-colors duration-500 px-2 md:px-4"
              >
                <span className="col-span-2 md:col-span-1 font-display text-ember text-sm tracking-[0.2em]">
                  {p.index}
                </span>
                <h3 className="col-span-8 md:col-span-6 font-display font-medium uppercase tracking-tight text-xl md:text-3xl text-bone group-hover:text-ember transition-colors duration-400">
                  {p.title}
                </h3>
                <span className="hidden md:flex md:col-span-3 items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ember">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
                  Ongoing
                </span>
                <span className="col-span-2 justify-self-end">
                  <ArrowUpRight className="w-5 h-5 text-concrete group-hover:text-ember group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-[transform,color] duration-400" strokeWidth={1.5} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cta = () => (
  <section data-testid="home-cta" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
    <Reveal className="grid grid-cols-12 gap-6 items-end">
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
    </Reveal>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhoWeAre />
      <SelectedWork />
      <BuildingNext />
      <Marquee />
      <Cta />
    </>
  );
}
