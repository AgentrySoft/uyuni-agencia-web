import {
  CardPackage,
  CardPackageAction,
  CardPackageDestination,
  CardPackageImage,
  CardPackageTitle,
} from "@/app/common/components/CardPackage";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { OUR_PACKAGES } from "@/app/home/content/our-packages-content";

/**
 * Sección "Our Packages" con fondo parallax (uyuni-people-jump-bo.jpg),
 * overlay con gradiente, título y cards con flex wrap (max 400px por card;
 * móvil 80% ancho; pantallas grandes 2 o 3 por fila).
 */
export function OurPackagesSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/uyuni-people-jump-bo.jpg)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay con gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.52) 50%)",
        }}
      />

      <div className="relative z-10 px-6 py-16 md:px-12 lg:px-20">
        {/* Título: Inter extrabold 64px blanco */}
        <h2 className="text-center font-inter text-[64px] font-extrabold text-white">
          Our Packages
        </h2>

        {/* Cards: 80% ancho en móvil; en pantallas grandes max 400px con flex wrap (2 o 3 por fila) */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-8 lg:gap-10">
          {OUR_PACKAGES.map(
            ({ image, imageAlt, icon, title, destination, buttonLabel }) => (
              <div
                key={title}
                className="w-[90%] max-w-[400px] sm:w-[300px] min-w-0 md:flex-[1_1_280px]"
              >
                <CardPackage className="h-full w-full">
                  <CardPackageImage src={image} alt={imageAlt} icon={icon} />
                  <CardPackageTitle>{title}</CardPackageTitle>
                  <CardPackageDestination>{destination}</CardPackageDestination>
                  <CardPackageAction>
                    <ButtonBase
                      size="small"
                      className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
                    >
                      {buttonLabel}
                    </ButtonBase>
                  </CardPackageAction>
                </CardPackage>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
