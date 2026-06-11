"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtranslateSettings?: Record<string, unknown>;
  }
}

// Guardamos el selector original para reutilizarlo al navegar
let cachedWidget: HTMLElement | null = null;
let scriptLoaded = false;

export default function GoogleTranslate() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const wrapper = document.querySelector(".gtranslate_wrapper");
      if (!wrapper) return;

      // Si el wrapper ya tiene el selector, guardamos referencia y listo
      if (wrapper.childElementCount > 0) {
        cachedWidget = wrapper.firstElementChild as HTMLElement;
        return;
      }

      // Si ya teníamos el selector guardado, lo movemos al wrapper nuevo
      if (cachedWidget) {
        wrapper.appendChild(cachedWidget);
        return;
      }

      // Primera carga: configurar y cargar el script UNA sola vez
      if (scriptLoaded) return;
      scriptLoaded = true;

      window.gtranslateSettings = {
        default_language: "es",
        languages: ["es", "en", "fr", "ja", "pt", "zh-CN", "ko"],
        wrapper_selector: ".gtranslate_wrapper",
      };

      const script = document.createElement("script");
      script.id = "gtranslate-script";
      script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
      script.defer = true;

      script.onload = () => {
        // Cuando el script termine de crear el selector, lo guardamos
        setTimeout(() => {
          const w = document.querySelector(".gtranslate_wrapper");
          if (w?.firstElementChild) {
            cachedWidget = w.firstElementChild as HTMLElement;
          }
        }, 500);
      };

      document.body.appendChild(script);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}