// Project1Carousel.tsx
// Otak dari section "Project 01": carousel karakter 3D bergaya game landing page.
// Tugasnya: mengatur karakter mana yang aktif (di tengah), menjalankan autoplay,
// menghitung posisi/skala/blur tiap karakter (tengah tajam, samping blur),
// dan menyusun semua layer (background, atmosfer, teks, tombol, indikator).
//
// CATATAN REDESIGN: logika carousel di file ini (offset, target visual, timing
// transisi, autoplay, tilt mouse, navigasi) TIDAK diubah sama sekali dari
// versi sebelumnya — hanya lapisan visual/JSX yang disesuaikan (latar jadi
// tetap, kartu info kini muncul-saat-hover, dukungan keyboard, kolom kiri
// diganti paragraf statis). Section ini sekarang dibungkus ProjectsSection
// (latar putih + jarak konsisten) dan sudutnya dipotong sama seperti
// ProjectShowcaseCard (Project 02/03) supaya border ketiga project seragam.

"use client"; // Komponen ini memakai state, efek, dan event mouse → harus client component.

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { showcases } from "@/data/showcases";
import { Project1Background } from "./Project1Background";
import { Project1Atmosphere } from "./Project1Atmosphere";
import { Project1Character } from "./Project1Character";
import { Project1Pagination } from "./Project1Pagination";
import { Project1InfoCard } from "./Project1InfoCard";

// Jeda autoplay (ms) sebelum otomatis pindah ke karakter berikutnya.
const AUTOPLAY_INTERVAL = 5000;
// Kurva easing mirip GSAP power3.inOut agar perpindahan terasa sinematik.
const CAROUSEL_EASE = [0.65, 0, 0.35, 1] as const;

// Skala karakter aktif (di-zoom besar) vs karakter di kiri/kanan (mengecil).
const ACTIVE_SCALE = 1.15;
const SIDE_SCALE = 0.68;

// Tiga kategori lebar layar untuk mengatur jarak/visibilitas karakter samping.
type Breakpoint = "mobile" | "tablet" | "desktop";

// Bentuk target animasi satu kartu karakter pada satu waktu.
interface CardTarget {
  x: number; // geser horizontal (px)
  scale: number; // besar-kecil
  opacity: number; // transparansi
  rotateZ: number; // sedikit miring
  filter: string; // blur + brightness (samping blur & gelap)
  zIndex: number; // urutan tumpukan (aktif paling depan)
}

// Hook kecil: memantau lebar window dan mengklasifikasikannya ke breakpoint.
// Dipakai agar jarak karakter samping menyesuaikan layar (mobile menyembunyikannya).
function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    compute(); // hitung sekali saat mount
    window.addEventListener("resize", compute); // lalu setiap resize
    return () => window.removeEventListener("resize", compute); // bersihkan listener
  }, []);

  return bp;
}

// Jarak (bertanda) sebuah index dari slide aktif, dibungkus ke tetangga terdekat.
// Contoh 5 karakter: hasilnya 0 (aktif), -1 (kiri), 1 (kanan), sisanya tersembunyi.
function relativeOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total; // bungkus dari kanan jauh → jadi kiri
  else if (offset < -total / 2) offset += total; // bungkus dari kiri jauh → jadi kanan
  return offset;
}

// Menerjemahkan offset (0 / ±1 / lainnya) menjadi target visual kartu.
function cardTarget(offset: number, bp: Breakpoint): CardTarget {
  // offset 0 = karakter aktif: di tengah, besar, tajam, paling depan.
  if (offset === 0) {
    return {
      x: 0,
      scale: ACTIVE_SCALE,
      opacity: 1,
      rotateZ: 0,
      filter: "blur(0px) brightness(1)",
      zIndex: 30,
    };
  }

  const showSides = bp !== "mobile"; // di mobile hanya karakter aktif yang tampil
  const dist = bp === "desktop" ? 380 : 260; // jarak karakter tetangga
  const hiddenDist = bp === "desktop" ? 640 : 460; // jarak karakter yang menunggu

  // offset -1 (kiri) / +1 (kanan) = tetangga: lebih kecil, blur, agak gelap.
  if (offset === -1 || offset === 1) {
    const side = offset; // -1 kiri, 1 kanan
    return {
      x: side * dist,
      scale: SIDE_SCALE,
      opacity: showSides ? 0.55 : 0,
      rotateZ: side * -6,
      filter: "blur(5px) brightness(0.55)",
      zIndex: 20,
    };
  }

  // Sisanya menunggu di luar layar, siap masuk pada rotasi berikutnya.
  const side = offset < 0 ? -1 : 1;
  return {
    x: side * hiddenDist,
    scale: 0.5,
    opacity: 0,
    rotateZ: side * -8,
    filter: "blur(8px) brightness(0.4)",
    zIndex: 10,
  };
}

