"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { AgentrysoftLogoSecondary } from "./AgentrysoftLogoSecondary";

/** Paleta Agentrysoft (hex exactos) */
const COLORS = {
  maastricht: "#0B2934",
  foreground: "#f8fafc",
  primary: "#89D800",
  primaryHover: "#a8e830",
  accent: "#30BAD5",
  footerGreen: "#00F298",
} as const;

const WHATSAPP_NUMBER = "59179413052";
const WHATSAPP_MESSAGE =
  "Hola, me gustaría tener mi propia página web profesional para mi agencia o negocio. ¿Me pueden dar más información?";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** Segundos antes de mostrar el modal automáticamente */
const AUTO_SHOW_AFTER_SEC = 10;

export function AgentrysoftSalesModal() {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);

  const showOnce = () => {
    if (shownRef.current) return;
    shownRef.current = true;
    setOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(showOnce, AUTO_SHOW_AFTER_SEC * 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let hadBeenHidden = false;
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") hadBeenHidden = true;
      if (document.visibilityState === "visible" && hadBeenHidden) showOnce();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 transition duration-200 data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl transition duration-200 data-closed:opacity-0 data-closed:scale-95"
          style={{ backgroundColor: COLORS.maastricht }}
        >
          <div className="flex max-h-[90vh] flex-col">
            <div className="flex shrink-0 items-center justify-between px-6 pt-6">
              <AgentrysoftLogoSecondary
                accentColor={COLORS.primary}
                baseColor={COLORS.foreground}
                width={180}
                height={40}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 transition hover:opacity-80"
                style={{ color: COLORS.foreground }}
                aria-label="Cerrar"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6" style={{ color: COLORS.foreground }}>
              <p className="text-center text-lg font-semibold leading-relaxed md:text-xl">
                ¿Te gustaría que tu agencia tenga una web como esta?
              </p>
              <p className="mt-4 text-center text-sm leading-relaxed opacity-95 md:text-base">
                Una página profesional atrae más clientes, transmite confianza y te diferencia de la competencia. Tu agencia merece una presencia que imponga respeto desde el primer click.
              </p>
              <p className="mt-3 text-center text-sm font-medium" style={{ color: COLORS.accent }}>
                Contáctanos y te contamos cómo.
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-center font-bold text-[#0B2934] transition hover:opacity-95"
                style={{ backgroundColor: COLORS.primary }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primaryHover;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary;
                }}
              >
                <span>Quiero mi propia página web</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            <div
              className="shrink-0 px-6 py-3 text-center text-xs font-medium"
              style={{ color: COLORS.footerGreen }}
            >
              Desarrollado por Agentrysoft
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
