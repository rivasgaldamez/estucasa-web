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

// Por defecto: formato moderno automatico (WebP/AVIF) y calidad 75.
// Se puede seguir encadenando .width(), .height(), etc. como antes.
export function urlFor(source: unknown) {
  return builder.image(source as never).auto("format").quality(75);
}