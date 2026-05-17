import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient, urlFor } from "@/lib/sanity";
import { queryPropiedadPorCodigo } from "@/lib/queries";
import {
  getRealEstateListingSchema,
  getBreadcrumbSchema,
  jsonLdScript,
} from "@/lib/schema";
import PropiedadDetalleClient from "./PropiedadDetalleClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type SanityImage = {
  asset?: unknown;
};

type Propiedad = {
  _id: string;
  codigo: string;
  titulo: string;
  slug?: string;
  tipo: string;
  operacion?: string;
  estado?: string;
  precio: number;
  descripcionCorta?: string;
  fotoPortada?: SanityImage;
  habitaciones?: number;
  banosCompletos?: number;
  areaConstruccion?: number;
  areaTerreno?: number;
  parqueos?: number;
  zona?: {
    nombre?: string;
    municipio?: string;
  };
  asesor?: {
    nombre?: string;
    slug?: string;
  };
};

function getImageUrl(image?: SanityImage, width = 1200, height = 630) {
  if (!image?.asset) return undefined;

  try {
    return urlFor(image).width(width).height(height).url();
  } catch {
    return undefined;
  }
}

function getDescripcionMeta(propiedad: Propiedad) {
  if (propiedad.descripcionCorta) return propiedad.descripcionCorta;

  return `${propiedad.tipo} en ${propiedad.operacion || "venta"} en ${
    propiedad.zona?.nombre || "El Salvador"
  } por $${propiedad.precio.toLocaleString()}. ${
    propiedad.habitaciones
      ? `${propiedad.habitaciones} habitaciones. `
      : ""
  }${
    propiedad.areaConstruccion
      ? `${propiedad.areaConstruccion} m2 de construccion.`
      : ""
  }`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const propiedad = await sanityClient.fetch<Propiedad | null>(
    queryPropiedadPorCodigo,
    { codigo: id }
  );

  if (!propiedad) {
    return {
      title: "Propiedad no encontrada",
    };
  }

  const imagenUrl = getImageUrl(propiedad.fotoPortada);
  const descripcionMeta = getDescripcionMeta(propiedad);

  return {
    title: propiedad.titulo,
    description: descripcionMeta,
    openGraph: {
      title: propiedad.titulo,
      description: descripcionMeta,
      type: "website",
      images: imagenUrl
        ? [
            {
              url: imagenUrl,
              width: 1200,
              height: 630,
              alt: propiedad.titulo,
            },
          ]
        : undefined,
      siteName: "ES Tu Casa Inmobiliaria",
      locale: "es_SV",
    },
    twitter: {
      card: "summary_large_image",
      title: propiedad.titulo,
      description: descripcionMeta,
      images: imagenUrl ? [imagenUrl] : undefined,
    },
    alternates: {
      canonical: `/propiedades/${id}`,
    },
  };
}

export default async function PropiedadDetallePage({ params }: Props) {
  const { id } = await params;

  const propiedad = await sanityClient.fetch<Propiedad | null>(
    queryPropiedadPorCodigo,
    { codigo: id }
  );

  if (!propiedad) {
    notFound();
  }

  const fotoPortadaUrl = getImageUrl(propiedad.fotoPortada, 1200, 900);

  const realEstateSchema = getRealEstateListingSchema({
    codigo: propiedad.codigo,
    titulo: propiedad.titulo,
    descripcion: propiedad.descripcionCorta || propiedad.titulo,
    precio: propiedad.precio,
    tipo: propiedad.tipo,
    habitaciones: propiedad.habitaciones,
    banosCompletos: propiedad.banosCompletos,
    areaConstruccion: propiedad.areaConstruccion,
    areaTerreno: propiedad.areaTerreno,
    parqueos: propiedad.parqueos,
    zonaNombre: propiedad.zona?.nombre,
    zonaMunicipio: propiedad.zona?.municipio,
    fotoPortadaUrl,
    asesorNombre: propiedad.asesor?.nombre,
    asesorSlug: propiedad.asesor?.slug,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Propiedades", url: "/propiedades" },
    { name: propiedad.titulo, url: `/propiedades/${id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(realEstateSchema)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbSchema)}
      />

      <PropiedadDetalleClient propiedad={propiedad} />
    </>
  );
}