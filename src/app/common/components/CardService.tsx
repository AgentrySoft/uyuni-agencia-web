import Image from "next/image";
import { Children, type ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/* CardService (raíz). Primer hijo = imagen; el resto se envuelve en el bloque de contenido.
/* -------------------------------------------------------------------------- */

type CardServiceProps = {
  children: ReactNode;
  className?: string;
};

const CONTENT_WRAPPER_CLASS =
  "flex shrink-0 flex-col border-t border-primary-dark/10 bg-card-bg px-5 py-4 md:px-6 md:py-5";

export function CardService({ children, className }: CardServiceProps) {
  const childArray = Children.toArray(children);
  const first = childArray[0];
  const rest = childArray.slice(1);

  return (
    <article
      className={`flex max-h-[500px] flex-col overflow-hidden rounded-2xl bg-card-bg shadow-lg ${className ?? ""}`}
    >
      {first}
      {rest.length > 0 ? <div className={CONTENT_WRAPPER_CLASS}>{rest}</div> : null}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* CardServiceImage (imagen + slot opcional para icono)
/* -------------------------------------------------------------------------- */

type CardServiceImageProps = {
  src: string;
  alt: string;
  /** Icono opcional en el círculo superior derecho */
  icon?: ReactNode;
  className?: string;
};

export function CardServiceImage({ src, alt, icon, className }: CardServiceImageProps) {
  return (
    <div
      className={`relative aspect-[16/9] w-full shrink-0 max-h-[320px] min-h-[220px] ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      {icon != null ? (
        <div className="absolute right-4 top-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-card-bg shadow-sm md:h-16 md:w-16">
          <div className="text-primary [&_svg]:h-7 [&_svg]:w-7 md:[&_svg]:h-8 md:[&_svg]:w-8">
            {icon}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CardServiceTitle
/* -------------------------------------------------------------------------- */

type CardServiceTitleProps = {
  children: ReactNode;
  className?: string;
};

export function CardServiceTitle({ children, className }: CardServiceTitleProps) {
  return (
    <h3
      className={`font-rem text-xl font-extrabold text-primary sm:text-2xl md:text-3xl ${className ?? ""}`}
    >
      {children}
    </h3>
  );
}

/* -------------------------------------------------------------------------- */
/* CardServiceDescription (line-clamp-2 por defecto)
/* -------------------------------------------------------------------------- */

type CardServiceDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function CardServiceDescription({ children, className }: CardServiceDescriptionProps) {
  return (
    <p
      className={`mt-1.5 line-clamp-2 font-rem text-sm font-semibold text-description sm:text-base md:text-lg ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* CardServiceAction (contenedor del botón/CTA)
/* -------------------------------------------------------------------------- */

type CardServiceActionProps = {
  children: ReactNode;
  className?: string;
};

export function CardServiceAction({ children, className }: CardServiceActionProps) {
  return (
    <div className={`mt-4 flex justify-end ${className ?? ""}`}>
      {children}
    </div>
  );
}
