import { useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * DayNightImage — interactive day/night elevation switcher.
 * Both images occupy the exact same container (identical source dimensions):
 * the night image defines the frame, the day image sits on top and cross-fades
 * (0.7s opacity) — no layout shift, no page reload.
 */
export const DayNightImage = ({ daySrc, nightSrc, alt, testid = "daynight", fullWidth = 1402, aspect = null, onImageClick = null }) => {
  const [mode, setMode] = useState("night");
  const [dayTouched, setDayTouched] = useState(false);
  const srcSet = (s) => `${s.replace(".webp", "-800.webp")} 800w, ${s} ${fullWidth}w`;
  const sizes = "(max-width: 1600px) 100vw, 1600px";

  return (
    <div
      className={`relative overflow-hidden ${aspect || ""} ${onImageClick ? "cursor-zoom-in" : ""}`}
      data-testid={`${testid}-switcher`}
      onClick={onImageClick || undefined}
      role={onImageClick ? "button" : undefined}
      aria-label={onImageClick ? "Open full-screen elevation viewer" : undefined}
      tabIndex={onImageClick ? 0 : undefined}
      onKeyDown={onImageClick ? (e) => { if (e.key === "Enter") onImageClick(); } : undefined}
    >
      <img
        src={nightSrc}
        srcSet={srcSet(nightSrc)}
        sizes={sizes}
        alt={`${alt} — night view`}
        data-testid={`${testid}-night-image`}
        loading="lazy"
        className={aspect ? "absolute inset-0 w-full h-full object-cover" : "w-full h-auto block"}
      />
      <img
        {...(dayTouched ? { src: daySrc, srcSet: srcSet(daySrc) } : {})}
        sizes={sizes}
        alt=""
        aria-hidden="true"
        data-testid={`${testid}-day-image`}
        loading="lazy"
        onLoad={() => {
          if (dayTouched) setMode("day");
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
          mode === "day" ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        data-testid={`${testid}-toggle`}
        role="group"
        aria-label="Elevation day night switcher"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:translate-x-0 md:top-5 md:right-5 flex items-center rounded-full border border-bone/15 bg-ink/45 backdrop-blur-md p-1 shadow-lg shadow-ink/30"
      >
        <button
          type="button"
          data-testid="day-mode-button"
          aria-pressed={mode === "day"}
          onClick={() => (dayTouched ? setMode("day") : setDayTouched(true))}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 md:px-3.5 font-display font-semibold text-[9px] md:text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
            mode === "day" ? "bg-ember text-ink" : "text-bone/75 hover:text-bone"
          }`}
        >
          <Sun className="w-3 h-3" strokeWidth={1.8} />
          Day
        </button>
        <button
          type="button"
          data-testid="night-mode-button"
          aria-pressed={mode === "night"}
          onClick={() => setMode("night")}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 md:px-3.5 font-display font-semibold text-[9px] md:text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
            mode === "night" ? "bg-ember text-ink" : "text-bone/75 hover:text-bone"
          }`}
        >
          <Moon className="w-3 h-3" strokeWidth={1.8} />
          Night
        </button>
      </div>
    </div>
  );
};

export default DayNightImage;
