"use client";

import { motion } from "motion/react";
import {
  CardService,
  CardServiceAction,
  CardServiceDescription,
  CardServiceImage,
  CardServiceTitle,
} from "@/app/common/components/CardService";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { TOURS_PARALLAX_SERVICES } from "@/app/home/content/tours-parallax-services-content";
import {
  staggerContainer,
  viewportOnce,
} from "@/app/common/lib/motion-variants";

const easeOut = [0.22, 1, 0.36, 1] as const;
const textReveal = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/**
 * Sección con fondo parallax (background-attachment: fixed), overlay con gradiente,
 * texto promocional y 3 cards de servicios. Imagen: uyuni-tren-bo.jpg
 */
export function ToursParallaxSection() {
  return (
    <section
      id="tours"
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/uyuni-tren-bo.jpg)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay con gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.52) 50%)",
        }}
      />

      {/* Bloque parallax: texto centrado con scroll reveal */}
      <motion.div
        className="relative z-10 flex h-auto items-center justify-center px-6 py-20 md:px-12 lg:px-20 pt-40"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={textReveal}
      >
        <p className="max-w-xl text-center font-inter font-extrabold text-white text-3xl leading-9 md:text-[40px] md:leading-[60px]">
          Our <span className="text-card-bg">tours</span> are designed to offer
          you an unforgettable experience in the Uyuni Salt Flats.{" "}
          <span className="text-card-bg">Discover</span>{" "}
          <span className="text-card-bg">surreal landscapes</span>,{" "}
          <span className="text-card-bg">unique wildlife</span>, and{" "}
          <span className="text-card-bg">local culture</span>.
        </p>
      </motion.div>

      {/* Cards con stagger espectacular */}
      <motion.div
        className="relative z-10 mx-auto flex w-[80%] max-w-[900px] flex-col gap-8 pb-20 pt-4 min-[1200px]:w-full"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {TOURS_PARALLAX_SERVICES.map(
          ({ image, imageAlt, icon, title, description, buttonLabel }) => (
            <motion.div
              key={title}
              variants={cardReveal}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.99 }}
            >
              <CardService className="w-full">
                <CardServiceImage src={image} alt={imageAlt} icon={icon} />
                <div className="flex flex-col gap-2 justify-center items-center md:flex-row">
                  <div className="flex flex-col gap-2">
                    <CardServiceTitle>{title}</CardServiceTitle>
                    <CardServiceDescription>{description}</CardServiceDescription>
                  </div>
                  <div className="shrink-0">
                    <CardServiceAction>
                      <ButtonBase
                        size="large"
                        className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
                      >
                        {buttonLabel}
                      </ButtonBase>
                    </CardServiceAction>
                  </div>
                </div>
              </CardService>
            </motion.div>
          )
        )}
      </motion.div>
    </section>
  );
}
