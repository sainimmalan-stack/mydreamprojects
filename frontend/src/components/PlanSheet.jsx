/**
 * PlanSheet — the unified premium presentation system for every project plan.
 * Dark architectural studio edition: deep charcoal canvas, subtle graphite
 * gradient, hairline off-white framing, ivory typography and a sparing muted
 * champagne accent. The 2D drawing is always the original, untouched file;
 * 3D visualizations float on the same dark environment. When a project has
 * project.plan3d, the 2D/3D switcher appears automatically — every future
 * project inherits the exact same system. In 3D mode, verified per-unit
 * room labels (names + dimensions from the approved plan) float directly
 * on the render as glass chips, like a architectural presentation board.
 */
import PlanLabels from "./PlanLabels";

export const PlanSheet = ({ project, onOpen, mode = "2d", onModeChange, unitIdx = 0, onUnitChange }) => {
  const config = project.configuration || project.flatMix;
  const configSuffix = project.configuration ? "Residence" : "Residences";
  const has3d = Boolean(project.plan3d);
  const is3d = has3d && mode === "3d";
  const units = project.unitDetails || [];
  const activeUnit = units[Math.min(unitIdx, units.length - 1)];
  return (
    <div
      data-testid="plan-sheet"
      className="border border-white/10 bg-gradient-to-b from-[#1b1a17] to-[#121110] text-bone shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]"
    >
      <div className="px-5 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6 border-b border-white/10">
        <div className="flex items-center justify-between gap-4 text-[8px] md:text-[9px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-bone/40 whitespace-nowrap">
          <span>My Dream Projects</span>
          <span>Typical Floor Plan</span>
        </div>
        <h3 className="font-display font-semibold uppercase tracking-tighter text-2xl md:text-4xl text-bone mt-4 md:mt-5">
          {project.title}
        </h3>
        {config && (
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#C9A876]/90 mt-2">
            {config} {configSuffix}
          </p>
        )}
      </div>
      {has3d && (
        <div className="px-5 md:px-8 py-3 border-b border-white/10 flex items-center justify-between gap-4">
          <span
            data-testid="plan-mode-label"
            className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-bone/40"
          >
            {is3d ? "Premium 3D View" : "2D Architectural Plan"}
          </span>
          <div
            data-testid="plan-mode-toggle"
            role="group"
            aria-label="Floor plan 2D 3D switcher"
            className="inline-flex border border-white/15"
          >
            <button
              type="button"
              data-testid="plan-2d-button"
              aria-pressed={!is3d}
              onClick={() => onModeChange?.("2d")}
              className={`px-4 py-2 font-display font-semibold text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                !is3d
                  ? "bg-[#0c0b0a] text-bone shadow-[inset_0_-2px_0_0_rgba(201,168,118,0.85)]"
                  : "text-bone/45 hover:text-bone/75"
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
                is3d
                  ? "bg-[#0c0b0a] text-bone shadow-[inset_0_-2px_0_0_rgba(201,168,118,0.85)]"
                  : "text-bone/45 hover:text-bone/75"
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
        className="group p-3 md:p-6 cursor-zoom-in"
      >
        <div className="border border-white/10 bg-[#0d0c0a] p-2 md:p-2.5 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)] group-hover:border-white/25 transition-colors duration-500">
          <div className="relative">
            <img
              src={is3d ? project.plan3d.src : project.floorPlan.preview.replace("floor-plan-p1.jpg", "floor-plan-display.jpg")}
              {...(is3d
                ? { srcSet: project.plan3d.srcSet, sizes: "(max-width: 1600px) 100vw, 1200px" }
                : {
                    srcSet: `${project.floorPlan.preview.replace("floor-plan-p1.jpg", "floor-plan-display-800.webp")} 800w, ${project.floorPlan.preview.replace("floor-plan-p1.jpg", "floor-plan-display.jpg")} 1600w`,
                    sizes: "(max-width: 1600px) 100vw, 1200px",
                  })}
              alt={is3d ? `${project.title} premium 3D floor plan visualization` : `${project.title} residential floor plan`}
              data-testid={is3d ? "plan-3d-image" : "plan-2d-image"}
              loading="lazy"
              className="w-full h-auto block border border-[#C9A876]/25"
            />
            {is3d && activeUnit?.labels && <PlanLabels labels={activeUnit.labels} />}
          </div>
        </div>
        {is3d && (
          <p
            data-testid="plan-3d-disclaimer"
            className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-bone/40 mt-4 text-center"
          >
            Artistic 3D visualization — the 2D plan remains the technical reference
          </p>
        )}
      </div>
      {is3d && activeUnit && (
        <div
          data-testid="plan-unit-bar"
          className="border-t border-white/10 px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3"
        >
          {units.length > 1 ? (
            <div data-testid="room-unit-tabs" role="group" aria-label="Select flat type" className="inline-flex flex-wrap border border-white/15">
              {units.map((u, i) => (
                <button
                  key={u.label}
                  type="button"
                  data-testid={`room-unit-tab-${i}`}
                  aria-pressed={i === unitIdx}
                  onClick={() => onUnitChange?.(i)}
                  className={`px-3.5 py-2 font-display font-semibold text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    i === unitIdx
                      ? "bg-[#0c0b0a] text-bone shadow-[inset_0_-2px_0_0_rgba(201,168,118,0.85)]"
                      : "text-bone/45 hover:text-bone/75"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          ) : (
            <span data-testid="plan-unit-label" className="text-[9px] uppercase tracking-[0.35em] text-[#C9A876]">
              {activeUnit.label}
            </span>
          )}
          <span data-testid="plan-unit-area" className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-bone/50">
            {units.length > 1 && <span className="text-bone/80 mr-3">{activeUnit.label}</span>}
            Saleable Area <span className="text-[#C9A876] ml-1.5">{activeUnit.saleableArea}</span>
          </span>
        </div>
      )}
      <div className="px-5 md:px-8 py-4 border-t border-white/10 flex items-center justify-between gap-4 text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.35em] text-bone/40 whitespace-nowrap">
        <span>My Dream Projects · Ameenpur, Hyderabad</span>
        <span>Sheet {project.index}</span>
      </div>
    </div>
  );
};

export default PlanSheet;
