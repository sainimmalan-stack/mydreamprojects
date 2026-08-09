/**
 * PlanSheet — the unified premium presentation system for every project plan.
 * One reusable sheet: consistent header (brand / project / configuration),
 * generous ivory canvas, hairline charcoal framing and a consistent footer.
 * The architectural drawing itself is always the original, untouched file.
 * Every project — current and future — inherits this exact presentation.
 */
export const PlanSheet = ({ project, onOpen }) => {
  const config = project.configuration || project.flatMix;
  const configSuffix = project.configuration ? "Residence" : "Residences";
  return (
    <div data-testid="plan-sheet" className="bg-bone text-ink border border-ink/10">
      <div className="px-5 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6 border-b border-ink/10">
        <div className="flex items-center justify-between gap-4 text-[8px] md:text-[9px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-ink/45 whitespace-nowrap">
          <span>My Dream Projects</span>
          <span>Typical Floor Plan</span>
        </div>
        <h3 className="font-display font-semibold uppercase tracking-tighter text-2xl md:text-4xl text-ink mt-4 md:mt-5">
          {project.title}
        </h3>
        {config && (
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/50 mt-2">
            {config} {configSuffix}
          </p>
        )}
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        data-testid="floor-plan-preview"
        aria-label={`Open the full ${project.title} floor plan`}
        className="group p-4 md:p-8 cursor-zoom-in"
      >
        <img
          src={project.floorPlan.preview}
          alt={`${project.title} residential floor plan`}
          loading="lazy"
          className="w-full h-auto block border border-ink/10 group-hover:border-ink/30 transition-colors duration-500"
        />
      </div>
      <div className="px-5 md:px-8 py-4 border-t border-ink/10 flex items-center justify-between gap-4 text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.35em] text-ink/45 whitespace-nowrap">
        <span>My Dream Projects · Ameenpur, Hyderabad</span>
        <span>Sheet {project.index}</span>
      </div>
    </div>
  );
};

export default PlanSheet;
