import type { MetadataRoute } from "next";
import { createClient } from "next-sanity";

// El sitemap se regenera solo cada 10 minutos
export const revalidate = 600;

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

// Fecha más reciente de una lista (o undefined si no hay ninguna válida)
function getLatestDate(dates: Array<string | undefined>) {
  const valid = dates
    .map((date) => (date ? new Date(date) : null))
    .filter((date): date is Date => date !== null && !Number.isNaN(date.getTime()));

  if (valid.length === 0) return undefined;

  return new Date(Math.max(...valid.map((date) => date.getTime())));
}

async function getPropiedades(): Promise<PropiedadSitemap[]> {
  try {
    // Las propiedades vendidas no se listan en el sitemap
    const query = `*[_type == "propiedad" && defined(codigo) && estado != "vendida"]{
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
  const [propiedades, articulos] = await Promise.all([
    getPropiedades(),
    getArticulos(),
  ]);

  const ultimaPropiedad = getLatestDate(propiedades.map((p) => p._updatedAt));
  const ultimoArticulo = getLatestDate(articulos.map((a) => a._updatedAt));

  // Las páginas fijas llevan fecha solo cuando hay una fecha real detrás
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/propiedades`,
      lastModified: ultimaPropiedad,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hermano-lejano`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/vender`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: ultimoArticulo,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/preguntas-frecuentes`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/asesores`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const propiedadPages: MetadataRoute.Sitemap = propiedades.map((propiedad) => ({
    url: `${SITE_URL}/propiedades/${propiedad.codigo}`,
    lastModified: getValidDate(propiedad._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articuloPages: MetadataRoute.Sitemap = articulos.map((articulo) => ({
    url: `${SITE_URL}/blog/${articulo.slug}`,
    lastModified: getValidDate(articulo._updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...propiedadPages, ...articuloPages];
}
