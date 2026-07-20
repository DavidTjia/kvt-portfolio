// layout.tsx
// Root layout aplikasi (App Router). Membungkus semua halaman: memuat font
// Poppins sebagai font global, menetapkan metadata tab browser, dan struktur
// dasar <html>/<body>.

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Muat font Poppins dengan beberapa ketebalan dan ekspos sebagai CSS variable
// (--font-poppins) yang dipakai di globals.css sebagai font utama.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Judul & deskripsi yang muncul di tab browser dan hasil share/SEO.
export const metadata: Metadata = {
  title: "KVT Portfolio",
  description: "Portfolio Kawanua Virtual Teknologi — game, aplikasi interaktif, dan teknologi buatan Manado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
