import {
  CardService,
  CardServiceAction,
  CardServiceDescription,
  CardServiceImage,
  CardServiceTitle,
} from "@/app/common/components/CardService";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { TOURS_PARALLAX_SERVICES } from "@/app/home/content/tours-parallax-services-content";

/**
 * Sección con fondo parallax (background-attachment: fixed), overlay con gradiente,
 * texto promocional y 3 cards de servicios. Imagen: uyuni-tren-bo.jpg
 */
export function ToursParallaxSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/uyuni-tren-bo.jpg)",
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

      {/* Bloque parallax: texto centrado */}
      <div className="relative z-10 flex h-auto items-center justify-center px-6 py-20 md:px-12 lg:px-20 pt-40">
        <p
          className="max-w-xl text-center font-inter font-extrabold text-white text-3xl leading-9 md:text-[40px] md:leading-[60px]"
        >
          Our <span className="text-card-bg">tours</span> are designed to offer
          you an unforgettable experience in the Uyuni Salt Flats.{" "}
          <span className="text-card-bg">Discover</span>{" "}
          <span className="text-card-bg">surreal landscapes</span>,{" "}
          <span className="text-card-bg">unique wildlife</span>, and{" "}
          <span className="text-card-bg">local culture</span>.
        </p>
      </div>

      {/* Cards: ancho 80% cuando viewport < 1200px, max 1000px; cada card ocupa todo el ancho */}
      <div className="relative z-10 mx-auto flex w-[80%] max-w-[900px] flex-col gap-8 pb-20 pt-4 min-[1200px]:w-full">
        {TOURS_PARALLAX_SERVICES.map(
          ({ image, imageAlt, icon, title, description, buttonLabel }) => (
            <CardService key={title} className="w-full">
              <CardServiceImage src={image} alt={imageAlt} icon={icon} />
              <div className="flex flex-col gap-2 justify-center items-center md:flex-row">
                <div className="flex flex-col gap-2">
                  <CardServiceTitle>{title}</CardServiceTitle>
                  <CardServiceDescription>{description}</CardServiceDescription>
                </div>
                <div className="shrink-0">
                  <CardServiceAction>
                    <ButtonBase
                      size="large"
                      className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
                    >
                      {buttonLabel}
                    </ButtonBase>
                  </CardServiceAction>
                </div>
              </div>
            </CardService>
          )
        )}
      </div>
    </section>
  );
}
