"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { REVEAL_EASE, revealUp } from "@/lib/motion";
import { LightSectionBackdrop } from "./LightSectionBackdrop";
import type {
  ProjectCta,
  ProjectMilestone,
  ProjectRecognitionContent,
} from "@/types/projectDetail";

function resolveCtaUrl(cta: ProjectCta): string {
  const ua = navigator.userAgent;

  if (/android/i.test(ua)) return cta.androidUrl || cta.url;

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (isIOS) return cta.iosUrl || cta.url;

  return cta.url;
}

interface ProjectRecognitionSectionProps {
  content: ProjectRecognitionContent;
  projectName: string;
}

export function ProjectRecognitionSection({
  content,
  projectName,
}: ProjectRecognitionSectionProps) {
  const { cta } = content;

  const [ctaUrl, setCtaUrl] = useState(cta.url);

  useEffect(() => {
    setCtaUrl(resolveCtaUrl(cta));
  }, [cta]);

  const external = ctaUrl.startsWith("http");

  return (
    <section
      className="relative w-full overflow-hidden px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
      aria-label={`Pencapaian ${projectName}`}
    >
      <LightSectionBackdrop />
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-extrabold leading-[1.15] tracking-tight text-kvt-ink sm:text-4xl lg:text-5xl"
          {...revealUp()}
        >
          {content.heading}
        </motion.h2>
        <div className="mt-14 grid gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {content.milestones.map((milestone, i) => (
            <Milestone key={i} milestone={milestone} delay={i * 0.1} />
          ))}
        </div>
        <div className="mt-28 text-center sm:mt-32 lg:mt-40">
          <motion.h3
            className="text-3xl font-extrabold leading-[1.25] tracking-tight text-kvt-ink sm:text-4xl lg:text-5xl"
            {...revealUp()}
          >
            {content.closingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h3>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-xs leading-relaxed text-kvt-muted sm:text-sm"
            {...revealUp(0.1)}
          >
            {content.closingParagraph}
          </motion.p>
          <motion.div className="mt-9 sm:mt-10" {...revealUp(0.18)}>
            <a
              href={ctaUrl}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={[
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "bg-linear-to-r from-[#173A63] via-[#2A5586] to-[#173A63] px-10 py-2.5",
                "text-sm font-semibold text-white",
                "shadow-[0_10px_24px_-10px_rgba(11,27,51,0.6)]",

                "transition-[transform,box-shadow] duration-300 ease-out",
                "hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(30,111,217,0.65)]",
                "active:translate-y-0",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative">{cta.label}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface MilestoneProps {
  milestone: ProjectMilestone;
  delay: number;
}

function Milestone({ milestone, delay }: MilestoneProps) {
  const { label, title, text } = milestone;

  return (
    <motion.div

      className="flex h-full flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: REVEAL_EASE, delay }}
    >
      <div className="flex min-h-6 items-center gap-2">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400/80" aria-hidden="true" />
        {label && <span className="text-sm font-medium text-sky-500/90">{label}</span>}
      </div>
      <div className="mt-2 h-px w-full bg-kvt-line" aria-hidden="true" />
      <div className="mt-4 flex-1 rounded-lg bg-[#DCEBF9]/80 p-4 shadow-[0_10px_22px_-16px_rgba(11,27,51,0.5)] sm:mr-5">
        {title && (
          <h3 className="text-[13px] font-semibold tracking-tight text-kvt-ink">{title}</h3>
        )}

        <p
          className={
            title
              ? "mt-1.5 text-xs leading-relaxed text-kvt-muted"
              : "text-[13px] leading-[1.9] text-kvt-ink"
          }
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}
