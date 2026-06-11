'use client';

import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    google?: any;
  }
}

export default function LanguageSwitcher() {
  const [showLanguages, setShowLanguages] = useState(false);

  useEffect(() => {
    // Cargar Google Translate al montar
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Crear el div invisible para Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'es' },
        'google_translate_element'
      );
    };
  }, []);

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ja', name: '日本語' },
    { code: 'pt', name: 'Português' },
    { code: 'zh-CN', name: '中文' },
    { code: 'ko', name: '한국어' },
  ];

  const changeLanguage = (code: string) => {
    if (code === 'es') {
      location.reload();
      return;
    }

    // Buscar y cambiar el select de Google Translate
    setTimeout(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event('change'));
      }
    }, 500);

    setShowLanguages(false);
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />

      <div className="relative">
        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
        >
          <Globe size={18} />
          <span className="hidden sm:inline">Idioma</span>
        </button>

        {showLanguages && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}