// AboutGalleryMobile.tsx
// Versi galeri About untuk layar HP (md:hidden): filmstrip horizontal yang
// bisa digeser (scroll-snap) + titik indikator, menggantikan tumpukan 7 foto
// satu kolom yang bikin scroll vertikal kepanjangan. Tablet/desktop tetap
// memakai mosaik AboutGallery (hidden md:grid) — dua komponen terpisah, satu
// per rentang layar, dipilih lewat kelas visibilitas di AboutSection.

"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { aboutGalleryPhotos } from "@/data/aboutGallery";
import { revealUp } from "@/lib/motion";

export function AboutGalleryMobile() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Titik aktif = foto yang pusatnya paling dekat dengan pusat viewport
  // scroller. Cara ini tahan terhadap snap-center + "peek" (lebar tiap slide
  // < 100%) tanpa perlu tahu lebar/gap persisnya.
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

  // Klik titik → geser foto ke-i ke tengah dengan animasi halus.
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
      {/* Filmstrip: tiap slide 82% lebar (menyisakan "peek" foto berikutnya
          sebagai isyarat bisa digeser), snap ke tengah. Scrollbar disembunyikan
          (.no-scrollbar) supaya bersih. px-[9%] memusatkan slide pertama/terakhir. */}
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
            {/* Warna latar sementara di balik foto saat masih dimuat. */}
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

      {/* Titik indikator: melebar di foto aktif, bisa diklik untuk lompat. */}
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
