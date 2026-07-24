"use client";

import { motion } from "framer-motion";
import { aboutGalleryPhotos } from "@/data/aboutGallery";
import { AboutGalleryPhoto } from "./AboutGalleryPhoto";

const PLACEMENT = [
  "aspect-[16/10] lg:aspect-auto lg:col-span-2 lg:row-span-2",
  "aspect-[3/4] lg:aspect-auto lg:col-span-1 lg:row-span-2",
  "aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1",
  "aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1",
  "aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1",
  "aspect-[16/9] lg:aspect-auto lg:col-span-2 lg:row-span-1",
  "aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export function AboutGallery() {
  return (
    <motion.div
      className="hidden gap-4 md:grid md:grid-cols-2 lg:auto-rows-[168px] lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {aboutGalleryPhotos.map((photo, index) => (
        <AboutGalleryPhoto key={photo.id} photo={photo} className={PLACEMENT[index]} />
      ))}
    </motion.div>
  );
}
