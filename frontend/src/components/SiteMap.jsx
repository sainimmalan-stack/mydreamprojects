import { useEffect, useRef } from "react";
import { Map as MapLibreMap, Marker as MapLibreMarker, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_STYLE, MAP_ATTRIBUTION } from "./mapStyle";

/**
 * SiteMap — keyless dark interactive map for a single project site.
 * Replaces the old Google Maps keyless iframe (which began showing Google
 * "API key required" overlays). MapLibre GL + OpenFreeMap dark vector style
 * (OpenStreetMap data) — no API key, dark theme matches the main project map.
 */
export const SiteMap = ({ lat, lng, title }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const map = new MapLibreMap({
      container: containerRef.current,
      style: MAP_STYLE,
      center: [lng, lat],
      zoom: 15,
      attributionControl: { compact: true, customAttribution: MAP_ATTRIBUTION },
    });
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    new MapLibreMarker({ color: "#E85D22" }).setLngLat([lng, lat]).addTo(map);
    // keep attribution collapsed (info toggle) on narrow containers — the
    // expanded box otherwise covers a large part of a small map
    const collapseAttrib = () => {
      const c = map.getContainer();
      const a = c.querySelector(".maplibregl-ctrl-attrib");
      if (a && c.clientWidth < 640) a.classList.remove("maplibregl-compact-show");
    };
    map.on("load", collapseAttrib);
    map.on("idle", collapseAttrib);
    return () => map.remove();
  }, [lat, lng]);

  return (
    <div
      ref={containerRef}
      data-testid="site-map-embed"
      role="region"
      aria-label={`${title} project site location map`}
      className="w-full h-[320px] md:h-[440px]"
    />
  );
};

export default SiteMap;
