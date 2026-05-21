import type { MetadataRoute } from "next";
import { createClient } from "next-sanity";

const SITE_URL = "https://estucasasv.com";

type PropiedadSitemap = {
  codigo: string;
  _updatedAt?: string;
};

type ArticuloSitemap = {
  slug: string;
  _updatedAt?: string;
};

const sitemapClient = createClient({
  projectId: "u5c3y71c",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

function getValidDate(date?: string) {
  if (!date) return new Date();

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date();
  }

  return parsedDate;
}

async function getPropiedades(): Promise<PropiedadSitemap[]> {
  try {
    const query = `*[_type == "propiedad" && defined(codigo)]{
      codigo,
      _updatedAt
    }`;

    return await sitemapClient.fetch<PropiedadSitemap[]>(query);
  } catch {
    return [];
  }
}

async function getArticulos(): Promise<ArticuloSitemap[]> {
  try {
    const query = `*[_type == "articulo" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }`;

    return await sitemapClient.fetch<ArticuloSitemap[]>(query);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/propiedades`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hermano-lejano`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/vender`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/preguntas-frecuentes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/asesores`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const propiedades = await getPropiedades();

  const propiedadPages: MetadataRoute.Sitemap = propiedades.map((propiedad) => ({
    url: `${SITE_URL}/propiedades/${propiedad.codigo}`,
    lastModified: getValidDate(propiedad._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articulos = await getArticulos();

  const articuloPages: MetadataRoute.Sitemap = articulos.map((articulo) => ({
    url: `${SITE_URL}/blog/${articulo.slug}`,
    lastModified: getValidDate(articulo._updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...propiedadPages, ...articuloPages];
}