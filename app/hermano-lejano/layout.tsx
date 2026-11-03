import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Comprar casa en El Salvador desde el extranjero",
  description:
    "Compra tu casa en El Salvador desde el extranjero: video-recorridos 4K, firma por poder, escribana de confianza y transferencia supervisada.",
  alternates: { canonical: "/hermano-lejano" },
};

export default function HermanoLejanoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}