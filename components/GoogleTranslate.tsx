"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtranslateSettings?: Record<string, unknown>;
  }
}

export default function GoogleTranslate() {
  const pathname = usePathname();

  useEffect(() => {
    const init = () => {
      const wrapper = document.querySelector(".gtranslate_wrapper");

      // Si no hay wrapper en esta página, o ya tiene el selector, no hacer nada
      if (!wrapper || wrapper.childElementCount > 0) return;

      window.gtranslateSettings = {
        default_language: "es",
        languages: ["es", "en", "fr", "ja", "pt", "zh-CN", "ko"],
        wrapper_selector: ".gtranslate_wrapper",
      };

      // Quitar el script anterior y volver a cargarlo para que reinserte el selector
      document.getElementById("gtranslate-script")?.remove();

      const script = document.createElement("script");
      script.id = "gtranslate-script";
      script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
      script.defer = true;
      document.body.appendChild(script);
    };

    // Pequeña espera para asegurar que el navbar ya está montado
    const timer = setTimeout(init, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}