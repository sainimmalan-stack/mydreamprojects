import { useEffect, useState } from "react";

// Centralized playback manager shared by every project card video (Projects
// index + Home featured cards): each video reports its visibility ratio;
// after each change (rAF-throttled) exactly ONE winner — the most-visible
// video above the 0.55 threshold — plays, all others pause. Deterministic,
// no promise races: any play() that resolves late is re-verified by settle().
const cardVideos = new Map(); // video -> { ratio }
// videos that must NEVER be auto-started by the manager (tap-to-play only,
// e.g. the brand film) — they are still paused when another video wins
const manualPlayVideos = new Set();
let settleScheduled = false;

const settle = () => {
  settleScheduled = false;
  let best = null;
  let bestRatio = 0.55; // must be meaningfully visible
  cardVideos.forEach((info, v) => {
    if (info.ratio > bestRatio) {
      best = v;
      bestRatio = info.ratio;
    }
  });
  cardVideos.forEach((_, v) => {
    if (v === best) {
      // iOS Safari checks the muted IDL *property* (not the attribute) for
      // autoplay eligibility — enforce it right before every play()
      v.muted = true;
      if (v.paused && !manualPlayVideos.has(v)) {
        v.play()
          .then(() => settleSoon()) // late resolution: re-verify v is still the winner
          .catch(() => {});
      }
    } else if (!v.paused) {
      v.pause();
    }
  });
};

const settleSoon = () => {
  if (settleScheduled) return;
  settleScheduled = true;
  requestAnimationFrame(settle);
};

const reportRatio = (v, ratio) => {
  cardVideos.set(v, { ratio });
  settleSoon();
};

const unregisterVideo = (v) => {
  cardVideos.delete(v);
  settleSoon();
};

// Lower-level access for the hero rotation player: it reports the ACTIVE
// video's visibility into the same single-winner arbitration the cards use,
// and untracks the old video each time the rotation advances.
export const reportCardRatio = reportRatio;
export const untrackCardVideo = unregisterVideo;

// iOS Safari suspends videos when the tab/app is backgrounded — re-evaluate
// playback when the page becomes visible again (resume behaviour).
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) settleSoon();
  });
}

// Poster frame extracted from the SAME video — never the elevation image.
export const videoPosterFor = (src) =>
  src ? src.replace("/assets/videos/", "/assets/videos/posters/").replace(/\.mp4$/, "-poster.jpg") : null;

/**
 * useCardVideo — lazy-armed, visibility-driven card video behaviour:
 * nothing downloads until the card nears the viewport (400px rootMargin),
 * then the muted/looped/playsInline clip autoplays only while ≥55% visible,
 * pauses when scrolled away, and yields to the single most-visible card.
 * Returns `armed` — mount the <video> element only once armed.
 */
export const useCardVideo = (videoRef, mediaRef, hasVideo, { manualPlay = false } = {}) => {
  const [armed, setArmed] = useState(false);

  // lazy arm: the video file is only requested once the card nears the viewport
  useEffect(() => {
    if (!hasVideo || !mediaRef.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(mediaRef.current);
    return () => io.disconnect();
  }, [hasVideo, mediaRef]);

  // report visibility to the central playback manager
  useEffect(() => {
    const v = videoRef.current;
    if (!armed || !v) return undefined;
    if (manualPlay) manualPlayVideos.add(v);
    const io = new IntersectionObserver(
      ([entry]) => reportRatio(v, entry.intersectionRatio),
      { threshold: [0, 0.25, 0.55, 0.75, 1] }
    );
    io.observe(v);
    // native autoPlay (and any late async start) must re-enter single-winner
    // arbitration — playback beginning is not an intersection change
    const onPlay = () => settleSoon();
    v.addEventListener("play", onPlay);
    return () => {
      io.disconnect();
      v.removeEventListener("play", onPlay);
      manualPlayVideos.delete(v);
      v.pause();
      unregisterVideo(v);
    };
  }, [armed, videoRef, manualPlay]);

  return armed;
};

export default useCardVideo;
