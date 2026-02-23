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
};

export const TOURS_PARALLAX_SERVICES: ToursParallaxServiceItem[] = [
  {
    image: "/images/hotels-salt.jpg",
    imageAlt: "Alojamiento cómodo en Uyuni",
    icon: <ComfortableIcon />,
    title: "Comfortable Accommodation:",
    description:
      "Enjoy the best hotels and lodging, carefully selected for your comfort.",
    buttonLabel: "See Hotels",
  },
  {
    image: "/images/transport.jpg",
    imageAlt: "Transporte seguro y confiable",
    icon: <SafeTransportIcon />,
    title: "Safe & Reliable Transportation:",
    description:
      "Travel with peace of mind in modern, secure vehicles, always at your service.",
    buttonLabel: "See More",
  },
  {
    image: "/images/routes.jpeg",
    imageAlt: "Rutas escénicas únicas",
    icon: <UniqueRoutesIcon />,
    title: "Unique Scenic Routes:",
    description:
      "Discover breathtaking landscapes on routes carefully designed for an unforgettable experience.",
    buttonLabel: "See More",
  },
];
