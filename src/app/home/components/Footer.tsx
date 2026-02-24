"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { staggerContainerFast, viewportOnce } from "@/app/common/lib/motion-variants";

const FOOTER_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
  { label: "Tours", href: "#packages" },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;
const itemReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export function Footer() {
  return (
    <footer className="w-full bg-cream px-6 py-12 md:px-12 lg:px-20">
      <motion.div
        className="mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainerFast}
      >
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <motion.div variants={itemReveal}>
            <p className="font-rem text-lg font-extrabold uppercase tracking-wide text-primary-dark">
              MI AGENCIA
            </p>
          </motion.div>

          <motion.div className="text-left" variants={itemReveal}>
            <h3 className="font-rem text-lg font-bold text-primary-dark">
              Address
            </h3>
            <p className="mt-2 font-rem text-base font-normal text-primary-dark">
              AVENIDA FERROVIARIA S/N
              <br />
              Uyuni, Bolivia
            </p>
          </motion.div>

          <motion.div className="text-left" variants={itemReveal}>
            <h3 className="font-rem text-lg font-extrabold text-primary-dark">
              Mi Agencia
            </h3>
            <nav className="mt-2 flex flex-col items-start gap-1" aria-label="Footer navigation">
              {FOOTER_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-rem text-base font-normal text-primary-dark underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>

        <motion.p
          className="mt-12 border-t border-primary-dark/20 pt-8 text-center font-rem text-base font-normal text-primary-dark"
          variants={itemReveal}
        >
          © Copyright, Mi Agencia, Uyuni, Bolivia, 2026
        </motion.p>
      </motion.div>
    </footer>
  );
}
