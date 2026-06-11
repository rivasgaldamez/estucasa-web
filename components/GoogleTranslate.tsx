"use client";

import Script from "next/script";

export default function GoogleTranslate() {
  return (
    <>
      <Script id="gtranslate-settings" strategy="afterInteractive">
        {`window.gtranslateSettings = {
          "default_language": "es",
          "languages": ["es", "en", "fr", "ja", "pt", "zh-CN", "ko"],
          "wrapper_selector": ".gtranslate_hidden"
        };`}
      </Script>
      <Script
        src="https://cdn.gtranslate.net/widgets/latest/dropdown.js"
        strategy="afterInteractive"
      />
      <div className="gtranslate_hidden" style={{ display: "none" }}></div>
    </>
  );
}