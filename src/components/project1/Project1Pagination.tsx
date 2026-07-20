// Project1Pagination.tsx
// Indikator di tengah bawah: satu titik/garis per karakter. Titik yang aktif
// melebar dan diberi sorotan putih yang meluncur mulus antar-titik (layoutId).
// Bisa diklik untuk langsung melompat ke karakter tertentu.

"use client";

import { motion } from "framer-motion";
import type { Showcase } from "@/types/showcase";

interface Project1PaginationProps {
  showcases: Showcase[]; // daftar karakter → jumlah titik
  activeIndex: number; // karakter yang sedang aktif
  onSelect: (index: number) => void; // dipanggil saat sebuah titik diklik
}

export function Project1Pagination({ showcases, activeIndex, onSelect }: Project1PaginationProps) {
  return (
    <div className="flex items-center gap-3" role="tablist" aria-label="Showcase chapters">
      {showcases.map((showcase, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={showcase.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to ${showcase.name}`}
            onClick={() => onSelect(index)}
            className="relative flex h-8 items-center px-1"
          >
            {/* Garis dasar; melebar (w-10) saat aktif, mengecil (w-4) saat tidak. */}
            <span
              className={`relative block h-0.75 overflow-hidden rounded-full bg-white/25 transition-[width] duration-500 ease-out ${
                isActive ? "w-10" : "w-4"
              }`}
            >
              {/* Sorotan putih; layoutId membuatnya meluncur ke titik aktif baru. */}
              {isActive && (
                <motion.span
                  layoutId="project1-pagination-active"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
