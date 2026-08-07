import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projectStats } from "../data/projects";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];

const FOUNDERS = [
  { name: "Nimmala Sai", role: "Co-Founder", testid: "founder-sai" },
  { name: "Kotapati Akhil", role: "Co-Founder", testid: "founder-akhil" },
];

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

const OfficeImage = ({ src, srcSet, sizes, alt, testid, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      data-testid={testid}
      className={`relative overflow-hidden border border-line group bg-ink ${className}`}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto block group-hover:scale-[1.03] transition-[transform,opacity] duration-[1.2s] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </div>
  );
};

const Story = () => (
  <section data-testid="about-story" className="max-w-[1600px] mx-auto px-5 md:px-10 pt-28 md:pt-44 pb-24 md:pb-40">
    <Reveal className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">
      <p>Our Story</p>
    </Reveal>
    <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-[10.5vw] md:text-[7vw] text-bone">
      <span className="block overflow-hidden">
        <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: EASE }}>
          Dreams, drawn
        </motion.span>
      </span>
      <span className="block overflow-hidden">
        <motion.span className="block text-concrete" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.25, ease: EASE }}>
          into reality.
        </motion.span>
      </span>
    </h1>
    <div className="grid grid-cols-12 gap-6 mt-14 md:mt-24">
      <Reveal delay={0.2} className="col-span-12 md:col-span-6 md:col-start-7">
        <p className="text-base md:text-lg text-bone/85 leading-relaxed">
          My Dream Projects was founded in 2020 by Nimmala Sai and Kotapati Akhil with a shared
          vision—to create thoughtfully designed homes that bring together contemporary
          architecture, efficient planning and dependable construction.
        </p>
        <p className="text-sm md:text-base text-concrete leading-relaxed mt-6">
          What began with one residential project has grown into a portfolio of{" "}
          {projectStats.total} developments across Ameenpur, with {projectStats.completed}{" "}
          completed projects and six more taking shape.
        </p>
      </Reveal>
    </div>
  </section>
);

const JOURNEY = [
  { year: "2020", event: "My Dream Projects founded" },
  { year: "2020", event: "My Dream Nest — Our first project" },
  { year: "2021–2023", event: "Growing our residential portfolio" },
  { year: "2024–2025", event: "A growing architectural identity" },
  { year: "2026", event: `${projectStats.total} Projects`, sub: `${projectStats.completed} Completed · 0${projectStats.ongoing} Ongoing` },
];

