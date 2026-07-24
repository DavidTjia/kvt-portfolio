"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { REVEAL_EASE } from "@/lib/motion";
import { CroppedImage } from "./CroppedImage";
import { ProjectMediaFallback } from "./ProjectMediaFallback";
import { ProjectModelSlot } from "./ProjectModelSlot";
import type {
  ProjectOverviewContent,
  ProjectOverviewSlot,
  ProjectTextSegment,
} from "@/types/projectDetail";

interface ProjectOverviewSectionProps {
  content: ProjectOverviewContent;
  projectName: string;
}

export function ProjectOverviewSection({ content, projectName }: ProjectOverviewSectionProps) {
  const { background, left, right, center, paragraph } = content;
  const isTrio = content.layout === "trio";

  return (
    <section

      className={[
        "relative w-full overflow-hidden",

        isTrio ? "" : "py-20 sm:py-28 lg:py-36",
      ].join(" ")}
      style={
        isTrio
          ? { paddingTop: "clamp(2rem, 7vh, 6rem)", paddingBottom: "clamp(2rem, 7vh, 6rem)" }
          : undefined
      }
      aria-label={`Sekilas ${projectName}`}
    >
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: REVEAL_EASE }}
      >
        {background.src && (
          <Image
            src={background.src}
            alt=""
            fill
            priority={false}
            unoptimized={background.unoptimized}
            sizes="100vw"

            className={
              background.blur ? "scale-110 object-cover blur-2xl" : "scale-105 object-cover"
            }
          />
        )}

        <div className="absolute inset-0 bg-[#050B16]/65" />
        <div className="absolute inset-0 bg-linear-to-b from-[#08152C]/80 via-[#0A1A33]/40 to-[#070F1E]/90" />
      </motion.div>
      <div className="relative mx-auto w-full max-w-350 px-6 sm:px-10 lg:px-16">
        {content.layout === "trio" ? (
          <TrioRow left={left} center={center} right={right} />
        ) : (
          <div className="grid items-center gap-10 sm:gap-12 md:grid-cols-[1fr_minmax(0,1.2fr)_1fr] md:gap-8 lg:gap-12">
            <SideSlot slot={left} from={-40} />
            <CenterSlot slot={center} />
            <SideSlot slot={right} from={40} />
          </div>
        )}

        <motion.p
          className="mx-auto mt-14 max-w-3xl text-center text-sm leading-[1.9] text-white/70 sm:mt-16 sm:text-base lg:text-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: REVEAL_EASE, delay: 0.15 }}
        >
          {paragraph.map((segment, i) => (
            <TextSegment key={i} segment={segment} />
          ))}
        </motion.p>
      </div>
    </section>
  );
}

function TextSegment({ segment }: { segment: ProjectTextSegment }) {
  if (typeof segment === "string") return <>{segment}</>;
  return (
    <span className="font-semibold" style={{ color: segment.color }}>
      {segment.text}
    </span>
  );
}

const TRIO_CLIP = "polygon(14% 0, 100% 0, 86% 100%, 0 100%)";

const TRIO_STAGE_HEIGHT = "clamp(7rem, min(52vh, 30vw), 27rem)";

function TrioRow({
  left,
  center,
  right,
}: {
  left: ProjectOverviewSlot;
  center: ProjectOverviewSlot;
  right: ProjectOverviewSlot;
}) {
  return (
    <div
      className="flex items-end justify-center gap-1 sm:gap-4 lg:gap-6"
      style={{ height: TRIO_STAGE_HEIGHT }}
    >
      <TrioPanel slot={left} from={-40} />
      <TrioPanel slot={center} from={0} />
      <TrioPanel slot={right} from={40} />
    </div>
  );
}

