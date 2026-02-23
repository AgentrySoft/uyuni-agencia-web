import classNames from "classnames";

/**
 * Separador con forma de triangle.svg (mismo patrón que HeroSeparator).
 * El fill es el color de la sección que queda debajo.
 */
export function SectionSeparator({
  className,
}: Props) {
  return (
    <div className={classNames("relative z-10 w-full", className)} aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block h-14 w-full md:h-24"
      >
        <path
          d="M1200 0L0 0 598.97 114.72 1200 0z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

type Props = {
  className?: string;
  /** Color del relleno (sección inferior). Por defecto sky. */
  fill?: string;
};
