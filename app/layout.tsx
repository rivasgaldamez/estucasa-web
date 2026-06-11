import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  getOrganizationSchema,
  getWebsiteSchema,
  jsonLdScript,
} from "@/lib/schema";
import ScrollToTop from "@/components/ScrollToTop";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ES Tu Casa Inmobiliaria - El Salvador",
    template: "%s | ES Tu Casa Inmobiliaria",
  },
  description:
    "Asesoría inmobiliaria en El Salvador. Propiedades destacadas, acompañamiento completo y red de compradores para salvadoreños aquí y en el extranjero.",
  keywords: [
    "inmobiliaria el salvador",
    "casas en venta el salvador",
    "propiedades el salvador",
    "casas san salvador",
    "casas la libertad",
    "terrenos el salvador",
    "diáspora salvadoreña",
    "hermano lejano",
    "es tu casa inmobiliaria",
    "surf city inversión",
    "antiguo cuscatlán casas",
    "santa tecla propiedades",
  ],
  authors: [{ name: "Mario Rivas" }, { name: "Carlos Díaz" }],
  creator: "ES Tu Casa Inmobiliaria",
  publisher: "ES Tu Casa Inmobiliaria",
  metadataBase: new URL("https://estucasasv.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ES Tu Casa Inmobiliaria - El Salvador",
    description:
      "Asesoría inmobiliaria desde El Salvador. Propiedades destacadas, acompañamiento completo y red de compradores - aquí y en el extranjero.",
    url: "https://estucasasv.com",
    siteName: "ES Tu Casa Inmobiliaria",
    locale: "es_SV",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ES Tu Casa Inmobiliaria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ES Tu Casa Inmobiliaria - El Salvador",
    description:
      "Asesoría inmobiliaria desde El Salvador. Propiedades destacadas y acompañamiento completo.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="es-SV">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationSchema)}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteSchema)}
        />

        {/* Google Translate */}
        <script
          async
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement(
                  { pageLanguage: 'es', includedLanguages: 'es,en,fr,ja,pt,zh-CN,ko' },
                  'google_translate_element'
                );
              };
            `,
          }}
        />
      </head>

      <body className="antialiased">
        {children}
        <ScrollToTop />
        <GoogleAnalytics gaId="G-MBVDNPVR62" />
      </body>
    </html>
  );
}