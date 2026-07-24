import { ProjectVideoHero } from "./ProjectVideoHero";
import { ProjectOverviewSection } from "./ProjectOverviewSection";
import { ProjectFeaturesSection } from "./ProjectFeaturesSection";
import { ProjectHighlightsSection } from "./ProjectHighlightsSection";
import { ProjectShowcaseSection } from "./ProjectShowcaseSection";
import { ProjectRecognitionSection } from "./ProjectRecognitionSection";
import type { ProjectDetail } from "@/types/projectDetail";

interface ProjectDetailBodyProps {
  detail: ProjectDetail;
}

export function ProjectDetailBody({ detail }: ProjectDetailBodyProps) {
  return (
    <>
      <ProjectVideoHero
        title={detail.name}
        youtubeUrl={detail.youtubeUrl}
        image={detail.heroImage}
        mobileImage={detail.heroMobileImage}
        logo={detail.logo}
      />

      {detail.overview && (
        <ProjectOverviewSection content={detail.overview} projectName={detail.name} />
      )}

      {detail.features && (
        <ProjectFeaturesSection content={detail.features} projectName={detail.name} />
      )}

      {detail.highlights && (
        <ProjectHighlightsSection content={detail.highlights} projectName={detail.name} />
      )}

      {detail.showcase && (
        <ProjectShowcaseSection content={detail.showcase} projectName={detail.name} />
      )}

      {detail.recognition && (
        <ProjectRecognitionSection content={detail.recognition} projectName={detail.name} />
      )}
    </>
  );
}
