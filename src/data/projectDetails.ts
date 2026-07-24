import type { ProjectDetail } from "@/types/projectDetail";
import { whatsappUrl } from "./contact";

const MAVERICK_RED = "#F5153F";
const VANGUARD_BLUE = "#2B8CFF";

const MANGUNI_BLUE = "#3C7DD9";
const MANGUNI_AMBER = "#F5A623";
const MANGUNI_SKY = "#7DD3FC";

export const projectDetails: Record<string, ProjectDetail> = {
  wardeka: {
    slug: "wardeka",
    index: "01",
    name: "Wardeka Edonisia",
    tagline:
      "Indonesia's first nationally developed eSports shooter — built in Manado, powered by Delta Garuda",

    youtubeUrl: "https://youtu.be/d7NPvCvoSYU",

    heroMobileImage: {
      src: "/wardeka/hero-mobile.png",
      alt: "Key art Wardeka Edonisia",
      width: 841,
      height: 1870,
    },
    logo: {
      src: "/wardeka/logo.png",
      alt: "Wardeka",

      crop: {
        naturalWidth: 2064,
        naturalHeight: 3016,
        x: 181,
        y: 1124,
        width: 1675,
        height: 701,
      },
    },

    overview: {
      background: { src: "/wardeka/background.svg", unoptimized: true },

      left: {
        kind: "image",
        image: {
          src: "/wardeka/maverick.png",
          alt: "Maverick",
          width: 918,
          height: 1086,
        },
        glow: MAVERICK_RED,
      },
      center: {
        kind: "image",
        image: {
          src: "/wardeka/edonisia.png",
          alt: "Kota kubah Edonisia",
          width: 441,
          height: 323,
        },
        glow: VANGUARD_BLUE,
      },
      right: {
        kind: "image",
        image: {
          src: "/wardeka/vanguard.png",
          alt: "Vanguard",
          width: 880,
          height: 1134,
        },
        glow: VANGUARD_BLUE,
      },
      paragraph: [
        "As the world faces a global energy crisis, the domed city of Edonisia becomes the center of a fierce conflict between two rival factions: ",
        { text: "Vanguard", color: VANGUARD_BLUE },
        " and ",
        { text: "Maverick", color: MAVERICK_RED },
        ".",
      ],
    },

    features: {
      heading: "A New Challenge Every Match",
      paragraph:
        "Every match starts with a twist. Randomized abilities change the way you play, pushing you to adapt, experiment with new strategies, and earn victory through skill, teamwork, and quick thinking.",

      visual: {
        kind: "wheel",
        icons: [
          {
            name: "STRIKER",
            image: "/wardeka/class-striker.png",
            width: 238,
            height: 264,
            iconHeight: 206,
            color: "#FBE43F",
            float: 3.4,
          },
          {
            name: "TECHNICIAN",
            image: "/wardeka/class-technician.png",
            width: 216,
            height: 279,
            iconHeight: 221,
            color: "#F58ECA",
            float: 3.8,
          },
          {
            name: "ATHLETE",
            image: "/wardeka/class-athlete.png",
            width: 236,
            height: 261,
            iconHeight: 201,
            color: "#E48568",
            float: 4.2,
          },
          {
            name: "VETERAN",
            image: "/wardeka/class-veteran.png",
            width: 214,
            height: 255,
            iconHeight: 202,
            color: "#CBDCF7",
            float: 3.2,
          },
          {
            name: "HEALER",
            image: "/wardeka/class-healer.png",
            width: 222,
            height: 275,
            iconHeight: 217,
            color: "#D0EC70",
            float: 4,
          },
          {
            name: "FIREWALL",
            image: "/wardeka/class-firewall.png",
            width: 519,
            height: 481,
            iconHeight: 402,
            color: "#FCD387",
            float: 3.6,
          },
        ],
      },
    },

    highlights: {
      heading: "Four Ways to Fight",
      paragraph: "Pick your playstyle, from fast-paced firefights to team-driven strategy.",
      cards: [
        { title: "Deathmatch 5v5", desc: "Team vs team, most kills wins" },
        { title: "Battleground", desc: "Battle royale, last one standing" },
        { title: "Capture the flag", desc: "Steal and secure the enemy's flag" },
        { title: "Search and destroy", desc: "One life, plant or defuse the target" },
      ],
    },

    showcase: {
      heading: "See It In Action",
      paragraph: "Real matches, real skills, real chaos.",

      youtubeUrl: "https://youtu.be/8QfkB1IjYvI",
    },

    recognition: {
      heading: "Recognition & Milestones",
      milestones: [
        { label: "2023", text: "Winner, Apresiasi Kreasi Indonesia (AKI), Game & App category" },
        { label: "2024", text: "Featured at Piala Presiden Esports and Pepernas" },
        { label: "2025", text: "Official esports branch at PORPROV XII North Sulawesi" },
        {
          label: "2025",
          text: "Hosted Warbiasa League, Indonesia's first local shooter esports tournament",
        },
      ],
      closingLines: ["A Home Grown Esport,", "Built for the World Stage"],
      closingParagraph:
        "From Manado to the world. Wardeka is home grown, but built to go all the way.",
      cta: {
        label: "Play Now",

        url: "https://play.google.com/store/apps/details?id=com.bigdade.wardekapvp",
        androidUrl: "https://play.google.com/store/apps/details?id=com.bigdade.wardekapvp",
      },
    },
  },

  "nusa-space": {
    slug: "nusa-space",
    index: "02",
    name: "Nusa Space",
    tagline: "Interactive 3D space-exploration learning for PC & VR",
    youtubeUrl: "",
    heroImage: {
      src: "/nusa/hero.png",
      alt: "Layar judul Nusa Space: roket meluncur di atas Bumi",
      width: 1510,
      height: 847,
    },

    heroMobileImage: {
      src: "/nusa/hero-mobile.png",
      alt: "Roket Nusa Space meluncur di atas Bumi",
      width: 853,
      height: 1844,
    },
    logo: {
      src: "/nusa/logo.png",
      alt: "Nusa Space Interactive Learning",

      crop: {
        naturalWidth: 3640,
        naturalHeight: 1960,
        x: 440,
        y: 285,
        width: 2469,
        height: 1639,
      },
    },

    overview: {
      background: { src: "/nusa/about.png" },

      left: {
        kind: "text",
        text: "Explore launch systems and spacecraft.",
      },

      center: {
        kind: "model",
        src: "/nusa/vr-headset.glb",
        alt: "Model 3D headset VR yang bisa diputar",
      },
      right: {
        kind: "text",
        text: "Explore life and operations in orbit.",
      },

      paragraph: [
        "Instead of simply reading or watching, learners can inspect, interact with, and explore aerospace objects through immersive 3D simulations designed for Desktop and VR.",
      ],
    },

    features: {
      heading: "Explore Space Beyond the Textbook",
      paragraph:
        "Transform the way you learn aerospace through immersive 3D simulations on Desktop and VR. Explore rockets, satellites, and the International Space Station while inspecting detailed models in an engaging learning experience.",

      visual: {
        kind: "image",
        maxWidthClass: "max-w-36 sm:max-w-56",

        offsetClass: "md:translate-x-12 lg:translate-x-16",
        image: {
          src: "/nusa/rocket.png",
          alt: "Model pesawat ulang-alik yang bisa diperiksa di Nusa Space",
          width: 527,
          height: 458,
          crop: { naturalWidth: 527, naturalHeight: 458, x: 237, y: 0, width: 260, height: 458 },
        },
      },
    },

    highlights: {
      cardSurface: "solid",
      heading: "Your Learning Journey",
      paragraph:
        "Begin with the fundamentals of aerospace, explore interactive 3D models, and build your understanding through immersive, step-by-step learning experiences.",

      paragraphMaxWidthClass: "max-w-xl",
      cards: [
        { title: "Launch Vehicles", desc: "Discover how rockets work." },
        { title: "Satellites", desc: "Understand orbital technology." },
        { title: "International Space Station", desc: "Experience life in orbit." },
        { title: "Learning Progress", desc: "Track your learning progress." },
      ],
    },

    showcase: {
      heading: "See It In Action",
      paragraph: "Real missions, real hardware, real orbit.",

      videoSrc: "/nusa/gameplay.mp4",

      image: {
        src: "/nusa/title.png",
        alt: "Sesi Nusa Space di hanggar roket, lengkap dengan daftar quest dan objektif",
        width: 1304,
        height: 720,
      },
    },

    recognition: {
      heading: "Why Choose Nusa",

      milestones: [
        { title: "Desktop & VR", text: "Learn seamlessly across Desktop and VR." },
        { title: "Interactive 3D", text: "Explore detailed 3D aerospace models." },
        { title: "Education Focused", text: "Designed for immersive learning." },
        { title: "Real-Time Interaction", text: "Interact, inspect, and explore freely." },
      ],
      closingLines: ["Your Journey to Orbit", "Starts Here"],
      closingParagraph:
        "Explore rockets, satellites, and the ISS through immersive 3D simulations.",
      cta: {
        label: "Play Now",

        url: whatsappUrl("Halo KVT, saya ingin tahu lebih lanjut tentang Nusa Space."),
      },
    },
  },

  "manguni-squad": {
    slug: "manguni-squad",
    index: "03",
    name: "Manguni Squad",
    tagline: "A first-person shooter rooted in Indonesian heritage",

    youtubeUrl: "https://youtu.be/1NLcTBs27cY",

    heroMobileImage: {
      src: "/manguni/hero-mobile.png",
      alt: "Key art Manguni Squad",
      width: 971,
      height: 1619,
    },
    logo: {
      src: "/manguni/logo.png",
      alt: "Manguni Squad",

      crop: {
        naturalWidth: 4608,
        naturalHeight: 3464,
        x: 937,
        y: 678,
        width: 2156,
        height: 1927,
      },
    },

    overview: {
      layout: "trio",

      background: { src: "/manguni/about.png" },

      left: {
        kind: "image",
        image: {
          src: "/manguni/member-3.png",
          alt: "Anggota Manguni Squad",
          width: 1334,
          height: 1508,
          crop: { naturalWidth: 1334, naturalHeight: 1508, x: 198, y: 157, width: 850, height: 1351 },
        },
        glow: MANGUNI_BLUE,
      },
      center: {
        kind: "image",
        image: {
          src: "/manguni/member-1.png",
          alt: "Anggota Manguni Squad bertopi",
          width: 1334,
          height: 1508,
          crop: { naturalWidth: 1334, naturalHeight: 1508, x: 239, y: 147, width: 992, height: 1361 },
        },
        glow: MANGUNI_SKY,
      },
      right: {
        kind: "image",
        image: {
          src: "/manguni/member-2.png",
          alt: "Anggota Manguni Squad",
          width: 1334,
          height: 1508,
          crop: { naturalWidth: 1334, naturalHeight: 1508, x: 117, y: 143, width: 1096, height: 1365 },
        },
        glow: MANGUNI_AMBER,
      },

      paragraph: [
        "A global syndicate threatens the nation, and only an elite squad stands in its way. Every mission unfolds across Indonesia's iconic heritage sites, faithfully scanned and recreated in 3D.",
      ],
    },

    features: {
      heading: "Explore Indonesia Through Every Mission",
      paragraph:
        "From bustling cities to centuries-old cultural landmarks, every mission is inspired by places that reflect Indonesia's diverse identity. Manguni Squad transforms real-world environments into immersive battlegrounds where history and action meet.",
      visual: {
        kind: "carousel",
        slides: [
          {
            id: "bali",
            name: "Bali",
            description:
              "Island operations across Bali's coastlines, temples, and terraced landscapes.",
            image: { src: "/manguni/map-bali.png", alt: "Misi Manguni Squad di Bali", width: 1838, height: 856 },
          },
          {
            id: "jakarta",
            name: "Jakarta",
            description:
              "Dense urban combat with highways, skyscrapers, and crowded streets.",
            image: { src: "/manguni/map-jakarta.png", alt: "Misi Manguni Squad di Jakarta", width: 1829, height: 860 },
          },
          {
            id: "magelang-1",
            name: "Magelang 1",
            description:
              "Battle in the shadow of Borobudur, one of the world's great ancient monuments.",
            image: { src: "/manguni/map-magelang-1.png", alt: "Misi Manguni Squad di Magelang 1", width: 1828, height: 860 },
          },
          {
            id: "magelang-2",
            name: "Magelang 2",
            description:
              "A second front around Magelang's temples and highland terrain.",
            image: { src: "/manguni/map-magelang-2.png", alt: "Misi Manguni Squad di Magelang 2", width: 1853, height: 849 },
          },
          {
            id: "jogja",
            name: "Jogja",
            description:
              "Missions across the cultural heart of Java, where tradition meets the fight.",
            image: { src: "/manguni/map-jogja.png", alt: "Misi Manguni Squad di Yogyakarta", width: 1850, height: 850 },
          },
        ],
      },
    },

    highlights: {
      heading: "Gameplay Experience",
      paragraph: "Experience tactical combat across locations inspired by Indonesia's cultural heritage.",
      cards: [
        { title: "Tactical Missions", desc: "Complete unique combat missions" },
        { title: "Authentic Locations", desc: "Inspired by real Indonesian landmarks" },
        { title: "Dynamic Combat", desc: "Adapt with diverse weapons" },
        { title: "Global Leaderboard", desc: "Rise through global rankings" },
      ],
    },

    showcase: {
      heading: "See It In Action",
      paragraph: "Real missions, real firefights, real chaos.",
      youtubeUrl: "https://youtu.be/WooaAwXYDQ4",
    },

    recognition: {
      heading: "Recognition & Milestones",

      milestones: [
        {
          label: "2018",
          text: "Released on Google Play, introducing an Indonesian-made FPS inspired by local culture.",
        },
        { label: "2018", text: "Reached over 50,000 downloads on Google Play." },
        { label: "2019", text: "Recognized as a Top 5 Finalist in BEKRAF KATAPEL Batch 2." },
        { label: "2019", text: "Represented Indonesia at the China Licensing Expo in Shanghai." },
      ],
      closingLines: ["Join the Squad.", "Protect the Heritage"],
      closingParagraph:
        "Fight across Indonesia through action-packed missions inspired by real cultural heritage.",
      cta: {
        label: "Play Now",

        url: whatsappUrl("Halo KVT, saya ingin tahu lebih lanjut tentang Manguni Squad."),
      },
    },
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}
