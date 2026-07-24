"use client";

import { motion } from "framer-motion";
import { ProjectGalleryCarousel } from "./ProjectGalleryCarousel";
import { SeeMoreButton } from "@/components/shared/SeeMoreButton";
import type { ProjectShowcase } from "@/types/project";
import { REVEAL_EASE } from "@/lib/motion";

const CORNER_CUT = 28;

interface ProjectShowcaseCardProps {
  project: ProjectShowcase;
  mirror?: boolean;
}

export function ProjectShowcaseCard({ project, mirror = false }: ProjectShowcaseCardProps) {
  const gallery = (
    <ProjectGalleryCarousel
      images={project.images}
      alt={project.name}
      infoTitle={project.infoTitle}
      infoFields={project.infoFields}
      infoAlign={mirror ? "left" : "right"}
    />
  );

  const description = (
    <div className="md:max-w-md">
      <p className="text-sm leading-relaxed text-white/75 sm:text-base">{project.description}</p>
      <SeeMoreButton href={`/projects/${project.slug}`} className="mt-6" />
    </div>
  );

  return (
    <motion.div
      className="relative rounded-[28px] border border-white/10 bg-linear-to-b from-[#0E1B32] via-[#0B1830] to-[#0A1424] p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-8 md:p-10"
      style={{
        clipPath: `polygon(0 0, calc(100% - ${CORNER_CUT}px) 0, 100% ${CORNER_CUT}px, 100% 100%, ${CORNER_CUT}px 100%, 0 calc(100% - ${CORNER_CUT}px))`,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: REVEAL_EASE }}
    >
      <header className="mb-8 flex items-center gap-3 sm:gap-6 md:mb-10">
        <span className="whitespace-nowrap text-sm font-extrabold tracking-tight text-white sm:text-lg md:text-xl">
          Project {project.index}.
        </span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
        <span className="relative h-px flex-1">
          <span className="absolute inset-0 -top-px h-[3px] bg-linear-to-r from-transparent via-sky-300/60 to-transparent blur-[3px]" />
          <span className="absolute inset-0 bg-linear-to-r from-white/50 via-white/60 to-white/10" />
        </span>
        <span className="whitespace-nowrap text-sm font-extrabold tracking-tight text-white sm:text-lg md:text-xl">
          {project.name}
        </span>
      </header>
      <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-14">
        {mirror ? (
          <>
            <div className="order-2 md:order-1">{description}</div>
            <div className="order-1 md:order-2">{gallery}</div>
          </>
        ) : (
          <>
            <div>{gallery}</div>
            <div>{description}</div>
          </>
        )}
      </div>
    </motion.div>
  );
}
