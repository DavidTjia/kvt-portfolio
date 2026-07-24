"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { aboutGalleryPhotos } from "@/data/aboutGallery";
import { revealUp } from "@/lib/motion";

export function AboutGalleryMobile() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const node = child as HTMLElement;
      const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
      const dist = Math.abs(nodeCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const node = el.children[i] as HTMLElement | undefined;
    if (!node) return;
    el.scrollTo({
      left: node.offsetLeft - (el.clientWidth - node.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  return (
    <motion.div className="flex flex-col gap-4" {...revealUp()}>
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-[9%]"
      >
        {aboutGalleryPhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-[4/3] w-[82%] shrink-0 snap-center overflow-hidden rounded-[18px] shadow-[0_10px_24px_-14px_rgba(11,27,51,0.22)]"
          >
            <div className="absolute inset-0" style={{ backgroundImage: photo.gradient }} />
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              unoptimized
              draggable={false}
              className="select-none object-cover"
              sizes="82vw"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2" role="tablist" aria-label="About gallery">
        {aboutGalleryPhotos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Ke foto ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
              i === active ? "w-6 bg-kvt-blue" : "w-1.5 bg-kvt-blue/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
