import type { Metadata } from "next";
import { sanityClient, urlFor } from "@/lib/sanity";
import { queryAsesores } from "@/lib/queries";
import AsesoresClient from "./AsesoresClient";

type SanityImage = {
  asset?: unknown;
};

type Asesor = {
  _id: string;
  nombre: string;
  slug: string;
  cargo?: string;
  telefono: string;
  telefonoDisplay?: string;
  email?: string;
  foto?: SanityImage;
  fotoUrl?: string;
  bio?: string;
};

export const metadata: Metadata = {
  title: "Asesores - Mario Rivas y Carlos Díaz",
  description:
    "Conoce a Mario Rivas y Carlos Díaz, socios fundadores de ES Tu Casa Inmobiliaria. Especialistas en bienes raíces en El Salvador con experiencia desde 2019.",
};

export default async function AsesoresPage() {
  const asesores = await sanityClient.fetch<Asesor[]>(queryAsesores);

  const asesoresConFoto = asesores.map((asesor) => {
    let fotoUrl: string | undefined;

    if (asesor.foto?.asset) {
      try {
        fotoUrl = urlFor(asesor.foto).width(600).height(600).url();
      } catch {
        fotoUrl = undefined;
      }
    }

    return {
      ...asesor,
      fotoUrl,
    };
  });

  return <AsesoresClient asesores={asesoresConFoto} />;
}