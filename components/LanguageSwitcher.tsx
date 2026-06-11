"use client";

import { useEffect, useState } from "react";

const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ja", label: "日本語" },
  { code: "pt", label: "Português" },
  { code: "zh-CN", label: "中文" },
  { code: "ko", label: "한국어" },
];

function getCurrentLang(): string {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return "es";
  const parts = decodeURIComponent(match[1]).split("/");
  return parts[2] || "es";
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    setLang(getCurrentLang());
  }, []);

  const changeLang = (code: string) => {
    const domain = window.location.hostname;

    if (code === "es") {
      // Volver al español = borrar la cookie de traducción
      document.cookie =
        "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    } else {
      const value = `/es/${code}`;
      document.cookie = `googtrans=${value}; path=/`;
      document.cookie = `googtrans=${value}; path=/; domain=.${domain}`;
    }

    // Recargar para que el motor aplique el idioma
    window.location.reload();
  };

  return (
    <select
      value={lang}
      onChange={(e) => changeLang(e.target.value)}
      className="lang-select"
      aria-label="Seleccionar idioma"
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}