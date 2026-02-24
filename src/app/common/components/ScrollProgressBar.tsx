"use client";

import { motion, useScroll } from "motion/react";

/**
 * Barra de progreso de lectura (scroll-linked) en la parte superior.
 * Documentación: https://motion.dev/docs/react-scroll-animations
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-1 bg-primary origin-left"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
