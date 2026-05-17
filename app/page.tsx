import { sanityClient } from "@/lib/sanity";
import { queryDestacadas } from "@/lib/queries";
import HomeClient from "./HomeClient";

type Destacada = {
  _id: string;
  codigo: string;
  titulo: string;
  slug: string;
  tipo: string;
  precio: number;
  etiqueta?: string;
  fotoPortada?: unknown;
  habitaciones?: number;
  banosCompletos?: number;
  areaConstruccion?: number;
  areaTerreno?: number;
  zona?: {
    nombre: string;
    municipio?: string;
  };
};

export default async function HomePage() {
  const destacadas = await sanityClient.fetch<Destacada[]>(queryDestacadas);

  return <HomeClient destacadas={destacadas} />;
}