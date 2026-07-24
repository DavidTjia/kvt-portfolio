"use client";

import { motion } from "framer-motion";
import type { ProjectInfoField } from "@/types/project";

interface ProjectInfoCardProps {
  title: string;
  fields: ProjectInfoField[];
  align: "left" | "right";
}

export function ProjectInfoCard({ title, fields, align }: ProjectInfoCardProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute -bottom-4 z-20 w-40 rounded-2xl border border-white/15 bg-white/8 p-3.5 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md sm:w-44 sm:p-4 ${
        align === "right" ? "right-3 sm:right-4" : "left-3 sm:left-4"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        {title}
      </span>
      <dl className="mt-3 space-y-2.5">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="text-[10px] font-medium uppercase tracking-wider text-white/40">
              {field.label}
            </dt>
            <dd className="text-sm font-semibold text-white">{field.value}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
