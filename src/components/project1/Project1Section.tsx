// Project1Section.tsx
// Titik masuk (entry point) untuk section "Project 01" di landing page.
// Section ini hanya membungkus carousel karakter interaktif. page.tsx me-render
// komponen inilah, bukan langsung carousel-nya, supaya struktur section rapi.

import { Project1Carousel } from "./Project1Carousel";

// Komponen publik section. Sengaja tipis: semua logika ada di Project1Carousel.
export function Project1Section() {
  return <Project1Carousel />;
}
