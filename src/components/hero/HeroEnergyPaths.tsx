// HeroEnergyPaths.tsx
// Lapisan "jalur energi digital" di latar Hero: garis-garis patah bersudut
// 45°/90° berwarna PUTIH yang nyaris tak terlihat di atas gradasi biru-putih,
// lalu sesekali dilewati pulsa cahaya yang mengalir dari pangkal ke ujung.
// Kesannya teknologi canggih yang bekerja diam-diam — BUKAN motherboard,
// bukan HUD, bukan petir.
//
// Catatan warna: karena putih di atas latar terang, kontrasnya bergantung pada
// seberapa biru latar di titik itu. Di tepi Hero (yang lebih biru) jalurnya
// terbaca samar; tepat di belakang maskot ada sorotan putih 95% dari
// HeroBackground, dan di area itu jalur putih memang MENGHILANG total.
//
// Empat tombol penyetelan kalau efeknya terasa kurang/kelebihan:
//   • padat  → REGIONS[].count
//   • terang → PULSE_LAYERS[].opacity & baseOpacity di walk()
//   • cepat  → speed di walk()
//   • rapat  → delay & pause di walk()
//
// Aturan yang dipegang komponen ini:
//   • Teks nomor satu. Setiap blok teks (navbar, headline, CTA, tagline kanan,
//     dua caption bawah) punya kotak sendiri di FORBIDDEN — generator menolak
//     titik yang jatuh di sana, jadi tidak akan pernah ada pulsa di belakang
//     tulisan. Yang dilindungi TEKSNYA, bukan seluruh kuadran, supaya ruang di
//     sekitarnya tetap bisa terisi.
//   • Sebaran sengaja timpang, terberat di belakang karakter lalu kanan-bawah
//     (lihat REGIONS) — kiri-atas dapat porsi paling kecil.
//   • Jalurnya sendiri TIDAK PERNAH bergerak. Yang bergerak hanya cahayanya.
//
// Pembagian tugas animasi (lihat CLAUDE.md — satu properti CSS hanya boleh
// dipegang satu sistem): GSAP memegang stroke-dashoffset/opacity di dalam SVG,
// Framer Motion memegang transform parallax di div pembungkus. Dua node
// berbeda, dua properti berbeda — tidak pernah rebutan.

"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import gsap from "gsap";

// ---------------------------------------------------------------------------
// Kanvas
// ---------------------------------------------------------------------------

// viewBox 16:9 dengan preserveAspectRatio "slice": gambar diperbesar untuk
// MENUTUP section (bukan dimuat utuh), sehingga sudut 45°/90° tetap presisi —
// kalau memakai "none" gambar akan teregang dan sudutnya rusak.
const VB_W = 1600;
const VB_H = 900;

// Area yang HARUS tetap bersih. Titik jalur yang jatuh di dalam salah satu
// kotak ini ditolak generator.
//
// Kotaknya sengaja dibuat MENGIKUTI BENTUK TEKS, bukan satu blok besar per
// kuadran: versi sebelumnya memblokir seluruh kiri-atas (x<780, y<615) padahal
// teksnya cuma mengisi sebagian, sehingga sudut kiri-atas jadi kosong melompong.
// Dengan kotak ketat begini, jalur bisa menyelinap di celah ATAS headline dan
// di BAWAH tombol CTA — ruangnya terisi tanpa satu pun garis menyentuh teks.
const FORBIDDEN = [
  { x0: -200, y0: -200, x1: 1800, y1: 150 }, // jalur navbar (selebar layar)
  // Kotak headline & CTA berhenti di x=44, tidak sampai ke tepi kiri kanvas:
  // teks baru mulai di x≈72, jadi tersisa pita sempit di margin kiri yang aman
  // dilewati satu-dua jalur vertikal — itu yang mengisi sisi kiri layar.
  { x0: 44, y0: 245, x1: 735, y1: 402 }, // headline "Innovative Solutions / Trusted Results"
  { x0: 44, y0: 424, x1: 352, y1: 502 }, // tombol CTA "Learn more about us"
  { x0: 1165, y0: 445, x1: 1800, y1: 615 }, // tagline kanan ("Every great technology…")
  { x0: 408, y0: 733, x1: 585, y1: 802 }, // caption kiri-bawah ("Est. 2019 / Manado")
  { x0: 1188, y0: 733, x1: 1345, y1: 802 }, // caption kanan-bawah ("Alphonse / Wardeka")
];

