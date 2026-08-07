import { useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * DayNightImage — interactive day/night elevation switcher.
 * Both images occupy the exact same container (identical source dimensions):
 * the night image defines the frame, the day image sits on top and cross-fades
 * (0.7s opacity) — no layout shift, no page reload.
 */
export const DayNightImage = ({ daySrc, nightSrc, alt, testid = "daynight" }) => {
  const [mode, setMode] = useState("day");
  const srcSet = (s) => `${s.replace(".webp", "-800.webp")} 800w, ${s} 1402w`;
  const sizes = "(max-width: 1600px) 100vw, 1600px";

  return (
    <div className="relative overflow-hidden" data-testid={`${testid}-switcher`}>
      <img
        src={nightSrc}
        srcSet={srcSet(nightSrc)}
        sizes={sizes}
        alt={`${alt} — night view`}
        data-testid={`${testid}-night-image`}
        loading="lazy"
        className="w-full h-auto block"
      />
      <img
        src={daySrc}
        srcSet={srcSet(daySrc)}
        sizes={sizes}
        alt={`${alt} — day view`}
        data-testid={`${testid}-day-image`}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
          mode === "day" ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        data-testid={`${testid}-toggle`}
        role="group"
        aria-label="Elevation day night switcher"
        className="absolute top-4 right-4 md:top-5 md:right-5 flex items-center border border-bone/20 bg-ink/55 backdrop-blur-md"
      >
        <button
          type="button"
          data-testid="day-mode-button"
          aria-pressed={mode === "day"}
          onClick={() => setMode("day")}
          className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 font-display font-semibold text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
            mode === "day" ? "bg-ember text-ink" : "text-bone/85 hover:text-bone"
          }`}
        >
          <Sun className="w-3.5 h-3.5" strokeWidth={1.8} />
          Day
        </button>
        <button
          type="button"
          data-testid="night-mode-button"
          aria-pressed={mode === "night"}
          onClick={() => setMode("night")}
          className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 font-display font-semibold text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
            mode === "night" ? "bg-ember text-ink" : "text-bone/85 hover:text-bone"
          }`}
        >
          <Moon className="w-3.5 h-3.5" strokeWidth={1.8} />
          Night
        </button>
      </div>
    </div>
  );
};

export default DayNightImage;
