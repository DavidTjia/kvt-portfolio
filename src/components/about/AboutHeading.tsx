// AboutHeading.tsx
// Judul besar di bagian atas section About: "Every experience has a story."
// Muncul dengan animasi fade-up saat pertama kali masuk viewport (sekali saja,
// tidak berulang tiap kali di-scroll bolak-balik — lihat `viewport.once`).

"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/motion";

export function AboutHeading() {
  return (
    <motion.h2
      className="max-w-3xl text-left text-xl font-bold leading-[1.12] tracking-tight text-kvt-ink sm:text-3xl lg:text-4xl"
      {...revealUp()}
    >
      Every experience has a story.
    </motion.h2>
  );
}
