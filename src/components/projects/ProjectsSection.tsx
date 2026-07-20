// ProjectsSection.tsx
// Titik masuk tunggal untuk Project 01, 02, dan 03. Ketiganya dulu terpecah
// jadi dua section terpisah (Project1Section sendiri, lalu ProjectGallerySection
// untuk 02/03) dengan latar gelap berbeda-beda — border/rounded-corner Project 01
// jadi tidak konsisten dengan 02/03 (Project 01 dulu edge-to-edge tanpa border
// sama sekali). Sekarang ketiganya duduk di section TRANSPARAN (latar diwarisi
// dari gradient kontinu di page.tsx) dengan jarak vertikal yang sama persis,
// masing-masing sebagai kartu bersudut terpotong (rounded + clip-path) yang
// seragam — warna navy/biru pekat cuma ada DI DALAM tiap kartu.

import { Project1Section } from "@/components/project1/Project1Section";
import { Project2Section } from "./Project2Section";
import { Project3Section } from "./Project3Section";

export function ProjectsSection() {
  return (
    <section
      id="project"
      className="w-full px-6 sm:px-10 lg:px-16"
      aria-label="Projects"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:gap-12 lg:gap-16">
        <Project1Section />
        <Project2Section />
        <Project3Section />
      </div>
    </section>
  );
}
