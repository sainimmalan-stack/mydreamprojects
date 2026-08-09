import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { X, Plus, Minus, RotateCcw, FileText } from "lucide-react";
import PlanLabels from "./PlanLabels";

const MIN = 1;
const MAX = 5;

export const FloorPlanViewer = ({ open, onClose, image, pdf, title, units = null, unitIdx, onUnitChange }) => {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [internalIdx, setInternalIdx] = useState(0);
  const [imgBox, setImgBox] = useState(null);
  const imgRef = useRef(null);
  const activeIdx = unitIdx ?? internalIdx;
  const setActiveIdx = onUnitChange ?? setInternalIdx;
  const activeUnit = units?.length ? units[Math.min(activeIdx, units.length - 1)] : null;
  const areaRef = useRef(null);
  const pointers = useRef(new Map());
  const lastPinch = useRef(null);
  const scaleRef = useRef(1);
  const posRef = useRef({ x: 0, y: 0 });
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const apply = (s, p) => {
    scaleRef.current = s;
    posRef.current = p;
    setScale(s);
    setPos(p);
  };

  const reset = () => apply(1, { x: 0, y: 0 });

  const lenis = useLenis();

  const measureImg = () => {
    const img = imgRef.current;
    if (img && img.offsetWidth) setImgBox({ w: img.offsetWidth, h: img.offsetHeight });
  };

  useEffect(() => {
    if (!open) return;
    setImgBox(null);
    setInternalIdx(0);
    measureImg();
    window.addEventListener("resize", measureImg);
    return () => window.removeEventListener("resize", measureImg);
  }, [open, image]);

  useEffect(() => {
    if (open) reset();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = areaRef.current
          ?.closest('[data-testid="floor-plan-viewer"]')
          ?.querySelectorAll('button, a[href]');
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [open, onClose, lenis]);

  const clampScale = (s) => Math.min(MAX, Math.max(MIN, s));

  const zoomAt = (factor, cx = 0, cy = 0) => {
    const prev = scaleRef.current;
    const next = clampScale(prev * factor);
    if (next === prev) return;
    const k = next / prev;
    const p = posRef.current;
    apply(
      next,
      next === 1 ? { x: 0, y: 0 } : { x: cx - (cx - p.x) * k, y: cy - (cy - p.y) * k }
    );
  };

  useEffect(() => {
    const el = areaRef.current;
    if (!el || !open) return;
    const onWheel = (e) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(
        e.deltaY < 0 ? 1.15 : 1 / 1.15,
        e.clientX - r.left - r.width / 2,
        e.clientY - r.top - r.height / 2
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open]);

  const onPointerDown = (e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      lastPinch.current = {
        d: Math.hypot(a.x - b.x, a.y - b.y),
        mx: (a.x + b.x) / 2,
        my: (a.y + b.y) / 2,
      };
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
      apply(scaleRef.current, {
        x: posRef.current.x + (mx - lastPinch.current.mx),
        y: posRef.current.y + (my - lastPinch.current.my),
      });
      lastPinch.current = { d, mx, my };
    } else if (pointers.current.size === 1 && scaleRef.current > 1) {
      apply(scaleRef.current, {
        x: posRef.current.x + (e.clientX - prevP.x),
        y: posRef.current.y + (e.clientY - prevP.y),
      });
    }
  };

  const onPointerEnd = (e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) lastPinch.current = null;
  };

  const pct = Math.round(scale * 100);

  const transformStyle = {
    transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
    transition: pointers.current.size ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="floor-plan-viewer"
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
            <p
              data-testid="viewer-title"
              className="font-display text-[10px] md:text-xs uppercase tracking-[0.35em] text-bone/80"
            >
              {title}
            </p>
            {pdf && (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="viewer-open-pdf"
                className="inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-concrete hover:text-ember transition-colors duration-300"
              >
                <FileText className="w-4 h-4" strokeWidth={1.5} />
                Open Original PDF
              </a>
            )}
          </div>

          {activeUnit && (
            <div
              data-testid="viewer-unit-bar"
              className="shrink-0 border-b border-line px-5 md:px-10 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            >
              {units.length > 1 && (
                <div data-testid="viewer-unit-tabs" role="group" aria-label="Select flat type" className="inline-flex border border-line">
                  {units.map((u, i) => (
                    <button
                      key={u.label}
                      type="button"
                      data-testid={`viewer-unit-tab-${i}`}
                      aria-pressed={i === activeIdx}
                      onClick={() => setActiveIdx(i)}
                      className={`px-3.5 py-1.5 font-display font-semibold text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                        i === activeIdx
                          ? "bg-black/50 text-bone shadow-[inset_0_-2px_0_0_rgba(201,168,118,0.85)]"
                          : "text-bone/45 hover:text-bone/75"
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              )}
              <span data-testid="viewer-unit-area" className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-bone/50">
                {activeUnit.label} · Saleable Area <span className="text-[#C9A876] ml-1.5">{activeUnit.saleableArea}</span>
              </span>
            </div>
          )}

          <div
            ref={areaRef}
            data-testid="viewer-area"
            className="relative flex-1 overflow-hidden flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onPointerLeave={onPointerEnd}
          >
            <img
              ref={imgRef}
              onLoad={measureImg}
              src={image}
              alt={title}
              data-testid="viewer-image"
              draggable={false}
              className="max-w-[92%] max-h-[88%] object-contain pointer-events-none"
              style={transformStyle}
            />
            {activeUnit?.labels && imgBox && (
              <div
                data-testid="viewer-3d-labels-layer"
                className="absolute left-1/2 top-1/2 pointer-events-none"
                style={{
                  width: imgBox.w,
                  height: imgBox.h,
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})`,
                  transition: transformStyle.transition,
                }}
              >
                <PlanLabels labels={activeUnit.labels} testIdPrefix="viewer-3d-label" />
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-line px-5 md:px-10 py-3 md:py-4 flex items-center justify-center">
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                type="button"
                data-testid="viewer-zoom-out"
                aria-label="Zoom out"
                onClick={() => zoomAt(1 / 1.3)}
                className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center border border-line text-bone hover:border-ember hover:text-ember transition-[color,border-color] duration-300"
              >
                <Minus className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <span
                data-testid="viewer-zoom-level"
                className="w-16 md:w-20 text-center font-display text-xs md:text-sm tracking-[0.15em] text-bone/80 tabular-nums"
              >
                {pct}%
              </span>
              <button
                type="button"
                data-testid="viewer-zoom-in"
                aria-label="Zoom in"
                onClick={() => zoomAt(1.3)}
                className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center border border-line text-bone hover:border-ember hover:text-ember transition-[color,border-color] duration-300"
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                data-testid="viewer-reset"
                onClick={reset}
                className="h-11 md:h-12 px-4 md:px-5 flex items-center gap-2 border border-line text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-bone hover:border-ember hover:text-ember transition-[color,border-color] duration-300"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                Reset
              </button>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default FloorPlanViewer;