// Sebaran jalur. `count` sengaja ditetapkan eksplisit (bukan diundi) supaya
// komposisi 40/30/20/10 benar-benar terjaga, bukan sekadar rata-rata.
// Ini tombol utama untuk "jaringannya kurang padat" — naikkan/turunkan
// keempatnya bersama-sama agar proporsinya tidak melenceng.
const REGIONS = [
  { x0: 640, y0: 170, x1: 1150, y1: 845, count: 8 }, // di belakang karakter (porsi terbesar)
  { x0: 1080, y0: 430, x1: 1575, y1: 870, count: 6 }, // kanan-bawah
  { x0: 560, y0: 340, x1: 1010, y1: 800, count: 4 }, // menjulur ke tengah
  { x0: 45, y0: 645, x1: 445, y1: 870, count: 3 }, // kiri-bawah
  // Kiri-atas: mengisi celah di ATAS headline dan di BAWAH/SAMPING tombol CTA.
  // Kotak region-nya menutupi teks, tapi FORBIDDEN yang memotongnya — jadi
  // jalur di sini otomatis tumbuh mengular di sekitar teks, bukan menembusnya.
  { x0: 8, y0: 158, x1: 705, y1: 610, count: 4 },
  // Pita sempit di antara navbar dan headline (celah paling menganga di
  // tangkapan layar). Kotaknya sengaja pipih supaya titik awalnya PASTI jatuh
  // di situ — kalau ikut region kiri-atas yang tinggi, peluangnya cuma ~19%
  // dan pitanya nyaris tidak pernah kebagian jalur.
  { x0: 20, y0: 162, x1: 700, y1: 240, count: 3 },
];

// Delapan arah berjarak 45°. Belokan = geser indeks ±1 (45°) atau ±2 (90°);
// 0 (lurus terus) dan ±3/4 (balik arah) tidak pernah dipakai, sehingga tiap
// simpul selalu berupa patahan tegas seperti konduit energi.
//
// Nilainya ditulis sebagai konstanta eksak, BUKAN dihitung dengan Math.cos/sin:
// spesifikasi JS tidak mewajibkan trigonometri dibulatkan secara identik antar
// engine, jadi hasilnya bisa beda satu-dua bit terakhir antara Node (server)
// dan browser (klien) — cukup untuk menggeser keputusan blocked() dan memicu
// hydration mismatch. Math.SQRT1_2 nilainya ditetapkan spesifikasi → aman.
const D = Math.SQRT1_2; // √2/2 untuk arah diagonal
const DIRS = [
  { x: 1, y: 0 },
  { x: D, y: D },
  { x: 0, y: 1 },
  { x: -D, y: D },
  { x: -1, y: 0 },
  { x: -D, y: -D },
  { x: 0, y: -1 },
  { x: D, y: -D },
];
const TURNS = [-2, -1, 1, 2, -1, 1]; // ±45° muncul dua kali → belokan landai lebih sering

// Panjang "ekor" pulsa per lapisan (satuan viewBox). Ketiganya berbagi tepi
// DEPAN yang sama, jadi yang terlihat: inti tajam di ujung + halo yang
// memanjang ke belakang — seperti komet, bukan garis penuh yang menyala.
// SATU warna untuk semuanya: putih. Di atas gradasi biru-putih Hero, putih
// tidak pernah terbaca sebagai "garis" — hanya sebagai kilau tipis, persis
// kesan yang diminta. Ganti nilai ini kalau mau balik ke cyan (#22d3ee).
const LINE_COLOR = "#ffffff";

// Putih butuh opacity lebih tinggi daripada warna gelap untuk terbaca di latar
// terang, jadi angkanya lebih besar dari versi cyan — tapi hasil akhirnya
// justru jauh lebih samar karena kontrasnya terhadap latar sangat kecil.
const PULSE_LAYERS = [
  { dash: 118, width: 11, color: LINE_COLOR, opacity: 0.4 }, // halo terluar
  { dash: 70, width: 5, color: LINE_COLOR, opacity: 0.7 }, // badan
  { dash: 26, width: 2.2, color: LINE_COLOR, opacity: 1 }, // inti
];

// Di bawah sm hanya sebagian jalur yang dipasang & dianimasikan (sisanya
// disembunyikan CSS dan tidak dibuatkan timeline sama sekali) — mengikuti pola
// hemat-daya yang sama seperti Project 01 di HP.
const MOBILE_PATH_COUNT = 16;

