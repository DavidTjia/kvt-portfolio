"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { AboutPhoto } from "@/types/aboutPhoto";
import { REVEAL_EASE } from "@/lib/motion";

interface AboutGalleryPhotoProps {
  photo: AboutPhoto;
  className: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    boxShadow: "0 10px 24px -14px rgba(11,27,51,0.22)",
    transition: { duration: 0.7, ease: REVEAL_EASE },
  },
};

export function AboutGalleryPhoto({ photo, className }: AboutGalleryPhotoProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 26px 48px -16px rgba(11,27,51,0.4)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-[18px] ${className}`}
    >
      <div className="absolute inset-0" style={{ backgroundImage: photo.gradient }} />
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        unoptimized
        draggable={false}
        className="select-none object-cover"
        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
      />
    </motion.div>
  );
}
