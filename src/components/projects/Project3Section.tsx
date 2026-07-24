import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { projects } from "@/data/projects";

export function Project3Section() {
  return <ProjectShowcaseCard project={projects[1]} mirror />;
}
