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
