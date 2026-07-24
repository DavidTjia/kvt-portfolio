import { HeroNavbar } from "@/components/hero/HeroNavbar";
import { FooterSection } from "@/components/footer/FooterSection";

export default function ProjectDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HeroNavbar variant="light" />
      {children}

      <div className="pt-5.5 pb-5.5">
        <FooterSection />
      </div>
    </>
  );
}
