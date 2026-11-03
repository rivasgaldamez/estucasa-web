import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vender tu propiedad en El Salvador",
  description:
    "Vende tu casa, terreno o apartamento en El Salvador con fotografía profesional, video-drone incluido, listado en portales y red de diáspora.",
  alternates: { canonical: "/vender" },
};

export default function VenderLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}