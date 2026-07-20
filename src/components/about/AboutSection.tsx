// AboutSection.tsx
// Titik masuk (entry point) section About — TRANSPARAN; latarnya diwarisi dari
// gradient kontinu satu-pembungkus di page.tsx (putih→#EAF6FF) bersama Projects,
// Recognition, dan Footer, jadi tidak ada garis batas warna antar-section.
// Tepat di bawah Hero. Server component murni (hanya komposisi/layout); semua
// animasi scroll-reveal ada di komponen anak yang memakai Framer Motion.

import { AboutHeading } from "./AboutHeading";
import { AboutGallery } from "./AboutGallery";
import { AboutGalleryMobile } from "./AboutGalleryMobile";
import { AboutBrandBadge } from "./AboutBrandBadge";
import { AboutClosingCard } from "./AboutClosingCard";

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full px-6 sm:px-10 lg:px-16"
      aria-label="About Kawanua Virtual Teknologi"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-12 lg:gap-14">
        <AboutHeading />
        {/* Filmstrip geser-samping untuk HP; mosaik untuk tablet & desktop.
            Masing-masing menyembunyikan diri di rentang layar yang bukan
            miliknya (AboutGalleryMobile = md:hidden, AboutGallery = hidden
            md:grid), jadi hanya satu yang tampil pada satu waktu. */}
        <div className="md:hidden">
          <AboutGalleryMobile />
        </div>
        <AboutGallery />
        <AboutBrandBadge />
        <AboutClosingCard />
      </div>
    </section>
  );
}
