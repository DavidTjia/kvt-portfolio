// aboutPhoto.ts (types)
// Tipe data satu foto di kolase section About. `src` adalah foto asli;
// `gradient` tetap dipakai sebagai warna latar sementara di belakang foto
// (terlihat sekejap saat foto masih dimuat) agar ubin tidak berkedip kosong.

export interface AboutPhoto {
  id: number; // id unik, dipakai sebagai key React
  alt: string; // deskripsi foto untuk aksesibilitas
  src: string; // path foto di /public
  gradient: string; // warna latar sementara (linear-gradient(...)) di balik foto
}
