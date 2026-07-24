"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";

const ModelStage = dynamic(() => import("./ModelStage").then((m) => m.ModelStage), {
  ssr: false,
});

interface ProjectModelSlotProps {
  src: string;
  alt: string;
}

export function ProjectModelSlot({ src, alt }: ProjectModelSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "300px" });

  return (
    <div
      ref={ref}

      className="relative aspect-4/3 w-full"
      role="img"
      aria-label={alt}
    >
      {inView && <ModelStage src={src} />}
    </div>
  );
}
