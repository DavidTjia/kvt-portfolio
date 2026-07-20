// AboutGalleryPhoto.tsx
// Satu ubin foto di kolase About. Dua state Framer Motion dipakai pada node
// YANG SAMA (bukan dua node terpisah seperti pola dual-library di Hero) —
// ini aman karena keduanya berasal dari satu sistem (Framer): `variants`
// (dikendalikan AboutGallery lewat stagger) mengurus reveal saat scroll,
// sedangkan `whileHover` mengurus scale + shadow saat kursor di atasnya.
// Variant "visible" punya `transition` sendiri (lebih lambat, untuk reveal);
// prop `transition` di root berlaku untuk whileHover (lebih cepat).

"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { AboutPhoto } from "@/types/aboutPhoto";
import { REVEAL_EASE } from "@/lib/motion";

interface AboutGalleryPhotoProps {
  photo: AboutPhoto;
  className: string; // kelas ukuran/posisi grid, ditentukan oleh AboutGallery
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
      {/* Warna latar sementara di balik foto — terlihat sekejap saat foto
          masih dimuat, supaya ubin tidak berkedip kosong. */}
      <div className="absolute inset-0" style={{ backgroundImage: photo.gradient }} />

      {/* Foto asli. unoptimized: file-nya SVG (berisi gambar ter-embed), jadi
          dilewatkan apa adanya tanpa optimizer Next (yang menolak SVG kecuali
          dikonfigurasi khusus). object-cover mengisi ubin penuh di rasio apa pun. */}
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
