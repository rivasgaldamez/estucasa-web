import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Configuracion del cliente de Sanity
export const sanityClient = createClient({
  projectId: "u5c3y71c",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Helper para generar URLs de imagenes
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: unknown) {
  return builder.image(source as never);
}