// projects.ts
// Data untuk kartu "Project 02" dan "Project 03" di bawah Project 01.
// `images` sengaja berupa array (bukan satu string) walau saat ini baru ada
// satu gambar per project — ProjectGalleryCarousel sudah mendukung banyak
// gambar, jadi tinggal tambahkan path baru ke array ini kalau asetnya sudah
// tersedia, carousel otomatis menampilkan navigasi/pagination-nya.

import type { ProjectShowcase } from "@/types/project";

export const projects: ProjectShowcase[] = [
  {
    id: 1,
    index: "02",
    name: "Nusa Space",
    description:
      "Interactive Learning Nusa Space is a 3D educational simulation that guides users through space exploration—from launch to the International Space Station. Available for PC and VR, it combines immersive navigation, object inspection, and interactive quizzes to create an engaging learning experience",
    images: ["/characters/Nusa.png"],
    infoTitle: "Mission Info",
    infoFields: [
      { label: "Phase", value: "Launch Site" },
      { label: "Platform", value: "PC & VR" },
    ],
  },
  {
    id: 2,
    index: "03",
    name: "Manguni Squad",
    description:
      "Manguni Squad is a first-person shooter mobile game inspired by Indonesian heritage. Players follow Toar, a former professional gamer turned police recruit, through tactical missions across iconic Indonesian locations",
    images: ["/characters/manguniSquad.png"],
    infoTitle: "Game Info",
    infoFields: [
      { label: "Genre", value: "FPS Mobile" },
      { label: "Platform", value: "Android" },
    ],
  },
];
