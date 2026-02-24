"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { CompassIcon } from "./CompassIcon";
import { SplitText } from "./SplitText";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export function HeroContent() {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <h1 className="flex flex-col items-center gap-2 mt-[100px]">
        <motion.span
          className="font-playfair text-2xl font-bold text-primary-dark md:text-3xl"
          variants={item}
        >
          Explore the infinite beauty of
        </motion.span>
        <motion.span variants={item}>
          <SplitText
            className="font-rem text-5xl font-extrabold uppercase tracking-tight text-primary md:text-8xl lg:text-9xl"
            delayPerChar={80}
          >
            UYUNI
          </SplitText>
        </motion.span>
      </h1>
      <motion.p
        className="mt-4 max-w-md font-playfair text-lg font-bold text-primary-dark md:text-xl"
        variants={item}
      >
        <span className="inline-block rounded-2xl bg-cream/30 backdrop-blur-sm p-2">
          Experience the magic of salt landscapes on our exclusive tours
        </span>
      </motion.p>
      <motion.div className="mt-8" variants={item}>
        <ButtonBase
          size="large"
          className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
        >
          <Link
            href="#tours"
            className="flex items-center gap-2 w-fit"
          >
            <CompassIcon className="h-6 w-6 shrink-0 text-cream md:h-7 md:w-7" />
            Explore Routes
          </Link>
        </ButtonBase>
      </motion.div>
    </motion.div>
  );
}