// Timing per-properti supaya gerakan terbaca dua ketukan, bukan satu campuran:
//   masuk  → geser ke tengah dulu, BARU zoom membesar.
//   keluar → zoom mengecil dulu, BARU geser menjauh.
function cardTransition(isActive: boolean) {
  if (isActive) {
    return {
      x: { duration: 0.6, ease: CAROUSEL_EASE },
      rotateZ: { duration: 0.6, ease: CAROUSEL_EASE },
      opacity: { duration: 0.45, ease: CAROUSEL_EASE },
      filter: { duration: 0.5, delay: 0.3, ease: CAROUSEL_EASE },
      scale: { duration: 0.65, delay: 0.5, ease: CAROUSEL_EASE }, // zoom terakhir
    };
  }
  return {
    scale: { duration: 0.4, ease: CAROUSEL_EASE }, // mengecil dulu
    filter: { duration: 0.45, ease: CAROUSEL_EASE },
    opacity: { duration: 0.5, ease: CAROUSEL_EASE },
    x: { duration: 0.7, delay: 0.25, ease: CAROUSEL_EASE }, // baru menggeser
    rotateZ: { duration: 0.7, delay: 0.25, ease: CAROUSEL_EASE },
  };
}

// Paragraf tetap di kolom kiri (sama untuk semua karakter — bukan lagi teks
// per-karakter). Menjelaskan project "Wardeka Edonisia" secara singkat.
const PROJECT_BLURB =
  "Wardeka Edonisia is Indonesia's first nationally developed eSports shooter, inspired by Indonesian identity and powered by our in-house cloud infrastructure, Delta Garuda. It has been featured in Piala Presiden Esports 2024 and PORPROV XII North Sulawesi 2025.";

