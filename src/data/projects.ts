import type { ProjectShowcase } from "@/types/project";

export const projects: ProjectShowcase[] = [
  {
    id: 1,
    slug: "nusa-space",
    index: "02",
    name: "Nusa Space",
    description:
      "Interactive Learning Nusa Space is a 3D educational simulation that guides users through space exploration—from launch to the International Space Station. Available for PC and VR, it combines immersive navigation, object inspection, and interactive quizzes to create an engaging learning experience",
    images: ["/nusa/title.png"],
    infoTitle: "Mission Info",
    infoFields: [
      { label: "Phase", value: "Launch Site" },
      { label: "Platform", value: "PC & VR" },
    ],
  },
  {
    id: 2,
    slug: "manguni-squad",
    index: "03",
    name: "Manguni Squad",
    description:
      "Manguni Squad is a first-person shooter mobile game inspired by Indonesian heritage. Players follow Toar, a former professional gamer turned police recruit, through tactical missions across iconic Indonesian locations",
    images: ["/manguni/card.png"],
    infoTitle: "Game Info",
    infoFields: [
      { label: "Genre", value: "FPS Mobile" },
      { label: "Platform", value: "Android" },
    ],
  },
];
