"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { REVEAL_EASE } from "@/lib/motion";
import { useEffect, useState, type CSSProperties } from "react";
import { AmbientYouTube } from "./AmbientYouTube";
import { CroppedImage } from "./CroppedImage";
import { ProjectMediaFallback } from "./ProjectMediaFallback";
import type { ProjectImage, ProjectLogo } from "@/types/projectDetail";

interface ProjectVideoHeroProps {
  title: string;
  youtubeUrl: string;
  image?: ProjectImage;

  mobileImage?: ProjectImage;
  logo: ProjectLogo;
}

const MOBILE_QUERY = "(max-width: 767px)";

export function ProjectVideoHero({ title, youtubeUrl, image, mobileImage, logo }: ProjectVideoHeroProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const useMobileImage = isMobile === true && !!mobileImage?.src;

  return (
    <div className="relative flex h-svh w-full flex-col bg-black">
      <section
        className="@container-size relative z-10 min-h-0 w-full flex-1 overflow-hidden bg-black"
        aria-label={`${title} showcase`}
      >
        {isMobile === null ? (
          null
        ) : useMobileImage ? (
          <HeroStill image={mobileImage!} />
        ) : youtubeUrl ? (
          <AmbientYouTube
            url={youtubeUrl}
            title={`${title} — trailer`}
            className="absolute left-1/2 top-1/2 h-[56.25cqw] min-h-full w-[177.78cqh] min-w-full -translate-x-1/2 -translate-y-1/2"
          />
        ) : image?.src ? (
          <HeroStill image={image} />
        ) : (
          <ProjectMediaFallback className="absolute inset-0" bordered={false} />
        )}

      </section>
      <div className="relative z-20 -mt-12 w-full shrink-0">
        <ProjectPlatform />
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: REVEAL_EASE, delay: 0.15 }}
        >
          <ProjectLogoMark logo={logo} />
        </motion.div>
      </div>
    </div>
  );
}

function HeroStill({ image }: { image: ProjectImage }) {
  const wide = image.width > image.height * 1.2;

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: REVEAL_EASE }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        unoptimized={image.unoptimized}
        sizes="100vw"
        className={[
          "object-cover",
          wide ? "object-[62%_center] md:object-center" : "object-center",
        ].join(" ")}
      />
      <div className="absolute inset-0 bg-kvt-blue/30" aria-hidden="true" />
    </motion.div>
  );
}

const H = 158;
const BEVEL = 34;
const NOTCH_HALF = 150;
const NOTCH_DEPTH = 46;

const STROKE = 10;
const RAMP_STROKE = 7;
const INSET = STROKE / 2;

const L = INSET;
const R = 1600 - INSET;
const T = INSET;
const B = H - INSET;

const PANEL_PATH = [
  `M${L} ${T + BEVEL}`,
  `L${L + BEVEL} ${T}`,
  `L${800 - NOTCH_HALF - NOTCH_DEPTH} ${T}`,
  `L${800 - NOTCH_HALF} ${T + NOTCH_DEPTH}`,
  `L${800 + NOTCH_HALF} ${T + NOTCH_DEPTH}`,
  `L${800 + NOTCH_HALF + NOTCH_DEPTH} ${T}`,
  `L${R - BEVEL} ${T}`,
  `L${R} ${T + BEVEL}`,
  `L${R} ${B - BEVEL}`,
  `L${R - BEVEL} ${B}`,
  `L${L + BEVEL} ${B}`,
  `L${L} ${B - BEVEL}`,
  "Z",
].join(" ");

const RAMP_LEFT = `M288 ${T} L624 ${B}`;
const RAMP_RIGHT = `M1312 ${T} L976 ${B}`;
const RAMP_FILL = `M288 ${T} L624 ${B} L976 ${B} L1312 ${T} Z`;

function ProjectPlatform() {
  return (
    <svg
      viewBox={`0 0 1600 ${H}`}
      className="block w-full"

      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="platform-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C4C79" />
          <stop offset="45%" stopColor="#16294a" />
          <stop offset="100%" stopColor="#0A1526" />
        </linearGradient>
        <filter id="platform-glow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={PANEL_PATH} fill="url(#platform-fill)" />
      <path d={RAMP_FILL} fill="#ffffff" fillOpacity="0.05" />
      <g filter="url(#platform-glow)">
        <path d={PANEL_PATH} stroke="#ffffff" strokeWidth={STROKE} strokeLinejoin="round" />
        <path d={RAMP_LEFT} stroke="#ffffff" strokeWidth={RAMP_STROKE} strokeOpacity="0.95" />
        <path d={RAMP_RIGHT} stroke="#ffffff" strokeWidth={RAMP_STROKE} strokeOpacity="0.95" />
      </g>
    </svg>
  );
}

const LOGO_ASPECT_BASELINE = 1675 / 701;

function ProjectLogoMark({ logo }: { logo: ProjectLogo }) {
  const { crop } = logo;
  const aspect = crop ? crop.width / crop.height : LOGO_ASPECT_BASELINE;

  const k = Math.min(1, aspect / LOGO_ASPECT_BASELINE);

  return (
    <div
      className={[
        "relative -translate-y-1/2",
        "w-[calc(72%*var(--logo-k))] sm:w-[calc(52%*var(--logo-k))] lg:w-[calc(39%*var(--logo-k))]",
        "max-w-[calc(39rem*var(--logo-k))]",
      ].join(" ")}
      style={{ "--logo-k": k } as CSSProperties}
    >
      <CroppedImage
        image={logo}
        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 55vw, 40vw"
        priority
        className="drop-shadow-[0_14px_30px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
}
