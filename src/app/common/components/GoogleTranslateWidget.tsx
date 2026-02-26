"use client";

import { useEffect, useState, useRef } from "react";
import classNames from "classnames";

/** Altura aproximada por ítem del dropdown (py-2.5 + texto) */
const ITEM_HEIGHT_PX = 44;
const VISIBLE_ITEMS = 4;
const DROPDOWN_MAX_HEIGHT_PX = ITEM_HEIGHT_PX * VISIBLE_ITEMS;
const MIN_SPACE_BELOW_PX = DROPDOWN_MAX_HEIGHT_PX + 16; // + margen

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            autoDisplay?: boolean;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const LANGUAGES = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
] as const;

const INCLUDED_LANGUAGES = "es,en,de,fr";
const PAGE_LANGUAGE = "es";

type LangCode = (typeof LANGUAGES)[number]["code"];

type GoogleTranslateWidgetProps = {
  /** light = navbar con fondo claro (scrolled) → texto oscuro; dark = sobre hero → texto claro */
  variant?: "light" | "dark";
  className?: string;
};

export function GoogleTranslateWidget({ variant = "dark", className }: GoogleTranslateWidgetProps) {
  const [currentLang, setCurrentLang] = useState<LangCode>("es");
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined" || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenUpward(spaceBelow < MIN_SPACE_BELOW_PX);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const detectLang = () => {
      const lang = document.documentElement.lang || "";
      if (lang.startsWith("en")) setCurrentLang("en");
      else if (lang.startsWith("de")) setCurrentLang("de");
      else if (lang.startsWith("fr")) setCurrentLang("fr");
      else setCurrentLang("es");
    };

    detectLang();

    const observer = new MutationObserver(detectLang);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    const googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      try {
        const el = document.getElementById("google_translate_element_nav");
        if (el && !el.querySelector(".goog-te-menu-frame")) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: PAGE_LANGUAGE,
              includedLanguages: INCLUDED_LANGUAGES,
              autoDisplay: false,
            },
            "google_translate_element_nav"
          );
        }
      } catch (e) {
        console.error("Google Translate init:", e);
      }
    };

    const init = () => {
      if (window.google?.translate) {
        googleTranslateElementInit();
      } else if (!initRef.current) {
        initRef.current = true;
        setTimeout(init, 100);
      }
    };

    const existing = document.querySelector('script[src*="translate.google.com"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateElementInit = googleTranslateElementInit;
      script.onload = () => setTimeout(init, 500);
    } else {
      window.googleTranslateElementInit = googleTranslateElementInit;
      init();
    }

    return () => observer.disconnect();
  }, [mounted]);

  const changeLanguage = async (lang: LangCode) => {
    if (typeof window === "undefined" || !window.google?.translate || currentLang === lang) return;
    setIsLoading(true);
    setIsOpen(false);

    const selectEl = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (!selectEl) {
      setIsLoading(false);
      return;
    }
    if (selectEl.value === lang) {
      setCurrentLang(lang);
      setIsLoading(false);
      return;
    }

    selectEl.value = lang;
    selectEl.dispatchEvent(new Event("change", { bubbles: true }));

    let attempts = 0;
    const check = () => {
      attempts++;
      const htmlLang = document.documentElement.lang || "";
      const ok =
        lang === "es"
          ? htmlLang === "es" || !htmlLang.startsWith("en")
          : htmlLang.startsWith(lang);
      if (ok || attempts >= 50) {
        setCurrentLang(lang);
        setIsLoading(false);
        return;
      }
      setTimeout(check, 100);
    };
    setTimeout(check, 200);
  };

  const current = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0];
  const isScrolled = variant === "light"; // navbar con fondo cream → botón texto oscuro

  if (!mounted) {
    return (
      <div className={classNames("relative notranslate", className)}>
        <button
          type="button"
          disabled
          className={classNames(
            "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-rem text-xs font-semibold uppercase tracking-wide notranslate md:text-sm",
            isScrolled
              ? "border-primary-dark/20 bg-cream/10 text-primary-dark"
              : "border-white/40 text-white"
          )}
          aria-label="Idioma"
        >
          <span className="notranslate">{current.flag}</span>
          <span className="hidden sm:inline notranslate">{current.code}</span>
        </button>
        <div id="google_translate_element_nav" className="hidden" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={classNames("relative notranslate", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        disabled={isLoading}
        className={classNames(
          "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-rem text-xs font-semibold uppercase tracking-wide transition-colors notranslate hover:opacity-90 md:text-sm",
          isScrolled
            ? "border-primary-dark/20 bg-cream/10 text-primary-dark hover:bg-cream/20"
            : "border-white/40 text-white hover:bg-white/10",
          isLoading && "opacity-70 cursor-wait"
        )}
        aria-label="Cambiar idioma"
        aria-expanded={isOpen}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            <span className="notranslate">{current.flag}</span>
            <span className="hidden sm:inline notranslate">{current.code}</span>
            <svg
              className={classNames("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {isOpen && !isLoading && (
        <>
          <div
            className="fixed inset-0 z-10 pointer-events-none"
            aria-hidden
          />
          <div
            className={classNames(
              "absolute right-0 z-20 w-36 rounded-lg border shadow-lg notranslate overflow-y-auto",
              openUpward ? "bottom-full mb-2" : "top-full mt-2",
              isScrolled ? "border-primary-dark/10 bg-cream" : "border-white/20 bg-cream/95 backdrop-blur"
            )}
            style={{ maxHeight: DROPDOWN_MAX_HEIGHT_PX }}
          >
            {LANGUAGES.map(({ code, label, flag }) => (
              <button
                key={code}
                type="button"
                onClick={() => changeLanguage(code)}
                disabled={currentLang === code}
                className={classNames(
                  "flex w-full items-center gap-2 px-3 py-2.5 text-left font-rem text-sm transition-colors notranslate first:rounded-t-lg last:rounded-b-lg",
                  currentLang === code
                    ? "bg-primary/15 text-primary-dark font-semibold cursor-default"
                    : isScrolled
                      ? "text-primary-dark hover:bg-primary/10"
                      : "text-primary-dark hover:bg-white/20"
                )}
              >
                <span className="text-lg notranslate">{flag}</span>
                <span className="notranslate">{label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div id="google_translate_element_nav" className="hidden" />
    </div>
  );
}
