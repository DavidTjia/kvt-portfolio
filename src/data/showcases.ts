// showcases.ts (data)
// Sumber data karakter untuk carousel Project 01. Carousel menyesuaikan diri
// dengan panjang array ini (jumlah titik indikator, autoplay, dan logika
// tetangga semua ikut otomatis). Tiap entri butuh gambar PNG di
// /public/characters (artwork sebaiknya sudah ter-crop rapat & seragam).
// Catatan: tidak ada lagi `backgroundColor` di sini — latar section sekarang
// tetap (satu warna navy gelap untuk semua karakter), lihat Project1Background.tsx.

import type { Showcase } from "@/types/showcase";

export const showcases: Showcase[] = [
  {
    id: 1,
    name: "WARANEY",
    title: "Maverick Vanguard",
    description:
      "A frontline demolition specialist who turns overwhelming firepower into a personal art form. Waraney leads every assault from the front, clearing the path so the rest of the squad can move in behind him.",
    image: "/characters/Waraney.png",
    accentColor: "#CFF0D8",
    ctaLabel: "View character",
    ctaHref: "#waraney",
    fullName: "Waraney Yudha Ratulangi",
    faction: "Maverick",
  },
  {
    id: 2,
    name: "KAIA",
    title: "Frost Sniper",
    description:
      "Patient, precise and unseen — she owns the long range and never misses the decisive shot. Kaia studies a battlefield for hours before taking a single shot, and by the time she fires, the outcome is already decided.",
    image: "/characters/Kaia.png",
    accentColor: "#CFE3F8",
    ctaLabel: "View character",
    ctaHref: "#kaia",
    fullName: "Kaia Hana Lindström",
    faction: "Vanguard",
  },
  {
    id: 3,
    name: "JAKA",
    title: "Crimson Blade",
    description:
      "A close-quarters duelist whose blade moves faster than the eye can follow. Jaka reads an opponent's next move before they've made it, turning every duel into a performance with only one possible ending.",
    image: "/characters/Jaka.png",
    accentColor: "#FBD2CB",
    ctaLabel: "View character",
    ctaHref: "#jaka",
    fullName: "Jaka Arjuna Pradana",
    faction: "Maverick",
  },
  {
    id: 4,
    name: "PINGKAN",
    title: "Neon Brawler",
    description:
      "Street-born and fearless, she swings first and lets the aftermath do the talking. Pingkan trusts instinct over strategy, and in the chaos of a real fight, that instinct has never once let her down.",
    image: "/characters/Pingkan.png",
    accentColor: "#F3CFEE",
    ctaLabel: "View character",
    ctaHref: "#pingkan",
    fullName: "Pingkan Skylari Arangka",
    faction: "Vanguard",
  },
  {
    id: 5,
    name: "AYU",
    title: "Golden Agent",
    description:
      "A quick-draw operative who slips through the shadows and strikes before the alarm sounds. Ayu treats every mission like a puzzle, and by the time anyone notices she was there, she's already gone.",
    image: "/characters/Ayu.png",
    accentColor: "#F5D79E",
    ctaLabel: "View character",
    ctaHref: "#ayu",
    fullName: "Ayu Ratu Kusumastuti",
    faction: "Maverick",
  },
];
