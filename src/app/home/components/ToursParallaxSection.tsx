"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  CardService,
  CardServiceAction,
  CardServiceDescription,
  CardServiceImage,
  CardServiceTitle,
} from "@/app/common/components/CardService";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { Modal } from "@/app/common/components/Modal";
import { TOURS_PARALLAX_SERVICES } from "@/app/home/content/tours-parallax-services-content";
import { SERVICE_MODAL_CONTENT } from "@/app/home/content/service-modal-content";
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
 * Sección de servicios (tours). El fondo fijo y el crossfade con paquetes
 * se gestionan en ToursPackagesParallax.
 */
export function ToursParallaxSection() {
  const [serviceModalSlug, setServiceModalSlug] = useState<string | null>(null);
  const serviceContent =
    serviceModalSlug != null ? SERVICE_MODAL_CONTENT[serviceModalSlug] : null;

  return (
    <section id="tours" className="relative z-10 w-full overflow-hidden">
      <div className="relative z-10">

      {/* Bloque: texto centrado con scroll reveal */}
      <motion.div
        className="relative z-10 flex min-h-[40svh] flex-shrink-0 items-center justify-center px-6 py-20 pt-40 md:px-12 md:py-20 lg:px-20 !pt-40"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={textReveal}
      >
        <p className="max-w-xl text-center font-inter font-extrabold text-white text-3xl leading-9 md:text-[40px] md:leading-[60px]">
          Nuestros <span className="text-card-bg">tours</span> están diseñados para ofrecerte
          una experiencia inolvidable en el Salar de Uyuni.{" "}
          <span className="text-card-bg">Descubre</span>{" "}
          <span className="text-card-bg">paisajes surreales</span>,{" "}
          <span className="text-card-bg">fauna única</span> y{" "}
          <span className="text-card-bg">cultura local</span>.
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
          ({
            image,
            imageAlt,
            icon,
            title,
            description,
            buttonLabel,
            modalSlug,
          }) => (
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
                        onClick={() => setServiceModalSlug(modalSlug)}
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
      </div>

      {serviceContent != null && (
        <Modal
          open={serviceModalSlug != null}
          onClose={() => setServiceModalSlug(null)}
          title={serviceContent.title}
          size="lg"
        >
          <div className="space-y-4">
            {serviceContent.imageUrl != null && (
              <div className="relative -mx-6 -mt-1 mb-2 aspect-[16/9] w-[calc(100%+3rem)] overflow-hidden rounded-t-2xl md:aspect-[2/1]">
                <Image
                  src={serviceContent.imageUrl}
                  alt={serviceContent.imageAlt ?? serviceContent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}
            {serviceContent.subtitle != null && (
              <p className="font-inter text-base font-semibold text-primary-dark/80">
                {serviceContent.subtitle}
              </p>
            )}
            {serviceContent.body.map((paragraph, i) => (
              <p
                key={i}
                className="font-inter text-sm leading-relaxed text-primary-dark/90 md:text-base"
              >
                {paragraph}
              </p>
            ))}
            {serviceContent.highlights != null &&
              serviceContent.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-primary/20 pt-4">
                  {serviceContent.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 font-inter text-sm text-primary-dark md:text-base"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </Modal>
      )}
    </section>
  );
}
