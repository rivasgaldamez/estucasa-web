import type { Metadata } from "next";
import { sanityClient } from "@/lib/sanity";
import { queryPropiedades } from "@/lib/queries";
import { getBreadcrumbSchema, jsonLdScript } from "@/lib/schema";
import PropiedadesClient from "./PropiedadesClient";

type Propiedad = {
  _id: string;
  codigo: string;
  titulo: string;
};

export const metadata: Metadata = {
  title: "Propiedades en venta - El Salvador",
  description:
    "Casas, apartamentos, terrenos y propiedades comerciales en El Salvador. Antiguo Cuscatlán, Santa Tecla, Costa del Sol, Surf City y más zonas premium. Atención personalizada.",
  keywords: [
    "propiedades el salvador",
    "casas en venta",
    "apartamentos el salvador",
    "terrenos venta",
    "propiedad comercial",
    "casas antiguo cuscatlán",
    "casas santa tecla",
    "surf city propiedades",
  ],
  alternates: {
    canonical: "/propiedades",
  },
  openGraph: {
    title: "Propiedades en venta - ES Tu Casa Inmobiliaria",
    description:
      "Casas, apartamentos, terrenos y propiedades comerciales en El Salvador. Atención personalizada.",
    type: "website",
    url: "https://estucasasv.com/propiedades",
    siteName: "ES Tu Casa Inmobiliaria",
    locale: "es_SV",
  },
};

export default async function PropiedadesPage() {
  const propiedades = await sanityClient.fetch<Propiedad[]>(queryPropiedades);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Propiedades en venta en El Salvador",
    description:
      "Listado de propiedades disponibles. Casas, apartamentos, terrenos y propiedades comerciales en El Salvador.",
    url: "https://estucasasv.com/propiedades",
    inLanguage: "es-SV",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: propiedades.length,
      itemListElement: propiedades.slice(0, 10).map((propiedad, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://estucasasv.com/propiedades/${propiedad.codigo}`,
        name: propiedad.titulo,
      })),
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Propiedades", url: "/propiedades" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(collectionSchema)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbSchema)}
      />

      <PropiedadesClient propiedades={propiedades} />
    </>
  );
}