// RecognitionSection.tsx
// Titik masuk section Recognition — TRANSPARAN; latarnya diwarisi dari gradient
// kontinu di page.tsx (tanpa garis batas dengan Projects/Footer). Ditempatkan
// tepat di bawah Projects. `id="recognition"` dipakai oleh link "Recognition"
// di HeroNavbar.tsx untuk scroll ke sini.
//
// Grid 3 kolom x 2 baris: 01, 02, [kartu spesial dekoratif], 03, 04, 05 —
// urutan DOM ini sekaligus urutan animasi scroll-reveal (delay bertingkat).
// Ditutup RecognitionCta (headline ajakan + tombol) di bagian paling bawah.

import { RecognitionHeading } from "./RecognitionHeading";
import { RecognitionCard } from "./RecognitionCard";
import { RecognitionSpecialCard } from "./RecognitionSpecialCard";
import { RecognitionCta } from "./RecognitionCta";
import { recognitions } from "@/data/recognitions";

const STAGGER_STEP = 0.1; // jeda antar kartu (detik)

export function RecognitionSection() {
  return (
    <section
      id="recognition"
      className="relative w-full overflow-hidden px-6 pt-3.5 pb-3.5 sm:px-10 lg:px-16"
      aria-label="Recognition"
    >
      {/* Cahaya biru lembut mengambang — bahasa visual yang sama dengan
          Hero/About, sekaligus melembutkan pergantian dari section Projects
          di atasnya. Statis (tidak dianimasikan) supaya ringan, sama seperti
          pilihan yang sama di HeroBackground.tsx. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#8CD5FF]/40 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-[#5b93d6]/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-[#8CD5FF]/30 blur-3xl" />
        <div className="absolute -top-16 right-1/4 h-56 w-56 rounded-full bg-[#4a86d4]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-14 sm:gap-16">
        <RecognitionHeading />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RecognitionCard recognition={recognitions[0]} delay={0 * STAGGER_STEP} />
          <RecognitionCard recognition={recognitions[1]} delay={1 * STAGGER_STEP} />
          <RecognitionSpecialCard delay={2 * STAGGER_STEP} />
          <RecognitionCard recognition={recognitions[2]} delay={3 * STAGGER_STEP} />
          <RecognitionCard recognition={recognitions[3]} delay={4 * STAGGER_STEP} />
          <RecognitionCard recognition={recognitions[4]} delay={5 * STAGGER_STEP} />
        </div>

        <RecognitionCta />
      </div>
    </section>
  );
}
