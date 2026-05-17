"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  X,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Torogoz from "@/components/Torogoz";
import { urlFor } from "@/lib/sanity";

type Articulo = {
  _id: string;
  titulo: string;
  slug: string;
  extracto: string;
  fechaPublicacion: string;
  imagenPortada?: unknown;
  destacado?: boolean;
  tiempoLectura?: number;
  categoria?: {
    nombre: string;
    slug: string;
    color?: string;
  };
  autor?: {
    nombre: string;
    foto?: unknown;
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

type Props = {
  articulos: Articulo[];
  categorias: Categoria[];
};

const colorClasses: Record<string, string> = {
  blue: "bg-brand-blue text-cream",
  sun: "bg-sun text-brand-blue-deep",
  torogoz: "bg-torogoz text-cream",
  turquoise: "bg-turquoise text-ink",
};

export default function BlogClient({ articulos, categorias }: Props) {
  const [activeCategoria, setActiveCategoria] = useState("todas");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) =>
      observer.observe(el)
    );

    return () => observer.disconnect();
  }, []);

  const getImageUrl = (image: unknown, w = 800, h = 600) => {
    if (!image) return "";
    try {
      return urlFor(image).width(w).height(h).url();
    } catch {
      return "";
    }
  };

  const filtered = useMemo(() => {
    let result = [...articulos];

    if (activeCategoria !== "todas") {
      result = result.filter(
        (a) => a.categoria?.slug === activeCategoria
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();

      result = result.filter(
        (a) =>
          a.titulo.toLowerCase().includes(q) ||
          a.extracto.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategoria, searchQuery, articulos]);

  const principal =
    filtered.find((a) => a.destacado) || filtered[0];

  const otros = filtered.filter(
    (a) => a._id !== principal?._id
  );

  const formatearFecha = (fecha: string) => {
    if (!fecha) return "";

    const d = new Date(fecha);
    if (isNaN(d.getTime())) return "";

    const meses = [
      "ene","feb","mar","abr","may","jun",
      "jul","ago","sep","oct","nov","dic"
    ];

    return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="bg-cream text-ink min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 px-6 md:px-12 pb-12">
        <div className="max-w-[1440px] mx-auto">

          <div className="flex items-center gap-2 text-xs text-ink-soft mb-6">
            <Link href="/">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-brand-blue">Blog</span>
          </div>

          <h1 className="display text-5xl md:text-7xl mb-4">
            Blog inmobiliario
          </h1>

          <p className="text-lg text-ink-soft max-w-[600px]">
            Guias, analisis y contenido para tomar decisiones.
          </p>
        </div>
      </section>

      {/* CTA FINAL CORREGIDO */}
      <section className="reveal px-6 md:px-12 pb-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-brand-blue text-cream rounded-3xl p-12 text-center relative overflow-hidden">

            <div className="absolute -top-10 -right-10 opacity-15">
              <Torogoz size={200} />
            </div>

            <div className="relative z-10">
              <h2 className="display text-4xl mb-6">
                Hablemos de tu caso
              </h2>

              <div className="flex gap-3 justify-center flex-wrap">

                {/* ✅ CORREGIDO */}
                <a
                  href="https://wa.me/50379889533"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2"
                >
                  <span>WhatsApp Mario</span>
                  <ArrowUpRight size={14} />
                </a>

                {/* ✅ CORREGIDO */}
                <a
                  href="https://wa.me/50377303494"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/25 px-7 py-4 rounded-full text-sm inline-flex items-center gap-2"
                >
                  <span>WhatsApp Carlos</span>
                  <ArrowUpRight size={14} />
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}