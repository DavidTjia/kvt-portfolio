// HeroMascot.tsx
// Maskot tunggal (Alphonse) di tengah Hero, lengkap dengan bayangan berlapis.
//
// CATATAN PENTING soal kaki terpotong:
// Berkas Alphonse.png tidak punya margin bawah sama sekali (isi gambar menyentuh
// tepi bawah kanvas). Karena itu, begitu ada transform yang menggeser bagian
// bawah ke bawah, kaki langsung tertimpa overflow-hidden milik section.
// Tiga pengaman dipakai di sini (berlapis, bukan saling menggantikan):
//   1. origin-bottom pada node tilt → rotateX berputar pada garis kaki, jadi
//      bagian bawah menjadi titik tumpu dan TIDAK PERNAH bergerak turun.
//   2. Baseline float digeser 4px ke BAWAH (bukan 0), lalu berayun ke -4px
//      (naik) dan kembali. Jadi titik "paling naik" hanya 4px di atas posisi
//      natural, bukan penuh 8px — memberi marjin ekstra di sisi teraman.
//   3. HeroSection.tsx memastikan dasar kotak selalu ≥11px di bawah tepi
//      section pada tinggi layar berapa pun (lihat komentar di sana), jauh
//      lebih besar dari 4px ini — jadi celah kosong tidak mungkin muncul.

"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

interface HeroMascotProps {
  src: string; // path gambar maskot
  alt: string; // teks alternatif (nama maskot)
  tiltX: MotionValue<number>; // posisi pointer X (-0.5..0.5) untuk tilt
  tiltY: MotionValue<number>; // posisi pointer Y (-0.5..0.5) untuk tilt
}

export function HeroMascot({ src, alt, tiltX, tiltY }: HeroMascotProps) {
  // Ubah posisi pointer menjadi sudut rotasi (derajat). Sengaja kecil agar
  // terasa halus dan tidak mengganggu keterbacaan headline di sebelahnya.
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [4, -4]);

  return (
    <div className="relative h-full w-full" style={{ perspective: 1400 }}>
      {/* --- Lapisan bayangan & cahaya, semuanya di belakang maskot --- */}

      {/* Cahaya biru lembut membungkus maskot (ambient light dari latar). */}
      <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-[62%] w-[68%] -translate-x-1/2 rounded-full bg-[#4a86d4]/18 blur-[70px]" />

      {/* Bayangan ambient: gelap luas dan sangat kabur, membuat maskot menyatu
          dengan latar alih-alih terlihat seperti stiker yang ditempel. */}
      <div className="pointer-events-none absolute bottom-[1%] left-1/2 h-[12%] w-[74%] -translate-x-1/2 rounded-[50%] bg-kvt-ink/14 blur-[46px]" />

      {/* Bayangan kontak: lebih kecil, lebih pekat, lebih tajam — inilah yang
          membuat maskot terasa benar-benar menapak (grounded). */}
      <div className="pointer-events-none absolute bottom-[2%] left-1/2 h-[4%] w-[42%] -translate-x-1/2 rounded-[50%] bg-kvt-ink/30 blur-[18px]" />

      {/* --- Maskot --- */}

      {/* Node tilt. origin-bottom = pivot di garis kaki (lihat catatan di atas). */}
      <motion.div
        className="h-full w-full origin-bottom will-change-transform"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Node float: berayun ±4px di sekitar baseline yang sedikit turun,
            hanya ke arah atas dari posisi natural (lihat catatan di atas). */}
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* object-bottom menjaga kaki tetap menapak di dasar kotak,
              object-contain menjaga gambar utuh di rasio layar apa pun. */}
          <Image
            src={src}
            alt={alt}
            fill
            priority // maskot adalah elemen visual utama layar pertama (LCP)
            draggable={false}
            className="select-none object-contain object-bottom drop-shadow-[0_18px_28px_rgba(11,27,51,0.28)]"
            sizes="(max-width: 768px) 85vw, 45vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
