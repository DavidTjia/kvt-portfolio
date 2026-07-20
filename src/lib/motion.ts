// motion.ts
// Konstanta animasi bersama untuk scroll-reveal antar-section. Dikumpulkan di
// satu tempat supaya SEMUA section masuk dengan ritme yang sama persis —
// itulah yang membuat perpindahan antar-section terasa mulus & konsisten,
// bukan tiap section pakai easing/timing sendiri-sendiri.

// easeOutExpo: melaju cepat lalu mendarat sangat lembut. Untuk reveal fade-up,
// kurva ease-out seperti ini terasa jauh lebih halus daripada easing inOut
// (yang lambat di awal sehingga terkesan "berat" saat elemen mulai muncul).
export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

// Durasi baku reveal (detik). Sedikit lebih panjang = gerakannya sempat
// "bernapas", tidak menyentak.
export const REVEAL_DURATION = 0.8;

// Preset lengkap untuk elemen tunggal yang fade-up saat masuk viewport.
// Dipakai lewat spread: <motion.div {...revealUp()} />. `amount: 0.2` memicu
// sedikit lebih awal (sebelum elemen sepenuhnya terlihat) sehingga tidak
// pernah "pop" mendadak di tepi bawah layar.
//
// once: false → animasi DIPUTAR ULANG setiap kali elemen masuk viewport lagi
// (mis. scroll ke bawah lalu balik ke atas), bukan sekali seumur halaman.
// Karena `initial` diset, Framer otomatis mengembalikan elemen ke keadaan
// tersembunyi saat keluar viewport, siap tampil lagi saat masuk kembali.
export function revealUp(delay = 0, y = 28) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay },
  };
}
