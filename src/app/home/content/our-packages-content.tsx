import type { ReactNode } from "react";
import { UniqueRoutesIcon } from "@/app/home/components/icons";

export type OurPackageItem = {
  image: string;
  imageAlt: string;
  icon: ReactNode;
  title: string;
  destination: string;
  buttonLabel: string;
  /** Clave para el contenido del modal (package-modal-content) */
  modalSlug: string;
};

export const OUR_PACKAGES: OurPackageItem[] = [
  {
    image: "/images/packages/full-day-salt.png",
    imageAlt: "Salar de Uyuni día completo",
    icon: <UniqueRoutesIcon />,
    title: "Salar de Uyuni día completo",
    destination: "Uyuni",
    buttonLabel: "Ver detalles",
    modalSlug: "salar-uyuni-dia-completo",
  },
  {
    image: "/images/packages/uyuni-atacama.png",
    imageAlt: "Uyuni - Atacama Chile clásico",
    icon: <UniqueRoutesIcon />,
    title: "Uyuni - Atacama Chile clásico",
    destination: "Uyuni-Atacama",
    buttonLabel: "Ver detalles",
    modalSlug: "uyuni-atacama-clasico",
  },
  {
    image: "/images/packages/days-in-salt.png",
    imageAlt: "Tour 3 días 2 noches con hoteles",
    icon: <UniqueRoutesIcon />,
    title: "Tour 3 días 2 noches con hoteles",
    destination: "Uyuni - Atacama",
    buttonLabel: "Ver detalles",
    modalSlug: "tour-3d-2n-hoteles",
  },
  {
    image: "/images/packages/san-pedro.png",
    imageAlt: "Uyuni - San Pedro de Atacama",
    icon: <UniqueRoutesIcon />,
    title: "Uyuni - San Pedro de Atacama",
    destination: "Uyuni",
    buttonLabel: "Ver detalles",
    modalSlug: "uyuni-san-pedro",
  },
  {
    image: "/images/packages/uyuni-night.png",
    imageAlt: "Tour nocturno Salar de Uyuni",
    icon: <UniqueRoutesIcon />,
    title: "Tour nocturno Salar de Uyuni",
    destination: "Uyuni",
    buttonLabel: "Ver detalles",
    modalSlug: "tour-nocturno",
  },
  {
    image: "/images/packages/uyuni-sunrise.png",
    imageAlt: "Observación de estrellas + amanecer 2 días",
    icon: <UniqueRoutesIcon />,
    title: "Observación de estrellas + amanecer 2 días",
    destination: "Uyuni",
    buttonLabel: "Ver detalles",
    modalSlug: "estrellas-amanecer-2d",
  },
];
