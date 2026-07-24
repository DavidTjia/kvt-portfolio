"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type PanInfo } from "framer-motion";
import type { ProjectCarouselSlide } from "@/types/projectDetail";

const DRAG_THRESHOLD = 80;

const AUTOPLAY_MS = 5000;

interface ImageCarouselProps {
  slides: ProjectCarouselSlide[];
}

export function ImageCarousel({ slides }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);

  const n = slides.length;
  const paused = hovering || dragging;

  useEffect(() => {
    if (paused || n <= 1) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, n]);

  if (n === 0) return null;

  const goTo = (i: number) => setIndex((i + n) % n);

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    setDragging(false);
    if (info.offset.x <= -DRAG_THRESHOLD) goTo(index + 1);
    else if (info.offset.x >= DRAG_THRESHOLD) goTo(index - 1);
  };

  return (
    <motion.div

      className="w-full min-w-0"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        <div className="overflow-hidden rounded-2xl bg-kvt-mist shadow-[0_18px_40px_-24px_rgba(11,27,51,0.45)]">
          <motion.div
            className="flex w-full cursor-grab active:cursor-grabbing"
            animate={{ x: `${-index * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="relative w-full shrink-0"
                style={{ aspectRatio: `${slide.image.width} / ${slide.image.height}` }}
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  unoptimized={slide.image.unoptimized}
                  sizes="(max-width: 768px) 90vw, 45vw"

                  draggable={false}
                  className="select-none object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
        <ArrowButton side="left" onClick={() => goTo(index - 1)} className="left-2 sm:left-3" />
        <ArrowButton side="right" onClick={() => goTo(index + 1)} className="right-2 sm:right-3" />
      </div>
      <div className="mt-4 overflow-hidden">
        <motion.div
          className="flex w-full"
          animate={{ x: `${-index * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full shrink-0 px-1">
              <h3 className="text-base font-bold tracking-tight text-kvt-ink sm:text-lg">
                {slide.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-kvt-muted">{slide.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2.5">
        {slides.map((slide, i) => {
          const isActive = i === index;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ke slide ${slide.name}`}
              aria-current={isActive}
              className={[
                "h-2 rounded-full transition-all duration-300 ease-out",
                isActive
                  ? "w-6 bg-kvt-blue"
                  : "w-2 bg-kvt-line hover:bg-kvt-blue/50",
              ].join(" ")}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function ArrowButton({
  side,
  onClick,
  className = "",
}: {
  side: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Sebelumnya" : "Berikutnya"}
      className={[
        "pointer-events-auto absolute top-1/2 -translate-y-1/2",
        "grid h-9 w-9 place-items-center rounded-full sm:h-10 sm:w-10",
        "bg-white/85 text-kvt-ink shadow-[0_6px_16px_-6px_rgba(11,27,51,0.5)] backdrop-blur-sm",
        "transition-[background-color,transform] duration-300 ease-out",
        "hover:bg-white hover:scale-105 active:scale-95",
        className,
      ].join(" ")}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={side === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
