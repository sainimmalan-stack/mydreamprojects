import { motion } from "framer-motion";
import { projectStats } from "../data/projects";

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

export default function About() {
  return (
    <div data-testid="about-page" className="pt-28 md:pt-40">
      <header className="max-w-[1600px] mx-auto px-5 md:px-10 pb-20 md:pb-32">
        <Reveal className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">
          <p>The Studio — Est. 2020</p>
        </Reveal>
        <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-[11vw] md:text-[7.5vw] text-bone">
          <span className="block overflow-hidden">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: EASE }}>
              Built on trust.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block text-concrete" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.25, ease: EASE }}>
              Finished with pride.
            </motion.span>
          </span>
        </h1>
      </header>

      <section className="border-y border-line bg-coal">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12">
          <div className="col-span-12 md:col-span-5 px-5 md:px-10 py-16 md:py-28 md:border-r border-line">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-6">Who we are</p>
              <p className="text-base md:text-lg text-bone/85 leading-relaxed max-w-md">
                My Dream Projects is a residential construction studio based in Ameenpur,
                Hyderabad. Since 2020 we have taken {projectStats.total} homes from first
                sketch to final key — {projectStats.completed} completed,{" "}
                {projectStats.ongoing} currently on site.
              </p>
              <p className="text-sm text-concrete leading-relaxed max-w-md mt-6">
                Full studio story and team profiles will live here.
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-7 px-5 md:px-10 py-16 md:py-28">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-10">Founders</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-10 md:gap-14">
              {FOUNDERS.map((f, i) => (
                <Reveal key={f.name} delay={0.1 + i * 0.1}>
                  <div data-testid={f.testid} className="group">
                    <div className="aspect-[3/4] bg-ink border border-line flex items-end p-6 overflow-hidden">
                      <span className="font-display font-bold uppercase tracking-tighter text-6xl md:text-7xl text-outline group-hover:text-ember transition-colors duration-700 select-none">
                        {f.name.split(" ").map((w) => w[0]).join("")}
                      </span>
                    </div>
                    <h3 className="font-display font-medium uppercase tracking-tight text-xl text-bone mt-5">
                      {f.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-ember mt-1.5">{f.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-40">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">How we work</p>
        </Reveal>
        <div className="border-t border-line">
          {[
            ["01", "Listen", "Every project begins with your dream, not our template."],
            ["02", "Design", "Plans, materials and budgets resolved before a single brick."],
            ["03", "Build", "Disciplined site execution with transparent, staged updates."],
            ["04", "Handover", "Keys delivered with the finish we would want in our own home."],
          ].map(([n, t, c], i) => (
            <Reveal key={n} delay={i * 0.06}>
              <div data-testid={`process-step-${n}`} className="grid grid-cols-12 gap-4 py-8 md:py-12 border-b border-line items-baseline">
                <span className="col-span-2 md:col-span-1 font-display text-ember text-sm tracking-[0.2em]">{n}</span>
                <h3 className="col-span-10 md:col-span-4 font-display font-medium uppercase tracking-tight text-xl md:text-3xl text-bone">{t}</h3>
                <p className="col-span-12 md:col-span-6 md:col-start-7 text-sm text-concrete leading-relaxed">{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
