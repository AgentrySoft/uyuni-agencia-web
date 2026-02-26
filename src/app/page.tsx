import { AgentrysoftSalesModal } from "@/app/common/components/AgentrysoftSalesModal";
import { ButtonUp } from "@/app/common/components/ButtonUp";
import { ScrollProgressBar } from "@/app/common/components/ScrollProgressBar";
import { ScrollToHash } from "@/app/common/components/ScrollToHash";
import { HeroNavbar } from "./home/components";
import {
  AdventureFeaturesSection,
  ContactSection,
  Footer,
  HeroBanner,
  OurPackagesSection,
  ToursPackagesParallax,
  ToursParallaxSection,
} from "./home";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-cream">
      <HeroNavbar />
      <ScrollToHash />
      <ScrollProgressBar />
      <AgentrysoftSalesModal />
      <HeroBanner />
      <AdventureFeaturesSection />
      <ToursPackagesParallax>
        <ToursParallaxSection />
        <OurPackagesSection />
      </ToursPackagesParallax>
      <ContactSection />
      <Footer />
      <ButtonUp />
    </div>
  );
}
