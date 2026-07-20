// Project1Background.tsx
// Layer paling belakang section: SATU warna latar navy gelap yang tetap sama
// untuk semua karakter (sebelumnya berganti mengikuti karakter aktif — itu
// sudah dihapus sepenuhnya sesuai desain baru). Gradasi dua-stop yang dipakai
// hanya untuk kedalaman halus, bukan variasi warna per-karakter. Ditambah dua
// overlay tekstur (cahaya lembut dan noise) supaya latar tidak terlihat datar.
//
// CATATAN: overlay "jembatan" ke About Section (biru muda→navy) yang dulu ada
// di sini sudah dihapus — sekarang section ini duduk di dalam kartu bersudut
// terpotong yang dikelilingi latar putih (lihat ProjectsSection.tsx), jadi
// transisinya bukan lagi dua warna latar yang bertemu langsung.

export function Project1Background() {
  return (
    <div className="absolute inset-0 bg-linear-to-b from-[#0A1424] via-[#0B1830] to-[#081120]">
      {/* Overlay 1: gradasi radial (highlight & shadow) untuk kesan volume. */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.10), transparent 45%), radial-gradient(circle at 80% 75%, rgba(0,0,0,0.35), transparent 50%)",
        }}
      />
      {/* Overlay 2: noise halus (SVG turbulence) agar warna terasa bertekstur. */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
