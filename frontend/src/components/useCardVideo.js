import { useEffect, useState } from "react";

// Centralized playback manager shared by every project card video (Projects
// index + Home featured cards): each video reports its visibility ratio;
// after each change (rAF-throttled) exactly ONE winner — the most-visible
// video above the 0.55 threshold — plays, all others pause. Deterministic,
// no promise races: any play() that resolves late is re-verified by settle().
const cardVideos = new Map(); // video -> { ratio }
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
      if (v.paused) {
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
export const useCardVideo = (videoRef, mediaRef, hasVideo) => {
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
    const io = new IntersectionObserver(
      ([entry]) => reportRatio(v, entry.intersectionRatio),
      { threshold: [0, 0.25, 0.55, 0.75, 1] }
    );
    io.observe(v);
    return () => {
      io.disconnect();
      v.pause();
      unregisterVideo(v);
    };
  }, [armed, videoRef]);

  return armed;
};

export default useCardVideo;
