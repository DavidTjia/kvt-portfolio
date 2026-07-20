// RecognitionHeading.tsx
// Judul besar terpusat di atas grid penghargaan. Tipografi sama dengan
// headline Hero (font-extrabold, tracking rapat) — cuma dipusatkan dan
// dinaikkan satu tingkat ukuran supaya terasa jadi judul section, bukan hero.

"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/motion";

export function RecognitionHeading() {
  return (
    <motion.h2
      className="max-w-2xl text-center text-3xl font-extrabold leading-[1.16] tracking-[-0.02em] text-kvt-ink sm:text-4xl lg:text-5xl"
      {...revealUp()}
    >
      Digital solutions, built with purpose
    </motion.h2>
  );
}
