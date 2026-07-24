import { HeroNavbar } from "@/components/hero/HeroNavbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { RecognitionSection } from "@/components/recognition/RecognitionSection";
import { FooterSection } from "@/components/footer/FooterSection";

export default function Home() {
  return (
    <>
      <HeroNavbar />
      <HeroSection />
      <div className="flex flex-col gap-5.5 pt-5.5 pb-5.5">
        <AboutSection />
        <ProjectsSection />
        <RecognitionSection />
        <FooterSection />
      </div>
    </>
  );
}
