// HeroNavbar.tsx
// Navbar global yang MENEMPEL DI ATAS (fixed) untuk seluruh halaman, bukan lagi
// bagian dari flow Hero — jadi tetap terlihat saat section apa pun di-scroll.
// Latar: transparan saat di paling atas (di atas Hero), lalu berubah jadi kartu
// kaca (backdrop-blur) begitu halaman di-scroll sedikit, supaya teks tetap
// terbaca di atas section mana pun. Di md ke bawah menu diganti hamburger.

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Padding tepi disamakan dengan elemen Hero lainnya (EDGE di HeroSection).
const EDGE = "px-6 sm:px-10 lg:px-14";

// Daftar menu. "active" menandai halaman yang sedang dibuka (diberi warna biru).
const NAV_LINKS = [
  { label: "Home", href: "#home", active: true },
  { label: "About", href: "#about", active: false },
  { label: "Project", href: "#project", active: false },
  { label: "Recognition", href: "#recognition", active: false },
];

// Navbar fixed dengan menu responsif + latar kaca yang muncul saat scroll.
export function HeroNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Aktifkan latar kaca setelah halaman turun sedikit (>8px); di paling atas
  // navbar dibiarkan transparan agar menyatu dengan Hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${EDGE} ${
        scrolled
          ? "border-b border-white/40 bg-white/70 shadow-[0_6px_20px_-12px_rgba(11,27,51,0.35)] backdrop-blur-md"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {/* Logo. Berkas asli 1600x533 (rasio 3:1), object-contain menjaga rasio. */}
      <a href="#home" className="relative h-9 w-30 shrink-0 sm:h-10 sm:w-33.75">
        <Image
          src="/characters/kvtLogo.png"
          alt="Kawanua Virtual Teknologi"
          fill
          priority
          sizes="135px"
          className="object-contain object-left"
        />
      </a>

      {/* Menu inline — hanya md ke atas. */}
      <div className="hidden items-center gap-10 md:flex lg:gap-16">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`text-sm font-semibold tracking-tight transition-colors duration-200 hover:text-kvt-blue ${
              link.active ? "text-kvt-blue" : "text-kvt-ink"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Tombol hamburger — hanya di bawah md. Ikon berganti garis↔silang. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-full border border-kvt-line bg-white/60 text-kvt-ink backdrop-blur-sm transition-colors duration-200 hover:border-kvt-blue/50 md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {/* Panel dropdown mobile: kartu kaca membulat, muncul di bawah navbar. */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-x-4 top-full z-40 origin-top rounded-2xl border border-white/60 bg-white/80 p-2 shadow-[0_20px_45px_-20px_rgba(11,27,51,0.3)] backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold tracking-tight transition-colors duration-200 hover:bg-kvt-blue/10 ${
                  link.active ? "text-kvt-blue" : "text-kvt-ink"
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
