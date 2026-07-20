// RecognitionCta.tsx
// Penutup section Recognition: headline ajakan, subteks singkat, dan tombol
// "Start a Project" — bagian ini ada di referensi awal tapi belum pernah
// dibuat sampai sekarang. Fade-up sekali saat masuk viewport, sama seperti
// pola scroll-reveal lain di situs ini.

"use client";

import { motion } from "framer-motion";
import { RecognitionCtaButton } from "./RecognitionCtaButton";
import { revealUp } from "@/lib/motion";

export function RecognitionCta() {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 text-center"
      {...revealUp()}
    >
      <h2 className="text-3xl font-extrabold leading-[1.16] tracking-[-0.02em] text-kvt-ink sm:text-4xl lg:text-5xl">
        Let&apos;s Build Your
        <br />
        Next Innovation
      </h2>
      <p className="max-w-md text-sm text-kvt-muted sm:text-base">
        Every great product starts with an idea. Let&apos;s turn yours into reality
      </p>
      {/* Diarahkan langsung ke WhatsApp (kontak yang sama dengan pill di footer)
          — sebelumnya "#contact" yang tidak menuju ke mana pun. */}
      <RecognitionCtaButton label="Start a Project" href="https://wa.me/6287819409980" />
    </motion.div>
  );
}
