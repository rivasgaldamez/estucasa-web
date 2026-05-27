/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

// Tipos para el objeto de Google que se agrega a window
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Evita cargar el script dos veces
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "en,fr,ja,pt,zh-CN,ko",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Cambia el idioma usando el selector oculto de Google
  const cambiarIdioma = (lang: string) => {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;

    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }

    setOpen(false);
  };

  const idiomas = [
    { code: "es", label: "Español" },
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "ja", label: "Japones" },
    { code: "pt", label: "Português" },
    { code: "zh-CN", label: "Chino simplificado" },
    { code: "ko", label: "Coreano" },
  ];

  return (
    <div className="relative">
      {/* Contenedor oculto que Google necesita */}
      <div id="google_translate_element" className="hidden" />

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-current hover:opacity-70 transition"
        aria-label="Cambiar idioma"
        title="Cambiar idioma"
      >
        <Globe size={18} />
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 bg-cream text-ink rounded-2xl shadow-lg border border-black/10 py-2 w-48 z-[200]">
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