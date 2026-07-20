// HeroSection.tsx
// Hero section KVT — layar pertama (100vh) sebagai perkenalan situs.
// Susunan vertikal: navbar → area teks → strip layanan. Maskot Alphonse berada
// di lapisan terpisah yang menutupi seluruh section, diposisikan dengan satuan
// dvh agar proporsinya konsisten di berbagai tinggi layar.
//
// PENTING: Hero berdiri sendiri. Tidak menampilkan konten apa pun milik section
// Project di bawahnya, dan tidak memakai komponen/data dari folder project1.

"use client"; // memakai motion value + event mouse → harus client component.

import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { HeroEnergyPaths } from "./HeroEnergyPaths";
import { HeroMascot } from "./HeroMascot";
import { HeroCtaButton } from "./HeroCtaButton";
import { HeroServicesBar } from "./HeroServicesBar";

// Easing masuk (easeOutExpo): cepat di awal lalu mendarat sangat lembut —
// terasa "premium" untuk animasi pertama-kali-load, beda dari easing inOut
// yang dipakai scroll-reveal antar-section.
const ENTER_EASE = [0.16, 1, 0.3, 1] as const;

// Satu resep animasi masuk yang dipakai berulang: mulai transparan & sedikit
// turun, lalu naik ke posisi. Tiap elemen memberi `delay` sendiri supaya
// tulisan dan foto muncul BERGANTIAN (navbar → headline → maskot → CTA →
// tagline → caption → strip layanan), bukan serentak.
function enter(delay: number, y = 24) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: ENTER_EASE, delay },
  };
}

// Maskot tunggal yang tampil di Hero. Hanya Alphonse — karakter lain milik
// section Project 01 dan sengaja tidak dipakai di sini.
const MASCOT = {
  name: "Alphonse",
  project: "Wardeka Edonisia",
  image: "/characters/Alphonse.png",
};

// Padding tepi yang dipakai seragam oleh navbar, teks, dan strip layanan.
// Nilainya kecil (≈4% di desktop) mengikuti referensi yang memakai lebar penuh,
// bukan container yang dipusatkan — inilah yang membuat teks duduk jauh di kiri.
const EDGE = "px-6 sm:px-10 lg:px-14";

