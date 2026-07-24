"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { REVEAL_EASE, revealUp } from "@/lib/motion";
import { CroppedImage } from "./CroppedImage";
import { ImageCarousel } from "./ImageCarousel";
import { LightSectionBackdrop } from "./LightSectionBackdrop";
import { ProjectMediaFallback } from "./ProjectMediaFallback";
import type {
  ProjectFeaturesContent,
  ProjectFeaturesVisual,
  ProjectWheelIcon,
} from "@/types/projectDetail";

const RING_CENTER = { x: 50, y: 50 };
const RING_RADIUS = 30;

function ringPosition(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: RING_CENTER.x + Math.sin(rad) * RING_RADIUS,
    y: RING_CENTER.y - Math.cos(rad) * RING_RADIUS,
  };
}

const LINK_REACH = 0.62;

function layoutIcons(icons: ProjectWheelIcon[]) {
  const step = 360 / icons.length;
  return icons.map((icon, i) => ({
    ...icon,
    ...ringPosition(i * step),
    delay: i * 0.1,
  }));
}

type PlacedIcon = ReturnType<typeof layoutIcons>[number];

function useReducedEffects() {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mqMobile.matches || mqMotion.matches);
    update();
    mqMobile.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  return reduced;
}

interface ProjectFeaturesSectionProps {
  content: ProjectFeaturesContent;
  projectName: string;
}

export function ProjectFeaturesSection({ content, projectName }: ProjectFeaturesSectionProps) {
  const isCarousel = content.visual.kind === "carousel";
  const reduced = useReducedEffects();

  return (
    <section
      className="relative w-full pt-24 sm:pt-28 lg:pt-32"
      aria-label={`Keunggulan ${projectName}`}
    >
      <LightSectionBackdrop />
      <div
        className={[
          "relative mx-auto grid w-full max-w-350 grid-cols-1 gap-12 px-6 sm:gap-12 sm:px-10 md:grid-cols-[1fr_1fr] md:gap-8 lg:gap-12 lg:px-16",
          isCarousel ? "items-start" : "items-center",
        ].join(" ")}
      >
        <div className="min-w-0">
          <motion.h2
            className="text-3xl font-extrabold leading-[1.15] tracking-tight text-kvt-ink sm:text-4xl lg:text-5xl"
            {...revealUp()}
          >
            {content.heading}
          </motion.h2>
          <motion.p
            className="mt-8 max-w-lg text-sm leading-loose text-kvt-muted sm:mt-10 sm:text-base lg:text-lg"
            {...revealUp(0.1)}
          >
            {content.paragraph}
          </motion.p>
        </div>

        {content.visual.kind === "wheel" ? (
          <AbilityWheel icons={layoutIcons(content.visual.icons)} reduced={reduced} />
        ) : content.visual.kind === "carousel" ? (
          <ImageCarousel slides={content.visual.slides} />
        ) : (
          <FeatureStill visual={content.visual} reduced={reduced} />
        )}
      </div>
    </section>
  );
}

function FeatureStill({
  visual,
  reduced,
}: {
  visual: Extract<ProjectFeaturesVisual, { kind: "image" }>;
  reduced: boolean;
}) {
  return (
    <div
      className={["mx-auto w-full", visual.maxWidthClass ?? "max-w-64", visual.offsetClass ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: REVEAL_EASE }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -10, 0] }}
          transition={reduced ? undefined : { duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          <CroppedImage
            image={visual.image}
            sizes="(max-width: 768px) 55vw, 22vw"
            className="drop-shadow-[0_24px_40px_rgba(11,27,51,0.28)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function AbilityWheel({ icons, reduced }: { icons: PlacedIcon[]; reduced: boolean }) {
  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-140"
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: REVEAL_EASE }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {icons.map((icon) => (
          <line
            key={icon.name}
            x1={RING_CENTER.x}
            y1={RING_CENTER.y}
            x2={RING_CENTER.x + (icon.x - RING_CENTER.x) * LINK_REACH}
            y2={RING_CENTER.y + (icon.y - RING_CENTER.y) * LINK_REACH}
            stroke={icon.color}
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <CoreNode reduced={reduced} />

      {icons.map((icon) => (
        <WheelIcon key={icon.name} icon={icon} reduced={reduced} />
      ))}
    </motion.div>
  );
}

function CoreNode({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${RING_CENTER.x}%`, top: `${RING_CENTER.y}%` }}
      aria-hidden="true"
    >
      <div className="relative grid h-14 w-14 place-items-center sm:h-16 sm:w-16">
        <motion.span
          className="absolute inset-0 rounded-full bg-sky-400/20 blur-lg"
          animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.45, 0.7, 0.45] }}
          transition={reduced ? undefined : { duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.span
          className="absolute inset-1 rounded-full border border-dashed border-sky-300/45"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 26, ease: "linear", repeat: Infinity }}
        />
        <span className="h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(125,211,252,0.95)]" />
      </div>
    </div>
  );
}

function WheelIcon({ icon, reduced }: { icon: PlacedIcon; reduced: boolean }) {
  const frameStyle = { aspectRatio: `${icon.width} / ${icon.iconHeight}` };
  const imageStyle = { height: `${(icon.height / icon.iconHeight) * 100}%` };

  return (
    <motion.div
      className="absolute w-[18%] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${icon.x}%`, top: `${icon.y}%` }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: REVEAL_EASE, delay: 0.25 + icon.delay }}
    >
      <motion.div
        className="group relative flex flex-col items-center"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={reduced ? undefined : { duration: icon.float, ease: "easeInOut", repeat: Infinity }}
      >
        <div
          className="relative w-full overflow-hidden drop-shadow-[0_6px_14px_rgba(11,27,51,0.28)] transition-transform duration-300 ease-out group-hover:scale-[1.08]"
          style={frameStyle}
        >
          {icon.image ? (
            <div className="absolute inset-x-0 top-0" style={imageStyle}>
              <Image
                src={icon.image}
                alt=""
                width={icon.width}
                height={icon.height}
                sizes="(max-width: 768px) 18vw, 9vw"
                className="h-full w-full object-contain object-top"
              />
            </div>
          ) : (
            <ProjectMediaFallback tone="light" label="" className="absolute inset-0 rounded-2xl" />
          )}
        </div>
        <p className="relative z-10 mt-2 text-center text-[9px] font-bold uppercase leading-none tracking-[0.14em] text-kvt-ink sm:text-[11px] lg:text-xs">
          {icon.name}
        </p>
      </motion.div>
    </motion.div>
  );
}
