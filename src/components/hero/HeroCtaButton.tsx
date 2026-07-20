// HeroCtaButton.tsx
// Tombol ajakan utama di Hero ("Learn more about us"). Bergaya kotak membulat
// dengan latar biru gelap dan teks putih, mengikuti bahasa desain KVT.
// Saat hover: sedikit terangkat, bayangan membesar, dan warnanya sedikit pekat.

interface HeroCtaButtonProps {
  label: string; // teks tombol
  href: string; // tujuan tautan
}

export function HeroCtaButton({ label, href }: HeroCtaButtonProps) {
  return (
    <a
      href={href}
      className={[
        "group relative inline-flex w-fit items-center justify-center overflow-hidden rounded-lg",
        // Sedikit lebih kecil di HP supaya tidak menutupi wajah karakter.
        "bg-[#2f5680] px-5 py-2.5 text-[13px] font-medium text-white sm:px-6 sm:py-3 sm:text-sm",
        // Bayangan lembut berlapis agar tombol terasa mengambang, bukan datar.
        "shadow-[0_6px_16px_-4px_rgba(11,27,51,0.35),0_2px_5px_-2px_rgba(11,27,51,0.25)]",
        // Hanya transform, warna, dan bayangan yang dianimasikan → tetap 60fps.
        "transition-[transform,background-color,box-shadow] duration-300 ease-out",
        // Hover: terangkat sedikit + bayangan lebih dalam.
        "hover:-translate-y-0.5 hover:bg-[#1b3a5c]",
        "hover:shadow-[0_12px_24px_-6px_rgba(11,27,51,0.45),0_4px_8px_-3px_rgba(11,27,51,0.3)]",
        // Klik: kembali menekan ke bawah.
        "active:translate-y-0 active:shadow-[0_4px_10px_-4px_rgba(11,27,51,0.35)]",
      ].join(" ")}
    >
      {/* Kilau tipis yang melintas saat hover — sentuhan premium yang halus. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{label}</span>
    </a>
  );
}
