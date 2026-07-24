"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const EDGE = "px-6 sm:px-10 lg:px-14";

const NAV_LINKS = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Project", href: "/#project", section: "project" },
  { label: "Recognition", href: "/#recognition", section: "recognition" },
];

type NavbarVariant = "dark" | "light";

interface NavbarStyles {
  scrolledBar: string;
  link: string;
  linkActive: string;
  burger: string;
  panel: string;
  panelLink: string;
}

const DARK_STYLES: NavbarStyles = {
  scrolledBar:
    "border-b border-white/40 bg-white/70 shadow-[0_6px_20px_-12px_rgba(11,27,51,0.35)] backdrop-blur-md",
  link: "text-kvt-ink hover:text-kvt-blue",
  linkActive: "text-kvt-blue",
  burger: "border-kvt-line bg-white/60 text-kvt-ink hover:border-kvt-blue/50",
  panel: "border-white/60 bg-white/80 shadow-[0_20px_45px_-20px_rgba(11,27,51,0.3)]",
  panelLink: "hover:bg-kvt-blue/10",
};

const VARIANT_STYLES: Record<NavbarVariant, NavbarStyles> = {
  dark: DARK_STYLES,

  light: { ...DARK_STYLES, scrolledBar: "bg-transparent" },
};

interface HeroNavbarProps {
  variant?: NavbarVariant;
}

export function HeroNavbar({ variant = "dark" }: HeroNavbarProps) {
  const s = VARIANT_STYLES[variant];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const activeSection = pathname.startsWith("/projects") ? "project" : "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${EDGE} ${
        scrolled ? s.scrolledBar : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <Link href="/#home" className="relative h-9 w-30 shrink-0 sm:h-10 sm:w-33.75">
        <Image
          src="/brand/kvt-logo.png"
          alt="Kawanua Virtual Teknologi"
          fill
          priority
          sizes="135px"
          className="object-contain object-left"
        />
      </Link>
      <div className="hidden items-center gap-10 md:flex lg:gap-16">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
              link.section === activeSection ? s.linkActive : s.link
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        className={`grid h-10 w-10 place-items-center rounded-full border backdrop-blur-sm transition-colors duration-200 md:hidden ${s.burger}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`absolute inset-x-4 top-full z-40 origin-top rounded-2xl border p-2 backdrop-blur-md md:hidden ${s.panel}`}
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
                className={`block rounded-xl px-4 py-3 text-sm font-semibold tracking-tight transition-colors duration-200 ${s.panelLink} ${
                  link.section === activeSection ? s.linkActive : s.link
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
