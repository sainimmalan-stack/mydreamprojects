import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { X, Sun, Moon } from "lucide-react";

const MIN = 1;
const MAX = 5;

export const ElevationViewer = ({ open, onClose, daySrc, nightSrc, title }) => {
  const [mode, setMode] = useState("day");
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const areaRef = useRef(null);
  const pointers = useRef(new Map());
  const lastPinch = useRef(null);
  const scaleRef = useRef(1);
  const posRef = useRef({ x: 0, y: 0 });
  const closeRef = useRef(null);
  const lenis = useLenis();

  const apply = (s, p) => {
    scaleRef.current = s;
    posRef.current = p;
    setScale(s);
    setPos(p);
  };
  const reset = () => apply(1, { x: 0, y: 0 });

  useEffect(() => {
    if (open) reset();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, lenis]);

  const clampScale = (s) => Math.min(MAX, Math.max(MIN, s));
  const zoomAt = (factor, cx = 0, cy = 0) => {
    const prev = scaleRef.current;
    const next = clampScale(prev * factor);
    if (next === prev) return;
    const k = next / prev;
    const p = posRef.current;
    apply(next, next === 1 ? { x: 0, y: 0 } : { x: cx - (cx - p.x) * k, y: cy - (cy - p.y) * k });
  };

  useEffect(() => {
    const el = areaRef.current;
    if (!el || !open) return;
    const onWheel = (e) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open]);

  const onPointerDown = (e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      lastPinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
    }
  };
  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    const prevP = pointers.current.get(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const r = areaRef.current.getBoundingClientRect();
    if (pointers.current.size === 2 && lastPinch.current) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      zoomAt(d / lastPinch.current.d, mx - r.left - r.width / 2, my - r.top - r.height / 2);
      apply(scaleRef.current, { x: posRef.current.x + (mx - lastPinch.current.mx), y: posRef.current.y + (my - lastPinch.current.my) });
      lastPinch.current = { d, mx, my };
    } else if (pointers.current.size === 1 && scaleRef.current > 1) {
      apply(scaleRef.current, { x: posRef.current.x + (e.clientX - prevP.x), y: posRef.current.y + (e.clientY - prevP.y) });
    }
  };
  const onPointerEnd = (e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) lastPinch.current = null;
  };

  const imgStyle = {
    transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
    transition: pointers.current.size ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease-out",
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="elevation-viewer"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] bg-ink/95 backdrop-blur-xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="flex items-center justify-between px-5 md:px-10 h-16 md:h-20 border-b border-line shrink-0">
            <p className="font-display text-[10px] md:text-xs uppercase tracking-[0.35em] text-bone/80">{title}</p>
            <div
              data-testid="viewer-daynight-toggle"
              role="group"
              aria-label="Day night switcher"
              className="flex items-center rounded-full border border-bone/15 bg-ink/45 backdrop-blur-md p-0.5"
            >
              <button
                type="button"
                data-testid="viewer-day-button"
                aria-pressed={mode === "day"}
                onClick={() => setMode("day")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display font-semibold text-[9px] md:text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  mode === "day" ? "bg-ember text-ink" : "text-bone/75 hover:text-bone"
                }`}
              >
                <Sun className="w-3 h-3" strokeWidth={1.8} />
                Day
              </button>
              <button
                type="button"
                data-testid="viewer-night-button"
                aria-pressed={mode === "night"}
                onClick={() => setMode("night")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display font-semibold text-[9px] md:text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  mode === "night" ? "bg-ember text-ink" : "text-bone/75 hover:text-bone"
                }`}
              >
                <Moon className="w-3 h-3" strokeWidth={1.8} />
                Night
              </button>
            </div>
          </div>

          <div
            ref={areaRef}
            data-testid="viewer-area"
            className="relative flex-1 overflow-hidden flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onPointerLeave={onPointerEnd}
            onDoubleClick={reset}
          >
            <img
              src={nightSrc}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute max-w-[94%] max-h-[88%] object-contain pointer-events-none"
              style={{ ...imgStyle, opacity: mode === "night" ? 1 : 0 }}
            />
            <img
              src={daySrc}
              alt={title}
              data-testid="viewer-image"
              draggable={false}
              className="relative max-w-[94%] max-h-[88%] object-contain pointer-events-none"
              style={{ ...imgStyle, opacity: mode === "day" ? 1 : 0 }}
            />
          </div>

          <div className="shrink-0 border-t border-line px-5 md:px-10 py-3 md:py-4 flex items-center justify-center">
            <button
              type="button"
              data-testid="viewer-close"
              aria-label="Close viewer"
              onClick={onClose}
              ref={closeRef}
              className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-ember text-ink hover:bg-bone transition-colors duration-300"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ElevationViewer;
