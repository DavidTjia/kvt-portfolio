"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { Showcase } from "@/types/showcase";

interface Project1CharacterProps {
  showcase: Showcase;
  active: boolean;
  priority?: boolean;
  reduced?: boolean;
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
}

export function Project1Character({ showcase, active, priority, reduced, tiltX, tiltY }: Project1CharacterProps) {
  const floating = active && !reduced;

  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [10, -10]);

  return (
    <div className="relative h-[37vh] w-[37vh] sm:h-[47vh] sm:w-[47vh] lg:h-[54vh] lg:w-[54vh]">

      {active && (
        <div className="absolute bottom-[6%] left-1/2 h-[7%] w-[58%] -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl" />
      )}

      <motion.div
        className="h-full w-full will-change-transform"
        style={
          active
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
      >
        <motion.div
          className="relative h-full w-full"
          animate={floating ? { y: [0, -14, 0] } : { y: 0 }}
          transition={
            floating
              ? { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.15 }
              : { duration: 0.5, ease: "easeOut" }
          }
        >
          <Image
            src={showcase.image}
            alt={showcase.name}
            fill
            priority={priority}
            draggable={false}
            className="select-none object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)] sm:drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 55vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
