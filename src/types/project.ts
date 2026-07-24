export interface ProjectInfoField {
  label: string;
  value: string;
}

export interface ProjectShowcase {
  id: number;
  slug: string;
  index: string;
  name: string;
  description: string;
  images: string[];
  infoTitle: string;
  infoFields: ProjectInfoField[];
}
