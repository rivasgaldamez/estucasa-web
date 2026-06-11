'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
    googleTranslateReady?: boolean;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'es',
            includedLanguages: 'es,en,fr,ja,pt,zh-CN,ko',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        
        // Marcar como listo
        window.googleTranslateReady = true;
        
        // Ocultar el widget
        setTimeout(() => {
          const element = document.getElementById('google_translate_element');
          if (element) {
            element.style.display = 'none !important';
            element.style.visibility = 'hidden';
            element.style.position = 'absolute';
            element.style.left = '-9999px';
            element.style.top = '-9999px';
          }
          
          const banner = document.querySelector('.goog-te-banner-frame') as HTMLElement;
          if (banner) {
            banner.style.display = 'none !important';
          }
        }, 100);
        
      } catch (error) {
        console.error('Google Translate init error:', error);
      }
    };

    // Cargar el script
    if (!window.google?.translate) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else {
      window.googleTranslateElementInit?.();
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        display: 'none',
        visibility: 'hidden',
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
      }}
    />
  );
}