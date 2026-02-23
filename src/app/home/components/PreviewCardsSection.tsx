import {
  CardPackage,
  CardPackageAction,
  CardPackageDestination,
  CardPackageImage,
  CardPackageTitle,
} from "@/app/common/components/CardPackage";
import {
  CardService,
  CardServiceAction,
  CardServiceDescription,
  CardServiceImage,
  CardServiceTitle,
} from "@/app/common/components/CardService";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { ComfortableIcon, SafeTransportIcon } from "./icons";

/**
 * Sección de prueba: cards tipo preview de post/sección informativa.
 * Usa CardService por composición con icono opcional en la imagen.
 */
export function PreviewCardsSection() {
  return (
    <section className="w-full bg-salt px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center font-playfair text-3xl font-bold text-primary-dark md:text-4xl">
          Preview cards (prueba)
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <CardPackage>
            <CardPackageImage
              src="/images/salar-de-uyuni-bo.webp"
              alt="Full Day Uyuni Salt Flat"
              icon={<SafeTransportIcon className="w-12 h-12" />}
            />
            <CardPackageTitle>Full Day Uyuni Salt Flat</CardPackageTitle>
            <CardPackageDestination>Uyuni</CardPackageDestination>
            <CardPackageAction>
              <ButtonBase
                size="small"
                className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
              >
                Show Details
              </ButtonBase>
            </CardPackageAction>
          </CardPackage>
          <CardService>
            <CardServiceImage
              src="/images/salar-de-uyuni-bo.webp"
              alt="Alojamiento en Uyuni"
              icon={<ComfortableIcon />}
            />
            <CardServiceTitle>Comfortable Accommodation:</CardServiceTitle>
            <CardServiceDescription>
              Enjoy the best hotels and lodging, carefully selected for your comfort.
            </CardServiceDescription>
            <CardServiceAction>
              <ButtonBase
                size="large"
                className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
              >
                See Hotels
              </ButtonBase>
            </CardServiceAction>
          </CardService>
        </div>
      </div>
    </section>
  );
}
