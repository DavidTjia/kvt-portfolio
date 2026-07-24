"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface AmbientVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

export function AmbientVideo({ src, className = "", poster }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  const inView = useInView(ref, { once: true, margin: "300px" });

  return (
    <video
      ref={ref}
      src={inView ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"

      className={["pointer-events-none object-cover", className].join(" ")}
    />
  );
}
