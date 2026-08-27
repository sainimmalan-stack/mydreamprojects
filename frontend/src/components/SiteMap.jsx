import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Keyless basemap: OpenStreetMap raster tiles, dark-tuned via the
// `mdp-dark-tile` CSS filter in index.css. No API key, no token, ever.
const OSM_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/**
 * SiteMap — keyless dark interactive map for a single project site.
 * Leaflet + OpenStreetMap tiles (dark-filtered), ember pin at the site's
 * real coordinates. Replaces the old Google keyless iframe (which began
 * showing "API key required" overlays) and the Carto raster style (whose
 * provider now watermarks tiles with "API KEY REQUIRED").
 */
export const SiteMap = ({ lat, lng, title }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 15,
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: false,
      attributionControl: true,
    });
    map.attributionControl.setPrefix(false);
    L.control.zoom({ position: "topright" }).addTo(map);
    L.tileLayer(OSM_TILES, {
      maxZoom: 19,
      className: "mdp-dark-tile",
      attribution: OSM_ATTRIBUTION,
    }).addTo(map);
    const pin = document.createElement("div");
    pin.innerHTML = `<svg width="30" height="40" viewBox="0 0 30 40" fill="none" aria-hidden="true"><path d="M15 0C6.7 0 0 6.7 0 15c0 11.2 15 25 15 25s15-13.8 15-25C30 6.7 23.3 0 15 0Z" fill="#E85D22"/><circle cx="15" cy="15" r="5.5" fill="#0A0A0A"/></svg>`;
    L.marker([lat, lng], {
      icon: L.divIcon({ className: "mdp-site-pin", html: pin, iconSize: [30, 40], iconAnchor: [15, 40] }),
      keyboard: false,
      interactive: false,
    }).addTo(map);
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
