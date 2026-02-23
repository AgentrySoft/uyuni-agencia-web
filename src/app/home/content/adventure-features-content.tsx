import type { ReactNode } from "react";
import { ComfortableIcon, SafeTransportIcon, UniqueRoutesIcon } from "@/app/home/components/icons";

export type AdventureFeatureItem = {
  icon: ReactNode;
  text: string;
};

export const ADVENTURE_FEATURES: AdventureFeatureItem[] = [
  {
    icon: <ComfortableIcon />,
    text: "Comfortable Accommodation",
  },
  {
    icon: <SafeTransportIcon />,
    text: "Safe & Reliable Transportation",
  },
  {
    icon: <UniqueRoutesIcon />,
    text: "Unique Scenic Routes",
  },
];
