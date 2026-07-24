"use client";

import { motion } from "framer-motion";
import { RecognitionCtaButton } from "./RecognitionCtaButton";
import { whatsappUrl } from "@/data/contact";
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
      <RecognitionCtaButton label="Start a Project" href={whatsappUrl()} />
    </motion.div>
  );
}