const Journey = () => (
  <section data-testid="about-journey" className="border-y border-line bg-coal">
    <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-36">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-12 md:mb-16">Our Journey</p>
      </Reveal>
      <div className="border-t border-line">
        {JOURNEY.map((j, i) => (
          <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
            <div
              data-testid={`journey-${i}`}
              className="grid grid-cols-12 gap-4 py-7 md:py-9 border-b border-line items-baseline"
            >
              <span className="col-span-4 md:col-span-2 font-display text-ember text-sm md:text-base tracking-[0.15em]">
                {j.year}
              </span>
              <span className="col-span-8 md:col-span-10 font-display font-medium uppercase tracking-tight text-lg md:text-2xl text-bone">
                {j.event}
                {j.sub && (
                  <span className="block md:inline md:ml-6 text-[10px] md:text-xs tracking-[0.3em] text-concrete mt-1.5 md:mt-0">
                    {j.sub}
                  </span>
                )}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Founders = () => (
  <section data-testid="about-founders" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
    <div className="grid grid-cols-12 gap-6 mb-14 md:mb-24">
      <Reveal className="col-span-12 md:col-span-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Founders</p>
      </Reveal>
      <Reveal delay={0.1} className="col-span-12 md:col-span-9">
        <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-5xl lg:text-6xl text-bone">
          The people behind
          <br />
          <span className="text-concrete">the dream.</span>
        </h2>
      </Reveal>
    </div>
    <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
      {FOUNDERS.map((f, i) => (
        <Reveal key={f.name} delay={0.1 + i * 0.1}>
          <div
            data-testid={f.testid}
            className="group border border-line hover:border-ember/40 transition-colors duration-500 p-10 md:p-16 flex flex-col justify-between min-h-[280px] md:min-h-[340px]"
          >
            <span className="font-display font-bold uppercase tracking-tighter text-6xl md:text-8xl text-outline group-hover:text-ember transition-colors duration-700 select-none leading-none">
              {f.name.split(" ").map((w) => w[0]).join("")}
            </span>
            <div>
              <h3 className="font-display font-medium uppercase tracking-tight text-2xl md:text-3xl text-bone">
                {f.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.35em] text-ember mt-2.5">{f.role}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const Office = () => (
  <section data-testid="about-office" className="border-t border-line bg-coal">
    <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
      <div className="grid grid-cols-12 gap-6 mb-12 md:mb-20">
        <Reveal className="col-span-12 md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Our Office</p>
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <Reveal delay={0.1}>
            <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-5">
              The space we built for ourselves
            </p>
            <h2 className="font-display font-bold uppercase tracking-tighter leading-[0.98] text-4xl md:text-6xl text-bone">
              Designed by us.
              <br />
              Built by us.
              <br />
              <span className="text-ember">Home to us.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 md:mt-10 max-w-2xl">
            <p className="text-base md:text-lg text-bone/85 leading-relaxed">
              Our office reflects the same philosophy we bring to every My Dream project. Designed
              and built by us, the two-level container office combines a European-inspired
              architectural approach with efficient planning, landscaped outdoor spaces and a
              contemporary workspace.
            </p>
            <p className="text-sm md:text-base text-concrete leading-relaxed mt-6">
              More than a workplace, it is a small expression of how we think about design, space
              and construction.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
        <Reveal className="w-full md:w-[62%]">
          <OfficeImage
            src="/assets/office/office-exterior.webp"
            srcSet="/assets/office/office-exterior-800.webp 800w, /assets/office/office-exterior-1600.webp 1600w"
            sizes="(max-width: 768px) 100vw, 62vw"
            alt="My Dream Projects two-storey container office at night with illuminated signage and car parked in front"
            testid="office-photo-primary"
          />
        </Reveal>
        <Reveal delay={0.1} className="w-full md:w-[38%]">
          <OfficeImage
            src="/assets/office/office-interior.webp"
            srcSet="/assets/office/office-interior-800.webp 800w, /assets/office/office-interior.webp 1500w"
            sizes="(max-width: 768px) 100vw, 38vw"
            alt="My Dream Projects office interior with desk, chairs and My Dream Projects logo on the wall"
            testid="office-photo-interior"
          />
        </Reveal>
      </div>
    </div>
  </section>
);

const Philosophy = () => (
  <section data-testid="about-philosophy" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
    <Reveal className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Our Philosophy</p>
      </div>
      <div className="col-span-12 md:col-span-9">
        <h2 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-4xl md:text-6xl lg:text-7xl text-bone">
          You dream.
          <br />
          <span className="text-concrete">We build.</span>
        </h2>
        <p className="text-base md:text-lg text-bone/85 leading-relaxed max-w-2xl mt-8 md:mt-10">
          Every project begins with a plan, but ultimately it is about the people who will call it
          home. We focus on thoughtful layouts, contemporary architecture and spaces designed for
          everyday living.
        </p>
        <Link
          to="/projects"
          data-testid="about-explore-projects-button"
          className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-[11px] md:text-xs uppercase tracking-[0.2em] px-8 py-5 mt-10 hover:bg-bone transition-colors duration-400"
        >
          Explore Our Projects
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
        </Link>
      </div>
    </Reveal>
  </section>
);

export default function About() {
  useSeo({
    title: "About My Dream Projects | Ameenpur, Hyderabad",
    description:
      "Founded in 2020 by Nimmala Sai and Kotapati Akhil, My Dream Projects creates thoughtfully designed residential developments in Ameenpur, Hyderabad.",
    image: "/assets/og-image.jpg",
  });
  return (
    <div data-testid="about-page">
      <Story />
      <Journey />
      <Founders />
      <Office />
      <Philosophy />
    </div>
  );
}

