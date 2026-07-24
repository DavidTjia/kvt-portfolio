"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ProjectInfoCard } from "./ProjectInfoCard";
import type { ProjectInfoField } from "@/types/project";

const AUTOPLAY_INTERVAL = 4000;
const EASE = [0.65, 0, 0.35, 1] as const;

interface ProjectGalleryCarouselProps {
  images: string[];
  alt: string;
  infoTitle: string;
  infoFields: ProjectInfoField[];
  infoAlign: "left" | "right";
}

export function ProjectGalleryCarousel({
  images,
  alt,
  infoTitle,
  infoFields,
  infoAlign,
}: ProjectGalleryCarouselProps) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [canHover, setCanHover] = useState(true);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (total <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, [index, total]);

  return (
    <div
      className="relative"
      onMouseEnter={() => canHover && setIsHovered(true)}
      onMouseLeave={() => canHover && setIsHovered(false)}

      onClick={() => !canHover && setIsHovered((v) => !v)}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Image
              src={images[index]}
              alt={`${alt} — image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110 hover:bg-white/10 active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110 hover:bg-white/10 active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
      <AnimatePresence>
        {isHovered && (
          <ProjectInfoCard key="info" title={infoTitle} fields={infoFields} align={infoAlign} />
        )}
      </AnimatePresence>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label={`${alt} gallery`}>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
