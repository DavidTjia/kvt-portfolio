"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FooterBrand } from "./FooterBrand";
import { FooterNav } from "./FooterNav";
import { REVEAL_EASE } from "@/lib/motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: REVEAL_EASE, staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: REVEAL_EASE } },
};

export function FooterGlassCard() {
  return (
    <motion.div
      className="relative z-10 overflow-hidden rounded-[28px] border border-white/60 bg-white/35 p-8 shadow-[0_20px_60px_rgba(26,62,115,0.12),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[22px] backdrop-saturate-150 sm:p-10 lg:p-14"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/50 via-white/5 to-transparent" />
      <div className="relative grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:gap-8 sm:text-left lg:gap-16">
        <motion.div variants={itemVariants}>
          <FooterBrand />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FooterNav />
        </motion.div>
      </div>
      <motion.div
        variants={itemVariants}
        className="relative mt-10 flex flex-col items-center gap-4 border-t border-white/50 pt-6 sm:mt-12 sm:flex-row sm:justify-between sm:pt-8"
      >
        <p className="text-xs text-kvt-muted sm:text-sm">
          © 2026 Kawanua Virtual Teknologi. All rights reserved
        </p>
        <Link
          href="/#home"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-kvt-ink transition-colors duration-300 hover:text-kvt-blue sm:text-sm"
        >
          Back to top
          <span className="grid h-7 w-7 place-items-center rounded-full border border-kvt-blue/45 text-kvt-blue transition-[background-color,color,border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-kvt-blue group-hover:bg-kvt-blue group-hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
