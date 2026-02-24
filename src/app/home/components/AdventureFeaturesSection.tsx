"use client";

import { motion } from "motion/react";
import { ADVENTURE_FEATURES } from "@/app/home/content/adventure-features-content";
import { staggerContainer } from "@/app/common/lib/motion-variants";
import { FeatureCard } from "./FeatureCard";
import { SectionSeparator } from "./SectionSeparator";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Viewport: el zoom solo al hacer scroll (no al cargar). Margin superior reduce la zona "visible" para no disparar en load. */
const viewportScrollTrigger = {
  once: true,
  amount: 0.35,
  margin: "-400px 0px 0px 0px",
} as const;

const titleVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export function AdventureFeaturesSection() {
  return (
    <section className="relative w-full bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportScrollTrigger}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.h2
            className="text-center font-inter text-3xl font-extrabold text-primary-dark md:text-4xl"
            variants={titleVariants}
          >
            The perfect adventure awaits.
            <br />
            We are the best.
          </motion.h2>
          <motion.div
            className="mt-12 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-8 md:mt-16 md:gap-12"
            variants={staggerContainer}
          >
            {ADVENTURE_FEATURES.map(({ icon, text }) => (
              <motion.div key={text} variants={cardVariants}>
                <FeatureCard icon={icon}>{text}</FeatureCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <SectionSeparator className="text-cream top-14 md:top-24" />
    </section>
  );
}
