/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityClient } from "@/lib/sanity";
import { queryArticulos, queryCategorias } from "@/lib/queries";
import { Metadata } from "next";
import {
  getBreadcrumbSchema,
  jsonLdScript,
} from "@/lib/schema";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog - Guías y análisis inmobiliario",
  description:
    "Guías expertas sobre comprar, vender e invertir en bienes raíces en El Salvador. Artículos para diáspora, primera casa, zonas premium y mercado actual.",
  keywords: [
    "blog inmobiliario el salvador",
    "guía comprar casa",
    "inversión inmobiliaria",
    "diáspora salvadoreña",
    "hermano lejano",
    "mercado inmobiliario sv",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog - ES Tu Casa Inmobiliaria",
    description:
      "Guías expertas sobre el mercado inmobiliario salvadoreño. Para compradores locales, vendedores e inversionistas.",
    type: "website",
    url: "https://estucasasv.com/blog",
    siteName: "ES Tu Casa Inmobiliaria",
    locale: "es_SV",
  },
};

export default async function BlogPage() {
  const [articulos, categorias] = await Promise.all([
    sanityClient.fetch<any[]>(queryArticulos),
    sanityClient.fetch<any[]>(queryCategorias),
  ]);

  // Schema CollectionPage + Blog
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog ES Tu Casa Inmobiliaria",
    description:
      "Guías expertas sobre comprar, vender e invertir en El Salvador.",
    url: "https://estucasasv.com/blog",
    inLanguage: "es-SV",
    publisher: {
      "@id": "https://estucasasv.com/#organization",
    },
    blogPost: (articulos || []).slice(0, 10).map((art) => ({
      "@type": "BlogPosting",
      headline: art.titulo,
      url: "https://estucasasv.com/blog/" + art.slug,
      datePublished: art.fechaPublicacion,
      author: art.autor
        ? {
            "@type": "Person",
            name: art.autor.nombre,
          }
        : undefined,
    })),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(blogSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbSchema)}
      />
      <BlogClient articulos={articulos} categorias={categorias} />
    </>
  );
}