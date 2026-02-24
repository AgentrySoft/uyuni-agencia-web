"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeInUp, viewportOnce } from "@/app/common/lib/motion-variants";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Variante: fadeInUp por defecto */
  variant?: "fadeInUp" | "fadeInUpStrong" | "fadeInScale";
  /** Delay en segundos */
  delay?: number;
};

const variants = {
  fadeInUp,
  fadeInUpStrong: {
    hidden: { opacity: 0, y: 72 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
  fadeInScale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
} as const;

export function ScrollReveal({
  children,
  className = "",
  variant = "fadeInUp",
  delay = 0,
}: ScrollRevealProps) {
  const v = variants[variant];
  const visibleWithDelay =
    typeof v.visible === "object" && "transition" in v.visible
      ? {
          ...v.visible,
          transition: {
            ...(typeof v.visible.transition === "object"
              ? v.visible.transition
              : {}),
            delay,
          },
        }
      : v.visible;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: v.hidden,
        visible: visibleWithDelay,
      }}
    >
      {children}
    </motion.div>
  );
}
