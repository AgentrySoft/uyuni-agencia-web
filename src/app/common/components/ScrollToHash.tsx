"use client";

import { useEffect } from "react";

/**
 * Al cargar la página con hash (ej. /#packages), hace scroll suave a esa sección
 * después de que el DOM esté listo.
 */
export function ScrollToHash() {
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash || hash === "#") return;

    const id = hash.slice(1);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const timeout = requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(timeout);
    }
  }, []);

  return null;
}
