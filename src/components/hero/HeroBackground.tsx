// HeroBackground.tsx
// Latar Hero berlapis: gradasi dasar, cahaya ambient biru bertumpuk, sorotan
// putih di belakang maskot, sepasang garis diagonal, dan vignette tipis.
// Semua statis (tanpa state/animasi) sehingga tidak membebani render sama sekali.

// Sudut kemiringan garis (tidak diubah dari sebelumnya — sama seperti referensi).
const ANGLE = "rotate-24";

// Tepat DUA garis: tebal biru gelap + tipis abu-abu 18px di kanannya,
// dijangkarkan dari `left` dan dihitung mundur supaya titik potongnya di
// TINGGI KEPALA maskot (≈y=15% dari atas) jatuh persis di ≈55% lebar section
// — pusat horizontal karakter (wrapper maskot: `lg:left-[10%]` + flex-center
// pada sisa lebar 10-100% → pusat = 55%). `origin-top` mengunci titik ATAS
// garis (di y=-10%, sedikit di atas viewport) diam di `left` yang dipilih;
// rotasi 24° mengayunkan bagian bawah ke kiri seiring y membesar. Dengan
// pivot di 62%, jalur garis kira-kira: y=0% (tinggi navbar) → ~59%, jelas di
// kiri "Home" (~63%); y=15% (tinggi kepala) → ~55%, tepat di pusat karakter;
// y=57% (tinggi kutipan kanan) → ~43%, jauh di kiri kutipan (yang mulai ~70%).
// Jadi garis tetap menempel di belakang karakter dan tidak pernah mendekati
// navigasi, menu Recognition, atau teks kutipan.
const LINES = [
  { key: "thick", left: "62%", width: "w-2.5", from: "from-[#1b3a5c]/90", via: "via-[#1b3a5c]/55" },
  { key: "thin", left: "calc(62% + 18px)", width: "w-0.75", from: "from-[#8ea6c2]/70", via: "via-[#8ea6c2]/40" },
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-linear-to-br from-white via-[#F3F8FF] to-[#EAF6FF]">
      {/* Cahaya ambient biru dari beberapa arah — kedalaman tanpa terlihat ramai.
          Semuanya opacity rendah dan area luas agar terasa sangat halus. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(45% 50% at 86% 4%, rgba(96,152,214,0.30), transparent 72%)",
            "radial-gradient(40% 45% at 6% 90%, rgba(96,152,214,0.24), transparent 72%)",
            "radial-gradient(32% 36% at 3% 8%, rgba(140,182,226,0.20), transparent 72%)",
            "radial-gradient(36% 40% at 97% 94%, rgba(120,168,220,0.18), transparent 72%)",
          ].join(", "),
        }}
      />

      {/* Sorotan putih lembut di belakang maskot (sedikit ke kanan, mengikuti
          posisi maskot) agar siluetnya terbaca jelas dari latar. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(44% 56% at 55% 52%, rgba(255,255,255,0.95), rgba(255,255,255,0.5) 45%, transparent 74%)",
        }}
      />

      {/* Sepasang garis diagonal, di belakang maskot (layer ini sendiri tidak
          punya z-index, jadi otomatis berada di bawah maskot z-10 dan navbar
          z-30 — urutan tumpuk sudah benar tanpa perlu diatur lagi di sini).
          origin-top mengunci titik atas tiap garis persis di posisi `left`
          yang dipilih; garis lalu terus ke bawah melewati tepi viewport. */}
      <div className="absolute inset-0">
        {LINES.map((line) => (
          <div
            key={line.key}
            className={`absolute top-[-10%] h-[150%] origin-top ${line.width} ${ANGLE} bg-linear-to-b ${line.from} ${line.via} to-transparent`}
            style={{ left: line.left }}
          />
        ))}
      </div>

      {/* Dua glow biru besar & sangat kabur di belakang maskot (ambient light).
          blur statis — tidak dianimasikan, jadi tidak membebani compositor. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[6%] left-[55%] h-[62%] w-[52dvh] -translate-x-1/2 rounded-full bg-[#5b93d6]/20 blur-[120px]" />
        <div className="absolute bottom-[2%] left-[55%] h-[34%] w-[70dvh] -translate-x-1/2 rounded-full bg-[#4a86d4]/14 blur-[90px]" />
      </div>

      {/* Vignette sangat tipis: menggelapkan sudut sedikit agar fokus ke tengah. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(78% 78% at 52% 46%, transparent 56%, rgba(11,27,51,0.09) 100%)",
        }}
      />
    </div>
  );
}
