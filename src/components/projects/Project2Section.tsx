import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { projects } from "@/data/projects";

export function Project2Section() {
  return <ProjectShowcaseCard project={projects[0]} />;
}