// ---------------------------------------------------------------------------
// Generator prosedural
// ---------------------------------------------------------------------------

// PRNG ber-seed (mulberry32). WAJIB deterministik: komponen ini ikut dirender
// di server, jadi Math.random akan membuat markup server ≠ klien (hydration
// mismatch). Dengan seed tetap, dua sisi menghasilkan jalur yang identik.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface EnergyNode {
  x: number;
  y: number;
  dist: number; // jarak simpul dari pangkal jalur → dipakai menyalakannya tepat saat pulsa lewat
}

interface EnergyPath {
  d: string;
  length: number; // dihitung analitis dari tiap segmen (tanpa getTotalLength → tanpa baca DOM)
  nodes: EnergyNode[];
  speed: number; // satuan viewBox per detik
  delay: number; // jeda sebelum pulsa pertama
  pause: number; // jeda antar-pengulangan
  baseOpacity: number; // 0.03–0.08 saat diam
}

// Fisher–Yates dengan PRNG ber-seed. WAJIB begini, jangan
// `[...arr].sort(() => rnd() - 0.5)`: urutan & jumlah pemanggilan komparator
// pada Array.prototype.sort bersifat implementation-defined, jadi Node dan
// browser akan mengambil angka acak yang berbeda dari stream yang sama —
// jalurnya jadi tidak sama antara server & klien (hydration mismatch).
// Fisher–Yates selalu menarik tepat n-1 angka dengan urutan yang sama.
function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Semua koordinat dibulatkan ke 1 desimal SAAT DIBUAT (bukan hanya saat
// dicetak), supaya nilai yang dipakai blocked(), atribut `d`, dan posisi
// simpul benar-benar sama persis — sekaligus memangkas ukuran markup.
function r1(v: number) {
  return Math.round(v * 10) / 10;
}

type Rect = { x0: number; y0: number; x1: number; y1: number };

// Uji titik — dipakai untuk memilih titik AWAL jalur.
function blocked(x: number, y: number) {
  if (x < -60 || x > VB_W + 60 || y < -60 || y > VB_H + 60) return true;
  return FORBIDDEN.some((r) => x > r.x0 && x < r.x1 && y > r.y0 && y < r.y1);
}

// Uji RUAS GARIS vs kotak (algoritma clipping Liang–Barsky).
//
// Ini menggantikan cara lama yang cuma mengecek titik ujung + titik tengah:
// segmen panjang bisa MELOMPATI kotak teks dengan ketiga titik itu berada di
// luar, dan garisnya tetap melintas persis di atas tulisan. Pengecekan di sini
// menghitung rentang parameter t ∈ [0,1] tempat ruas berada di dalam kotak —
// kalau rentangnya tidak kosong, berarti memotong.
function segHitsRect(ax: number, ay: number, bx: number, by: number, r: Rect) {
  const dx = bx - ax;
  const dy = by - ay;
  const edges: [number, number][] = [
    [-dx, ax - r.x0],
    [dx, r.x1 - ax],
    [-dy, ay - r.y0],
    [dy, r.y1 - ay],
  ];

  let t0 = 0;
  let t1 = 1;

  for (const [p, q] of edges) {
    if (p === 0) {
      if (q < 0) return false; // sejajar sisi ini dan berada di luarnya
      continue;
    }
    const t = q / p;
    if (p < 0) {
      if (t > t1) return false;
      if (t > t0) t0 = t;
    } else {
      if (t < t0) return false;
      if (t < t1) t1 = t;
    }
  }

  return t0 <= t1;
}

// Satu segmen sah bila ujungnya masih di kanvas DAN seluruh ruasnya tidak
// menyerempet kotak teks mana pun.
function segBlocked(ax: number, ay: number, bx: number, by: number) {
  if (blocked(bx, by)) return true;
  return FORBIDDEN.some((r) => segHitsRect(ax, ay, bx, by, r));
}

// Menyusun satu jalur: jalan acak yang selalu membelok 45°/90°, panjang segmen
// tidak seragam, dan berhenti mendadak bila arah manapun menabrak area
// terlarang — itulah yang membuat tiap jalur unik dan tanpa pola berulang.
function walk(
  rnd: () => number,
  start: { x: number; y: number },
  startDir: number,
  steps: number
): EnergyPath | null {
  const pts = [start];
  let dir = startDir;
  let cur = start;
  let length = 0;
  const nodes: EnergyNode[] = [];

  for (let i = 0; i < steps; i++) {
    // Sebagian segmen sengaja dibuat panjang → ada jalur yang melesat jauh,
    // ada yang pendek-pendek dan patah-patah.
    const seg = rnd() < 0.22 ? 190 + rnd() * 135 : 42 + rnd() * 108;

    // Coba beberapa belokan acak; pakai yang pertama tidak menabrak apa pun.
    const turns = shuffle(TURNS, rnd);
    let next: { x: number; y: number } | null = null;
    let nextDir = dir;

    for (const t of turns) {
      const d = (dir + t + 8) % 8;
      const p = { x: r1(cur.x + DIRS[d].x * seg), y: r1(cur.y + DIRS[d].y * seg) };
      if (!segBlocked(cur.x, cur.y, p.x, p.y)) {
        next = p;
        nextDir = d;
        break;
      }
    }

    if (!next) break; // buntu → jalur berhenti mendadak (dan itu memang diinginkan)

    length += seg;
    cur = next;
    dir = nextDir;
    pts.push(cur);

    // Sebagian kecil simpul diberi titik cahaya; sisanya patahan polos.
    if (rnd() < 0.3) nodes.push({ x: cur.x, y: cur.y, dist: length });
    if (rnd() < 0.07) break; // berhenti lebih awal tanpa alasan → ritme tak terduga
  }

  if (pts.length < 3 || length < 180) return null;

  return {
    d: pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" "),
    length: r1(length),
    nodes,
    speed: 175 + rnd() * 205, // pulsa cepat & lambat bercampur
    delay: rnd() * 4.5, // tidak ada dua jalur yang mulai bersamaan
    pause: 0.6 + rnd() * 3.2, // sebagian menunggu lebih lama sebelum menyala lagi
    baseOpacity: 0.16 + rnd() * 0.14, // 16–30% — terdengar tinggi, tapi ini PUTIH
    // di atas latar yang nyaris putih, jadi hasilnya tetap nyaris tak terlihat
  };
}

