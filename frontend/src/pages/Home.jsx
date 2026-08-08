import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, animate, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowDown, MessageCircle, Phone, Navigation } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { getProject, projectStats } from "../data/projects";
import { waLink, waLinkTo, WHATSAPP_GREETING, PHONE_SAI, MAPS_URL, WHATSAPP_NUMBER, WHATSAPP_NUMBER_AKHIL } from "../data/contact";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];
const HERO_IMAGE = "/assets/projects/my-dream-skylark/elevation-night.webp";

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
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section ref={ref} data-testid="home-hero" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          srcSet={`${HERO_IMAGE.replace(".webp", "-800.webp")} 800w, ${HERO_IMAGE} 1448w`}
          sizes="100vw"
          fetchPriority="high"
          alt="My Dream Skylark residential apartment elevation in Ameenpur"
          data-testid="hero-elevation-image"
          className="absolute inset-0 w-full h-[112%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/30" />
      </motion.div>

      <motion.div style={{ y }} className="max-w-[1600px] w-full mx-auto px-5 md:px-10 pb-10 md:pb-16">
        <MaskedLine delay={0.1}>
          <span className="inline-block bg-ink/60 backdrop-blur px-3 py-1.5 font-display text-[10px] md:text-xs font-semibold uppercase tracking-[0.45em] text-ember mb-6 md:mb-8">
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
          className="mt-6 md:mt-8 max-w-md text-sm md:text-base text-bone/85 leading-relaxed"
        >
          Thoughtfully planned residential spaces, contemporary architecture and homes built for
          everyday living in Ameenpur, Hyderabad.
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
            Explore Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
          </Link>
          <Link
            to="/projects?filter=ongoing"
            data-testid="hero-view-ongoing-button"
            className="group inline-flex items-center gap-3 border border-bone/30 bg-ink/35 backdrop-blur text-bone font-display font-semibold text-[11px] md:text-xs uppercase tracking-[0.2em] px-7 py-4 md:px-8 md:py-5 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
          >
            View Ongoing Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 md:mt-14 pt-6 border-t border-bone/15"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bone/60">
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
  const [inView, setInView] = useState(false);
  const [display, setDisplay] = useState(String(0).padStart(pad, "0"));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
    { value: projectStats.total, pad: 0, label: "Projects" },
    { value: projectStats.completed, pad: 0, label: "Completed" },
    { value: projectStats.ongoing, pad: 0, label: "Ongoing" },
    { value: 2020, pad: 0, label: "Founded" },
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

const Purpose = () => (
  <section data-testid="home-purpose" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
    <div className="grid grid-cols-12 gap-6">
      <Reveal className="col-span-12 md:col-span-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Building With Purpose</p>
      </Reveal>
      <div className="col-span-12 md:col-span-9">
        <Reveal delay={0.1}>
          <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-5xl lg:text-6xl text-bone">
            Homes planned around
            <br />
            <span className="text-concrete">the people who live in them.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 md:mt-14 max-w-2xl">
          <p className="text-base md:text-lg text-bone/85 leading-relaxed">
            Since 2020, My Dream Projects has focused on creating thoughtfully planned residential
            developments in Ameenpur. From efficient floor plans to contemporary architectural
            expressions, every project reflects our approach to practical, comfortable and
            considered living.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/about"
            data-testid="purpose-our-story-button"
            className="group inline-flex items-center gap-3 border border-bone/25 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.25em] px-7 py-4 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
          >
            Our Story
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
          </Link>
          <Link
            to="/projects"
            data-testid="purpose-view-all-button"
            className="group inline-flex items-center gap-3 border border-bone/25 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.25em] px-7 py-4 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const SELECTED_SLUGS = [
  "my-dream-nest",
  "my-dream-casa",
  "my-dream-hillock",
  "my-dream-griffin",
  "my-dream-solace",
];

