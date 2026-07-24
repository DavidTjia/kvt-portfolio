export interface LogoCrop {
  naturalWidth: number;
  naturalHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProjectLogo {
  src: string;
  alt: string;
  crop?: LogoCrop;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  unoptimized?: boolean;

  crop?: LogoCrop;
}

export type ProjectTextSegment = string | { text: string; color: string };

export type ProjectOverviewSlot =
  | {
      kind: "image";
      image: ProjectImage;
      glow: string;

    }
  | {
      kind: "text";
      text: string;

      emphasis?: boolean;
    }
  | {
      kind: "model";
      src: string;
      alt: string;
    };

export interface ProjectOverviewContent {
  layout?: "flank" | "trio";
  background: {
    src: string;
    unoptimized?: boolean;

    blur?: boolean;
  };
  left: ProjectOverviewSlot;
  center: ProjectOverviewSlot;
  right: ProjectOverviewSlot;
  paragraph: ProjectTextSegment[];
}

export interface ProjectWheelIcon {
  name: string;
  image: string;
  width: number;
  height: number;
  iconHeight: number;
  color: string;
  float: number;
}

export type ProjectFeaturesVisual =
  | { kind: "wheel"; icons: ProjectWheelIcon[] }
  | {
      kind: "image";
      image: ProjectImage;

      maxWidthClass?: string;

      offsetClass?: string;
    }
  | {
      kind: "carousel";
      slides: ProjectCarouselSlide[];
    };

export interface ProjectCarouselSlide {
  id: string;
  name: string;
  description: string;
  image: ProjectImage;
}

export interface ProjectFeaturesContent {
  heading: string;
  paragraph: string;
  visual: ProjectFeaturesVisual;
}

export interface ProjectHighlightsContent {
  heading: string;
  paragraph: string;

  paragraphMaxWidthClass?: string;
  cards: { title: string; desc: string }[];

  cardSurface?: "glass" | "solid";
}

export interface ProjectShowcaseContent {
  heading: string;
  paragraph: string;
  videoSrc?: string;
  youtubeUrl?: string;
  image?: ProjectImage;
}

export interface ProjectCta {
  label: string;
  url: string;
  androidUrl?: string;
  iosUrl?: string;
}

export interface ProjectMilestone {
  label?: string;
  title?: string;
  text: string;
}

export interface ProjectRecognitionContent {
  heading: string;
  milestones: ProjectMilestone[];
  closingLines: string[];
  closingParagraph: string;
  cta: ProjectCta;
}

export interface ProjectDetail {
  slug: string;
  index: string;
  name: string;
  tagline: string;

  youtubeUrl: string;
  heroImage?: ProjectImage;

  heroMobileImage?: ProjectImage;

  logo: ProjectLogo;

  overview?: ProjectOverviewContent;
  features?: ProjectFeaturesContent;
  highlights?: ProjectHighlightsContent;
  showcase?: ProjectShowcaseContent;
  recognition?: ProjectRecognitionContent;
}
