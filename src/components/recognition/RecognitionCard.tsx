"use client";

import { motion } from "framer-motion";
import type { Recognition } from "@/types/recognition";
import { REVEAL_EASE } from "@/lib/motion";

const HOVER_EASE = [0.65, 0, 0.35, 1] as const;

interface RecognitionCardProps {
  recognition: Recognition;
  delay: number;
}

export function RecognitionCard({ recognition, delay }: RecognitionCardProps) {
  return (
    <motion.div
      className="flex h-full min-h-37.5 flex-col justify-between rounded-[18px] border border-kvt-line bg-white p-6 shadow-[0_20px_45px_-20px_rgba(11,27,51,0.25)] transition-[border-color,box-shadow] duration-300 hover:border-kvt-blue/50 hover:shadow-[0_28px_60px_-20px_rgba(11,27,51,0.35)]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: REVEAL_EASE, delay } }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: HOVER_EASE } }}
    >
      <span className="text-3xl font-extrabold text-kvt-ink sm:text-4xl">
        {recognition.index}
      </span>
      <span className="text-sm font-semibold text-kvt-ink sm:text-base">
        {recognition.title}
      </span>
    </motion.div>
  );
}
