// AboutGallery.tsx
// Kolase mosaic 7 foto — bukan galeri grid seragam. Di desktop (lg), tiap
// ubin diberi span kolom/baris eksplisit yang, lewat algoritma auto-placement
// CSS Grid (row-major, first-fit), otomatis tersusun jadi: satu landscape
// besar (kiri atas, 2x2), satu potret tinggi (tengah, 1x2), dua ubin kecil
// bertumpuk (kanan atas, masing-masing 1x1), lalu tiga ubin medium di baris
// bawah. Di layar lebih kecil, span dilepas dan foto memakai rasio aspek
// sendiri (bukan mosaic) — cukup untuk "2 kolom di tablet, 1 kolom di mobile"
// tanpa mempertaruhkan tata letak yang rapuh di breakpoint sempit.

"use client";

import { motion } from "framer-motion";
import { aboutGalleryPhotos } from "@/data/aboutGallery";
import { AboutGalleryPhoto } from "./AboutGalleryPhoto";

// Kelas per index foto (urutan mengikuti aboutGalleryPhotos). `lg:auto-rows-
// [168px]` di container membuat row-span benar-benar menghasilkan ubin dua
// kali lebih tinggi (bukan hanya menyesuaikan tinggi konten kosong).
const PLACEMENT = [
  "aspect-[16/10] lg:aspect-auto lg:col-span-2 lg:row-span-2", // 0: landscape besar
  "aspect-[3/4] lg:aspect-auto lg:col-span-1 lg:row-span-2", // 1: potret tinggi
  "aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1", // 2: kecil (atas)
  "aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1", // 3: kecil (bawah, bertumpuk di bawah #2)
  "aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1", // 4: medium
  "aspect-[16/9] lg:aspect-auto lg:col-span-2 lg:row-span-1", // 5: medium lebar
  "aspect-square lg:aspect-auto lg:col-span-1 lg:row-span-1", // 6: medium
];

// Stagger: tiap ubin muncul berurutan dengan jeda 90ms, dimulai 100ms setelah
// grid masuk viewport.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export function AboutGallery() {
  return (
    // hidden md:grid → mosaik ini HANYA untuk tablet & desktop; di HP galeri
    // dirender oleh AboutGalleryMobile (filmstrip geser-samping).
    <motion.div
      className="hidden gap-4 md:grid md:grid-cols-2 lg:auto-rows-[168px] lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
    >
      {aboutGalleryPhotos.map((photo, index) => (
        <AboutGalleryPhoto key={photo.id} photo={photo} className={PLACEMENT[index]} />
      ))}
    </motion.div>
  );
}
