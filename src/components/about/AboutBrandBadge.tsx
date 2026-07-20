// AboutBrandBadge.tsx
// Pill kecil "Kawanua Virtual Teknologi" di bawah-tengah kolase. Margin atas
// negatif menariknya sedikit ke atas, seolah menempel di tepi bawah galeri.

"use client";

import { motion } from "framer-motion";
import { REVEAL_EASE } from "@/lib/motion";

export function AboutBrandBadge() {
  return (
    <motion.div
      className="-mt-5 flex justify-center sm:-mt-6"
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: REVEAL_EASE }}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-gray-100/95 px-4 py-1.5 text-xs font-semibold text-kvt-muted shadow-sm backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-kvt-blue" />
        Kawanua Virtual Teknologi
      </span>
    </motion.div>
  );
}
