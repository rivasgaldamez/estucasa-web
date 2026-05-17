import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient, urlFor } from "@/lib/sanity";
import {
  queryArticuloPorSlug,
  queryArticulosRelacionados,
} from "@/lib/queries";
import {
  getArticleSchema,
  getBreadcrumbSchema,
  jsonLdScript,
} from "@/lib/schema";
import ArticuloDetalleClient from "./ArticuloDetalleClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type SanityImage = {
  asset?: unknown;
};

type Articulo = {
  _id: string;
  titulo: string;
  slug: string;
  extracto: string;
  fechaPublicacion: string;
  imagenPortada?: SanityImage;
  destacado?: boolean;
  tiempoLectura?: number;
  contenido?: unknown[];
  metaTitulo?: string;
  metaDescripcion?: string;
  palabrasClave?: string[];
  categoria?: {
    _id?: string;
    nombre: string;
    slug?: string;
    color?: string;
  };
  autor?: {
    nombre: string;
    cargo?: string;
    foto?: SanityImage;
    bio?: string;
    telefono?: string;
    telefonoDisplay?: string;
    slug?: string;
  };
};

type ArticuloRelacionado = {
  _id: string;
  titulo: string;
  slug: string;
  extracto: string;
  fechaPublicacion: string;
  imagenPortada?: SanityImage;
  tiempoLectura?: number;
  categoria?: {
    nombre: string;
    color?: string;
  };
};

function getImageUrl(image?: SanityImage) {
  if (!image?.asset) return undefined;

  try {
    return urlFor(image).width(1200).height(630).url();
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const articulo = await sanityClient.fetch<Articulo | null>(
    queryArticuloPorSlug,
    { slug }
  );

  if (!articulo) {
    return {
      title: "Articulo no encontrado",
    };
  }

  const imagenUrl = getImageUrl(articulo.imagenPortada);

  return {
    title: articulo.metaTitulo || articulo.titulo,
    description: articulo.metaDescripcion || articulo.extracto,
    keywords: articulo.palabrasClave || undefined,
    authors: articulo.autor ? [{ name: articulo.autor.nombre }] : undefined,
    openGraph: {
      title: articulo.metaTitulo || articulo.titulo,
      description: articulo.metaDescripcion || articulo.extracto,
      type: "article",
      publishedTime: articulo.fechaPublicacion,
      authors: articulo.autor ? [articulo.autor.nombre] : undefined,
      images: imagenUrl
        ? [
            {
              url: imagenUrl,
              width: 1200,
              height: 630,
              alt: articulo.titulo,
            },
          ]
        : undefined,
      siteName: "ES Tu Casa Inmobiliaria",
      locale: "es_SV",
    },
    twitter: {
      card: "summary_large_image",
      title: articulo.metaTitulo || articulo.titulo,
      description: articulo.metaDescripcion || articulo.extracto,
      images: imagenUrl ? [imagenUrl] : undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function ArticuloDetallePage({ params }: Props) {
  const { slug } = await params;

  const articulo = await sanityClient.fetch<Articulo | null>(
    queryArticuloPorSlug,
    { slug }
  );

  if (!articulo) {
    notFound();
  }

  let relacionados: ArticuloRelacionado[] = [];

  if (articulo.categoria?._id) {
    relacionados = await sanityClient.fetch<ArticuloRelacionado[]>(
      queryArticulosRelacionados,
      {
        categoriaId: articulo.categoria._id,
        articuloId: articulo._id,
      }
    );
  }

  const imagenUrl = getImageUrl(articulo.imagenPortada);

  const articleSchema = getArticleSchema({
    titulo: articulo.titulo,
    slug: articulo.slug || slug,
    extracto: articulo.extracto,
    fechaPublicacion: articulo.fechaPublicacion,
    imagenUrl,
    autorNombre: articulo.autor?.nombre || "ES Tu Casa Inmobiliaria",
    autorSlug: articulo.autor?.slug || "es-tu-casa",
    tiempoLectura: articulo.tiempoLectura,
    categoria: articulo.categoria?.nombre,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: articulo.titulo, url: `/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(articleSchema)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbSchema)}
      />

      <ArticuloDetalleClient articulo={articulo} relacionados={relacionados} />
    </>
  );
}