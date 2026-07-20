// FooterBrand.tsx
// Kolom kiri footer: logo, tagline brand singkat, alamat kantor (dengan ikon
// pin), dan dua pill kontak (telepon & email) yang kini beri­kon. Tidak perlu
// "use client" — semua interaksi (hover) murni CSS.

import Image from "next/image";

// Ikon garis sederhana (gaya Feather: stroke, tebal 2, ujung membulat) —
// konsisten dengan ikon panah yang dipakai di carousel/section lain.

// Ikon telepon.
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ikon amplop/email.
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="m2 7 10 6 10-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ikon pin lokasi untuk alamat.
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-kvt-blue">
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

interface ContactPillProps {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

// Pill kontak (WhatsApp/email): ikon + label + nilai, hover terisi biru.
// Link http eksternal (mis. WhatsApp) dibuka di tab baru; mailto/tel tidak.
function ContactPill({ label, value, href, icon }: ContactPillProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2.5 rounded-full border border-kvt-blue/45 px-5 py-2.5 text-sm text-kvt-ink transition-[background-color,color,border-color,box-shadow] duration-300 hover:border-kvt-blue hover:bg-kvt-blue hover:text-white hover:shadow-[0_10px_24px_-10px_rgba(30,111,217,0.7)]"
    >
      <span className="text-kvt-blue transition-colors duration-300 group-hover:text-white">
        {icon}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60">{label}</span>
        <span className="font-medium">{value}</span>
      </span>
    </a>
  );
}

// Kolom kiri footer: logo, tagline, alamat, dua pill kontak.
export function FooterBrand() {
  return (
    <div className="flex flex-col items-center gap-5 sm:items-start">
      {/* Logo. Kotak tetap + object-contain, sama seperti HeroNavbar.tsx. */}
      <div className="relative h-9 w-30 sm:h-10 sm:w-33.75">
        <Image
          src="/characters/kvtLogo.png"
          alt="Kawanua Virtual Teknologi"
          fill
          className="object-contain object-left"
          sizes="135px"
        />
      </div>

      {/* Tagline brand singkat — mengisi kolom kiri & memberi konteks studio. */}
      <p className="max-w-xs text-sm leading-relaxed text-kvt-muted">
        Crafting immersive digital experiences and homegrown technology from
        Manado to the world.
      </p>

      {/* Alamat dengan ikon pin sejajar baris pertama. */}
      <div className="flex items-start gap-2.5 text-sm leading-relaxed text-kvt-muted">
        <PinIcon />
        <div className="flex flex-col gap-2.5">
          <p>Gedung Graha Pena, Lt. 6</p>
          <p>
            Jalan Babe Palar No. 62,
            <br />
            Tanjung Batu,
            <br />
            Kec. Wanea
          </p>
          <p>
            Kota Manado,
            <br />
            Sulawesi Utara 95115
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
        <ContactPill
          label="WhatsApp"
          value="(+62) 878 1940 9980"
          href="https://wa.me/6287819409980"
          icon={<PhoneIcon />}
        />
        <ContactPill
          label="Email"
          value="admin@bigdade.id"
          href="mailto:admin@bigdade.id"
          icon={<MailIcon />}
        />
      </div>
    </div>
  );
}
