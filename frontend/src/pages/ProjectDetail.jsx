import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import FloorPlanViewer from "../components/FloorPlanViewer";
import DayNightImage from "../components/DayNightImage";
import ElevationViewer from "../components/ElevationViewer";
import ComingSoonElevation from "../components/ComingSoonElevation";
import LoanPartners from "../components/LoanPartners";
import BrandSpecs from "../components/BrandSpecs";
import PlanSheet from "../components/PlanSheet";
import { getProject, getAdjacent } from "../data/projects";
import { waLink } from "../data/contact";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];

export default function ProjectDetail() {
  const { slug } = useParams();
  const [planOpen, setPlanOpen] = useState(false);
  const [planMode, setPlanMode] = useState("2d");
  const [elevOpen, setElevOpen] = useState(false);
  const project = getProject(slug);
  useSeo({
    title: project
      ? `${project.title} | Residential Project in Ameenpur | My Dream Projects`
      : "Project | My Dream Projects",
    description: project
      ? `Explore ${project.title} by My Dream Projects in Ameenpur, Hyderabad. ${
          project.status === "completed" ? `Completed in ${project.year}.` : "Currently under development."
        } View the project ${project.cover ? "elevation, details" : "details"} and residential floor plan.`
      : "Residential project by My Dream Projects in Ameenpur, Hyderabad.",
    image: project?.cover || "/assets/og-image.jpg",
  });
  if (!project) return <Navigate to="/projects" replace />;
  const { prev, next } = getAdjacent(slug);

  const heroSrc = project.elevationModes?.night || project.cover;
  const rateNum = project.pricePerSft ? Number(project.pricePerSft.replace(/[^0-9]/g, "")) : null;
  const areaNum = project.unitDetails?.[0]?.saleableArea
    ? Number(project.unitDetails[0].saleableArea.replace(/[^0-9.]/g, ""))
    : null;
  const emiPrefill = rateNum && areaNum ? Math.round((rateNum * areaNum) / 100000) * 100000 : null;
  const heroSrcSet = !project.cover
    ? undefined
    : project.elevationModes
      ? `${heroSrc.replace(".webp", "-800.webp")} 800w, ${heroSrc} ${project.elevationModes.width || 1402}w`
      : `${project.cover.replace("elevation.jpg", "elevation-800.webp")} 800w, ${project.cover.replace("elevation.jpg", "elevation-1600.webp")} 1600w`;

  const stats = [
    { label: "Status", value: project.status === "completed" ? "Sold Out & Occupied" : project.status },
    { label: "Location", value: project.location },
    { label: "Type", value: project.type },
    ...(project.floors ? [{ label: "Floors", value: project.floors }] : []),
    ...(project.totalFlats
      ? [
          {
            label: "Total Flats",
            value: `${project.totalFlats} Flats`,
            sub: project.flatMix,
            ...(project.status === "ongoing"
              ? {
                  enquire: waLink(
                    `Hello My Dream Projects, I'm interested in ${project.title} (Ameenpur, Hyderabad). Could you please share which units are currently available in this project?`
                  ),
                }
              : {}),
          },
        ]
      : []),
    { label: "Year", value: project.status === "ongoing" ? `Expected ${project.year}` : project.year },
  ];

  return (
    <div data-testid="project-detail-page" className="pt-20 md:pt-24">
      <section className="relative h-[62svh] md:h-[80svh] overflow-hidden bg-coal border-b border-line">
        {project.cover ? (
          <motion.img
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
            src={heroSrc}
            srcSet={heroSrcSet}
            sizes="100vw"
            alt={`${project.title} residential apartment elevation in Ameenpur`}
            data-testid="project-hero-image"
            className="absolute inset-0 w-full h-full object-cover object-[50%_30%]"
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
            className="flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-concrete hover:text-ember transition-colors duration-300 mb-8"
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="flex flex-wrap gap-3 mt-7"
          >
            <span
              data-testid="project-meta-status-year"
              className={`border text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-4 py-2 ${
                project.status === "ongoing"
                  ? "border-ember/50 bg-ink/40 backdrop-blur text-ember"
                  : "border-bone/25 bg-ink/40 backdrop-blur text-bone/90"
              }`}
            >
              {project.status === "ongoing" ? `${project.status} · Expected ${project.year}` : project.year !== "—" ? `${project.status} · ${project.year}` : project.status}
            </span>
            {project.floors && (
              <span
                data-testid="project-meta-floors-type"
                className="border border-bone/25 bg-ink/40 backdrop-blur text-bone/90 text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-4 py-2"
              >
                {[project.floors, project.configuration, project.type].filter(Boolean).join(" · ")}
              </span>
            )}
            {project.pricePerSft && (
              <span
                data-testid="project-price-chip"
                className="border border-ember/50 bg-ink/40 backdrop-blur text-ember text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-4 py-2"
              >
                {project.pricePerSft} / Sq.Ft.
              </span>
            )}
            <Link
              to={emiPrefill ? `/emi-calculator?amount=${emiPrefill}` : "/emi-calculator"}
              data-testid="calculate-emi-cta"
              className="inline-flex items-center gap-2 border border-bone/25 bg-ink/40 backdrop-blur text-bone/90 text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-4 py-2 hover:border-ember hover:text-ember transition-colors duration-300"
            >
              Calculate EMI
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-line">
        <div
          data-testid="project-stats-grid"
          className={`max-w-[1600px] mx-auto grid grid-cols-2 ${stats.length === 6 ? "md:grid-cols-6" : stats.length === 5 ? "md:grid-cols-5" : "md:grid-cols-4"}`}
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
              {(() => {
                const body = (
                  <>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-concrete mb-2.5">{s.label}</p>
                    <p
                      className={`font-display uppercase tracking-tight text-base md:text-xl ${
                        s.label === "Status" && project.status === "ongoing"
                          ? "text-ember"
                          : s.enquire
                            ? "text-bone group-hover:text-ember transition-colors duration-300"
                            : "text-bone"
                      }`}
                    >
                      {s.value}
                    </p>
                    {s.sub && (
                      <p className="text-[10px] uppercase tracking-[0.25em] text-concrete mt-2">{s.sub}</p>
                    )}
                    {s.enquire && (
                      <p className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-ember/80 mt-3 group-hover:text-ember transition-colors duration-300">
                        Check Availability
                        <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                      </p>
                    )}
                  </>
                );
                return s.enquire ? (
                  <a
                    href={s.enquire}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="availability-enquiry-link"
                    aria-label={`Check availability of units in ${project.title} on WhatsApp`}
                    className="group block"
                  >
                    {body}
                  </a>
                ) : (
                  body
                );
              })()}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Loan & finance strip — compact, dark-native, beside the project stats */}
      <section data-testid="project-finance" className="border-b border-line">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-10 md:py-14 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-14">
          <div className="shrink-0">
            <p className="text-[10px] uppercase tracking-[0.4em] text-ember">Loan &amp; Finance Options</p>
            <p className="text-xs text-concrete mt-2.5 max-w-xs leading-relaxed">
              Home-loan assistance for this project is available through India's leading
              institutions.
            </p>
          </div>
          <LoanPartners testidPrefix="project-partner" />
          <Link
            to={emiPrefill ? `/emi-calculator?amount=${emiPrefill}` : "/emi-calculator"}
            data-testid="project-finance-emi-link"
            className="group lg:ml-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-bone/85 hover:text-ember transition-colors duration-300 shrink-0"
          >
            Calculate EMI
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
          </Link>
        </div>
      </section>

      {project.headline && (
        <section data-testid="project-concept" className="border-b border-line bg-coal">
          <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">The Concept</p>
              <h2 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-4xl md:text-6xl lg:text-7xl text-bone">
                {project.headline}
              </h2>
              <p className="text-sm md:text-base text-concrete tracking-wide mt-5">{project.headlineSub}</p>
            </motion.div>
            {project.glance && (
              <div data-testid="project-glance" className="grid grid-cols-2 md:grid-cols-4 border border-line mt-14 md:mt-20">
                {project.glance.map((g, i) => (
                  <motion.div
                    key={g.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                    data-testid={`glance-${i}`}
                    className={`px-5 md:px-8 py-8 md:py-12 ${i > 0 ? "md:border-l border-line" : ""} ${i > 1 ? "border-t md:border-t-0 border-line" : ""} ${i % 2 === 1 ? "border-l" : ""}`}
                  >
                    <p className="font-display font-semibold uppercase tracking-tight text-lg md:text-2xl text-bone leading-tight">
                      {g.value}
                    </p>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-concrete mt-3">{g.label}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-20 md:py-32 grid grid-cols-12 gap-6">
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
              {project.elevationModes ? (
                <DayNightImage
                  daySrc={project.elevationModes.day}
                  nightSrc={project.elevationModes.night}
                  alt={`${project.title} residential apartment elevation in Ameenpur`}
                  testid="elevation"
                  fullWidth={project.elevationModes.width}
                  aspect={project.elevationModes.aspect}
                  onImageClick={() => setElevOpen(true)}
                />
              ) : (
                <img
                  src={project.cover}
                  srcSet={`${project.cover.replace("elevation.jpg", "elevation-800.webp")} 800w, ${project.cover.replace("elevation.jpg", "elevation-1600.webp")} 1600w`}
                  sizes="(max-width: 1600px) 100vw, 1600px"
                  alt={`${project.title} residential apartment elevation in Ameenpur`}
                  data-testid="project-elevation-image"
                  loading="lazy"
                  className="w-full h-auto block"
                />
              )}
            </div>
          </motion.div>
        </section>
      )}

      {!project.cover && project.floorPlan && (
        <section data-testid="project-elevation-placeholder" className="max-w-[1600px] mx-auto px-5 md:px-10 pb-20 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-6">Elevation</p>
            <ComingSoonElevation project={project} />
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
                {project.planTagline || "Typical floor layout. Open the full-resolution plan for dimensions and details."}
              </p>
              <div data-testid="unit-details" className="mt-10 max-w-sm">
                <p className="text-[10px] uppercase tracking-[0.4em] text-concrete mb-1">Unit Details</p>
                {[
                  { label: "Type", value: project.configuration || project.flatMix },
                  ...(project.configuration && project.flatMix && project.configuration !== project.flatMix
                    ? [{ label: "Flat Mix", value: project.flatMix }]
                    : []),
                  { label: "Floors", value: project.floors },
                  { label: "Total Residences", value: project.totalFlats ? `${project.totalFlats}` : null },
                ]
                  .filter((r) => r.value)
                  .map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-concrete">{r.label}</span>
                      <span
                        data-testid={`unit-detail-${r.label.toLowerCase().replace(/\s+/g, "-")}`}
                        className="font-display text-sm md:text-base font-medium uppercase tracking-tight text-bone text-right"
                      >
                        {r.value}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setPlanOpen(true)}
                  data-testid="view-full-plan-button"
                  data-pdf={project.floorPlan.pdf}
                  className="group inline-flex items-center gap-3 border border-bone/25 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.2em] px-6 py-4 hover:border-ember hover:text-ember transition-[color,border-color] duration-400"
                >
                  View Full Plan
                  <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-400" strokeWidth={2} />
                </button>
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
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="col-span-12 md:col-span-8"
            >
              <PlanSheet project={project} onOpen={() => setPlanOpen(true)} mode={planMode} onModeChange={setPlanMode} />
            </motion.div>
          </div>
        </section>
      )}

      {!project.cover && !project.floorPlan && (
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

      <BrandSpecs liftBrand={project.liftBrand} />

      {project.siteLocation && (
        <section data-testid="visit-site-section" className="border-t border-line">
          <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-20 md:py-32 grid grid-cols-12 gap-6 md:gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="col-span-12 md:col-span-4"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-ember mb-6">Visit Project Site</p>
              <h2 className="font-display font-semibold uppercase tracking-tighter leading-[1.02] text-3xl md:text-4xl text-bone">
                {project.title}
              </h2>
              <p className="text-sm text-concrete leading-relaxed mt-4">{project.location}</p>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <a
                  href={project.siteLocation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="get-directions-button"
                  className="group inline-flex items-center gap-3 bg-ember text-ink font-display font-semibold text-[11px] uppercase tracking-[0.2em] px-6 py-4 hover:bg-bone transition-colors duration-400"
                >
                  Get Directions
                  <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-400" strokeWidth={2} />
                </a>
                <Link
                  to={`/project-map?project=${project.slug}`}
                  data-testid="view-on-map-link"
                  className="group inline-flex items-center gap-3 border border-bone/20 text-bone font-display font-semibold text-[11px] uppercase tracking-[0.2em] px-6 py-4 hover:border-ember hover:text-ember transition-colors duration-400"
                >
                  View On Our Map
                  <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-400" strokeWidth={2} />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="col-span-12 md:col-span-8 border border-line overflow-hidden"
            >
              <iframe
                src={project.siteLocation.embed}
                title={`${project.title} project site location map`}
                data-testid="site-map-embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="w-full h-[320px] md:h-[440px] block border-0"
              />
            </motion.div>
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

      {project.floorPlan && (
        <FloorPlanViewer
          open={planOpen}
          onClose={() => setPlanOpen(false)}
          image={planMode === "3d" && project.plan3d ? project.plan3d.src : project.floorPlan.preview.replace("floor-plan-p1.jpg", "floor-plan-display.jpg")}
          pdf={planMode === "3d" ? null : project.floorPlan.pdf}
          title={`${project.title} — ${planMode === "3d" && project.plan3d ? "3D Floor Plan" : "Floor Plan"}`}
          edgeToEdge={planMode === "3d" && Boolean(project.plan3d)}
        />
      )}
      {project.elevationModes && (
        <ElevationViewer
          open={elevOpen}
          onClose={() => setElevOpen(false)}
          daySrc={project.elevationModes.day}
          nightSrc={project.elevationModes.night}
          title={`${project.title} — Elevation`}
        />
      )}
    </div>
  );
}
