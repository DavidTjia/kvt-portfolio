// page.tsx
// Halaman utama ("/"). Susunan section dari atas ke bawah:
//   1. Hero        — perkenalan landing (layar pertama), id="home"
//   2. About       — cerita studio + kolase foto, id="about"
//   3. Projects    — Project 01 (carousel karakter Wardeka Edonisia), 02 (Nusa
//      Space), dan 03 (Manguni Squad) — satu latar gradasi, tiga kartu navy
//      bersudut terpotong yang seragam (lihat ProjectsSection.tsx), id="project"
//   4. Recognition — grid penghargaan + satu kartu dekoratif logo KVT,
//      id="recognition"
//   5. Footer      — kartu kaca (logo, alamat, kontak, navigasi, copyright)
// Navbar dirender di paling atas sebagai elemen FIXED global (menempel di atas
// di semua section), bukan bagian dari Hero — lihat HeroNavbar.tsx.

import { HeroNavbar } from "@/components/hero/HeroNavbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { RecognitionSection } from "@/components/recognition/RecognitionSection";
import { FooterSection } from "@/components/footer/FooterSection";

export default function Home() {
  return (
    <>
      <HeroNavbar />
      <HeroSection />
      {/* Semua section di bawah Hero transparan — latar biru-putihnya berasal
          dari SATU gradient fixed di body (lihat globals.css), sehingga
          seluruh halaman memakai satu latar yang sama tanpa garis batas.
          Jarak antar-section dikontrol TERPUSAT di sini: gap-5.5 memberi
          tepat 22px di antara setiap section (dan pt/pb-5.5 untuk jarak ke
          Hero di atas & tepi bawah halaman). Tiap section sendiri tidak lagi
          punya padding vertikal — supaya jaraknya konsisten & mudah diatur. */}
      <div className="flex flex-col gap-5.5 pt-5.5 pb-5.5">
        <AboutSection />
        <ProjectsSection />
        <RecognitionSection />
        <FooterSection />
      </div>
    </>
  );
}
