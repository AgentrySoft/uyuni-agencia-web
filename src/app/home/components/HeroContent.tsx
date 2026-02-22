import Link from "next/link";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { CompassIcon } from "./CompassIcon";

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="flex flex-col items-center gap-2 mt-[100px]">
        <span className="font-playfair text-2xl font-bold text-primary-dark md:text-3xl">
          <span>Explore the infinite beauty of</span>
        </span>
        <span className="font-rem text-5xl font-extrabold uppercase tracking-tight text-primary md:text-8xlxl lg:text-9xl">
          UYUNI
        </span>
      </h1>
      <p className="mt-4 max-w-md font-playfair text-lg font-bold text-primary-dark md:text-xl">
        <span className="inline-block rounded-2xl bg-cream/30 backdrop-blur-sm p-2">
          Experience the magic of salt landscapes on our exclusive tours
        </span>
      </p>
      <div className="mt-8">
        <Link
          href="#tours"
          className="block w-fit [&_button]:pointer-events-none"
        >
          <ButtonBase
            size="large"
            className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
          >
            <CompassIcon className="h-6 w-6 shrink-0 text-cream md:h-7 md:w-7" />
            Explore Routes
          </ButtonBase>
        </Link>
      </div>
    </div>
  );
}
