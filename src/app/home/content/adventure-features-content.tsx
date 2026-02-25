import type { ReactNode } from "react";
import { ComfortableIcon, SafeTransportIcon, UniqueRoutesIcon } from "@/app/home/components/icons";

export type AdventureFeatureItem = {
  icon: ReactNode;
  text: string;
};

export const ADVENTURE_FEATURES: AdventureFeatureItem[] = [
  {
    icon: <ComfortableIcon />,
    text: "Alojamiento cómodo",
  },
  {
    icon: <SafeTransportIcon />,
    text: "Transporte seguro y confiable",
  },
  {
    icon: <UniqueRoutesIcon />,
    text: "Rutas escénicas únicas",
  },
];
