import Image from "next/image";
import { HeroNavbar } from "./components/HeroNavbar";
import { HeroContent } from "./components/HeroContent";
import { HeroSeparator } from "./components/HeroSeparator";

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-primary">
      {/* Bloque hero: altura máxima 70svh */}
      <div className="relative max-h-[calc(80svh+100px)] min-h-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/salar-de-uyuni-bo.webp"
            alt="Salar de Uyuni"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        <HeroNavbar />

        <div className="relative flex min-h-[70svh] flex-col items-center justify-center pb-24 pt-32 md:pb-32 md:pt-40">
          <HeroContent />
        </div>
        <HeroSeparator className="absolute bottom-0 w-full" />
      </div>
    </section>
  );
}
