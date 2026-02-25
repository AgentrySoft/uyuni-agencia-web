import { ButtonUp } from "@/app/common/components/ButtonUp";
import { ScrollProgressBar } from "@/app/common/components/ScrollProgressBar";
import { ScrollToHash } from "@/app/common/components/ScrollToHash";
import {
  AdventureFeaturesSection,
  ContactSection,
  Footer,
  HeroBanner,
  OurPackagesSection,
  ToursParallaxSection,
} from "./home";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-cream">
      <ScrollToHash />
      <ScrollProgressBar />
      <HeroBanner />
      <AdventureFeaturesSection />
      <ToursParallaxSection />
      <OurPackagesSection />
      <ContactSection />
      <Footer />
      <ButtonUp />
    </div>
  );
}
