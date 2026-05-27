"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

type GoogleTranslateOptions = {
  pageLanguage: string;
  includedLanguages: string;
  autoDisplay: boolean;
};

type GoogleTranslateConstructor = new (
  options: GoogleTranslateOptions,
  elementId: string
) => void;

// Tipos para el objeto de Google que se agrega a window
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: GoogleTranslateConstructor;
      };
    };
  }
}

const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";
const GOOGLE_TRANSLATE_ELEMENT_ID = "google_translate_element";

const idiomas = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
];

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Crear un solo contenedor oculto global para evitar IDs duplicados
    if (!document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID)) {
      const container = document.createElement("div");
      container.id = GOOGLE_TRANSLATE_ELEMENT_ID;
      container.style.display = "none";
      document.body.appendChild(container);
    }

    const initGoogleTranslate = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;

      if (!TranslateElement) return;

      const container = document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID);

      if (!container) return;

      // Evita inicializarlo más de una vez
      if (container.childNodes.length > 0) return;

      new TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "en,fr,it,pt,de",
          autoDisplay: false,
        },
        GOOGLE_TRANSLATE_ELEMENT_ID
      );
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    // Si Google Translate ya está cargado, inicializar directamente
    if (window.google?.translate?.TranslateElement) {
      initGoogleTranslate();
      return;
    }

    // Evita cargar el script dos veces
    if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  // Cambia el idioma usando el selector oculto de Google
  const cambiarIdioma = (lang: string) => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");

    if (!select) {
      setOpen(false);
      return;
    }

    // Para volver al idioma original de la página
    select.value = lang === "es" ? "" : lang;

    select.dispatchEvent(new Event("change", { bubbles: true }));

    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-current hover:opacity-70 transition"
        aria-label="Cambiar idioma"
        aria-expanded={open}
        title="Cambiar idioma"
      >
        <Globe size={18} />
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 bg-cream text-ink rounded-2xl shadow-lg border border-black/10 py-2 w-40 z-[200]">
          {idiomas.map((idioma) => (
            <button
              key={idioma.code}
              type="button"
              onClick={() => cambiarIdioma(idioma.code)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-cream-warm transition"
            >
              {idioma.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}