import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, X, LocateFixed, MessageCircle } from "lucide-react";
import { projects } from "../data/projects";
import { OFFICE, MAPS_URL, waLink } from "../data/contact";
import { Blueprint } from "../components/ComingSoonElevation";
import useSeo from "../hooks/useSeo";

// Keyless basemap: OpenStreetMap raster tiles, dark-tuned via the
// `mdp-dark-tile` CSS filter in index.css. No API key, no token, ever.
const OSM_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Leaflet flyTo has no pixel-offset option — emulate MapLibre's `offset`
// (target appears `offset` px from screen centre) by shifting the centre.
const flyToWithOffset = (map, latlng, zoom, offset, duration = 1.2) => {
  let target = L.latLng(latlng[0], latlng[1]);
  if (offset && (offset[0] || offset[1])) {
    const tp = map.project(target, zoom);
    target = map.unproject(tp.subtract(L.point(offset[0], offset[1])), zoom);
  }
  map.flyTo(target, zoom, { duration });
};

const EASE = [0.16, 1, 0.3, 1];

const STATUS_DOT = {
  completed: "bg-emerald-400 shadow-[0_0_6px_1.5px_rgba(52,211,153,0.5)]",
  ongoing: "bg-ember shadow-[0_0_6px_1.5px_rgba(232,93,34,0.55)]",
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
          <div
            data-testid={`map-thumb-blueprint-${project.slug}`}
            className="relative w-full h-full min-h-[96px] bg-ink overflow-hidden flex items-center justify-center"
          >
            <Blueprint project={project} />
            <span className="relative z-10 font-display font-bold uppercase tracking-tighter text-[9px] text-outline select-none text-center leading-tight px-1 bg-ink/55">
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
          {project.year && project.year !== "—" ? ` · ${project.status === "ongoing" ? "Expected " : ""}${project.year}` : ""}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-4">
          <Link
            to={`/projects/${project.slug}`}
            data-testid="map-view-project"
            className="group inline-flex items-center gap-1.5 text-[10px] font-display font-semibold uppercase tracking-[0.2em] text-ember hover:text-bone transition-colors duration-300"
          >
            View Project
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
          </Link>
          <a
            href={waLink(`Hello My Dream Projects®, I'm interested in ${project.title} at Ameenpur, Hyderabad. Please share price and availability details.`)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="map-info-whatsapp"
            className="group inline-flex items-center gap-1.5 text-[10px] font-display font-semibold uppercase tracking-[0.2em] text-bone/70 hover:text-ember transition-colors duration-300"
          >
            WhatsApp
            <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
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

/* ------------------------------ office card ------------------------------ */

const OfficeCard = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.5, ease: EASE }}
    data-testid="map-office-card"
    className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-[360px] z-20 bg-ink/92 backdrop-blur-xl border border-line"
  >
    <div className="flex">
      <div className="w-[92px] md:w-[104px] shrink-0 relative overflow-hidden border-r border-line">
        <img
          src="/assets/office/office-exterior-800.webp"
          alt="My Dream Projects® — Office"
          data-testid="map-office-thumb"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-ember mb-1">{OFFICE.kind}</p>
            <h3 className="font-display font-semibold uppercase tracking-tight text-base text-bone leading-tight">
              {OFFICE.name}
            </h3>
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-bone/70 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ember" />
              {OFFICE.address}
            </p>
          </div>
          <button
            type="button"
            data-testid="map-office-close"
            onClick={onClose}
            aria-label="Close office card"
            className="p-1 text-concrete hover:text-bone transition-colors duration-300"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-line">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="map-office-directions"
            className="group inline-flex items-center gap-1.5 font-display font-semibold text-[10px] uppercase tracking-[0.2em] text-ember hover:text-bone transition-colors duration-300"
          >
            Get Directions
            <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
          </a>
          <Link
            to="/contact"
            data-testid="map-office-contact"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-concrete hover:text-bone transition-colors duration-300"
          >
            Contact Us
            <ArrowRight className="w-3 h-3" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function ProjectMap() {
  useSeo({
    title: "Our Map — My Dream Projects®",
    description:
      "19 developments. One growing neighbourhood. Explore every My Dream Projects® location around Ameenpur, Hyderabad from a single map.",
    path: "/project-map",
  });

  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [searchParams] = useSearchParams();
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
  // The office marker is included so it stays in frame under every filter.
  const fitVisible = (animate = true) => {
    const map = mapRef.current;
    if (!map) return;
    const bounds = L.latLngBounds(
      visible.map((p) => [p.siteLocation.lat, p.siteLocation.lng])
    );
    bounds.extend([OFFICE.lat, OFFICE.lng]);
    const pad = fitPadding();
    const opts = {
      paddingTopLeft: L.point(pad.left, pad.top),
      paddingBottomRight: L.point(pad.right, pad.bottom),
      maxZoom: 15.5,
    };
    if (animate) map.flyToBounds(bounds, { ...opts, duration: 1 });
    else map.fitBounds(bounds, opts);
  };

  const focusOffice = () => {
    setSelected("office");
    const mobileLift =
      typeof window !== "undefined" && window.innerWidth < 1024
        ? [0, -Math.round(window.innerHeight * 0.13)]
        : [0, 0];
    if (typeof window !== "undefined" && window.innerWidth < 1024 && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    mapRef.current?.flyTo && flyToWithOffset(mapRef.current, [OFFICE.lat, OFFICE.lng], 16, mobileLift, 1.2);
  };

  // marker collision handling: iterative relaxation — any two pins closer than
  // one pill-width are gently pushed apart until every pin is identifiable.
  // Screen-space offsets only; geographic coordinates are never altered.
  const resolveCollisions = () => {
    const map = mapRef.current;
    if (!map || markersRef.current.length === 0) return;
    // minimum separation between pill centres — wider on mobile so clustered
    // pins (01-04 around the office, 15-17 etc.) never overlap tap targets
    const MIN = window.innerWidth < 768 ? 52 : 32;
    const pts = markersRef.current.map(({ marker, el }) => {
      const pt = map.latLngToContainerPoint(marker.getLatLng());
      return { el, bx: pt.x, by: pt.y, x: pt.x, y: pt.y };
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
      // centre the pill on its point (translate -50%,-50%) plus the
      // collision-relaxation offset — screen-space only, geo never changes
      p.el.style.setProperty(
        "transform",
        `translate(calc(-50% + ${Math.round(p.x - p.bx)}px), calc(-50% + ${Math.round(p.y - p.by)}px))`
      )
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
      mapRef.current.flyTo && flyToWithOffset(mapRef.current, [p.siteLocation.lat, p.siteLocation.lng], 16, mobileLift, 1.2);
    }
  };

  // init map once
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const bounds = L.latLngBounds(
      projects.map((p) => [p.siteLocation.lat, p.siteLocation.lng])
    );
    const pad = fitPadding();
    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: false, // prevent accidental zoom jumps when tapping pins on touch devices
      minZoom: 13,
      maxZoom: 18,
      maxBounds: L.latLngBounds([17.44, 78.24], [17.62, 78.42]),
      maxBoundsViscosity: 0.85,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      attributionControl: true,
    });
    map.attributionControl.setPrefix(false);
    L.control.zoom({ position: "topright" }).addTo(map);
    L.tileLayer(OSM_TILES, {
      maxZoom: 19,
      className: "mdp-dark-tile",
      attribution: OSM_ATTRIBUTION,
    }).addTo(map);
    map.fitBounds(bounds, {
      paddingTopLeft: L.point(pad.left, pad.top),
      paddingBottomRight: L.point(pad.right, pad.bottom),
      maxZoom: 15.5,
    });
    map.whenReady(() => {
      resolveCollisions();
      // deep link: /project-map?focus=office flies straight to the office marker
      if (searchParams.get("focus") === "office") {
        setTimeout(() => focusOffice(), 400);
      }
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
        marker.setZIndexOffset(1000);
      });
      el.addEventListener("mouseleave", () => {
        marker.setZIndexOffset(selectedRef.current === p.slug ? 1200 : 0);
      });
      const marker = L.marker([p.siteLocation.lat, p.siteLocation.lng], {
        icon: L.divIcon({ className: "mdp-pin", html: el, iconSize: [0, 0], iconAnchor: [0, 0] }),
        keyboard: false,
      }).addTo(map);
      markersRef.current.push({ slug: p.slug, marker, el });
    });
    // office marker — distinctive ember building icon, never numbered,
    // always visible regardless of the project filter
    const oel = document.createElement("button");
    oel.type = "button";
    oel.dataset.testid = "map-marker-office";
    oel.setAttribute("aria-label", "My Dream Projects® — Office");
    oel.className =
      "absolute top-0 left-0 touch-manipulation flex items-center justify-center p-1.5 border backdrop-blur-md cursor-pointer transition-colors duration-300 bg-ember/90 border-ember/70 hover:bg-ember";
    oel.innerHTML = `
      <svg class="w-3.5 h-3.5 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M2 22h20"/><path d="M9 6h1"/><path d="M9 10h1"/><path d="M9 14h1"/><path d="M14 6h1"/><path d="M14 10h1"/><path d="M14 14h1"/><path d="M10 22v-3h4v3"/></svg>
    `;
    oel.addEventListener("mouseenter", () => {
      officeMarker.setZIndexOffset(1000);
    });
    oel.addEventListener("mouseleave", () => {
      officeMarker.setZIndexOffset(selectedRef.current === "office" ? 1200 : 0);
    });
    oel.addEventListener("click", (e) => {
      e.stopPropagation();
      focusOffice();
    });
    const officeMarker = L.marker([OFFICE.lat, OFFICE.lng], {
      icon: L.divIcon({ className: "mdp-pin", html: oel, iconSize: [0, 0], iconAnchor: [0, 0] }),
      keyboard: false,
    }).addTo(map);
    markersRef.current.push({ slug: "office", marker: officeMarker, el: oel, office: true });
    fitVisible(true);
    resolveCollisions();
  }, [filter]);

  // highlight selected marker without full rebuild
  useEffect(() => {
    markersRef.current.forEach(({ slug, el, marker, office }) => {
      if (office) {
        const isOfficeSel = selected === "office";
        marker.setZIndexOffset(isOfficeSel ? 1200 : 0);
        el.className = `absolute top-0 left-0 touch-manipulation flex items-center justify-center p-1.5 border backdrop-blur-md cursor-pointer transition-colors duration-300 ${
          isOfficeSel
            ? "bg-ember border-ember shadow-[0_0_12px_2px_rgba(232,93,34,0.5)]"
            : "bg-ember/90 border-ember/70 hover:bg-ember"
        }`;
        return;
      }
      const isSel = slug === selected;
      const p = projects.find((x) => x.slug === slug);
      marker.setZIndexOffset(isSel ? 1200 : 0);
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

  // deselect when the filtered-out project is hidden (office always stays)
  useEffect(() => {
    if (selected && selected !== "office" && !visible.some((p) => p.slug === selected))
      setSelected(null);
  }, [filter, selected, visible]);

  // deep link: /project-map?project=<slug> selects and flies to that pin,
  // so any project page (or a texted link) opens straight onto its location
  useEffect(() => {
    const slug = searchParams.get("project");
    if (slug && projects.some((p) => p.slug === slug) && slug !== selectedRef.current) {
      focusProject(slug, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
          19 developments. One growing neighbourhood. Explore every My Dream Projects® location from a
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
                    {p.year && p.year !== "—" ? ` · ${p.status === "ongoing" ? "Expected " : ""}${p.year}` : ""}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-concrete shrink-0" strokeWidth={1.5} />
              </button>
            ))}
          </div>

          {/* map */}
          <div className="relative border border-line" data-testid="map-container">
            <div ref={containerRef} className="w-full h-[68svh] lg:h-[640px]" />
            {selected && (
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
            {selected === "office" && (
              <OfficeCard
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