// Komponen utama carousel.
export function Project1Carousel() {
  const total = showcases.length; // jumlah karakter
  const [activeIndex, setActiveIndex] = useState(0); // karakter yang sedang di tengah
  const bp = useBreakpoint(); // breakpoint layar saat ini
  // Kartu info hanya tampil saat kursor mendekati area karakter (lihat zona
  // deteksi di JSX) — bukan lagi tampil permanen.
  const [isCharacterHovered, setIsCharacterHovered] = useState(false);
  // Perangkat tanpa hover (layar sentuh): kartu info dibuka lewat TAP, bukan
  // hover. matchMedia dijalankan di client (useEffect) supaya tidak beda
  // antara render server & client.
  const [canHover, setCanHover] = useState(true);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const active = showcases[activeIndex]; // data karakter aktif (teks & warna)

  // Posisi pointer mentah → dihaluskan dengan spring → dipakai untuk efek miring
  // (tilt) karakter aktif saat mouse digerakkan.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.4 });
  const tiltY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.4 });

  // Pindah ke karakter tertentu; index dibungkus agar tidak keluar rentang.
  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  // Tombol berikutnya / sebelumnya.
  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  // Autoplay selalu jalan. Timer di-reset tiap slide berubah, jadi setelah klik
  // manual pengguna dapat satu interval penuh sebelum rotasi otomatis berikutnya.
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, [activeIndex, total]);

  // Dukungan keyboard: panah kiri/kanan berpindah karakter, sama seperti Hero.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Simpan posisi mouse (dinormalkan -0.5..0.5 relatif ke section) untuk tilt.
  const handlePointerMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY]
  );

  // Saat mouse keluar, kembalikan karakter ke posisi tegak (tanpa tilt).
  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section
      className="relative h-dvh w-full overflow-hidden rounded-[28px] border border-white/10 text-white"
      // Sudut terpotong (top-right & bottom-left) — sama persis dengan
      // ProjectShowcaseCard (Project 02/03) supaya border ketiga project
      // konsisten. rounded-[28px] di atas menangani dua sudut lainnya.
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))",
      }}
      aria-roledescription="character carousel"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      {/* Layer 1: SATU warna latar navy gelap, tetap sama untuk semua karakter
          (tidak lagi berganti mengikuti karakter aktif). */}
      <Project1Background />
      {/* Layer 2: atmosfer (glow, ring, partikel) — aksennya kini juga tetap. */}
      <Project1Atmosphere />

      {/* Header section: judul project di kiri, nama Wardeka Edonisia di kanan,
          garis tengah diberi lapisan blur tipis di belakangnya agar "menyala". */}
      <header className="absolute inset-x-0 top-0 z-40 flex items-center gap-3 px-5 pt-6 sm:gap-6 sm:px-12 sm:pt-8 md:px-16">
        <span className="whitespace-nowrap text-sm font-extrabold tracking-tight sm:text-xl">
          Project 01.
        </span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
        <span className="relative h-px flex-1">
          <span className="absolute inset-0 -top-px h-[3px] bg-linear-to-r from-transparent via-sky-300/60 to-transparent blur-[3px]" />
          <span className="absolute inset-0 bg-linear-to-r from-white/50 via-white/60 to-white/10" />
        </span>
        <span className="whitespace-nowrap text-sm font-extrabold tracking-tight sm:text-xl">
          Wardeka Edonisia
        </span>
      </header>

      {/* Panggung karakter: karakter aktif di tengah, tetangga mengapit kiri-kanan.
          Karakter tetap di lapisan paling depan (z-30 lewat cardTarget) —
          di atas seluruh elemen dekoratif (latar, atmosfer, vignette). */}
      <div className="pointer-events-none absolute inset-0">
        {showcases.map((showcase, index) => {
          const offset = relativeOffset(index, activeIndex, total); // posisi relatif
          const target = cardTarget(offset, bp); // target visualnya
          const isActive = offset === 0;
          return (
            <motion.div
              key={showcase.id}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              style={{ perspective: 1200, zIndex: target.zIndex }}
              // Positioner ini yang menganimasikan geser/zoom/blur tiap kartu.
              animate={{
                x: target.x,
                scale: target.scale,
                opacity: target.opacity,
                rotateZ: target.rotateZ,
                filter: target.filter,
              }}
              transition={cardTransition(isActive)}
            >
              <Project1Character
                showcase={showcase}
                active={isActive}
                reduced={bp === "mobile"} // HP → float dimatikan (ringan)
                priority={index <= 1} // dua gambar pertama dimuat lebih awal
                tiltX={tiltX}
                tiltY={tiltY}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Zona deteksi proximity: transparan, diletakkan pas di area karakter
          (skala mengikuti box karakter aktif per breakpoint). Hover di sini
          yang memicu munculnya kartu info — karakter sendiri tidak menerima
          pointer event karena stage-nya "pointer-events-none" di atas. */}
      <div className="absolute inset-0 z-32 grid place-items-center">
        <div
          className="pointer-events-auto h-[45vh] w-[45vh] sm:h-[56vh] sm:w-[56vh] lg:h-[64vh] lg:w-[64vh]"
          onMouseEnter={() => canHover && setIsCharacterHovered(true)}
          onMouseLeave={() => canHover && setIsCharacterHovered(false)}
          // Di layar sentuh: tap karakter untuk buka/tutup kartu info.
          onClick={() => !canHover && setIsCharacterHovered((v) => !v)}
        />
      </div>

      {/* Kartu info kaca (glass) mengambang dekat bahu karakter aktif — muncul
          hanya saat kursor mendekat (lihat zona di atas), fade + sedikit scale.
          AnimatePresence sendiri supaya tidak tercampur animasi blok kiri-bawah. */}
      <AnimatePresence>
        {isCharacterHovered && (
          <Project1InfoCard key={active.id} fullName={active.fullName} faction={active.faction} />
        )}
      </AnimatePresence>

      {/* Vignette gelap di tepi (di atas karakter) untuk kedalaman sinematik —
          sedikit lebih lembut dari sebelumnya ("soft vignette" pada desain baru). */}
      <div
        className="pointer-events-none absolute inset-0 z-35"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Kolom konten kiri-bawah: satu paragraf tetap tentang project (sama
          untuk semua karakter — nama/fraksi/CTA per-karakter sudah dipindah
          ke kartu info hover). Ditempatkan di bawah kiri (bukan center)
          supaya tidak pernah menimpa badan/kaki karakter yang berdiri di
          tengah, dengan lebar dibatasi (max-w-110) untuk jaga jarak aman. */}
      <div className="pointer-events-none relative z-40 flex h-full w-full items-end pb-10 pl-16 pr-5 sm:pb-28 sm:pl-24 sm:pr-12 md:max-w-md md:pb-20 md:pl-28 md:pr-16">
        <motion.p
          className="pointer-events-auto max-w-110 text-xs font-medium leading-[1.7] text-white sm:text-lg sm:leading-[1.8]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: CAROUSEL_EASE }}
        >
          {PROJECT_BLURB}
        </motion.p>
      </div>

      {/* Bawah-kanan sengaja dibiarkan kosong/bersih — tidak ada placeholder
          apa pun di area ini, sesuai desain baru. */}

      {/* Tombol panah kiri: mundur ke karakter sebelumnya. */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous character"
        className="absolute left-4 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110 hover:bg-white/10 active:scale-95 sm:left-8"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Tombol panah kanan: maju ke karakter berikutnya. */}
      <button
        type="button"
        onClick={next}
        aria-label="Next character"
        className="absolute right-4 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110 hover:bg-white/10 active:scale-95 sm:right-8"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Indikator titik di tengah bawah, menandai karakter yang sedang aktif.
          Disembunyikan di HP (hidden sm:flex) supaya tidak menutupi karakter —
          navigasi tetap bisa lewat tombol panah kiri/kanan. */}
      <div className="absolute inset-x-0 bottom-8 z-40 hidden justify-center sm:bottom-10 sm:flex">
        <Project1Pagination showcases={showcases} activeIndex={activeIndex} onSelect={goTo} />
      </div>
    </section>
  );
}
