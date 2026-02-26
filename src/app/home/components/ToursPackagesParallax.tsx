"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const GRADIENT_OVERLAY =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.52) 50%)";

/**
 * Dos fondos fijos (servicios + paquetes) con crossfade suave:
 * - Al llegar a servicios: imagen servicios 100%, paquetes 0%.
 * - Al hacer scroll: servicios baja a 0%, paquetes sube a 100%.
 * - zoneOpacity = 1 cuando el bloque está en vista (rampa suave al entrar/salir).
 */
function ParallaxBackgrounds({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  // Progreso 0 = bloque entrando (top del bloque en bottom del viewport), 1 = bloque saliendo (bottom del bloque en top del viewport)
  const { scrollYProgress: inZoneProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: throughProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Rampa corta al entrar/salir: opacidad 1 en cuanto el bloque está en vista
  const zoneOpacity = useTransform(inZoneProgress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  const toursOpacity = useTransform(
    [throughProgress, zoneOpacity],
    ([through, z]) => (1 - (through as number)) * (z as number)
  );
  const packagesOpacity = useTransform(
    [throughProgress, zoneOpacity],
    ([through, z]) => (through as number) * (z as number)
  );

  return (
    <>
      <motion.div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          opacity: toursOpacity,
          backgroundImage: "url(/images/uyuni-tren-bo.jpg)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          opacity: packagesOpacity,
          backgroundImage: "url(/images/uyuni-people-jump-bo.jpg)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ opacity: zoneOpacity, background: GRADIENT_OVERLAY }}
        aria-hidden
      />
    </>
  );
}

type ToursPackagesParallaxProps = {
  children: React.ReactNode;
};

/**
 * Wrapper que envuelve Tours + Packages y gestiona el crossfade de fondos fijos.
 */
export function ToursPackagesParallax({ children }: ToursPackagesParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ParallaxBackgrounds containerRef={containerRef} />
      <div ref={containerRef} className="relative z-0">
        {children}
      </div>
    </>
  );
}
