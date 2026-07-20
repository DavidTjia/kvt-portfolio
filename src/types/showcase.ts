// showcase.ts (types)
// Definisi tipe data satu "karakter" yang tampil di carousel Project 01.
// Dipakai bersama oleh data (showcases.ts) dan komponen-komponen project1.

export interface Showcase {
  id: number; // id unik, dipakai sebagai key React
  name: string; // nama pendek (mis. "WARANEY"), label kecil di atas headline
  title: string; // judul peran/kelas (mis. "Maverick Vanguard")
  description: string; // deskripsi singkat karakter (~4-6 baris saat dirender)
  // Path gambar PNG di folder /public. Semua artwork diasumsikan sudah ter-crop
  // rapat dan seragam (isi mengisi ~90% tinggi kanvas), jadi tidak perlu
  // koreksi skala per-karakter — ukurannya diatur seragam di Project1Character.
  image: string;
  accentColor: string; // aksen kecil (hover tombol CTA) — bukan warna latar section
  ctaLabel: string; // teks tombol CTA
  ctaHref: string; // tujuan tombol CTA
  // Ditampilkan di kartu info kaca (glass card) di dekat bahu karakter.
  fullName: string; // nama lengkap karakter
  faction: string; // fraksi/golongan karakter
}
