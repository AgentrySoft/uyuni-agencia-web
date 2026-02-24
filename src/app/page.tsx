import {
  AdventureFeaturesSection,
  HeroBanner,
  OurPackagesSection,
  ToursParallaxSection,
} from "./home";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <HeroBanner />
      <AdventureFeaturesSection />
      <ToursParallaxSection />
      <OurPackagesSection />
      {/* Sección debajo (fondo sky, placeholder para imagen) */}
      <section id="tours" className="min-h-[50vh] bg-sky px-6 py-16 md:px-12" />
    </div>
  );
}
