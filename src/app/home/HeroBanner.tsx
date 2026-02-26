"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { HeroContent } from "./components/HeroContent";
import { HeroSeparator } from "./components/HeroSeparator";

const YOUTUBE_VIDEO_ID = "CdhpGPhWDTM";
const FADE_DELAY_MS = 1000;

/** Carga el script de la YouTube IFrame API y resuelve cuando está listo */
function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    const w = window as Window & { YT?: { Player: unknown }; onYouTubeIframeAPIReady?: () => void };
    if (w.YT?.Player) {
      resolve();
      return;
    }
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(tag, first);
  });
}

const COVER_STYLE = {
  width: "max(100vw, 177.78vh)",
  height: "max(100vh, 56.25vw)",
} as const;

export function HeroBanner() {
  const [showVideoLayer, setShowVideoLayer] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const createPlayer = useCallback(() => {
    const w = window as Window & { YT?: { Player: new (el: HTMLElement, opts: unknown) => { getPlayerState?: () => number }; PlayerState?: { PLAYING: number } } };
    const el = playerContainerRef.current;
    if (!el || !w.YT?.Player) return;

    new w.YT.Player(el, {
      videoId: YOUTUBE_VIDEO_ID,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onStateChange: (event: { data: number }) => {
          // YT.PlayerState.PLAYING === 1
          if (event.data === 1) setVideoPlaying(true);
        },
      },
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowVideoLayer(true), FADE_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showVideoLayer || !playerContainerRef.current) return;

    let cancelled = false;
    loadYouTubeAPI().then(() => {
      if (!cancelled) createPlayer();
    });
    return () => {
      cancelled = true;
    };
  }, [showVideoLayer, createPlayer]);

  return (
    <section className="relative w-full overflow-hidden bg-cream">
      <div className="relative max-h-[calc(80svh+100px)] min-h-0 overflow-hidden z-[1]">
        {/* Imagen de fondo: zoom out + fade in */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/salar-de-uyuni-bo.webp"
            alt="Salar de Uyuni"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Overlay blanco visible en todo momento */}
        <div className="absolute inset-0 z-[1] bg-white/50 pointer-events-none" aria-hidden />

        {/* Capa del video: zoom out + fade in solo cuando el video está reproduciendo */}
        {showVideoLayer && (
          <motion.div
            className="absolute inset-0 z-[2]"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{
              opacity: videoPlaying ? 1 : 0,
              scale: videoPlaying ? 1 : 1.12,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 overflow-hidden" aria-hidden>
              <div
                ref={playerContainerRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={COVER_STYLE}
              />
            </div>
            <div className="absolute inset-0 bg-white/50 pointer-events-none" />
          </motion.div>
        )}

        <div className="relative z-10 flex min-h-[70svh] flex-col items-center justify-center pb-24 pt-32 md:pb-32 md:pt-40">
          <HeroContent />
        </div>
        <HeroSeparator className="absolute bottom-0 z-10 w-full" />
      </div>
    </section>
  );
}
