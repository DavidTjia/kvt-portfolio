"use client";

import { motion } from "framer-motion";
import type { Showcase } from "@/types/showcase";

interface Project1PaginationProps {
  showcases: Showcase[];
  activeIndex: number;
  onSelect: (index: number) => void;
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
            <span
              className={`relative block h-0.75 overflow-hidden rounded-full bg-white/25 transition-[width] duration-500 ease-out ${
                isActive ? "w-10" : "w-4"
              }`}
            >

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
