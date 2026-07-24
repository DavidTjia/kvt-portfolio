"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

interface HeroMascotProps {
  src: string;
  alt: string;
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
}

export function HeroMascot({ src, alt, tiltX, tiltY }: HeroMascotProps) {
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [4, -4]);

  return (
    <div className="relative h-full w-full" style={{ perspective: 1400 }}>
      <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-[62%] w-[68%] -translate-x-1/2 rounded-full bg-[#4a86d4]/18 blur-[70px]" />
      <div className="pointer-events-none absolute bottom-[1%] left-1/2 h-[12%] w-[74%] -translate-x-1/2 rounded-[50%] bg-kvt-ink/14 blur-[46px]" />
      <div className="pointer-events-none absolute bottom-[2%] left-1/2 h-[4%] w-[42%] -translate-x-1/2 rounded-[50%] bg-kvt-ink/30 blur-[18px]" />
      <motion.div
        className="h-full w-full origin-bottom will-change-transform"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            draggable={false}
            className="select-none object-contain object-bottom drop-shadow-[0_18px_28px_rgba(11,27,51,0.28)]"
            sizes="(max-width: 768px) 85vw, 45vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
