"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import classNames from "classnames";
import { scrollToHashOnClick } from "@/app/common/lib/scroll-to-hash";

const MAIN_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "#about" },
  { label: "TOURS", href: "#tours" },
  { label: "PACKAGES", href: "#packages" },
  { label: "CONTACT US", href: "#contact" },
] as const;

const WHATSAPP_NUMBER = "59179413052";
const WHATSAPP_MESSAGE = "Hola yo quiero mi sitio web de turismo, quiero más información";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const SECONDARY_LINKS = [{ label: "CALL NOW", href: WHATSAPP_URL }] as const;

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

const SCROLL_THRESHOLD = 32;

export function HeroNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navScrolled = hasScrolled && !isMenuOpen;

  return (
    <>
      <nav
        className={classNames(
          "fixed left-0 right-0 top-0 z-30 w-full px-6 py-6 backdrop-blur-md transition-[background-color,box-shadow] duration-300 md:px-12",
          navScrolled
            ? "bg-cream/75 shadow-md shadow-primary-dark/10"
            : "bg-cream/5"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className={classNames(
              "font-rem text-lg font-extrabold uppercase tracking-wide transition-colors duration-300",
              navScrolled ? "text-primary-dark" : "text-white"
            )}
          >
            MI AGENCIA
          </Link>

          {/* Desktop: enlaces horizontales */}
          <ul className="hidden flex-wrap items-center justify-end gap-6 md:flex md:gap-8">
            {MAIN_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={(e) => scrollToHashOnClick(e, href)}
                  className={classNames(
                    "font-rem text-sm font-semibold uppercase tracking-wide transition-colors duration-300 hover:opacity-90 md:text-base",
                    navScrolled ? "text-primary" : "text-white"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            {SECONDARY_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classNames(
                    "font-rem text-sm font-semibold uppercase tracking-wide transition-colors duration-300 hover:opacity-90 md:text-base",
                    navScrolled ? "text-primary-dark" : "text-cream"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile: botón hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            className={classNames(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:opacity-90 md:hidden",
              navScrolled ? "text-primary-dark" : "text-cream"
            )}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>
      </nav>

      {/* Menú móvil: un solo wrapper, misma altura para abrir/cerrar */}
      <div
        className={classNames(
          "fixed inset-0 z-40 flex flex-col bg-cream/90 backdrop-blur-lg transition-opacity duration-300 ease-out md:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Cabecera: misma altura que el navbar (logo izquierda, cerrar derecha) */}
        <div className="flex flex-shrink-0 items-center justify-between px-6 py-6">
          <span className="font-rem text-lg font-extrabold uppercase tracking-wide text-primary-dark">
            MI AGENCIA
          </span>
          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary-dark transition-colors hover:bg-white/50"
            aria-label="Cerrar menú"
          >
            <MenuIcon open />
          </button>
        </div>

        {/* Opciones centradas */}
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <ul className="flex flex-col items-center gap-1 text-center">
            {MAIN_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={(e) => {
                    scrollToHashOnClick(e, href);
                    closeMenu();
                  }}
                  className="block py-3 font-rem text-xl font-semibold uppercase tracking-wide text-primary-dark transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="my-4 w-24 border-t border-primary-dark/20" />

          <ul className="flex flex-col items-center gap-1 text-center">
            {SECONDARY_LINKS.map(({ label, href }) => (
              <li key={label} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-dark/30" />
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="py-2 font-rem text-sm font-medium uppercase tracking-wide text-primary-dark/70 transition-colors hover:text-primary-dark"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
