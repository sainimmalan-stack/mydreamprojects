import { useMemo } from "react";

// Premium "Elevation Coming Soon" treatment for the six ongoing projects.
// REPLACEABLE ASSET: this placeholder renders only while a project has no real
// elevation (no cover / elevationModes in projects.js). When the actual
// elevation arrives, adding the image to the project data makes every surface
// (cards, detail page) show the real photograph automatically — no layout
// changes needed, nothing to delete here.

// deterministic pseudo-random so each project gets its own stable linework
const rng = (seed) => {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const useBlueprint = (project) =>
  useMemo(() => {
    const rand = rng(parseInt(project.index, 10) * 7 + 3);
    const floors = parseInt((project.floors || "G+5").replace(/\D/g, ""), 10) || 5;
    const base = 412;
    const x0 = 96;
    const x1 = 704;
    const bays = 6 + Math.floor(rand() * 3); // 6-8 bays per project
    const bw = (x1 - x0) / bays;
    const heights = [];
    for (let i = 0; i < bays; i++) heights.push(140 + rand() * 170);

    // stepped abstract silhouette (wireframe only — never a real rendering)
    let d = `M ${x0} ${base}`;
    let cx = x0;
    heights.forEach((h) => {
      d += ` L ${cx.toFixed(1)} ${(base - h).toFixed(1)} L ${(cx + bw).toFixed(1)} ${(base - h).toFixed(1)}`;
      cx += bw;
    });
    d += ` L ${x1} ${base}`;

    const floorLines = [];
    const mullions = [];
    cx = x0;
    heights.forEach((h) => {
      for (let f = 1; f < floors; f++) {
        floorLines.push({ a: cx, b: cx + bw, y: base - (h / floors) * f });
      }
      const n = 1 + Math.floor(rand() * 2);
      for (let m = 1; m <= n; m++) {
        mullions.push({ x: cx + (bw / (n + 1)) * m, y1: base - h, y2: base });
      }
      cx += bw;
    });

    const peak = heights.indexOf(Math.max(...heights));
    const accent = { a: x0 + peak * bw, b: x0 + (peak + 1) * bw, y: base - heights[peak] };
    const gridX = [];
    for (let x = 0; x <= 800; x += 50) gridX.push(x);

    return { d, floorLines, mullions, accent, base, x0, x1, gridX };
  }, [project]);

export const Blueprint = ({ project }) => {
  const { d, floorLines, mullions, accent, base, x0, x1, gridX } = useBlueprint(project);
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {gridX.map((x) => (
        <line key={x} x1={x} y1={0} x2={x} y2={500} stroke="currentColor" className="text-bone" strokeOpacity={0.035} />
      ))}
      {mullions.map((m, i) => (
        <line key={`m${i}`} x1={m.x} y1={m.y1} x2={m.x} y2={m.y2} stroke="currentColor" className="text-bone" strokeOpacity={0.06} />
      ))}
      {floorLines.map((f, i) => (
        <line key={`f${i}`} x1={f.a} y1={f.y} x2={f.b} y2={f.y} stroke="currentColor" className="text-bone" strokeOpacity={0.08} />
      ))}
      {/* ground line + dimension ticks */}
      <line x1={48} y1={base} x2={752} y2={base} stroke="currentColor" className="text-bone" strokeOpacity={0.16} />
      <line x1={x0} y1={base + 28} x2={x1} y2={base + 28} stroke="currentColor" className="text-bone" strokeOpacity={0.1} strokeDasharray="2 6" />
      <line x1={x0} y1={base + 22} x2={x0} y2={base + 34} stroke="currentColor" className="text-bone" strokeOpacity={0.16} />
      <line x1={x1} y1={base + 22} x2={x1} y2={base + 34} stroke="currentColor" className="text-bone" strokeOpacity={0.16} />
      {/* stepped silhouette */}
      <path d={d} fill="none" stroke="currentColor" className="text-bone" strokeOpacity={0.3} strokeWidth={1.2} />
      {/* sparing ember accent on the tallest step */}
      <line x1={accent.a} y1={accent.y} x2={accent.b} y2={accent.y} stroke="currentColor" className="text-ember" strokeOpacity={0.9} strokeWidth={1.5} />
      {/* registration crosses */}
      <path d={`M 60 60 h 16 M 68 52 v 16`} stroke="currentColor" className="text-bone" strokeOpacity={0.14} />
      <path d={`M 724 440 h 16 M 732 432 v 16`} stroke="currentColor" className="text-bone" strokeOpacity={0.14} />
    </svg>
  );
};

export const ComingSoonElevation = ({ project, compact = false }) => (
  <div
    data-testid={compact ? `card-blueprint-${project.slug}` : "elevation-coming-soon"}
    className={
      compact
        ? "absolute inset-0 overflow-hidden bg-ink"
        : "relative w-full overflow-hidden bg-ink border border-line aspect-[16/10] md:aspect-[16/7]"
    }
  >
    <Blueprint project={project} />
    <div className={`absolute inset-0 flex flex-col justify-between ${compact ? "p-4" : "p-6 md:p-10"}`}>
      <div>
        <p className={`uppercase tracking-[0.4em] text-concrete ${compact ? "text-[8px]" : "text-[9px] md:text-[10px]"}`}>
          Project {project.index}
        </p>
        {!compact && (
          <p className="font-display font-semibold uppercase tracking-tight text-bone text-sm md:text-xl mt-1.5">
            {project.title}
          </p>
        )}
      </div>
      <div>
        <p className={`uppercase tracking-[0.45em] text-ember ${compact ? "text-[8px] mb-1.5" : "text-[9px] md:text-[10px] mb-2"}`}>
          Elevation
        </p>
        <p
          className={`font-display font-bold uppercase tracking-tighter leading-[0.95] text-outline select-none ${
            compact ? "text-2xl md:text-3xl" : "text-4xl md:text-6xl"
          }`}
        >
          Coming Soon
        </p>
        <p
          className={`flex items-center gap-2 uppercase tracking-[0.3em] text-bone/70 ${
            compact ? "mt-2 text-[8px]" : "mt-3 text-[9px] md:text-[10px]"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ember shadow-[0_0_7px_2px_rgba(232,93,34,0.45)] animate-pulse" />
          Ongoing
        </p>
      </div>
    </div>
  </div>
);

export default ComingSoonElevation;
