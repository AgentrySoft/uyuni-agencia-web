import type { ReactNode } from "react";
import { UniqueRoutesIcon } from "@/app/home/components/icons";

export type OurPackageItem = {
  image: string;
  imageAlt: string;
  icon: ReactNode;
  title: string;
  destination: string;
  buttonLabel: string;
};

export const OUR_PACKAGES: OurPackageItem[] = [
  {
    image: "/images/packages/full-day-salt.png",
    imageAlt: "Full Day Uyuni Salt Flat",
    icon: <UniqueRoutesIcon />,
    title: "Full Day Uyuni Salt Flat",
    destination: "Uyuni",
    buttonLabel: "Show Details",
  },
  {
    image: "/images/packages/uyuni-atacama.png",
    imageAlt: "Uyuni - Atacama Chile Classic",
    icon: <UniqueRoutesIcon />,
    title: "Uyuni - Atacama Chile Classic",
    destination: "Uyuni-Atacama",
    buttonLabel: "Show Details",
  },
  {
    image: "/images/packages/days-in-salt.png",
    imageAlt: "3 Days 2 Nights Tour with Hotels",
    icon: <UniqueRoutesIcon />,
    title: "3 Days 2 Nights Tour with Hotels",
    destination: "Uyuni - Atacama",
    buttonLabel: "Show Details",
  },
  {
    image: "/images/packages/san-pedro.png",
    imageAlt: "Uyuni - San Pedro de Atacama",
    icon: <UniqueRoutesIcon />,
    title: "Uyuni - San Pedro de Atacama",
    destination: "Uyuni",
    buttonLabel: "Show Details",
  },
  {
    image: "/images/packages/uyuni-night.png",
    imageAlt: "Tour Night Uyuni Salt Flat",
    icon: <UniqueRoutesIcon />,
    title: "Tour Night Uyuni Salt Flat",
    destination: "Uyuni",
    buttonLabel: "Show Details",
  },
  {
    image: "/images/packages/uyuni-sunrise.png",
    imageAlt: "Stargazing + Sunrise 2 days",
    icon: <UniqueRoutesIcon />,
    title: "Stargazing + Sunrise 2 days",
    destination: "Uyuni",
    buttonLabel: "Show Details",
  },
];
