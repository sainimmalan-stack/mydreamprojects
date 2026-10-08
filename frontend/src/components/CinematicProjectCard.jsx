import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sun, Moon, Box, Play } from "lucide-react";
import ComingSoonElevation from "./ComingSoonElevation";
import FloorPlanViewer from "./FloorPlanViewer";
import { useCardVideo, videoPosterFor, playVideoNow } from "./useCardVideo";

const EASE = [0.16, 1, 0.3, 1];

/**
 * CinematicProjectCard — editorial card for the redesigned /projects index.
 * Video behaviour: nothing downloads until the card nears the viewport
 * (lazy arm), then the muted/looped/playsInline clip autoplays only while
 * ≥55% visible, pauses when scrolled away, and pauses any other card that
 * was playing. While the clip loads, the video's own poster frame (extracted
 * from the same video) is shown — the elevation image is never used as a
 * stand-in, it remains available on the project detail pages and galleries.
 */
export const CinematicProjectCard = ({ project, variant = "standard", drop = false }) => {
  const [mode, setMode] = useState("night");
  const [dayTouched, setDayTouched] = useState(false);
  const [plan3dOpen, setPlan3dOpen] = useState(false);
  const videoRef = useRef(null);
  const mediaRef = useRef(null);
  const hasVideo = Boolean(project.video);
  const modes = !hasVideo && project.cover && project.elevationModes ? project.elevationModes : null;
  // poster frame extracted from the SAME video — never the elevation image
  const videoPoster = videoPosterFor(project.video);
  const { armed, blocked } = useCardVideo(videoRef, mediaRef, hasVideo);

  const aspect =
    variant === "hero"
      ? "aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/10]"
      : variant === "wide"
        ? "aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/11]"
        : "aspect-[4/5]";
  const sizes =
    variant === "hero"
      ? "(max-width: 768px) 100vw, 1600px"
      : "(max-width: 768px) 100vw, 60vw";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className={drop ? "md:mt-20" : ""}
    >
      <Link
        to={`/projects/${project.slug}`}
        data-testid={`project-card-${project.slug}`}
        aria-label={`View ${project.title} project details`}
        className="group block relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
      >
        {/* ghost index number behind the media — editorial depth layer */}
        <span
          aria-hidden="true"
          className={`absolute z-0 select-none pointer-events-none font-display font-black leading-none text-bone/[0.045] ${
            variant === "hero"
              ? "-top-9 md:-top-16 right-0 text-7xl md:text-[11rem]"
              : "-top-7 md:-top-10 -left-1 md:-left-2 text-6xl md:text-8xl"
          }`}
        >
          {project.index}
        </span>

        <div
          ref={mediaRef}
          className={`relative z-10 overflow-hidden bg-coal border border-line group-hover:border-ember/40 transition-colors duration-500 ${aspect}`}
        >
          {modes ? (
            <>
              <img
                src={modes.night}
                srcSet={`${modes.night.replace(".webp", "-800.webp")} 800w, ${modes.night} ${modes.width || 1402}w`}
                sizes={sizes}
                alt={`${project.title} residential apartment elevation in Ameenpur — night view`}
                data-testid={`card-night-image-${project.slug}`}
                loading="lazy"
                className="texture-img absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
              <img
                {...(dayTouched
                  ? {
                      src: modes.day,
                      srcSet: `${modes.day.replace(".webp", "-800.webp")} 800w, ${modes.day} ${modes.width || 1402}w`,
                    }
                  : {})}
                sizes={sizes}
                alt=""
                aria-hidden="true"
                data-testid={`card-day-image-${project.slug}`}
                loading="lazy"
                onLoad={() => {
                  if (dayTouched) setMode("day");
                }}
                className={`texture-img absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 duration-[1.5s] ${
                  mode === "day" ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : !hasVideo && project.cover ? (
            <img
              src={project.cover}
              srcSet={`${project.cover.replace("elevation.jpg", "elevation-800.webp")} 800w, ${project.cover.replace("elevation.jpg", "elevation-1600.webp")} 1600w`}
              sizes={sizes}
              alt={`${project.title} residential apartment elevation in Ameenpur`}
              loading="lazy"
              className="texture-img absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />
          ) : (
            !hasVideo && (
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105">
                <ComingSoonElevation project={project} compact />
              </div>
            )
          )}

          {/* cinematic video layer — lazy-armed, visibility-driven playback;
              the video's own poster frame shows instantly while it loads,
              so the elevation image never flashes before playback starts */}
          {hasVideo && armed && (
            <video
              ref={(el) => {
                videoRef.current = el;
                // iOS Safari: the muted *property* must be set for autoplay —
                // React's muted attribute alone does not guarantee it
                if (el) el.muted = true;
              }}
              src={project.video}
              poster={videoPoster}
              data-testid={`card-video-${project.slug}`}
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
            />
          )}

          {/* iPad/Safari autoplay fallback — appears ONLY if the browser
              rejected autoplay; one tap starts the clip immediately */}
          {hasVideo && blocked && (
            <button
              type="button"
              data-testid={`card-play-${project.slug}`}
              aria-label={`Play the ${project.title} film`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                playVideoNow(videoRef.current);
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-bone/25 bg-ink/55 backdrop-blur flex items-center justify-center text-bone hover:text-ember hover:border-ember/60 transition-colors duration-300"
            >
              <Play className="w-4 h-4 ml-0.5" strokeWidth={1.5} />
            </button>
          )}

          {/* bottom scrim for legibility on hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[15] bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          />

          {/* status badge — existing green/orange language */}
          <span className="absolute top-4 right-4 z-20 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] bg-ink/55 backdrop-blur px-2.5 py-1.5 text-bone">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === "ongoing"
                  ? "bg-ember shadow-[0_0_7px_2px_rgba(232,93,34,0.45)] animate-pulse"
                  : "bg-emerald-400 shadow-[0_0_7px_2px_rgba(52,211,153,0.45)]"
              }`}
            />
            {project.status === "completed" ? "Sold Out & Occupied" : "Ongoing"}
          </span>

          {modes && (
            <div
              data-testid={`card-daynight-toggle-${project.slug}`}
              role="group"
              aria-label={`${project.title} day night preview`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="absolute bottom-4 right-4 z-20 flex items-center rounded-full border border-bone/15 bg-ink/45 backdrop-blur-md p-0.5 shadow-lg shadow-ink/30"
            >
              <button
                type="button"
                data-testid={`card-day-button-${project.slug}`}
                aria-pressed={mode === "day"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (dayTouched) setMode("day");
                  else setDayTouched(true);
                }}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 font-display font-semibold text-[9px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  mode === "day" ? "bg-ember text-ink" : "text-bone/75 hover:text-bone"
                }`}
              >
                <Sun className="w-3 h-3" strokeWidth={1.8} />
                Day
              </button>
              <button
                type="button"
                data-testid={`card-night-button-${project.slug}`}
                aria-pressed={mode === "night"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMode("night");
                }}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 font-display font-semibold text-[9px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  mode === "night" ? "bg-ember text-ink" : "text-bone/75 hover:text-bone"
                }`}
              >
                <Moon className="w-3 h-3" strokeWidth={1.8} />
                Night
              </button>
            </div>
          )}

          {project.plan3d && (
            <button
              type="button"
              data-testid={`card-3d-chip-${project.slug}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPlan3dOpen(true);
              }}
              aria-label={`Open the 3D floor plan for ${project.title}`}
              className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-1.5 bg-ink/60 backdrop-blur px-2.5 py-1.5 border border-white/15 font-display font-semibold text-[9px] uppercase tracking-[0.22em] text-bone/80 hover:border-ember/60 hover:text-ember transition-colors duration-300 cursor-pointer"
            >
              <Box className="w-3 h-3" strokeWidth={1.8} />
              3D Plan
            </button>
          )}
        </div>

        <div className="relative z-10 flex items-start justify-between gap-4 pt-5 md:pt-6">
          <div>
            <h3
              className={`font-display font-semibold uppercase tracking-tight text-bone group-hover:text-ember transition-colors duration-500 ${
                variant === "hero" ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
              }`}
            >
              {project.title}
            </h3>
            <p className="text-[11px] md:text-xs text-concrete mt-1.5 uppercase tracking-[0.2em]">
              {project.type} · Ameenpur
            </p>
            {project.pricePerSft && (
              <p
                data-testid={`card-price-${project.slug}`}
                className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-ember mt-2"
              >
                {project.pricePerSft} / Sq.Ft.
              </p>
            )}
          </div>
          <ArrowUpRight
            className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-1 text-concrete group-hover:text-ember group-hover:-translate-y-1 group-hover:translate-x-1 transition-[transform,color] duration-500"
            strokeWidth={1.5}
          />
        </div>
      </Link>
      {project.plan3d && (
        <FloorPlanViewer
          open={plan3dOpen}
          onClose={() => setPlan3dOpen(false)}
          image={project.plan3d.src}
          pdf={null}
          title={`${project.title} — 3D Floor Plan`}
          edgeToEdge
        />
      )}
    </motion.div>
  );
};

export default CinematicProjectCard;
