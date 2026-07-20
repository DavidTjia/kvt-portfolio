// AboutClosingCard.tsx
// Kartu penutup section About: kotak biru muda membulat dengan kalimat
// penutup, terpusat, fade-up saat masuk viewport.

"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/motion";

export function AboutClosingCard() {
  return (
    <motion.div
      // lg:max-w-4xl → kartu dilebarkan di laptop supaya kalimatnya muat satu baris.
      className="relative mx-auto max-w-2xl overflow-hidden rounded-xl bg-linear-to-br from-[#A7E0FF] via-[#8CD5FF] to-[#6FC0F2] px-6 py-5 text-center shadow-[0_24px_50px_-22px_rgba(11,27,51,0.35)] sm:px-10 sm:py-6 lg:max-w-4xl"
      {...revealUp(0, 24)}
    >
      {/* Garis sorot tipis di tepi atas — memberi kesan permukaan, bukan blok datar. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
      {/* HP: text-sm agar cukup 2 baris. Laptop: whitespace-nowrap mengunci
          jadi tepat 1 baris (ruangnya sudah cukup berkat lg:max-w-4xl). */}
      <p className="text-balance text-xs font-bold leading-snug text-kvt-ink sm:text-base lg:text-lg lg:whitespace-nowrap">
        From here, the story keeps building, and there&apos;s more to see
      </p>
    </motion.div>
  );
}