function buildPaths(seed: number): EnergyPath[] {
  const rnd = mulberry32(seed);
  const out: EnergyPath[] = [];

  for (const region of REGIONS) {
    let made = 0;
    let guard = 0;

    while (made < region.count && guard++ < 600) {
      const start = {
        x: r1(region.x0 + rnd() * (region.x1 - region.x0)),
        y: r1(region.y0 + rnd() * (region.y1 - region.y0)),
      };
      if (blocked(start.x, start.y)) continue;

      const path = walk(rnd, start, Math.floor(rnd() * 8), 4 + Math.floor(rnd() * 6));
      if (!path) continue;

      out.push(path);
      made++;

      // Sebagian jalur bercabang: anak jalur berangkat dari salah satu simpul
      // induk, tapi punya timing sendiri — jadi cabangnya terlihat menyala
      // terpisah, bukan serentak dengan induknya.
      if (path.nodes.length > 0 && rnd() < 0.38) {
        const from = path.nodes[Math.floor(rnd() * path.nodes.length)];
        const branch = walk(rnd, from, Math.floor(rnd() * 8), 2 + Math.floor(rnd() * 3));
        if (branch) out.push(branch);
      }
    }
  }

  // Acak urutannya supaya subset yang dipakai di HP (MOBILE_PATH_COUNT jalur
  // pertama) tetap tersebar ke semua area, bukan menumpuk di satu region.
  return shuffle(out, rnd);
}

// ---------------------------------------------------------------------------
// Komponen
// ---------------------------------------------------------------------------

