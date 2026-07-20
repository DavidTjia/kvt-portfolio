// Project3Section.tsx
// Kartu "Manguni Squad" — layout dicerminkan dari Project 02: deskripsi di
// kiri, galeri di kanan (`mirror` mengatur urutan kolom & sisi kartu info).

import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { projects } from "@/data/projects";

export function Project3Section() {
  return <ProjectShowcaseCard project={projects[1]} mirror />;
}
