import { HeroBanner } from "./home";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <HeroBanner />
      {/* Sección debajo del hero (fondo crema) */}
      <section id="tours" className="min-h-[50vh] bg-cream px-6 py-16 md:px-12" />
    </div>
  );
}
