// project.ts
// Tipe data untuk kartu "Project 02", "Project 03", dst. — berbeda dari
// Showcase (karakter Project 01) karena kartu-kartu ini punya galeri gambar
// (bukan satu gambar tetap) dan kartu info dengan field bebas (bukan
// name/faction yang tetap).

export interface ProjectInfoField {
  label: string; // contoh: "Phase", "Platform", "Genre"
  value: string; // contoh: "Launch Site", "PC & VR", "FPS Mobile"
}

export interface ProjectShowcase {
  id: number;
  index: string; // "02", "03" — dipakai di judul "Project {index}."
  name: string; // nama project, contoh: "Nusa Space"
  description: string;
  images: string[]; // galeri untuk carousel; boleh berisi 1 gambar saja
  infoTitle: string; // judul kartu info, contoh: "Mission Info"
  infoFields: ProjectInfoField[];
}
