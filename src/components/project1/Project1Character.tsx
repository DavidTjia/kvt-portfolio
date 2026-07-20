// Project1Character.tsx
// Menampilkan satu gambar karakter (PNG) di dalam carousel. Komponen ini fokus
// pada dua animasi milik karakter aktif: efek miring mengikuti mouse (tilt 3D)
// dan gerakan melayang naik-turun (float). Geser/zoom/blur antar-slide diurus
// oleh positioner di Project1Carousel, jadi kedua sistem tidak saling rebutan
// properti CSS yang sama.

"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { Showcase } from "@/types/showcase";

interface Project1CharacterProps {
  showcase: Showcase; // data karakter (gambar, nama, dll.)
  active: boolean; // true jika ini karakter di tengah (yang di-zoom & melayang)
  priority?: boolean; // true → Next.js memuat gambar lebih awal (LCP)
  reduced?: boolean; // true di HP → matikan float supaya ringan
  tiltX: MotionValue<number>; // posisi pointer X (-0.5..0.5) untuk tilt
  tiltY: MotionValue<number>; // posisi pointer Y (-0.5..0.5) untuk tilt
}

export function Project1Character({ showcase, active, priority, reduced, tiltX, tiltY }: Project1CharacterProps) {
  // Float hanya untuk karakter aktif DAN bukan di HP (reduced) — di HP animasi
  // naik-turun terus-menerus ini dimatikan agar carousel lebih ringan.
  const floating = active && !reduced;
  // Ubah posisi pointer menjadi sudut rotasi (derajat) untuk efek tilt 3D.
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [10, -10]);

  return (
    // Kotak persegi. Gambar berorientasi potret, jadi tingginya yang membatasi:
    // tinggi kotak ≈ tinggi gambar. Dikali ACTIVE_SCALE (1.15) di carousel,
    // karakter aktif menempati 54vh*1.15≈62vh di desktop — pas di rentang
    // 60-65% tinggi section yang diminta desain baru.
    <div className="relative h-[37vh] w-[37vh] sm:h-[47vh] sm:w-[47vh] lg:h-[54vh] lg:w-[54vh]">
      {/* Bayangan lembut di lantai, hanya untuk karakter aktif. */}
      {active && (
        <div className="absolute bottom-[6%] left-1/2 h-[7%] w-[58%] -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl" />
      )}

      {/* Node tilt: hanya karakter aktif yang dimiringkan mengikuti mouse. */}
      <motion.div
        className="h-full w-full will-change-transform"
        style={
          active
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
      >
        {/* Node float: naik-turun perlahan. Delay 1.15s agar mulai setelah
            animasi masuk (geser + zoom) selesai, sehingga transisinya rapi. */}
        <motion.div
          className="relative h-full w-full"
          animate={floating ? { y: [0, -14, 0] } : { y: 0 }}
          transition={
            floating
              ? { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.15 }
              : { duration: 0.5, ease: "easeOut" }
          }
        >
          {/* object-contain menjaga gambar utuh di dalam kotak, jadi karakter
              tidak pernah terpotong berapa pun rasio layarnya. Drop-shadow
              lebih kecil di HP (filter lebih murah), penuh di sm ke atas. */}
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