function TrioPanel({ slot, from }: { slot: ProjectOverviewSlot; from: number }) {
  const hasImage = slot.kind === "image" && slot.image.src;

  return (
    <motion.div

      className="group relative flex h-full items-end justify-center px-1 sm:px-3"
      initial={{ opacity: 0, x: from }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease: REVEAL_EASE, delay: 0.1 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[72%]"
        style={{ clipPath: TRIO_CLIP }}
      >
        <div className="h-full w-full bg-linear-to-b from-[#16233C]/85 via-[#101B30]/85 to-[#0A1424]/90 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]" />
      </div>

      {hasImage ? (
        <CroppedImage
          image={slot.image}
          fit="height"
          sizes="(max-width: 768px) 30vw, 22vw"
          className="drop-shadow-[0_18px_28px_rgba(5,11,22,0.6)] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <ProjectMediaFallback className="h-full w-auto" style={{ aspectRatio: "3 / 4" }} />
      )}
    </motion.div>
  );
}

function SideSlot({ slot, from }: { slot: ProjectOverviewSlot; from: number }) {
  return (
    <motion.div
      className="group relative mx-auto flex w-full max-w-70 justify-center sm:max-w-80"
      initial={{ opacity: 0, x: from }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: REVEAL_EASE }}
    >
      {slot.kind === "text" || slot.kind === "model" ? (
        <GlassCard>
          <SlotBody slot={slot} />
        </GlassCard>
      ) : (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-full opacity-45 blur-3xl transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 group-hover:opacity-80"
            style={{ backgroundColor: slot.glow }}
          />
          <SlotImage slot={slot} sizes="(max-width: 768px) 60vw, 25vw" />
        </>
      )}
    </motion.div>
  );
}

function CenterSlot({ slot }: { slot: ProjectOverviewSlot }) {
  return (
    <motion.div
      className="group relative mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: REVEAL_EASE }}
    >
      <GlassCard padded={slot.kind === "image"}>
        {slot.kind === "image" ? (
          <SlotImage slot={slot} sizes="(max-width: 768px) 90vw, 40vw" rounded />
        ) : (
          <SlotBody slot={slot} />
        )}
      </GlassCard>
    </motion.div>
  );
}

function GlassCard({ children, padded = false }: { children: ReactNode; padded?: boolean }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-kvt-blue/25 opacity-60 blur-3xl transition-opacity duration-500 ease-out group-hover:opacity-100"
      />
      <div
        className={[
          "relative w-full overflow-hidden rounded-3xl border border-sky-300/30 bg-white/8 backdrop-blur-md",
          padded ? "p-2.5 sm:p-3" : "px-6 py-8 sm:px-7 sm:py-10",
          "shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)]",

          "transition-[transform,box-shadow,border-color] duration-500 ease-out",
          "group-hover:-translate-y-2 group-hover:border-sky-300/60",
          "group-hover:shadow-[0_40px_90px_-30px_rgba(43,140,255,0.55)]",
        ].join(" ")}
      >
        {children}
      </div>
    </>
  );
}

function SlotBody({
  slot,
}: {
  slot: Extract<ProjectOverviewSlot, { kind: "text" } | { kind: "model" }>;
}) {
  if (slot.kind === "model") {
    return <ProjectModelSlot src={slot.src} alt={slot.alt} />;
  }

  return (
    <p
      className={[
        "flex items-center justify-center text-center text-white/80",
        slot.emphasis
          ? "min-h-28 text-lg font-semibold tracking-tight text-white sm:min-h-32 sm:text-xl"
          : "min-h-16 text-xs leading-relaxed sm:min-h-20 sm:text-sm",
      ].join(" ")}
    >
      {slot.text}
    </p>
  );
}

function SlotImage({
  slot,
  sizes,
  rounded = false,
}: {
  slot: Extract<ProjectOverviewSlot, { kind: "image" }>;
  sizes: string;
  rounded?: boolean;
}) {
  const { image, glow } = slot;

  if (!image.src) {
    return (
      <ProjectMediaFallback
        className="w-full rounded-2xl"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      />
    );
  }

  return (
    <div className="w-full">
      <CroppedImage
        image={image}
        sizes={sizes}
        className={[
          "transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.03]",
          rounded ? "rounded-2xl" : "",
        ].join(" ")}
        style={{ filter: `drop-shadow(0 0 18px ${glow}55)` }}
      />
    </div>
  );
}
