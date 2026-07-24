"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { REVEAL_EASE } from "@/lib/motion";

const CORNER_CUT = 28;
const ACCENT = "#3E7BFA";

const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const r1 = ((i * 9301 + 49297) % 233280) / 233280;
  const r2 = ((i * 4523 + 12345) % 65537) / 65537;
  const r3 = ((i * 7919 + 104729) % 99991) / 99991;
  return {
    left: r1 * 100,
    top: r2 * 100,
    size: 2 + r3 * 2.5,
    delay: r3 * 6,
    duration: 6 + r1 * 5,
  };
});

interface RecognitionSpecialCardProps {
  delay: number;
}

export function RecognitionSpecialCard({ delay }: RecognitionSpecialCardProps) {
  return (
    <motion.div
      className="relative flex h-full min-h-37.5 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-linear-to-b from-[#0E1B32] via-[#0B1830] to-[#0A1424] shadow-[0_20px_45px_-20px_rgba(11,27,51,0.25)]"
      style={{
        clipPath: `polygon(0 0, calc(100% - ${CORNER_CUT}px) 0, 100% ${CORNER_CUT}px, 100% 100%, 0 100%)`,
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: REVEAL_EASE, delay } }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="absolute h-28 w-28 rounded-full blur-2xl"
        style={{ backgroundColor: ACCENT }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: `conic-gradient(from 0deg, ${ACCENT}66, transparent 60%, ${ACCENT}33)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animation: `recognition-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 h-12 w-30 sm:h-14 sm:w-36">
        <Image
          src="/brand/kvt-logo.png"
          alt="Kawanua Virtual Teknologi"
          fill
          className="object-contain"
          sizes="150px"
        />
      </div>
    </motion.div>
  );
}
