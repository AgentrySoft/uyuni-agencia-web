import { ADVENTURE_FEATURES } from "@/app/home/content/adventure-features-content";
import { FeatureCard } from "./FeatureCard";
import { SectionSeparator } from "./SectionSeparator";

export function AdventureFeaturesSection() {
  return (
    <section className="relative w-full bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-center font-inter text-3xl font-extrabold text-primary-dark md:text-4xl">
          The perfect adventure awaits.
          <br />
          We are the best.
        </h2>
        <div className="mt-12 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-8 md:mt-16 md:gap-12">
          {ADVENTURE_FEATURES.map(({ icon, text }) => (
            <FeatureCard key={text} icon={icon}>
              {text}
            </FeatureCard>
          ))}
        </div>
      </div>
      <SectionSeparator className="text-cream top-14 md:top-24" />
    </section>
  );
}
