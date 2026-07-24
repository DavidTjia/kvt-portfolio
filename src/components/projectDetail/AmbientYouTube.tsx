"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { extractVideoId, toYouTubeBackgroundUrl } from "@/lib/youtube";

const REVEAL_DELAY_MS = 2400;

const API_TIMEOUT_MS = 4000;

const COVER_SCALE = 1.14;

interface YTPlayer {
  destroy(): void;
  mute(): void;
  playVideo(): void;
  unloadModule(module: string): void;
}
interface YTStateEvent {
  data: number;
  target: YTPlayer;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady: (e: { target: YTPlayer }) => void;
        onStateChange: (e: YTStateEvent) => void;
      };
    },
  ) => YTPlayer;
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YT_PLAYING = 1;

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("YouTube IFrame API gagal dimuat"));

    window.onYouTubeIframeAPIReady = () => {
      if (window.YT) resolve(window.YT);
      else reject(new Error("YouTube IFrame API tidak tersedia"));
    };
    document.head.appendChild(script);
  });

  return apiPromise;
}

interface AmbientYouTubeProps {
  url: string;
  title: string;
  className?: string;
  cover?: boolean;
}

export function AmbientYouTube({
  url,
  title,
  className = "",
  cover = false,
}: AmbientYouTubeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [fallback, setFallback] = useState(false);
  const videoId = extractVideoId(url);

  useEffect(() => {
    if (!videoId) return;

    let player: YTPlayer | undefined;
    let revealTimer: number | undefined;
    let cancelled = false;

    const timeout = window.setTimeout(() => {
      if (!cancelled && !player) setFallback(true);
    }, API_TIMEOUT_MS);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !hostRef.current) return;
        window.clearTimeout(timeout);

        player = new YT.Player(hostRef.current, {
          videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: videoId,
            controls: 0,
            playsinline: 1,
            fs: 0,
            disablekb: 1,
            iv_load_policy: 3,
            cc_load_policy: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (e) => {
              e.target.mute();

              e.target.unloadModule("captions");
              e.target.unloadModule("cc");
              e.target.playVideo();
            },
            onStateChange: (e) => {
              if (e.data !== YT_PLAYING || revealTimer) return;
              revealTimer = window.setTimeout(() => {
                if (!cancelled) setVisible(true);
              }, REVEAL_DELAY_MS);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      if (revealTimer) window.clearTimeout(revealTimer);
      player?.destroy?.();
    };
  }, [videoId]);

  if (!videoId) return null;

  const coverClass = cover
    ? "overflow-hidden [&_iframe]:[transform:scale(var(--yt-cover))]"
    : "";
  const coverStyle = cover
    ? ({ "--yt-cover": String(COVER_SCALE) } as CSSProperties)
    : undefined;

  if (fallback) {
    return (
      <div className={`${className} relative ${coverClass}`} style={coverStyle}>
        <iframe
          className="pointer-events-none block h-full w-full"
          src={toYouTubeBackgroundUrl(url)}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <BlueTint />
      </div>
    );
  }

  return (
    <div
      className={[
        className,
        "pointer-events-none relative transition-opacity duration-700 ease-out",
        "[&_iframe]:block [&_iframe]:h-full [&_iframe]:w-full",
        coverClass,
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={coverStyle}
    >
      <div ref={hostRef} className="h-full w-full" />
      <BlueTint />
    </div>
  );
}

function BlueTint() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[#0A1A33]/45" />
      <div className="absolute inset-0 bg-linear-to-br from-kvt-blue/25 via-transparent to-[#08152C]/55" />
    </div>
  );
}