const SelectedWork = () => {
  const featured = SELECTED_SLUGS.map(getProject);
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
            <div key={p.slug} className={i % 3 === 1 ? "lg:mt-14" : ""}>
              <ProjectCard project={p} homeMeta note={false} />
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

const Journey = () => (
  <section data-testid="home-journey" className="border-t border-line bg-coal">
    <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-36">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">Our Journey</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-5xl text-bone max-w-4xl">
          From our first project
          <br />
          <span className="text-concrete">to what comes next.</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-12 gap-6 mt-14 md:mt-20 items-start">
        <Reveal delay={0.15} className="col-span-12 md:col-span-4">
          <p className="font-display text-ember text-sm tracking-[0.2em] mb-3">2020</p>
          <p className="font-display font-medium uppercase tracking-tight text-2xl md:text-3xl text-bone">
            My Dream Nest
          </p>
          <p className="text-xs text-concrete mt-2 tracking-wide">Our first project</p>
        </Reveal>
        <Reveal delay={0.25} className="hidden md:flex col-span-4 justify-center pt-4">
          <ArrowRight className="w-6 h-6 text-concrete" strokeWidth={1} />
        </Reveal>
        <Reveal delay={0.2} className="md:hidden col-span-12 pl-1">
          <ArrowDown className="w-5 h-5 text-concrete" strokeWidth={1} />
        </Reveal>
        <Reveal delay={0.3} className="col-span-12 md:col-span-4">
          <p className="font-display text-ember text-sm tracking-[0.2em] mb-3">2026</p>
          <p className="font-display font-medium uppercase tracking-tight text-2xl md:text-3xl text-bone">
            {projectStats.total} Projects
          </p>
          <p className="text-xs text-concrete mt-2 tracking-[0.2em] uppercase">
            {projectStats.completed} Completed · 0{projectStats.ongoing} Ongoing
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

const BuildingNext = () => {
  const ongoing = ["my-dream-aurelia", "my-dream-elysium", "my-dream-aura", "my-dream-echelon", "my-dream-vale", "my-dream-ivy"].map(getProject);
  return (
    <section data-testid="building-next" className="border-t border-line">
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
                className="group grid grid-cols-12 gap-4 items-center py-7 md:py-10 border-b border-line hover:bg-coal transition-colors duration-500 px-2 md:px-4"
              >
                <span className="col-span-2 md:col-span-1 font-display text-ember text-sm tracking-[0.2em]">
                  {p.index}
                </span>
                <span className="col-span-8 md:col-span-6">
                  <span className="block font-display font-medium uppercase tracking-tight text-xl md:text-3xl text-bone group-hover:text-ember transition-colors duration-400">
                    {p.title}
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-concrete mt-1.5">
                    {[p.floors, p.configuration].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <span className="hidden md:flex md:col-span-3 items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ember">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember shadow-[0_0_7px_2px_rgba(232,93,34,0.45)] animate-pulse" />
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

const OfficeTeaser = () => (
  <section data-testid="home-office-teaser" className="border-t border-line bg-coal">
    <div className="max-w-[1600px] mx-auto grid grid-cols-12">
      <Reveal className="col-span-12 md:col-span-7 relative overflow-hidden min-h-[280px] md:min-h-[480px]">
        <img
          src="/assets/office/office-exterior.webp"
          srcSet="/assets/office/office-exterior-800.webp 800w, /assets/office/office-exterior-1600.webp 1448w"
          sizes="(max-width: 768px) 100vw, 58vw"
          alt="My Dream Projects container office in Ameenpur"
          data-testid="office-teaser-image"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </Reveal>
      <div className="col-span-12 md:col-span-5 px-5 md:px-12 py-14 md:py-24 flex flex-col justify-center border-t md:border-t-0 md:border-l border-line">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">Our Office</p>
          <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-4xl lg:text-5xl text-bone">
            The space we built
            <br />
            <span className="text-concrete">for ourselves.</span>
          </h2>
          <p className="text-sm md:text-base text-bone/75 leading-relaxed mt-7 max-w-md">
            Designed and built by us, our two-level container office is a small expression of the
            planning, design and construction approach behind My Dream Projects.
          </p>
          <Link
            to="/about"
            data-testid="office-teaser-button"
            className="group inline-flex items-center gap-3 mt-9 border border-bone/25 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.25em] px-7 py-4 self-start hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
          >
            Discover Our Story
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const FoundersTeaser = () => (
  <section data-testid="home-founders" className="border-t border-line">
    <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Meet the Founders</p>
        <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-4xl lg:text-5xl text-bone mt-6 max-w-3xl">
          The people behind
          <br />
          <span className="text-concrete">My Dream Projects.</span>
        </h2>
        <p className="text-sm md:text-base text-bone/75 leading-relaxed mt-7 max-w-xl">
          Built by two engineering friends. Driven by a shared vision.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14 md:mt-20 max-w-4xl">
        {[
          {
            name: "Nimmala Sai",
            focus: "Creative Direction · Design · Branding · Vision",
            photo: "/assets/founders/nimmala-sai.webp",
            testid: "home-founder-sai",
            firstName: "Sai",
            wa: WHATSAPP_NUMBER,
          },
          {
            name: "Kotapati Akhil",
            focus: "Operations · Site Execution · Customer Experience",
            photo: "/assets/founders/kotapati-akhil.jpg",
            testid: "home-founder-akhil",
            firstName: "Akhil",
            wa: WHATSAPP_NUMBER_AKHIL,
          },
        ].map((f, i) => (
          <Reveal key={f.name} delay={0.1 + i * 0.1}>
            <div
              data-testid={f.testid}
              className="group border border-line bg-coal hover:border-ember/40 transition-colors duration-500 overflow-hidden"
            >
              <div className="overflow-hidden">
                <img
                  src={f.photo}
                  alt={`${f.name}, Co-Founder of My Dream Projects`}
                  data-testid={`${f.testid}-portrait`}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover object-[50%_45%] block group-hover:scale-[1.02] transition-transform duration-[1.2s]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-display font-medium uppercase tracking-tight text-xl md:text-2xl text-bone">
                  {f.name}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.35em] text-ember mt-2.5">Co-Founder</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-concrete mt-4">{f.focus}</p>
                <a
                  href={waLinkTo(
                    f.wa,
                    `Hello ${f.firstName}, I came across My Dream Projects and would like to talk to you about your projects.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`${f.testid}-whatsapp`}
                  className="group/link inline-flex items-center gap-2 mt-6 text-[10px] uppercase tracking-[0.25em] text-bone/70 hover:text-ember transition-colors duration-300"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-ember" strokeWidth={1.5} />
                  Message {f.firstName}
                  <ArrowUpRight className="w-3 h-3 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <Link
          to="/about#founders"
          data-testid="our-story-button"
          className="group inline-flex items-center gap-3 mt-12 md:mt-16 border border-bone/25 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.25em] px-7 py-4 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
        >
          Our Story
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
        </Link>
      </Reveal>
    </div>
  </section>
);

const Cta = () => (
  <section data-testid="home-cta" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
    <Reveal>
      <h2 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-4xl md:text-6xl lg:text-7xl text-bone">
        Have a home
        <br />
        in mind? <span className="text-ember">Let's talk.</span>
      </h2>
      <p className="text-sm md:text-base text-concrete leading-relaxed max-w-xl mt-8">
        Explore our ongoing developments or speak with us directly about finding the right My
        Dream project for you.
      </p>
      <div className="flex flex-wrap gap-4 mt-10">
        <a
          href={waLink(WHATSAPP_GREETING)}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="cta-whatsapp-button"
          className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-[11px] md:text-xs uppercase tracking-[0.2em] px-7 py-4 md:py-5 hover:bg-bone transition-colors duration-400"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2} />
          Chat on WhatsApp
        </a>
        <a
          href={PHONE_SAI.tel}
          data-testid="cta-call-button"
          className="inline-flex items-center gap-3 border border-bone/25 text-bone font-display font-semibold text-[11px] md:text-xs uppercase tracking-[0.2em] px-7 py-4 md:py-5 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
        >
          <Phone className="w-4 h-4" strokeWidth={1.5} />
          Call Us
        </a>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="cta-directions-button"
          className="inline-flex items-center gap-3 border border-bone/25 text-bone font-display font-semibold text-[11px] md:text-xs uppercase tracking-[0.2em] px-7 py-4 md:py-5 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
        >
          <Navigation className="w-4 h-4" strokeWidth={1.5} />
          Get Directions
        </a>
      </div>
    </Reveal>
  </section>
);

export default function Home() {
  useSeo({
    title: "My Dream Projects | Residential Projects in Ameenpur, Hyderabad",
    description:
      "Explore My Dream Projects — thoughtfully planned residential developments in Ameenpur, Hyderabad. Discover our completed and ongoing projects, architectural elevations and floor plans.",
    image: "/assets/og-image.jpg",
  });
  return (
    <>
      <Hero />
      <Stats />
      <Purpose />
      <SelectedWork />
      <Journey />
      <BuildingNext />
      <OfficeTeaser />
      <FoundersTeaser />
      <Cta />
    </>
  );
}
