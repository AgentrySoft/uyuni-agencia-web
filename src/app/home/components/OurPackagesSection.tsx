"use client";

import { motion } from "motion/react";
import {
  CardPackage,
  CardPackageAction,
  CardPackageDestination,
  CardPackageImage,
  CardPackageTitle,
} from "@/app/common/components/CardPackage";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { OUR_PACKAGES } from "@/app/home/content/our-packages-content";
import {
  staggerContainerFast,
  viewportOnce,
} from "@/app/common/lib/motion-variants";

const easeOut = [0.22, 1, 0.36, 1] as const;
const titleReveal = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/**
 * Sección "Our Packages" con fondo parallax (uyuni-people-jump-bo.jpg),
 * overlay con gradiente, título y cards con flex wrap (max 400px por card;
 * móvil 80% ancho; pantallas grandes 2 o 3 por fila).
 */
export function OurPackagesSection() {
  return (
    <section
      id="packages"
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/uyuni-people-jump-bo.jpg)",
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

      <div className="relative z-10 px-6 py-16 md:px-12 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={titleReveal}
        >
          <h2 className="text-center font-inter text-[64px] font-extrabold text-white">
            Our Packages
          </h2>
        </motion.div>

        {/* Cards con stagger y scale */}
        <motion.div
          className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerFast}
        >
          {OUR_PACKAGES.map(
            ({ image, imageAlt, icon, title, destination, buttonLabel }) => (
              <motion.div
                key={title}
                className="w-[90%] max-w-[400px] sm:w-[300px] min-w-0 md:flex-[1_1_280px]"
                variants={cardReveal}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <CardPackage className="h-full w-full">
                  <CardPackageImage src={image} alt={imageAlt} icon={icon} />
                  <CardPackageTitle>{title}</CardPackageTitle>
                  <CardPackageDestination>{destination}</CardPackageDestination>
                  <CardPackageAction>
                    <ButtonBase
                      size="small"
                      className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
                    >
                      {buttonLabel}
                    </ButtonBase>
                  </CardPackageAction>
                </CardPackage>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
