// HeroServicesBar.tsx
// Strip biru gelap di bagian paling bawah Hero, berisi ringkasan layanan studio.
// Selain menutup layar pertama, strip ini juga menyembunyikan bagian bawah
// maskot — itulah yang membuat maskot tampak ter-crop rapi seperti di referensi.

interface HeroServicesBarProps {
  edge: string; // kelas padding tepi, disamakan dengan elemen Hero lainnya
}

// Daftar layanan yang ditampilkan, dipisahkan titik tengah.
const SERVICES = [
  "Game Development",
  "Interactive App Development",
  "Mobile Game Development",
  "Simulation & Training Systems",
];

export function HeroServicesBar({ edge }: HeroServicesBarProps) {
  return (
    <div className="relative z-30 shrink-0 bg-linear-to-r from-[#16304f] via-[#1b3a5c] to-[#16304f]">
      <div
        className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-3 ${edge}`}
      >
        {SERVICES.map((service, i) => (
          <span key={service} className="flex items-center gap-3">
            {/* Pemisah titik tengah, tidak ditampilkan sebelum item pertama. */}
            {i > 0 && (
              <span aria-hidden="true" className="text-white/40">
                ·
              </span>
            )}
            <span className="text-[11px] font-bold tracking-tight text-white sm:text-sm">
              {service}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
