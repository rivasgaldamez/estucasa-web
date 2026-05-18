/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { faqs } from "@/lib/faqs";
import {
  getFAQSchema,
  getBreadcrumbSchema,
  jsonLdScript,
} from "@/lib/schema";
import PreguntasFrecuentesClient from "./PreguntasFrecuentesClient";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - ES Tu Casa Inmobiliaria",
  description:
    "21 preguntas y respuestas sobre comprar y vender propiedades en El Salvador. Impuestos, ganancia de capital, costos de cierre, hermano lejano, financiamiento bancario y más.",
  keywords: [
    "preguntas frecuentes inmobiliaria el salvador",
    "impuesto transferencia bienes raices",
    "ganancia de capital el salvador",
    "como comprar casa el salvador",
    "documentos para vender casa",
    "hermano lejano firma poder",
    "costos comprar casa el salvador",
    "comision inmobiliaria el salvador",
    "diaspora salvadorena propiedad",
  ],
  alternates: {
    canonical: "/preguntas-frecuentes",
  },
  openGraph: {
    title: "Preguntas Frecuentes - ES Tu Casa Inmobiliaria",
    description:
      "21 preguntas y respuestas con datos reales sobre el mercado inmobiliario salvadoreño.",
    type: "website",
    url: "https://estucasasv.com/preguntas-frecuentes",
    siteName: "ES Tu Casa Inmobiliaria",
    locale: "es_SV",
  },
};

export default function PreguntasFrecuentesPage() {
  // Schema FAQ - las IA citan FAQs directamente
  const faqSchema = getFAQSchema(
    faqs.map((faq) => ({
      pregunta: faq.pregunta,
      respuesta: faq.respuesta,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Preguntas Frecuentes", url: "/preguntas-frecuentes" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbSchema)}
      />
      <PreguntasFrecuentesClient faqs={faqs} />
    </>
  );
}