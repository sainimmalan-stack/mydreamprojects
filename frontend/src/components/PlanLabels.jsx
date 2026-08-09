/**
 * PlanLabels — glass room-label overlays for the 3D floor plan renders.
 * Each label floats at its mapped [x%, y%] position over the corresponding
 * room: a dark translucent glass chip with a hairline border, ivory room
 * name and a muted champagne dimension line. Purely presentational and
 * pointer-transparent so it never blocks zoom, pan or click interactions.
 */
export const PlanLabels = ({ labels, testIdPrefix = "plan-3d-label" }) => (
  <div data-testid={`${testIdPrefix}-overlay`} className="absolute inset-0 pointer-events-none" aria-hidden="true">
    {labels.map((l, i) => (
      <div
        key={`${l.name}-${i}`}
        data-testid={`${testIdPrefix}-${i}`}
        className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ left: `${l.pos[0]}%`, top: `${l.pos[1]}%` }}
      >
        <div className="inline-block bg-black/55 backdrop-blur-[6px] border border-white/20 px-1.5 py-0.5 md:px-2 md:py-1 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.85)]">
          <p className="font-display font-semibold text-[6px] md:text-[8px] uppercase tracking-[0.18em] text-bone whitespace-nowrap leading-[1.3]">
            {l.name}
          </p>
          {l.dims && (
            <p className="text-[6px] md:text-[8px] uppercase tracking-[0.1em] text-[#C9A876] whitespace-nowrap leading-[1.3]">
              {l.dims}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default PlanLabels;
