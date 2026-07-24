import { Project1Section } from "@/components/project1/Project1Section";
import { Project2Section } from "./Project2Section";
import { Project3Section } from "./Project3Section";

export function ProjectsSection() {
  return (
    <section
      id="project"
      className="w-full px-6 sm:px-10 lg:px-16"
      aria-label="Projects"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:gap-12 lg:gap-16">
        <Project1Section />
        <Project2Section />
        <Project3Section />
      </div>
    </section>
  );
}
