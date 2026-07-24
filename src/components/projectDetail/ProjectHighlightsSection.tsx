"use client";

import { motion } from "framer-motion";
import { REVEAL_EASE, revealUp } from "@/lib/motion";
import { LightSectionBackdrop } from "./LightSectionBackdrop";
import type { ProjectHighlightsContent } from "@/types/projectDetail";

interface ProjectHighlightsSectionProps {
  content: ProjectHighlightsContent;
  projectName: string;
}

export function ProjectHighlightsSection({
  content,
  projectName,
}: ProjectHighlightsSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden px-6 pt-16 pb-24 sm:px-10 sm:pt-20 sm:pb-28 lg:px-16 lg:pt-24 lg:pb-36"
      aria-label={`Cara bermain ${projectName}`}
    >
      <LightSectionBackdrop />
      <div className="relative mx-auto grid w-full max-w-350 items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-20">
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12">
          {content.cards.map((card, i) => (
            <HighlightCard
              key={card.title}
              title={card.title}
              desc={card.desc}
              delay={i * 0.09}
              surface={content.cardSurface ?? "glass"}
            />
          ))}
        </div>
        <div>
          <motion.h2
            className="text-3xl font-extrabold leading-[1.15] tracking-tight text-kvt-ink sm:text-4xl lg:text-5xl"
            {...revealUp()}
          >
            {content.heading}
          </motion.h2>
          <motion.p
            className={[
              "mt-6 text-sm leading-loose text-kvt-muted sm:mt-8 sm:text-base lg:text-lg",
              content.paragraphMaxWidthClass ?? "max-w-sm",
            ].join(" ")}
            {...revealUp(0.1)}
          >
            {content.paragraph}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

interface HighlightCardProps {
  title: string;
  desc: string;
  delay: number;
  surface: NonNullable<ProjectHighlightsContent["cardSurface"]>;
}

const SOLID_FILL = "bg-[#DCEBFB]";
const GLASS_FILL = "bg-linear-to-br from-white/85 via-[#DCEBFB] to-[#CFE4F8]";

const CORNER_CUT = 18;
const CARD_CLIP = `polygon(0 0, calc(100% - ${CORNER_CUT}px) 0, 100% ${CORNER_CUT}px, 100% 100%, 0 100%)`;

function HighlightCard({ title, desc, delay, surface }: HighlightCardProps) {
  const glass = surface === "glass";

  return (
    <motion.article
      className={[
        "group relative",
        "drop-shadow-[0_10px_18px_rgba(11,27,51,0.10)]",
        "transition-[transform,filter] duration-300 ease-out",
        "hover:-translate-y-1.5 hover:drop-shadow-[0_16px_26px_rgba(30,111,217,0.22)]",
      ].join(" ")}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: REVEAL_EASE, delay }}
    >
      <div
        className={[
          "relative overflow-hidden rounded-xl border border-kvt-line/70 p-4 sm:p-5",
          glass ? GLASS_FILL : SOLID_FILL,
          "transition-colors duration-300 ease-out group-hover:border-kvt-blue/45",
        ].join(" ")}
        style={{ clipPath: CARD_CLIP }}
      >

        {glass && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-kvt-blue/30 opacity-0 blur-2xl transition-opacity duration-300 ease-out group-hover:opacity-100"
          />
        )}
        <h3 className="relative text-sm font-semibold tracking-tight text-kvt-ink sm:text-[15px]">
          {title}
        </h3>
        <p className="relative mt-1.5 text-xs leading-relaxed text-kvt-muted">{desc}</p>
      </div>
    </motion.article>
  );
}
