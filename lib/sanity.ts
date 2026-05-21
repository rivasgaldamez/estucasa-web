import { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity";

const SITE_URL = "https://estucasasv.com";

// Trae las propiedades publicadas desde Sanity
async function getPropiedades() {
  try {
    const query = `*[_type == "propiedad" && defined(codigo)]{ codigo, _updatedAt }`;
    return await sanityClient.fetch(query);
  } catch {
    return [];
  }
}

// Trae los articulos del blog desde Sanity
async function getArticulos() {
  try {
    const query = `*[_type == "articulo" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
    return await sanityClient.fetch(query);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Paginas fijas del sitio
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/propiedades`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hermano-lejano`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/vender`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/preguntas-frecuentes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/asesores`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Paginas dinamicas de propiedades
  const propiedades = await getPropiedades();
  const propiedadPages: MetadataRoute.Sitemap = propiedades.map(
    (prop: { codigo: string; _updatedAt: string }) => ({
      url: `${SITE_URL}/propiedades/${prop.codigo}`,
      lastModified: new Date(prop._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Paginas dinamicas del blog
  const articulos = await getArticulos();
  const articuloPages: MetadataRoute.Sitemap = articulos.map(
    (art: { slug: string; _updatedAt: string }) => ({
      url: `${SITE_URL}/blog/${art.slug}`,
      lastModified: new Date(art._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  return [...staticPages, ...propiedadPages, ...articuloPages];
}