/**
 * PlanSheet — the unified premium presentation system for every project plan.
 * One reusable sheet: consistent header (brand / project / configuration),
 * generous ivory canvas, hairline charcoal framing and a consistent footer.
 * The architectural drawing itself is always the original, untouched file.
 * When a project has a premium 3D visualization (project.plan3d), a 2D/3D
 * switcher appears automatically — every future project inherits the same system.
 */
export const PlanSheet = ({ project, onOpen, mode = "2d", onModeChange }) => {
  const config = project.configuration || project.flatMix;
  const configSuffix = project.configuration ? "Residence" : "Residences";
  const has3d = Boolean(project.plan3d);
  const is3d = has3d && mode === "3d";
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
      {has3d && (
        <div className="px-5 md:px-8 py-3 border-b border-ink/10 flex items-center justify-between gap-4">
          <span
            data-testid="plan-mode-label"
            className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-ink/45"
          >
            {is3d ? "Premium 3D View" : "2D Architectural Plan"}
          </span>
          <div
            data-testid="plan-mode-toggle"
            role="group"
            aria-label="Floor plan 2D 3D switcher"
            className="inline-flex border border-ink/15"
          >
            <button
              type="button"
              data-testid="plan-2d-button"
              aria-pressed={!is3d}
              onClick={() => onModeChange?.("2d")}
              className={`px-4 py-2 font-display font-semibold text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                !is3d ? "bg-ink text-bone" : "text-ink/50 hover:text-ink"
              }`}
            >
              2D Plan
            </button>
            <button
              type="button"
              data-testid="plan-3d-button"
              aria-pressed={is3d}
              onClick={() => onModeChange?.("3d")}
              className={`px-4 py-2 font-display font-semibold text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                is3d ? "bg-ink text-bone" : "text-ink/50 hover:text-ink"
              }`}
            >
              3D Plan
            </button>
          </div>
        </div>
      )}
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
          src={is3d ? project.plan3d.src : project.floorPlan.preview}
          {...(is3d ? { srcSet: project.plan3d.srcSet, sizes: "(max-width: 1600px) 100vw, 1200px" } : {})}
          alt={is3d ? `${project.title} premium 3D floor plan visualization` : `${project.title} residential floor plan`}
          data-testid={is3d ? "plan-3d-image" : "plan-2d-image"}
          loading="lazy"
          className="w-full h-auto block border border-ink/10 group-hover:border-ink/30 transition-colors duration-500"
        />
        {is3d && (
          <p
            data-testid="plan-3d-disclaimer"
            className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-ink/40 mt-4 text-center"
          >
            Artistic 3D visualization — the 2D plan remains the technical reference
          </p>
        )}
      </div>
      <div className="px-5 md:px-8 py-4 border-t border-ink/10 flex items-center justify-between gap-4 text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.35em] text-ink/45 whitespace-nowrap">
        <span>My Dream Projects · Ameenpur, Hyderabad</span>
        <span>Sheet {project.index}</span>
      </div>
    </div>
  );
};

export default PlanSheet;
