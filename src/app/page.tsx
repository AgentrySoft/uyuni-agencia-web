import { ScrollProgressBar } from "@/app/common/components/ScrollProgressBar";
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
    <div className="min-h-screen bg-cream">
      <ScrollProgressBar />
      <HeroBanner />
      <AdventureFeaturesSection />
      <ToursParallaxSection />
      <OurPackagesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
