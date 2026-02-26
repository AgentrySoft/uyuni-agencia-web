"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  CardPackage,
  CardPackageAction,
  CardPackageDestination,
  CardPackageImage,
  CardPackageTitle,
} from "@/app/common/components/CardPackage";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { Modal } from "@/app/common/components/Modal";
import { PackageTimeline } from "@/app/home/components/PackageTimeline";
import { OUR_PACKAGES } from "@/app/home/content/our-packages-content";
import {
  PACKAGE_CONTENT,
  type PackageModalContent,
} from "@/app/home/content/package-modal-content";
import {
  staggerContainerFast,
  viewportEarlier,
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
function PackageModalBody({ content }: { content: PackageModalContent }) {
  return (
    <div className="space-y-5">
      {content.imageUrl != null && (
        <div className="relative -mx-6 -mt-1 aspect-[16/9] w-[calc(100%+3rem)] overflow-hidden rounded-xl">
          <Image
            src={content.imageUrl}
            alt={content.imageAlt ?? content.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      )}
      <p className="font-inter text-sm leading-relaxed text-primary-dark/90 md:text-base">
        {content.description}
      </p>
      <div className="rounded-xl bg-primary/5 p-4">
        <p className="mb-3 font-rem text-sm font-bold text-primary-dark">
          Duración: {content.duration} · Destino: {content.destination}
        </p>
        <PackageTimeline key={content.title} days={content.days} />
      </div>
    </div>
  );
}

export function OurPackagesSection() {
  const [packageModalSlug, setPackageModalSlug] = useState<string | null>(null);
  const packageContent =
    packageModalSlug != null ? PACKAGE_CONTENT[packageModalSlug as keyof typeof PACKAGE_CONTENT] : null;

  return (
    <section id="packages" className="relative w-full overflow-hidden">
      {/* Capa de fondo con altura en svh (estable al mostrar/ocultar barra de Chrome); sticky = parallax contenido en la sección */}
      <div className="sticky top-0 z-0 h-[200svh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/uyuni-people-jump-bo.jpg)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.52) 50%)",
          }}
          aria-hidden
        />
      </div>
      {/* Contenido superpuesto sobre la capa sticky */}
      <div className="relative z-10 -mt-[200svh] min-h-[50svh] px-6 py-16 md:px-12 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarlier}
          variants={titleReveal}
        >
          <h2 className="text-center font-inter text-[64px] font-extrabold text-white">
            Nuestros paquetes
          </h2>
        </motion.div>

        {/* Cards con stagger y scale */}
        <motion.div
          className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarlier}
          variants={staggerContainerFast}
        >
          {OUR_PACKAGES.map(
            ({
              image,
              imageAlt,
              icon,
              title,
              destination,
              buttonLabel,
              modalSlug,
            }) => (
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
                      onClick={() => setPackageModalSlug(modalSlug)}
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

      {packageContent != null && (
        <Modal
          open={packageModalSlug != null}
          onClose={() => setPackageModalSlug(null)}
          title={packageContent.title}
          size="xl"
        >
          <PackageModalBody content={packageContent} />
        </Modal>
      )}
    </section>
  );
}
