// aboutGallery.ts (data)
// Tujuh foto kolase section About, dalam urutan tetap yang cocok dengan posisi
// grid hand-crafted di AboutGallery.tsx (index 0 = landscape besar, index 1 =
// potret, index 2-3 = pasangan kecil bertumpuk, index 4-6 = tiga foto medium).
// Foto asli ada di /public/characters/about1..7.svg. `gradient` dipertahankan
// hanya sebagai warna latar sementara di balik foto saat masih dimuat.

import type { AboutPhoto } from "@/types/aboutPhoto";

export const aboutGalleryPhotos: AboutPhoto[] = [
  {
    id: 1,
    alt: "Kawanua Virtual Teknologi — dokumentasi 1",
    src: "/characters/about1.svg",
    gradient: "linear-gradient(135deg, #274472 0%, #1e6fd9 100%)",
  },
  {
    id: 2,
    alt: "Kawanua Virtual Teknologi — dokumentasi 2",
    src: "/characters/about2.svg",
    gradient: "linear-gradient(160deg, #0b4ea2 0%, #4a86d4 100%)",
  },
  {
    id: 3,
    alt: "Kawanua Virtual Teknologi — dokumentasi 3",
    src: "/characters/about3.svg",
    gradient: "linear-gradient(135deg, #5b93d6 0%, #cfe3f8 100%)",
  },
  {
    id: 4,
    alt: "Kawanua Virtual Teknologi — dokumentasi 4",
    src: "/characters/about4.svg",
    gradient: "linear-gradient(135deg, #16304f 0%, #2f5680 100%)",
  },
  {
    id: 5,
    alt: "Kawanua Virtual Teknologi — dokumentasi 5",
    src: "/characters/about5.svg",
    gradient: "linear-gradient(135deg, #1e6fd9 0%, #8fc1f0 100%)",
  },
  {
    id: 6,
    alt: "Kawanua Virtual Teknologi — dokumentasi 6",
    src: "/characters/about6.svg",
    gradient: "linear-gradient(135deg, #0b1b33 0%, #274472 100%)",
  },
  {
    id: 7,
    alt: "Kawanua Virtual Teknologi — dokumentasi 7",
    src: "/characters/about7.svg",
    gradient: "linear-gradient(135deg, #3b7bd4 0%, #a9cdf2 100%)",
  },
];