export function HeroSection() {
  // Posisi pointer mentah → dihaluskan dengan spring → dipakai untuk efek tilt
  // maskot saat kursor digerakkan di area Hero.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.4 });
  const tiltY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.4 });

  // Spring KEDUA dari pointer yang sama, sengaja jauh lebih lembut & lamban
  // (stiffness kecil, mass besar) — dipakai khusus untuk parallax. Tilt maskot
  // boleh responsif, tapi geseran latar harus terasa mengambang, bukan
  // mengikuti kursor persis.
  const driftX = useSpring(pointerX, { stiffness: 34, damping: 26, mass: 0.9 });
  const driftY = useSpring(pointerY, { stiffness: 34, damping: 26, mass: 0.9 });

  // Tiga kedalaman parallax: latar 2px, jalur energi 5px (di dalam
  // HeroEnergyPaths), maskot 10px. Semua bergerak BERLAWANAN arah kursor —
  // makin dekat ke penonton, makin besar geserannya.
  const bgX = useTransform(driftX, [-0.5, 0.5], [2, -2]);
  const bgY = useTransform(driftY, [-0.5, 0.5], [2, -2]);
  const mascotX = useTransform(driftX, [-0.5, 0.5], [10, -10]);
  const mascotY = useTransform(driftY, [-0.5, 0.5], [10, -10]);

  // Simpan posisi kursor, dinormalkan ke -0.5..0.5 relatif terhadap section.
  const handlePointerMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY]
  );

  // Saat kursor keluar, kembalikan maskot ke posisi tegak (tanpa tilt).
  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section
      id="home"
      className="relative flex h-dvh w-full flex-col overflow-hidden text-kvt-ink"
      aria-label="Introduction"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      {/* Latar berlapis: gradasi, cahaya biru, garis diagonal, vignette.
          Dibungkus node parallax tersendiri (2px, lapisan paling "jauh").
          -inset-1 memberi 4px kelebihan di tiap sisi supaya geseran 2px tidak
          pernah menyingkap celah kosong di tepi section. */}
      <motion.div className="absolute -inset-1 overflow-hidden" style={{ x: bgX, y: bgY }}>
        <HeroBackground />
      </motion.div>

      {/* Jalur energi digital: garis patah 45°/90° yang nyaris tak terlihat,
          sesekali dilewati pulsa cahaya cyan. Dirender SESUDAH HeroBackground
          (jadi di atasnya) tapi tanpa z-index → tetap di bawah maskot (z-10),
          scrim (z-15), teks (z-20), dan navbar. Parallax 5px-nya diurus di
          dalam komponen. */}
      <HeroEnergyPaths parallaxX={driftX} parallaxY={driftY} />

      {/* ---------- Lapisan maskot ----------
          Posisi kepala (setelah geser naik 80px lewat `bottom`) sudah dinilai
          pas — jadi ukuran kotak dikembalikan ke baseline 111dvh/76dvh (bukan
          diperbesar lagi) supaya maskot tidak terlalu dominan, TANPA menurunkan
          posisi kepala yang sudah bagus itu (kedua hal ini sengaja dikendalikan
          oleh dua mekanisme terpisah — lihat catatan di HeroMascot.tsx untuk
          kenapa pergeseran `bottom` ini tetap aman dari celah kosong).
          lg:left-[10%] tetap menjaga bahu/mantel bersih dari headline kiri. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(-13dvh+116px)] z-10 flex justify-center sm:bottom-[calc(-13dvh+80px)] lg:left-[10%]">
        {/* Node parallax maskot (10px — geseran terbesar, jadi terbaca sebagai
            lapisan paling DEKAT ke penonton). Sengaja node sendiri: transform
            entrance di anaknya dan tilt/float di dalam HeroMascot masing-masing
            sudah memegang transform-nya sendiri. */}
        <motion.div style={{ x: mascotX, y: mascotY }}>
          {/* Maskot masuk dengan fade + naik + sedikit zoom. Ini node terpisah
              dari tilt/float di dalam HeroMascot (transform induk vs anak tidak
              saling rebutan). delay 0.5s → muncul setelah headline (giliran foto). */}
          <motion.div
            className="relative h-[111dvh] w-[76dvh] max-w-[92vw]"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: ENTER_EASE, delay: 0.5 }}
          >
            <HeroMascot
              src={MASCOT.image}
              alt={MASCOT.name}
              tiltX={tiltX}
              tiltY={tiltY}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scrim keterbacaan — HANYA di bawah lg. Di layar kecil, maskot yang
          berada di tengah bertumpuk di belakang headline (sama-sama gelap),
          jadi sisi kiri diberi lapisan putih transparan yang memudar ke kanan
          supaya headline tetap terbaca. z di antara maskot (z-10) dan teks
          (z-20); di desktop maskot sudah bergeser ke kanan jadi scrim tak perlu. */}
      <div
        className="pointer-events-none absolute inset-0 z-15 lg:hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(244,249,255,0.94) 0%, rgba(244,249,255,0.6) 42%, rgba(244,249,255,0) 72%)",
        }}
      />

      {/* Spacer setinggi navbar. Navbar kini elemen fixed global (dirender di
          page.tsx, lihat HeroNavbar.tsx) sehingga tidak lagi mengambil ruang
          di flow Hero — spacer ini menjaga posisi headline/teks tetap sama
          seperti sebelumnya (py-5 + tinggi logo h-9/h-10). */}
      <div aria-hidden className="shrink-0 py-5">
        <div className="h-9 sm:h-10" />
      </div>

      {/* Area teks: mengisi sisa tinggi antara navbar dan strip layanan.
          z-20 menaruhnya di atas maskot agar selalu terbaca. */}
      <div className="relative z-20 flex-1">
        {/* Headline + CTA di kiri. Headline giliran ke-2 (setelah navbar,
            sebelum maskot); CTA giliran ke-4 (setelah maskot). */}
        <div className={`absolute top-[26%] w-full -mt-9.5 -translate-y-1/2 sm:top-[36%] sm:mt-0 ${EDGE}`}>
          <motion.h1
            className="text-4xl font-extrabold leading-[1.16] tracking-[-0.02em] sm:text-5xl"
            {...enter(0.3)}
          >
            Innovative Solutions
            <br />
            <span className="text-kvt-blue">Trusted</span> Results
          </motion.h1>
          {/* CTA desktop: tepat di bawah headline. Di HP disembunyikan —
              versinya dipindah ke dekat bawah (lihat blok sm:hidden di bawah). */}
          <motion.div className="mt-7 hidden sm:block" {...enter(0.75, 18)}>
            <HeroCtaButton label="Learn more about us" href="#about" />
          </motion.div>
        </div>

        {/* CTA versi HP (sm:hidden): diposisikan di bawah area teks, tepat di
            atas caption "Est. 2019" — jadi tidak menutupi wajah karakter. */}
        <motion.div
          className={`absolute inset-x-0 bottom-18 sm:hidden ${EDGE}`}
          {...enter(0.75, 18)}
        >
          <HeroCtaButton label="Learn more about us" href="#about" />
        </motion.div>

        {/* Tagline kecil di kanan, sejajar siku maskot (≈57% tinggi section).
            Disembunyikan di layar sempit supaya tidak menabrak maskot. Di lg
            (laptop) digeser lebih ke kanan (right 13% → 4%) karena di lebar itu
            maskot melebar dan menutupinya. */}
        <motion.p
          className="absolute right-[13%] top-[57%] hidden max-w-60 text-sm font-medium leading-[1.7] text-kvt-blue md:block lg:right-[4%]"
          {...enter(0.95, 16)}
        >
          Every great technology
          <br />
          begins with a single idea
        </motion.p>

        {/* Keterangan kecil di dasar area, mengapit maskot kiri dan kanan.
            Di layar besar barisnya dipersempit ke 56% lebar dan dipusatkan
            supaya kedua label jatuh di ≈22% dan ≈78% seperti referensi. */}
        <motion.div
          className={`absolute inset-x-0 bottom-4 flex items-end justify-between text-[11px] leading-[1.6] text-kvt-muted ${EDGE} lg:mx-auto lg:max-w-[56%] lg:px-0`}
          {...enter(1.05, 12)}
        >
          <p className="text-center">
            Est. 2019
            <br />
            Manado, Indonesia
          </p>
          {/* lg:translate-x-28 → digeser 112px ke kanan khusus di laptop supaya
              lepas dari badan maskot (label kiri sengaja tidak ikut bergeser). */}
          <p className="text-right sm:text-left lg:translate-x-28">
            {MASCOT.name}
            <br />
            {MASCOT.project}
          </p>
        </motion.div>
      </div>

      {/* Strip layanan di paling bawah; menutupi bagian bawah maskot.
          Naik-masuk terakhir supaya seluruh layar pertama "mengunci" rapi. */}
      <motion.div
        className="relative z-30 shrink-0"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: ENTER_EASE, delay: 1.15 }}
      >
        <HeroServicesBar edge={EDGE} />
      </motion.div>
    </section>
  );
}
