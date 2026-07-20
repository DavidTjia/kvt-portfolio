// Project2Section.tsx
// Kartu "Nusa Space" — galeri di kiri, deskripsi di kanan (layout normal,
// bukan mirror). Data ada di src/data/projects.ts.

import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { projects } from "@/data/projects";

export function Project2Section() {
  return <ProjectShowcaseCard project={projects[0]} />;
}