interface HeroEnergyPathsProps {
  // Posisi pointer -0.5..0.5 (sudah di-spring di HeroSection) untuk parallax.
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

export function HeroEnergyPaths({ parallaxX, parallaxY }: HeroEnergyPathsProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Seed tetap → jalur yang sama di server & klien, dan sama di tiap kunjungan.
  // Ganti angkanya untuk mengundi komposisi jalur yang benar-benar baru.
  const paths = useMemo(() => buildPaths(0x5eed12), []);

  // Parallax jalur: ±5px, berlawanan arah kursor (latar 2px, karakter 10px —
  // lihat HeroSection) sehingga ketiganya terbaca sebagai tiga kedalaman.
  const x = useTransform(parallaxX, [-0.5, 0.5], [5, -5]);
  const y = useTransform(parallaxY, [-0.5, 0.5], [5, -5]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Hormati "kurangi gerak": jalurnya tetap tampil (statis & samar), pulsanya
    // tidak dijalankan sama sekali.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Di HP hanya sebagian jalur yang dianimasikan — timeline sisanya tidak
    // pernah dibuat, jadi benar-benar nol biaya (bukan sekadar disembunyikan).
    const limit = window.matchMedia("(min-width: 640px)").matches
      ? paths.length
      : MOBILE_PATH_COUNT;

    const ctx = gsap.context(() => {
      paths.slice(0, limit).forEach((path, i) => {
        const group = svg.querySelector<SVGGElement>(`[data-ep="${i}"]`);
        if (!group) return;

        const base = group.querySelector<SVGPathElement>(".ep-base");
        const pulses = group.querySelectorAll<SVGPathElement>(".ep-pulse");
        const nodes = group.querySelectorAll<SVGCircleElement>(".ep-node");

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: path.pause,
          delay: path.delay,
        });

        // Pulsa: satu strip garis putus yang digeser dari sebelum pangkal
        // sampai lewat ujung. Durasi tiap lapisan dinormalkan terhadap
        // (panjang + ekor) agar tepi depannya persis sejajar — itu yang
        // membuatnya terbaca sebagai SATU cahaya, bukan tiga garis beriringan.
        pulses.forEach((el, li) => {
          const dash = PULSE_LAYERS[li].dash;
          tl.fromTo(
            el,
            { strokeDashoffset: dash },
            {
              strokeDashoffset: -path.length,
              duration: (path.length + dash) / path.speed,
              ease: "none",
            },
            0
          );
        });

        // Jalurnya ikut menyala sebentar saat dilewati, lalu meredup pelan —
        // "jejak" inilah yang bikin gerakannya terasa mengalir, bukan menyala-mati.
        if (base) {
          const dur = path.length / path.speed;
          tl.to(base, { opacity: path.baseOpacity * 2.3, duration: dur * 0.3, ease: "sine.out" }, 0);
          tl.to(base, { opacity: path.baseOpacity, duration: dur * 1.15, ease: "sine.inOut" }, dur * 0.34);
        }

        // Simpul menyala TEPAT saat tepi depan pulsa sampai di sana
        // (waktu = jarak / kecepatan), lalu padam perlahan. Sisa waktu: mati.
        nodes.forEach((node, ni) => {
          const at = path.nodes[ni].dist / path.speed;
          tl.to(node, { opacity: 1, duration: 0.14, ease: "sine.out" }, at);
          tl.to(node, { opacity: 0, duration: 1.1, ease: "power2.out" }, at + 0.16);
        });
      });
    }, svg);

    return () => ctx.revert();
  }, [paths]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ x, y }}
    >
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        {paths.map((path, i) => (
          <g
            key={i}
            data-ep={i}
            // Jalur di luar kuota HP tidak ikut dirender di layar kecil.
            className={i >= MOBILE_PATH_COUNT ? "hidden sm:block" : undefined}
          >
            {/* Garis diam. Nyaris tak terlihat sampai pulsa lewat. */}
            <path
              className="ep-base"
              d={path.d}
              stroke={LINE_COLOR}
              strokeWidth={1.3}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={path.baseOpacity}
            />

            {/* Tiga lapis pulsa (halo → badan → inti). strokeDasharray
                `ekor + panjang jalur` menjamin hanya SATU strip yang terlihat;
                offset awal = panjang ekor → strip berada sebelum pangkal,
                jadi tak ada yang tampak sampai GSAP mulai menggesernya. */}
            {PULSE_LAYERS.map((layer, li) => (
              <path
                key={li}
                className="ep-pulse"
                d={path.d}
                stroke={layer.color}
                strokeWidth={layer.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={layer.opacity}
                style={{
                  strokeDasharray: `${layer.dash} ${path.length}`,
                  strokeDashoffset: layer.dash,
                }}
              />
            ))}

            {/* Simpul: sangat kecil, mati secara default. */}
            {path.nodes.map((node, ni) => (
              <circle
                key={ni}
                className="ep-node"
                cx={node.x}
                cy={node.y}
                r={2.4}
                fill={LINE_COLOR}
                opacity={0}
              />
            ))}
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
