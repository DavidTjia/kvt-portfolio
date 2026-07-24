import { AboutHeading } from "./AboutHeading";
import { AboutGallery } from "./AboutGallery";
import { AboutGalleryMobile } from "./AboutGalleryMobile";
import { AboutBrandBadge } from "./AboutBrandBadge";
import { AboutClosingCard } from "./AboutClosingCard";

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full px-6 sm:px-10 lg:px-16"
      aria-label="About Kawanua Virtual Teknologi"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-12 lg:gap-14">
        <AboutHeading />
        <div className="md:hidden">
          <AboutGalleryMobile />
        </div>
        <AboutGallery />
        <AboutBrandBadge />
        <AboutClosingCard />
      </div>
    </section>
  );
}
