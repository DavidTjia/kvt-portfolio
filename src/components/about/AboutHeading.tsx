"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/motion";

export function AboutHeading() {
  return (
    <motion.h2
      className="max-w-3xl pt-3.5 text-left text-xl font-bold leading-[1.12] tracking-tight text-kvt-ink sm:text-3xl lg:text-4xl"
      {...revealUp()}
    >
      Every experience has a story
    </motion.h2>
  );
}
