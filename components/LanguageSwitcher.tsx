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
    const current = getCurrentLang();
    setLang(current);
    if (current === "es") return;

    // Aplicar el idioma guardado cuando el widget termine de cargar
    let tries = 0;
    const timer = window.setInterval(() => {
      tries++;
      const w = window as unknown as { doGTranslate?: (pair: string) => void };
      const sel = document.querySelector<HTMLSelectElement>("select.gt_selector");
      if (typeof w.doGTranslate === "function" && sel) {
        window.clearInterval(timer);
        if (sel.value === `es|${current}`) return;
        let last = 0;
        try { last = Number(sessionStorage.getItem("gt-last") || 0); } catch {}
        if (Date.now() - last < 3000) return; // freno anti-bucle
        try { sessionStorage.setItem("gt-last", String(Date.now())); } catch {}
        w.doGTranslate(`es|${current}`);
      } else if (tries > 40) {
        window.clearInterval(timer);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, []);

  const changeLang = (code: string) => {
    const domain = window.location.hostname;

    if (code === "es") {
      document.cookie =
        "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    } else {
      const value = `/es/${code}`;
      document.cookie = `googtrans=${value}; path=/`;
      document.cookie = `googtrans=${value}; path=/; domain=.${domain}`;
    }

    setLang(code);
    const w = window as unknown as { doGTranslate?: (pair: string) => void };
    if (typeof w.doGTranslate === "function") {
      try { sessionStorage.setItem("gt-last", String(Date.now())); } catch {}
      w.doGTranslate(`es|${code}`);
      if (code === "es") window.setTimeout(() => window.location.reload(), 300);
    } else {
      window.location.reload();
    }
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