// FooterSection.tsx
// Titik masuk section Footer — TRANSPARAN; latarnya diwarisi dari gradient
// kontinu di page.tsx (ujung bawahnya ≈#EAF6FF), jadi tidak ada jahitan warna
// dengan Recognition di atasnya. Partikel di belakang kartu kaca sengaja
// sangat redup (opacity rendah) dan sedikit jumlahnya — dekorasi minimal,
// bukan titik fokus.
//
// PENTING untuk efek glassmorphism di FooterGlassCard.tsx: glow di bawah ini
// sengaja dibuat BESAR, cukup pekat, dan diposisikan tepat di BELAKANG area
// kartu (bukan cuma nongol di pojok section) — backdrop-blur pada kartu kaca
// tidak akan terlihat seperti kaca sama sekali kalau tidak ada apa pun yang
// "diblur" tepat di baliknya.

import { FooterGlassCard } from "./FooterGlassCard";

// Sama seperti pola PARTICLES di Project1Atmosphere/RecognitionSpecialCard:
// formula berbasis index (bukan Math.random) supaya markup server & client
// identik. Ditulis ulang di sini (bukan di-import) supaya footer tetap
// berdiri sendiri.
const PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const r1 = ((i * 9301 + 49297) % 233280) / 233280;
  const r2 = ((i * 4523 + 12345) % 65537) / 65537;
  const r3 = ((i * 7919 + 104729) % 99991) / 99991;
  return {
    left: r1 * 100,
    top: r2 * 100,
    size: 2 + r3 * 2,
    delay: r3 * 7,
    duration: 8 + r1 * 6,
  };
});

export function FooterSection() {
  return (
    <footer
      className="relative w-full overflow-hidden px-6 sm:px-10 lg:px-16"
      aria-label="Footer"
    >
      {/* Lapisan dekoratif: sorotan putih tipis di atas, glow biru mengambang,
          dan partikel sangat redup — semua statis (tidak dianimasikan lewat
          transform besar) kecuali partikel yang memakai keyframes CSS ringan. */}
      <div className="pointer-events-none absolute inset-0">
        {/* Glow besar tepat di tengah, di belakang kartu — ini yang bikin
            backdrop-blur kartu terbaca sebagai kaca, bukan kotak putih datar. */}
        <div className="absolute left-1/2 top-1/2 h-140 w-140 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5b93d6]/45 blur-3xl" />
        <div className="absolute left-[15%] top-[20%] h-96 w-96 rounded-full bg-[#8CD5FF]/55 blur-3xl" />
        <div className="absolute right-[12%] top-[55%] h-100 w-100 rounded-full bg-kvt-blue/35 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#5b93d6]/25 blur-3xl" />
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#4a86d4]/25 blur-3xl" />

        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/25"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animation: `recognition-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-350">
        <FooterGlassCard />
      </div>
    </footer>
  );
}
