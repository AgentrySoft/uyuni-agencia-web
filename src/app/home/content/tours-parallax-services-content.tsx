import type { ReactNode } from "react";
import {
  ComfortableIcon,
  SafeTransportIcon,
  UniqueRoutesIcon,
} from "@/app/home/components/icons";

export type ToursParallaxServiceItem = {
  image: string;
  imageAlt: string;
  icon: ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  /** Clave para abrir el modal de servicio (service-modal-content) */
  modalSlug: string;
};

export const TOURS_PARALLAX_SERVICES: ToursParallaxServiceItem[] = [
  {
    image: "/images/hotels-salt.jpg",
    imageAlt: "Alojamiento cómodo en Uyuni",
    icon: <ComfortableIcon />,
    title: "Alojamiento cómodo:",
    description:
      "Disfruta de los mejores hoteles y alojamientos, seleccionados para tu comodidad.",
    buttonLabel: "Ver hoteles",
    modalSlug: "alojamiento-comodo",
  },
  {
    image: "/images/transport.jpg",
    imageAlt: "Transporte seguro y confiable",
    icon: <SafeTransportIcon />,
    title: "Transporte seguro y confiable:",
    description:
      "Viaja con tranquilidad en vehículos modernos y seguros, siempre a tu servicio.",
    buttonLabel: "Ver más",
    modalSlug: "transporte-seguro",
  },
  {
    image: "/images/routes.jpeg",
    imageAlt: "Rutas escénicas únicas",
    icon: <UniqueRoutesIcon />,
    title: "Rutas escénicas únicas:",
    description:
      "Descubre paisajes impresionantes en rutas diseñadas para una experiencia inolvidable.",
    buttonLabel: "Ver más",
    modalSlug: "rutas-escenicas",
  },
];
