import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { projectStats } from "../data/projects";
import { waLinkTo, WHATSAPP_NUMBER, WHATSAPP_NUMBER_AKHIL, founderIntroMessage, PHONE_SAI, PHONE_AKHIL } from "../data/contact";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];

const FOUNDERS = [
  {
    name: "Nimmala Sai",
    role: "Co-Founder",
    focus: "Co-Founder · Creative & Brand Direction",
    testid: "founder-sai",
    photo: "/assets/founders/nimmala-sai.webp",
    firstName: "Sai",
    wa: WHATSAPP_NUMBER,
    tel: PHONE_SAI.tel,
    bio: [
      "Sai is the creative mind behind much of the identity of My Dream Projects. From project names, colour palettes, brochures and creative concepts to office design and landscaping, he takes an active role in shaping how every project is presented and experienced.",
      "Rather than being heavily involved in day-to-day site operations, his focus is primarily on creative direction, design thinking and the overall character of the brand and its developments.",
      "Away from work, Sai enjoys travelling, photography, music and off-roading.",
      "He is married to Amulya, and they have a son, Aadhyant.",
    ],
  },
  {
    name: "Kotapati Akhil",
    role: "Co-Founder",
    focus: "Co-Founder · Project Execution & Operations",
    testid: "founder-akhil",
    photo: "/assets/founders/kotapati-akhil.jpg",
    firstName: "Akhil",
    wa: WHATSAPP_NUMBER_AKHIL,
    tel: PHONE_AKHIL.tel,
    bio: [
      "Akhil is the operational force behind My Dream Projects. He takes the lead on site execution, construction activities, customer coordination, workforce management and the day-to-day responsibilities required to take a project from plan to completion.",
      "His calm and composed nature, combined with his hands-on involvement at the project level, complements Sai\u2019s creative approach and creates a clear balance between vision and execution within the company.",
      "Outside work, Akhil is a fitness enthusiast and a strongly family-oriented person, known for his calm-going personality.",
      "He is married to Yamuna, and they have a son, Ayaansh.",
    ],
  },
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

const Story = () => (
  <section data-testid="about-story" className="max-w-[1600px] mx-auto px-5 md:px-10 pt-28 md:pt-44 pb-16 md:pb-24">
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
  </section>
);

const StoryText = () => (
  <section data-testid="about-story-text" className="border-t border-line">
    <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-20 md:py-28">
      <div className="grid grid-cols-12 gap-6">
        <Reveal className="col-span-12 md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Our Story</p>
        </Reveal>
        <div className="col-span-12 md:col-span-9 max-w-2xl">
          <Reveal delay={0.1}>
            <h3 className="font-display font-semibold tracking-tighter leading-[1.08] text-2xl md:text-4xl text-bone">
              From engineering friends to{" "}
              <span className="text-ember">building dreams together.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.2} className="mt-7 md:mt-8 space-y-5">
            <p className="text-sm md:text-base text-bone/85 leading-relaxed">
              Sai and Akhil first met in Chennai in 2013 as engineering students. What began as a
              college friendship gradually grew into a partnership built on trust, shared ambition
              and complementary strengths.
            </p>
            <p className="text-sm md:text-base text-bone/85 leading-relaxed">
              Years later, that friendship became the foundation of My Dream Projects. From choosing
              project names and shaping designs to managing construction and delivering homes, they
              built the company together from the ground up — largely through their own effort,
              learning and experience, without major backing from their families.
            </p>
            <p className="text-sm md:text-base text-concrete leading-relaxed">
              Today, their different strengths define the way My Dream Projects operates: Sai shapes
              the creative identity and vision, while Akhil drives execution and operations on the
              ground.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-12 md:mt-16 border-t border-line pt-10 md:pt-12 space-y-5">
            <p className="text-base md:text-lg text-bone/85 leading-relaxed">
              My Dream Projects was founded in 2020 by Nimmala Sai and Kotapati Akhil with a shared
              vision—to create thoughtfully designed homes that bring together contemporary
              architecture, efficient planning and dependable construction.
            </p>
            <p className="text-sm md:text-base text-concrete leading-relaxed">
              What began with one residential project has grown into a portfolio of{" "}
              {projectStats.total} developments across Ameenpur, with {projectStats.completed}{" "}
              completed projects and six more taking shape.
            </p>
          </Reveal>
        </div>
      </div>
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
  <section data-testid="about-founders" id="about-founders" className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
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

    <div className="grid sm:grid-cols-2 gap-6 md:gap-10 items-start">
      {FOUNDERS.map((f, i) => (
        <Reveal key={f.name} delay={0.1 + i * 0.1}>
          <div
            data-testid={f.testid}
            className="group border border-line hover:border-ember/40 transition-colors duration-500 overflow-hidden flex flex-col md:flex-row bg-coal"
          >
            <div className="md:shrink-0 overflow-hidden">
              <img
                src={f.photo}
                alt={`${f.name}, Co-Founder of My Dream Projects`}
                data-testid={`${f.testid}-portrait`}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover object-[50%_45%] md:h-[440px] md:w-auto block group-hover:scale-[1.02] transition-transform duration-[1.2s]"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
            </div>
            <div className="flex flex-col justify-end p-10 md:p-12">
              <h3 className="font-display font-medium uppercase tracking-tight text-2xl md:text-3xl text-bone">
                {f.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.35em] text-ember mt-2.5">{f.role}</p>
            </div>
          </div>
          <div
            data-testid={`${f.testid}-profile`}
            className="border border-t-0 border-line p-8 md:p-12"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-ember">{f.focus}</p>
            <div className="mt-6 space-y-4">
              {f.bio.map((para, j) => (
                <p
                  key={j}
                  className={`text-sm leading-relaxed ${
                    j < 2 ? "text-bone/80" : "text-concrete"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-8 pt-6 border-t border-line">
              <a
                href={waLinkTo(f.wa, founderIntroMessage(f.firstName))}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`${f.testid}-whatsapp`}
                className="group/link inline-flex items-center gap-2.5 py-3 text-[10px] uppercase tracking-[0.25em] text-bone/70 hover:text-ember transition-colors duration-300"
              >
                <MessageCircle className="w-3.5 h-3.5 text-ember" strokeWidth={1.5} />
                Message {f.firstName}
                <ArrowUpRight className="w-3 h-3 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
              </a>
              <a
                href={f.tel}
                data-testid={`${f.testid}-call`}
                className="inline-flex items-center gap-2.5 py-3 text-[10px] uppercase tracking-[0.25em] text-bone/70 hover:text-ember transition-colors duration-300"
              >
                <Phone className="w-3.5 h-3.5 text-ember" strokeWidth={1.5} />
                Call {f.firstName}
              </a>
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-20 md:mt-32 border-t border-line pt-14 md:pt-20">
      <div data-testid="founders-closing" className="max-w-3xl">
        <p className="font-display font-semibold uppercase tracking-tighter leading-[1.05] text-2xl md:text-4xl lg:text-5xl text-bone">
          Two friends. Two complementary strengths.{" "}
          <span className="text-ember">One shared dream.</span>
        </p>
        <p className="text-sm md:text-base text-concrete leading-relaxed mt-6">
          Since 2013, a friendship built on trust — now building homes together.
        </p>
      </div>
    </Reveal>
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
  const { hash } = useLocation();
  useSeo({
    title: "About My Dream Projects | Ameenpur, Hyderabad",
    description:
      "Founded in 2020 by Nimmala Sai and Kotapati Akhil, My Dream Projects creates thoughtfully designed residential developments in Ameenpur, Hyderabad.",
    image: "/assets/og-image.jpg",
  });
  // deep links (/about#founders) land directly on the founders section
  useEffect(() => {
    if (hash === "#founders") {
      const t = setTimeout(() => {
        document.getElementById("about-founders")?.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, [hash]);
  return (
    <div data-testid="about-page">
      <Story />
      <Founders />
      <StoryText />
      <Journey />
      <Philosophy />
    </div>
  );
}

