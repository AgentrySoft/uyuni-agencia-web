import Image from "next/image";
import { Children, type ReactNode } from "react";

type CardPackageProps = {
  children: ReactNode;
  className?: string;
};

const CONTENT_WRAPPER_CLASS =
  "flex shrink-0 flex-col gap-2 px-5 pt-2 pb-5";

export function CardPackage({ children, className }: CardPackageProps) {
  const childArray = Children.toArray(children);
  const first = childArray[0];
  const rest = childArray.slice(1);

  return (
    <article
      className={`relative flex h-[500px] flex-col overflow-hidden rounded-2xl bg-card-bg ${className ?? ""}`}
    >
      {first}
      {rest.length > 0 ? <div className={CONTENT_WRAPPER_CLASS}>{rest}</div> : null}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* CardPackageImage (imagen circular + slot opcional para icono)
/* -------------------------------------------------------------------------- */

type CardPackageImageProps = {
  src: string;
  alt: string;
  /** Icono opcional en el círculo inferior izquierdo */
  icon?: ReactNode;
  className?: string;
};

export function CardPackageImage({ src, alt, icon, className }: CardPackageImageProps) {
  return (
    <div
      className={`relative h-[300px] shrink-0 overflow-hidden ${className ?? ""}`}
    >
      {/* Contenedor circular: la imagen se recorta en círculo */}
      <div className="absolute bottom-0 -left-8 h-[700px] w-[700px] overflow-hidden rounded-full">
        <div className="absolute bottom-0 left-0 h-[300px] w-full">
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      </div>
      {icon != null ? (
        <div
          className="absolute bottom-12 left-4 flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary"
          aria-hidden
        >
          <div className="text-cream [&_svg]:h-12 [&_svg]:w-12 [&_svg]:max-h-[3rem] [&_svg]:max-w-[3rem]">
            {icon}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CardPackageTitle — font-rem text-3xl font-extrabold text-primary
/* -------------------------------------------------------------------------- */

type CardPackageTitleProps = {
  children: ReactNode;
  className?: string;
};

export function CardPackageTitle({ children, className }: CardPackageTitleProps) {
  return (
    <h3
      className={`font-rem text-3xl font-extrabold text-primary ${className ?? ""}`}
    >
      {children}
    </h3>
  );
}

/* -------------------------------------------------------------------------- */
/* CardPackageDestination — font-inter text-xl font-semibold text-description
/* -------------------------------------------------------------------------- */

type CardPackageDestinationProps = {
  children: ReactNode;
  className?: string;
};

export function CardPackageDestination({ children, className }: CardPackageDestinationProps) {
  return (
    <p
      className={`font-inter text-xl font-semibold text-description ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* CardPackageAction (contenedor del botón/CTA, centrado)
/* -------------------------------------------------------------------------- */

type CardPackageActionProps = {
  children: ReactNode;
  className?: string;
};

export function CardPackageAction({ children, className }: CardPackageActionProps) {
  return (
    <div className={`flex justify-center ${className ?? ""}`}>
      {children}
    </div>
  );
}
