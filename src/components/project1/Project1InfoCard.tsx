"use client";

import { motion } from "framer-motion";

interface Project1InfoCardProps {
  fullName: string;
  faction: string;
}

export function Project1InfoCard({ fullName, faction }: Project1InfoCardProps) {
  return (
    <motion.div
      className="pointer-events-none absolute right-3 top-[13%] z-36 w-40 rounded-2xl border border-white/15 bg-white/8 p-3.5 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md sm:right-[16%] sm:top-[24%] sm:w-52 sm:p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        Character Info
      </span>
      <dl className="mt-3 space-y-2.5">
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            Name
          </dt>
          <dd className="text-sm font-semibold text-white">{fullName}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            Faction
          </dt>
          <dd className="text-sm font-semibold text-white">{faction}</dd>
        </div>
      </dl>
    </motion.div>
  );
}
