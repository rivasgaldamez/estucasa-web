import { sanityClient } from "@/lib/sanity";
import { queryArticulos, queryCategorias } from "@/lib/queries";
import BlogClient from "./BlogClient";

type Articulo = {
  _id: string;
  titulo: string;
  slug: string;
  extracto: string;
  fechaPublicacion: string;
  imagenPortada?: any;
  destacado?: boolean;
  tiempoLectura?: number;
  categoria?: {
    nombre: string;
    slug: string;
    color?: string;
  };
  autor?: {
    nombre: string;
    foto?: any;
    slug: string;
  };
};

type Categoria = {
  _id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  color?: string;
};

export default async function BlogPage() {
  const [articulos, categorias] = await Promise.all([
    sanityClient.fetch<Articulo[]>(queryArticulos),
    sanityClient.fetch<Categoria[]>(queryCategorias),
  ]);

  return <BlogClient articulos={articulos} categorias={categorias} />;
}