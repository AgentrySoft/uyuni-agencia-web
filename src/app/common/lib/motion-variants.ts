"use client";

/**
 * Variantes y configuraciones reutilizables para Motion (motion.dev).
 * Scroll-triggered y entrance animations estilo scroll-reveal espectacular.
 */

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeInUpStrong = {
  hidden: { opacity: 0, y: 72 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Contenedor con stagger para hijos */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

/** Stagger más suave para listas largas */
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/** Viewport: animar una sola vez al entrar */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Viewport: disparar antes (cuando el elemento está más abajo), para secciones que quieren entrada más temprana */
export const viewportEarlier = {
  once: true,
  amount: 0.08,
  margin: "0px 0px 120px 0px",
} as const;

/** Viewport: disparar cuando un poco del elemento es visible */
export const viewportAmount = (amount: number) => ({ once: true, amount } as const);
