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
// videos whose autoplay was REJECTED by the browser (iPad Safari Low Power
// Mode et al.) — their card shows a clean tap-to-play button until the user
// starts them once, after which normal arbitration takes over
const blockedVideos = new Set();
const notifyBlocked = (v) => v.dispatchEvent(new CustomEvent("mdp:autoplayblocked"));
let settleScheduled = false;

// User-gesture play path: immediate, muted enforced, clears the blocked flag.
// An explicit tap is user INTENT — the tapped video wins arbitration for a
// while (otherwise a more-visible card instantly re-pauses it, which on iPad
// looks like "tap does nothing").
let pinnedVideo = null;
let pinnedUntil = 0;
export const playVideoNow = (v) => {
  if (!v) return;
  v.muted = true;
  blockedVideos.delete(v);
  pinnedVideo = v;
  pinnedUntil = Date.now() + 10000;
  cardVideos.forEach((_, other) => {
    if (other !== v && !other.paused) other.pause();
  });
  v.play()
    .then(() => settleSoon())
    .catch(() => {
      blockedVideos.add(v);
      notifyBlocked(v);
    });
};

// Manager play path with a settle timeout: iPad Safari can leave the play()
// promise PENDING forever (never resolving, never rejecting) when autoplay is
// disallowed — a silently frozen frame. If the video is still paused after
// 2.5s, treat it as blocked and surface the tap-to-play button.
const playWhenWinner = (v) => {
  v.muted = true;
  const p = v.play();
  if (!p || typeof p.then !== "function") return;
  let done = false;
  const markBlocked = () => {
    if (done) return;
    done = true;
    blockedVideos.add(v);
    notifyBlocked(v);
  };
  p.then(() => {
    done = true;
    settleSoon(); // late resolution: re-verify v is still the winner
  }).catch(markBlocked);
  setTimeout(() => {
    if (!done && v.paused) markBlocked();
  }, 2500);
};

const settle = () => {
  settleScheduled = false;
  let best = null;
  let bestRatio = 0.55; // must be meaningfully visible
  // an explicit tap pins its video as the winner while it stays on screen
  if (pinnedVideo && Date.now() < pinnedUntil) {
    const info = cardVideos.get(pinnedVideo);
    if (info && info.ratio > 0.25) {
      best = pinnedVideo;
      bestRatio = info.ratio;
    } else {
      pinnedVideo = null;
    }
  } else {
    pinnedVideo = null;
  }
  if (!best) {
    cardVideos.forEach((info, v) => {
      if (info.ratio > bestRatio) {
        best = v;
        bestRatio = info.ratio;
      }
    });
  }
  cardVideos.forEach((_, v) => {
    if (v === best) {
      // iOS Safari checks the muted IDL *property* (not the attribute) for
      // autoplay eligibility — enforce it right before every play()
      v.muted = true;
      if (v.paused && !manualPlayVideos.has(v) && !blockedVideos.has(v)) {
        playWhenWinner(v);
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

// iOS/iPadOS suspends videos when the tab/app is backgrounded AND restores
// pages from the back-forward cache with media frozen — re-evaluate playback
// in both cases (resume behaviour).
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) settleSoon();
  });
}
if (typeof window !== "undefined") {
  window.addEventListener("pageshow", settleSoon);
}

// Poster frame extracted from the SAME video — never the elevation image.
export const videoPosterFor = (src) =>
  src ? src.replace("/assets/videos/", "/assets/videos/posters/").replace(/\.mp4$/, "-poster.jpg") : null;

/**
 * useCardVideo — lazy-armed, visibility-driven card video behaviour:
 * nothing downloads until the card nears the viewport (400px rootMargin),
 * then the muted/looped/playsInline clip autoplays only while ≥55% visible,
 * pauses when scrolled away, and yields to the single most-visible card.
 * Returns { armed, blocked } — mount the <video> only once armed; `blocked`
 * flips true if the browser rejects autoplay (show a tap-to-play button and
 * start playback via playVideoNow on tap).
 */
export const useCardVideo = (videoRef, mediaRef, hasVideo, { manualPlay = false } = {}) => {
  const [armed, setArmed] = useState(false);
  const [blocked, setBlocked] = useState(false);

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
    // arbitration — playback beginning is not an intersection change. If the
    // observer hasn't reported yet, register immediately with a synchronously
    // measured ratio so autoPlay-started videos can't escape arbitration.
    const onPlay = () => {
      setBlocked(false);
      if (!cardVideos.has(v)) {
        const r = v.getBoundingClientRect();
        const area = r.width * r.height;
        const vis =
          Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)) *
          Math.max(0, Math.min(r.right, window.innerWidth) - Math.max(r.left, 0));
        cardVideos.set(v, { ratio: area > 0 ? vis / area : 0 });
      }
      settleSoon();
    };
    const onBlocked = () => setBlocked(true);
    v.addEventListener("play", onPlay);
    v.addEventListener("mdp:autoplayblocked", onBlocked);
    return () => {
      io.disconnect();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("mdp:autoplayblocked", onBlocked);
      manualPlayVideos.delete(v);
      blockedVideos.delete(v);
      v.pause();
      unregisterVideo(v);
    };
  }, [armed, videoRef, manualPlay]);

  return { armed, blocked };
};

export default useCardVideo;
