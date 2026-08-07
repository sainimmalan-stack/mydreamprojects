import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Map as MapLibreMap, Marker as MapLibreMarker, LngLatBounds, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, X, LocateFixed } from "lucide-react";
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
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 512,
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
      paint: {
        // lift the black point + gentle contrast so roads, water and locality
        // labels read clearly while staying a premium dark basemap
        "raster-brightness-min": 0.09,
        "raster-brightness-max": 1,
        "raster-contrast": 0.15,
        "raster-saturation": -0.1,
        "raster-fade-duration": 0,
      },
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

// responsive fit padding — tighter on phones so the footprint fills the view
const fitPadding = () =>
  typeof window !== "undefined" && window.innerWidth < 1024
    ? { top: 48, bottom: 96, left: 24, right: 24 }
    : { top: 90, bottom: 90, left: 60, right: 60 };

const InfoCard = ({ project, onClose }) => (
  <motion.div
    key={project.slug}
    data-testid="map-info-card"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 16 }}
    transition={{ duration: 0.45, ease: EASE }}
    className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-[360px] z-20 bg-ink/92 backdrop-blur-xl border border-line"
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
          {project.status}
          {project.year && project.year !== "—" ? ` · ${project.year}` : ""}
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

  // fit the map to every currently-visible project (all 19 by default).
  // Overview is flat (pitch 0) so pins render exactly where projected —
  // the 3D tilt is reserved for the single-project fly-to.
  const fitVisible = (animate = true) => {
    const map = mapRef.current;
    if (!map) return;
    const bounds = new LngLatBounds();
    visible.forEach((p) => bounds.extend([p.siteLocation.lng, p.siteLocation.lat]));
    const cam = map.cameraForBounds(bounds, { padding: fitPadding(), maxZoom: 15.5 });
    map.flyTo({
      center: cam.center,
      zoom: cam.zoom,
      pitch: 0,
      bearing: 0,
      duration: animate ? 1000 : 0,
    });
  };

  // marker collision handling: iterative relaxation — any two pins closer than
  // one pill-width are gently pushed apart until every pin is identifiable.
  // Screen-space offsets only; geographic coordinates are never altered.
  const resolveCollisions = () => {
    const map = mapRef.current;
    if (!map || markersRef.current.length === 0) return;
    const MIN = 32; // px — minimum separation between pill centres
    const pts = markersRef.current.map(({ marker }) => {
      const p = map.project(marker.getLngLat());
      return { marker, bx: p.x, by: p.y, x: p.x, y: p.y };
    });
    for (let iter = 0; iter < 40; iter++) {
      let moved = false;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let d = Math.hypot(dx, dy);
          if (d === 0) {
            dx = 0.01;
            dy = 0;
            d = 0.01;
          }
          if (d < MIN) {
            const push = (MIN - d) / 2;
            const ux = dx / d;
            const uy = dy / d;
            a.x -= ux * push;
            a.y -= uy * push;
            b.x += ux * push;
            b.y += uy * push;
            moved = true;
          }
        }
      }
      if (!moved) break;
    }
    pts.forEach((p) =>
      p.marker.setOffset([Math.round(p.x - p.bx), Math.round(p.y - p.by)])
    );
  };

  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || p.status === filter),
    [filter]
  );
  const selectedProject = selected ? projects.find((p) => p.slug === selected) : null;

  const focusProject = (slug, fly = true) => {
    setSelected(slug);
    const p = projects.find((x) => x.slug === slug);
    // on phones, bring the map (and its bottom card) into the viewport
    if (typeof window !== "undefined" && window.innerWidth < 1024 && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (mapRef.current && p && fly) {
      // on phones the info card sits at the bottom of the map — nudge the
      // target up so the pin stays visible above the card
      const mobileLift =
        typeof window !== "undefined" && window.innerWidth < 1024
          ? [0, -Math.round(window.innerHeight * 0.13)]
          : [0, 0];
      mapRef.current.flyTo({
        center: [p.siteLocation.lng, p.siteLocation.lat],
        zoom: 16,
        pitch: 0,
        bearing: 0,
        duration: 1200,
        offset: mobileLift,
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
      fitBoundsOptions: { padding: fitPadding(), maxZoom: 15.5 },
      pitch: 0,
      bearing: 0,
      attributionControl: { compact: true },
    });
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    // prevent accidental zoom jumps when tapping pins on touch devices
    map.doubleClickZoom.disable();
    map.on("error", (e) => {
      // eslint-disable-next-line no-console
      console.error("[maplibre] tile/style error:", e?.error?.message || e);
    });
    map.on("load", () => {
      // eslint-disable-next-line no-console
      console.log("[maplibre] style loaded:", map.isStyleLoaded());
      resolveCollisions();
    });
    map.on("moveend", resolveCollisions);
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
      el.className = `absolute top-0 left-0 touch-manipulation flex items-center gap-1 pl-1.5 pr-2 py-1 border backdrop-blur-md cursor-pointer transition-colors duration-300 ${
        selected === p.slug
          ? "bg-ember border-ember shadow-[0_0_12px_2px_rgba(232,93,34,0.5)]"
          : "bg-ink/85 border-bone/15 hover:border-ember/60"
      }`;
      const isSel = selected === p.slug;
      el.innerHTML = `
        <span class="w-1 h-1 rounded-full ${isSel ? "bg-ink" : STATUS_DOT[p.status]}"></span>
        <span class="font-display font-semibold text-[9px] tracking-[0.15em] ${isSel ? "text-ink" : "text-bone"}">${p.index}</span>
      `;
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        // collided pins are visually fanned out by resolveCollisions(),
        // so the tapped marker is always the intended project
        focusProject(p.slug, true);
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
    fitVisible(true);
    resolveCollisions();
  }, [filter]);

  // highlight selected marker without full rebuild
  useEffect(() => {
    markersRef.current.forEach(({ slug, el }) => {
      const isSel = slug === selected;
      const p = projects.find((x) => x.slug === slug);
      el.style.zIndex = isSel ? 6 : "";
      el.className = `absolute top-0 left-0 touch-manipulation flex items-center gap-1 pl-1.5 pr-2 py-1 border backdrop-blur-md cursor-pointer transition-colors duration-300 ${
        isSel
          ? "bg-ember border-ember shadow-[0_0_12px_2px_rgba(232,93,34,0.5)]"
          : "bg-ink/85 border-bone/15 hover:border-ember/60"
      }`;
      el.innerHTML = `
        <span class="w-1 h-1 rounded-full ${isSel ? "bg-ink" : STATUS_DOT[p.status]}"></span>
        <span class="font-display font-semibold text-[9px] tracking-[0.15em] ${isSel ? "text-ink" : "text-bone"}">${p.index}</span>
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
      <section className="max-w-[1600px] mx-auto px-5 md:px-10 pt-36 md:pt-44 pb-10 md:pb-14">
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
                    {p.status}
                    {p.year && p.year !== "—" ? ` · ${p.year}` : ""}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-concrete shrink-0" strokeWidth={1.5} />
              </button>
            ))}
          </div>

          {/* map */}
          <div className="relative border border-line" data-testid="map-container">
            <div ref={containerRef} className="w-full h-[68svh] lg:h-[640px]" />
            {selectedProject && (
              <button
                type="button"
                data-testid="map-view-all"
                onClick={() => {
                  setSelected(null);
                  fitVisible(true);
                }}
                className="absolute top-3 left-3 z-20 inline-flex items-center gap-2 bg-ink/85 backdrop-blur-md border border-bone/15 px-3.5 py-2 font-display font-semibold text-[9px] uppercase tracking-[0.25em] text-bone/80 hover:border-ember/60 hover:text-bone transition-colors duration-300"
              >
                <LocateFixed className="w-3 h-3" strokeWidth={1.8} />
                View All Projects
              </button>
            )}
            {selectedProject && (
              <InfoCard
                project={selectedProject}
                onClose={() => {
                  setSelected(null);
                  fitVisible(true);
                }}
              />
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
