"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { REVEAL_EASE, revealUp } from "@/lib/motion";
import { AmbientVideo } from "./AmbientVideo";
import { AmbientYouTube } from "./AmbientYouTube";
import { LightSectionBackdrop } from "./LightSectionBackdrop";
import { ProjectMediaFallback } from "./ProjectMediaFallback";
import type { ProjectShowcaseContent } from "@/types/projectDetail";

const CORNER_CUT = 22;
const CARD_CLIP = `polygon(${CORNER_CUT}px 0, calc(100% - ${CORNER_CUT}px) 0, 100% ${CORNER_CUT}px, 100% 100%, 0 100%, 0 ${CORNER_CUT}px)`;

interface ProjectShowcaseSectionProps {
  content: ProjectShowcaseContent;
  projectName: string;
}

export function ProjectShowcaseSection({ content, projectName }: ProjectShowcaseSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      aria-label={`Cuplikan ${projectName}`}
    >
      <LightSectionBackdrop />
      <motion.div
        className="relative mx-auto w-full max-w-350 drop-shadow-[0_22px_40px_rgba(11,27,51,0.22)]"
        {...revealUp()}
      >
        <div

          className="relative bg-linear-to-tr from-[#455C72] via-[#2A3A4C] to-[#1E2A38] px-8 py-10 sm:px-10 sm:py-11 lg:px-12"
          style={{ clipPath: CARD_CLIP }}
        >
          <div className="grid items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-10 lg:gap-14">
            <div>
              <motion.h2
                className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl"
                {...revealUp(0.05)}
              >
                {content.heading}
              </motion.h2>
              <motion.p
                className="mt-5 max-w-56 text-sm leading-loose text-white/55 sm:text-base"
                {...revealUp(0.12)}
              >
                {content.paragraph}
              </motion.p>
            </div>
            <motion.div
              className="w-full bg-black"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: REVEAL_EASE, delay: 0.1 }}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <ShowcaseMedia content={content} projectName={projectName} />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ShowcaseMedia({ content, projectName }: ProjectShowcaseSectionProps) {
  if (content.videoSrc) {
    return (
      <AmbientVideo
        src={content.videoSrc}

        poster={content.image?.src || undefined}
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  if (content.youtubeUrl) {
    return (
      <AmbientYouTube
        url={content.youtubeUrl}
        title={`${projectName} — gameplay`}
        className="absolute inset-0 h-full w-full"
        cover
      />
    );
  }

  if (content.image?.src) {
    const { image } = content;
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        unoptimized={image.unoptimized}
        sizes="(max-width: 768px) 90vw, 55vw"

        className="object-cover"
      />
    );
  }

  return <ProjectMediaFallback className="absolute inset-0" bordered={false} />;
}
