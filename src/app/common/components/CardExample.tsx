import { ComfortableIcon } from "@/app/home/components/icons";
import { ButtonBase } from "./ButtonBase";
import Image from "next/image";

const CardExample = () => {
  return (
    <div className="relative h-[500px] bg-card-bg rounded-2xl overflow-hidden">
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute w-[700px] h-[700px] bg-gray-500 rounded-full bottom-0 -left-8 overflow-hidden">
          <div className="absolute h-[300px] w-full bottom-0 left-0 bg-red-500">
          <Image src="/images/salar-de-uyuni-bo.webp" alt="Uyuni - Atacama Chile" width={700} height={700} className="object-cover w-full h-full" />

          </div>
        </div>
        <div className="absolute bg-primary rounded-full w-24 h-24 flex items-center justify-center bottom-12 left-4">
          <ComfortableIcon className="w-12 h-12" />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pt-2 pb-5">
        <div className="font-rem text-3xl font-extrabold text-primary">
          Full Day Uyuni Salt Flat
        </div>
        <div className="font-inter text-xl font-semibold text-description">
          Uyuni - Atacama Chile
        </div>
        <div className="flex justify-center">
          <ButtonBase
            size="small"
            className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
          >
            Show Details
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default CardExample;