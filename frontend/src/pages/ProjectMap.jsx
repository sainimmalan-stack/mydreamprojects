import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Map as MapLibreMap, Marker as MapLibreMarker, LngLatBounds, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { projects } from "../data/projects";
import useSeo from "../hooks/useSeo";

const EASE = [0.16, 1, 0.3, 1];
// Inline raster style (Carto Dark Matter raster tiles) — no glyph/sprite
// dependencies, which are the usual cause of a blank canvas with vector styles.
const MAP_STYLE = {
  version: 8,
  sources: {
    "carto-dark": {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [
    {
      id: "carto-dark",
      type: "raster",
      source: "carto-dark",
    },
  ],
};

const STATUS_DOT = {
  completed: "bg-emerald-400 shadow-[0_0_6px_1.5px_rgba(52,211,153,0.5)]",
  ongoing: "bg-red-500 shadow-[0_0_6px_1.5px_rgba(239,68,68,0.5)]",
};

const thumbOf = (p) =>
  p.elevationModes
    ? p.elevationModes.day.replace(".webp", "-800.webp")
    : p.cover
      ? p.cover.replace("elevation.jpg", "elevation-800.webp")
      : null;

const InfoCard = ({ project, onClose }) => (
  <motion.div
    key={project.slug}
    data-testid="map-info-card"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 16 }}
    transition={{ duration: 0.45, ease: EASE }}
    className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-auto md:w-[360px] z-20 bg-ink/92 backdrop-blur-xl border border-line"
  >
    <div className="flex">
      <div className="w-24 md:w-28 shrink-0 border-r border-line">
        {thumbOf(project) ? (
          <img
            src={thumbOf(project)}
            alt={`${project.title} elevation thumbnail`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full elevation-fallback flex items-center justify-center min-h-[96px]">
            <span className="font-display font-bold uppercase tracking-tighter text-[9px] text-outline select-none text-center leading-tight px-1">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[9px] uppercase tracking-[0.35em] text-ember">Project {project.index}</p>
          <button
            type="button"
            data-testid="map-info-close"
            aria-label="Close project card"
            onClick={onClose}
            className="text-concrete hover:text-bone transition-colors duration-300 -mt-1 -mr-1 p-1"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.8} />
          </button>
        </div>
        <h3 className="font-display font-semibold uppercase tracking-tight text-lg md:text-xl text-bone leading-tight mt-1">
          {project.title}
        </h3>
        <p className="text-[11px] text-concrete mt-1">
          {project.type} · Ameenpur
        </p>
        <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-bone/70 mt-2">
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
          {project.status} · {project.year}
        </p>
        <div className="flex items-center gap-5 mt-4">
          <Link
            to={`/projects/${project.slug}`}
            data-testid="map-view-project"
            className="group inline-flex items-center gap-1.5 text-[10px] font-display font-semibold uppercase tracking-[0.2em] text-ember hover:text-bone transition-colors duration-300"
          >
            View Project
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
          </Link>
          <a
            href={project.siteLocation.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="map-get-directions"
            className="group inline-flex items-center gap-1.5 text-[10px] font-display font-semibold uppercase tracking-[0.2em] text-bone/70 hover:text-ember transition-colors duration-300"
          >
            Get Directions
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function ProjectMap() {
  useSeo({
    title: "Project Map — My Dream Projects",
    description:
      "19 developments. One growing neighbourhood. Explore every My Dream Projects location around Ameenpur, Hyderabad from a single map.",
    path: "/project-map",
  });

  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const listItemRefs = useRef({});
  const selectedRef = useRef(null);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || p.status === filter),
    [filter]
  );
  const selectedProject = selected ? projects.find((p) => p.slug === selected) : null;

  const focusProject = (slug, fly = true) => {
    setSelected(slug);
    const p = projects.find((x) => x.slug === slug);
    if (mapRef.current && p && fly) {
      mapRef.current.flyTo({
        center: [p.siteLocation.lng, p.siteLocation.lat],
        zoom: 16,
        pitch: 55,
        duration: 1200,
      });
    }
  };

  // init map once
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const bounds = new LngLatBounds();
    projects.forEach((p) => bounds.extend([p.siteLocation.lng, p.siteLocation.lat]));
    const map = new MapLibreMap({
      container: containerRef.current,
      style: MAP_STYLE,
      bounds,
      fitBoundsOptions: { padding: { top: 90, bottom: 90, left: 60, right: 60 } },
      pitch: 52,
      bearing: -12,
      attributionControl: { compact: true },
    });
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    map.on("error", (e) => {
      // eslint-disable-next-line no-console
      console.error("[maplibre] tile/style error:", e?.error?.message || e);
    });
    map.on("load", () => {
      // eslint-disable-next-line no-console
      console.log("[maplibre] style loaded:", map.isStyleLoaded());
    });
    if (process.env.NODE_ENV !== "production") window.__map = map;
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // rebuild markers when filter changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(({ marker }) => marker.remove());
    markersRef.current = [];
    visible.forEach((p) => {
      const el = document.createElement("button");
      el.type = "button";
      el.setAttribute("data-testid", `map-marker-${p.slug}`);
      el.setAttribute("aria-label", `${p.title} — ${p.status}`);
      el.className = `flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 border backdrop-blur-md cursor-pointer transition-colors duration-300 ${
        selected === p.slug
          ? "bg-ember border-ember"
          : "bg-ink/85 border-bone/15 hover:border-ember/60"
      }`;
      const isSel = selected === p.slug;
      el.innerHTML = `
        <span class="w-1.5 h-1.5 rounded-full ${isSel ? "bg-ink" : STATUS_DOT[p.status]}"></span>
        <span class="font-display font-semibold text-[10px] tracking-[0.15em] ${isSel ? "text-ink" : "text-bone"}">${p.index}</span>
      `;
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        // stacked pins: if several markers sit within one pill-width on screen,
        // each click cycles to the next project in the stack so every pin
        // stays reachable without moving any pin off its exact location
        const m = mapRef.current;
        let target = p.slug;
        if (m) {
          const here = m.project([p.siteLocation.lng, p.siteLocation.lat]);
          const stack = markersRef.current
            .filter(({ marker }) => {
              const pt = m.project(marker.getLngLat());
              return Math.hypot(pt.x - here.x, pt.y - here.y) < 28;
            })
            .map(({ slug }) => slug);
          if (stack.length > 1) {
            const idx = stack.indexOf(selectedRef.current);
            if (idx !== -1) target = stack[(idx + 1) % stack.length];
          }
        }
        focusProject(target, true);
      });
      // raise hovered marker above overlapping neighbours so clustered
      // pins (e.g. 01-04) stay individually clickable
      el.addEventListener("mouseenter", () => {
        el.style.zIndex = 5;
      });
      el.addEventListener("mouseleave", () => {
        el.style.zIndex = selectedRef.current === p.slug ? 6 : "";
      });
      const marker = new MapLibreMarker({ element: el })
        .setLngLat([p.siteLocation.lng, p.siteLocation.lat])
        .addTo(map);
      markersRef.current.push({ slug: p.slug, marker, el });
    });
    const bounds = new LngLatBounds();
    visible.forEach((p) => bounds.extend([p.siteLocation.lng, p.siteLocation.lat]));
    map.fitBounds(bounds, { padding: { top: 90, bottom: 90, left: 60, right: 60 }, duration: 1000 });
  }, [filter]);

  // highlight selected marker without full rebuild
  useEffect(() => {
    markersRef.current.forEach(({ slug, el }) => {
      const isSel = slug === selected;
      const p = projects.find((x) => x.slug === slug);
      el.style.zIndex = isSel ? 6 : "";
      el.className = `flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 border backdrop-blur-md cursor-pointer transition-colors duration-300 ${
        isSel ? "bg-ember border-ember" : "bg-ink/85 border-bone/15 hover:border-ember/60"
      }`;
      el.innerHTML = `
        <span class="w-1.5 h-1.5 rounded-full ${isSel ? "bg-ink" : STATUS_DOT[p.status]}"></span>
        <span class="font-display font-semibold text-[10px] tracking-[0.15em] ${isSel ? "text-ink" : "text-bone"}">${p.index}</span>
      `;
    });
    if (selected && listItemRefs.current[selected]) {
      listItemRefs.current[selected].scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selected]);

  // deselect when the filtered-out project is hidden
  useEffect(() => {
    if (selected && !visible.some((p) => p.slug === selected)) setSelected(null);
  }, [filter, selected, visible]);

  const FILTERS = [
    { key: "all", label: "All", count: projects.length },
    { key: "completed", label: "Completed", count: projects.filter((p) => p.status === "completed").length },
    { key: "ongoing", label: "Ongoing", count: projects.filter((p) => p.status === "ongoing").length },
  ];

  return (
    <div data-testid="project-map-page">
      <section className="max-w-[1600px] mx-auto px-5 md:px-10 pt-28 md:pt-40 pb-10 md:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-[10px] uppercase tracking-[0.4em] text-ember mb-5"
        >
          Our Footprint
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="font-display font-semibold uppercase tracking-tighter leading-[1.0] text-4xl sm:text-5xl lg:text-6xl text-bone"
        >
          Built around
          <br />
          <span className="text-concrete">Ameenpur.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="text-sm md:text-base text-concrete leading-relaxed max-w-xl mt-6"
        >
          19 developments. One growing neighbourhood. Explore every My Dream Projects location from a
          single map.
        </motion.p>
      </section>

      <section className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24 md:pb-32">
        <div className="flex flex-wrap items-center gap-2.5 mb-5 md:mb-6" data-testid="map-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              data-testid={`map-filter-${f.key}`}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2.5 font-display font-semibold text-[10px] md:text-[11px] uppercase tracking-[0.2em] border transition-colors duration-300 ${
                filter === f.key
                  ? "bg-ember text-ink border-ember"
                  : "text-bone/70 border-line hover:border-ember/50 hover:text-bone"
              }`}
            >
              {f.label} {String(f.count).padStart(2, "0")}
            </button>
          ))}
          <div className="flex items-center gap-5 ml-auto" data-testid="map-legend">
            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-concrete">
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT.completed}`} /> Completed
            </span>
            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-concrete">
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT.ongoing}`} /> Ongoing
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-5">
          {/* project list — desktop sidebar */}
          <div
            data-testid="map-project-list"
            className="hidden lg:block border border-line divide-y divide-line max-h-[640px] overflow-y-auto"
          >
            {visible.map((p) => (
              <button
                key={p.slug}
                type="button"
                ref={(el) => (listItemRefs.current[p.slug] = el)}
                data-testid={`map-list-${p.slug}`}
                onClick={() => focusProject(p.slug, true)}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-300 ${
                  selected === p.slug ? "bg-coal border-l-2 border-l-ember" : "hover:bg-coal/60 border-l-2 border-l-transparent"
                }`}
              >
                <span className="font-display font-bold text-lg text-outline shrink-0 w-7">{p.index}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-display font-semibold uppercase tracking-tight text-sm text-bone truncate">
                    {p.title}
                  </span>
                  <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-concrete mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status]}`} />
                    {p.status} · {p.year}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-concrete shrink-0" strokeWidth={1.5} />
              </button>
            ))}
          </div>

          {/* map */}
          <div className="relative border border-line" data-testid="map-container">
            <div ref={containerRef} className="w-full h-[58vh] lg:h-[640px]" />
            {selectedProject && (
              <InfoCard project={selectedProject} onClose={() => setSelected(null)} />
            )}
          </div>

          {/* mobile compact selector */}
          <div
            data-testid="map-mobile-selector"
            className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-5 px-5"
          >
            {visible.map((p) => (
              <button
                key={p.slug}
                type="button"
                data-testid={`map-chip-${p.slug}`}
                onClick={() => focusProject(p.slug, true)}
                className={`flex items-center gap-2 shrink-0 pl-2.5 pr-3.5 py-2 border rounded-full transition-colors duration-300 ${
                  selected === p.slug ? "bg-ember border-ember" : "border-line bg-ink/60"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${selected === p.slug ? "bg-ink" : STATUS_DOT[p.status]}`} />
                <span
                  className={`font-display font-semibold text-[10px] uppercase tracking-[0.15em] whitespace-nowrap ${
                    selected === p.slug ? "text-ink" : "text-bone"
                  }`}
                >
                  {p.index} {p.title.replace("My Dream ", "")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
