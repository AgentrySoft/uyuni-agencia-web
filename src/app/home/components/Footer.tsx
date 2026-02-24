import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
  { label: "Tours", href: "#packages" },
] as const;

export function Footer() {
  return (
    <footer className="w-full bg-cream px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Tres columnas */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Columna izquierda: nombre / logo */}
          <div>
            <p className="font-rem text-lg font-extrabold uppercase tracking-wide text-primary-dark">
              MI AGENCIA
            </p>
          </div>

          {/* Columna central: dirección */}
          <div className="text-left">
            <h3 className="font-rem text-lg font-bold text-primary-dark">
              Address
            </h3>
            <p className="mt-2 font-rem text-base font-normal text-primary-dark">
              AVENIDA FERROVIARIA S/N
              <br />
              Uyuni, Bolivia
            </p>
          </div>

          {/* Columna derecha: enlaces */}
          <div className="text-left">
            <h3 className="font-rem text-lg font-extrabold text-primary-dark">
              Mi Agencia
            </h3>
            <nav className="mt-2 flex flex-col items-start gap-1" aria-label="Footer navigation">
              {FOOTER_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-rem text-base font-normal text-primary-dark underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-12 border-t border-primary-dark/20 pt-8 text-center font-rem text-base font-normal text-primary-dark">
          © Copyright, Mi Agencia, Uyuni, Bolivia, 2026
        </p>
      </div>
    </footer>
  );
}
