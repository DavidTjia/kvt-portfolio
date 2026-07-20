// recognition.ts
// Tipe data untuk kartu penghargaan di section Recognition.

export interface Recognition {
  id: number;
  index: string; // "01".."05" — nomor besar di pojok kiri-atas kartu
  title: string;
}
