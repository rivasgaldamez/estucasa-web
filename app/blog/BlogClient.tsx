/* eslint-disable @typescript-eslint/no-explicit-any */
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
import WhatsAppLink from "@/components/WhatsAppLink";
import Torogoz from "@/components/Torogoz";
import { urlFor } from "@/lib/sanity";

type Props = {
  articulos: any[];
  categorias: any[];
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
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getImageUrl = (image: any, width = 800, height = 600) => {
    if (!image || !image.asset) return "";

    try {
      return urlFor(image).width(width).height(height).url();
    } catch {
      return "";
    }
  };

  const filtered = useMemo(() => {
    let result = [...(articulos || [])];

    if (activeCategoria !== "todas") {
      result = result.filter(
        (articulo) => articulo.categoria?.slug === activeCategoria
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      result = result.filter(
        (articulo) =>
          articulo.titulo?.toLowerCase().includes(query) ||
          (articulo.extracto || "").toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategoria, searchQuery, articulos]);

  const principal =
    filtered.find((articulo) => articulo.destacado) || filtered[0];

  const otros = filtered.filter(
    (articulo) => articulo._id !== principal?._id
  );

  const formatearFecha = (fecha: string) => {
    if (!fecha) return "";

    const date = new Date(fecha);

    if (Number.isNaN(date.getTime())) return "";

    const meses = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ];

    return `${date.getDate()} ${
      meses[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  return (
    <div className="bg-cream text-ink min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 px-6 md:px-12 pb-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-ink-soft mb-6">
            <Link href="/" className="opacity-70 hover:opacity-100">
              <span>Inicio</span>
            </Link>

            <ChevronRight size={12} className="opacity-40" />

            <span className="text-brand-blue font-medium">Blog</span>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-2">
            <div>
              <div className="eyebrow text-sun mb-3">Blog editorial</div>

              <h1 className="display text-5xl md:text-7xl mb-4">
                <span>Blog </span>

                <span className="italic-display text-brand-blue">
                  inmobiliario.
                </span>
              </h1>

              <p className="text-lg text-ink-soft max-w-[600px] font-light leading-relaxed">
                Guias, analisis y contenido para tomar decisiones inmobiliarias
                informadas. Para compradores, vendedores e inversionistas.
              </p>
            </div>

            <div className="text-right">
              <div className="display text-5xl text-brand-blue leading-none">
                {filtered.length}
              </div>

              <div className="text-xs text-ink-soft tracking-wider uppercase mt-1">
                <span>
                  {filtered.length === 1 ? "articulo" : "articulos"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="px-6 md:px-12 pb-10">
        <div className="max-w-[1440px] mx-auto">
          {/* Categorias */}
          {categorias && categorias.length > 0 ? (
            <div className="flex gap-2.5 overflow-x-auto pb-3 mb-4">
              <button
                type="button"
                onClick={() => setActiveCategoria("todas")}
                className={
                  activeCategoria === "todas"
                    ? "px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap bg-ink text-cream border-ink"
                    : "px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap bg-cream text-ink border-black/10 hover:border-brand-blue transition-colors"
                }
              >
                Todas
              </button>

              {categorias.map((categoria) => (
                <button
                  key={categoria._id}
                  type="button"
                  onClick={() => setActiveCategoria(categoria.slug)}
                  className={
                    activeCategoria === categoria.slug
                      ? "px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap bg-ink text-cream border-ink"
                      : "px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap bg-cream text-ink border-black/10 hover:border-brand-blue transition-colors"
                  }
                >
                  {categoria.nombre}
                </button>
              ))}
            </div>
          ) : null}

          {/* Busqueda */}
          <div className="bg-cream-warm border border-black/10 rounded-3xl p-2 flex items-center gap-1 max-w-[600px]">
            <div className="flex-1 bg-cream border border-black/10 rounded-full p-1 flex items-center">
              <Search size={16} className="text-brand-blue ml-3" />

              <input
                type="text"
                placeholder="Busca por titulo o tema..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
              />

              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="bg-transparent border-0 mr-3 text-ink-soft cursor-pointer"
                  aria-label="Limpiar busqueda"
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICULOS */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-[1440px] mx-auto">
          {filtered.length === 0 ? (
            <div className="p-20 text-center bg-cream-warm rounded-3xl border border-dashed border-black/10">
              <Torogoz size={64} />

              <h3 className="display text-3xl mt-4 mb-3">
                <span>Sin resultados</span>
              </h3>

              <p className="text-sm text-ink-soft max-w-md mx-auto font-light">
                No encontramos articulos con esos filtros. Probá cambiar la
                categoria o limpiar la busqueda.
              </p>
            </div>
          ) : (
            <>
              {/* PRINCIPAL */}
              {principal ? (
                <Link
                  href={`/blog/${principal.slug}`}
                  className="reveal group block mb-16"
                >
                  <article className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone">
                      {principal.imagenPortada ? (
                        <img
                          src={getImageUrl(
                            principal.imagenPortada,
                            1200,
                            900
                          )}
                          alt={principal.titulo}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-blue-deep" />
                      )}

                      {principal.destacado ? (
                        <span className="absolute top-4 left-4 bg-sun text-brand-blue-deep px-3 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold">
                          Destacado
                        </span>
                      ) : null}
                    </div>

                    <div>
                      {principal.categoria ? (
                        <span
                          className={
                            "inline-block px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold mb-4 " +
                            (colorClasses[
                              principal.categoria.color || "blue"
                            ] || colorClasses.blue)
                          }
                        >
                          {principal.categoria.nombre}
                        </span>
                      ) : null}

                      <h2 className="display text-3xl md:text-5xl mb-4 group-hover:text-brand-blue transition-colors leading-tight">
                        {principal.titulo}
                      </h2>

                      {principal.extracto ? (
                        <p className="text-lg text-ink-soft mb-6 leading-relaxed font-light">
                          {principal.extracto}
                        </p>
                      ) : null}

                      <div className="flex items-center gap-4 text-sm text-ink-soft mb-6 flex-wrap">
                        {principal.autor ? (
                          <span className="font-medium text-ink">
                            {principal.autor.nombre}
                          </span>
                        ) : null}

                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} />

                          <span>
                            {formatearFecha(principal.fechaPublicacion)}
                          </span>
                        </div>

                        {principal.tiempoLectura ? (
                          <div className="flex items-center gap-1.5">
                            <Clock size={13} />

                            <span>{principal.tiempoLectura} min</span>
                          </div>
                        ) : null}
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
                        <span>Leer articulo</span>

                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              ) : null}

              {/* GRID */}
              {otros.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otros.map((articulo) => (
                    <Link
                      key={articulo._id}
                      href={`/blog/${articulo.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone mb-4">
                        {articulo.imagenPortada ? (
                          <img
                            src={getImageUrl(
                              articulo.imagenPortada,
                              800,
                              600
                            )}
                            alt={articulo.titulo}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-blue-deep" />
                        )}
                      </div>

                      {articulo.categoria ? (
                        <span
                          className={
                            "inline-block px-2.5 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold mb-2 " +
                            (colorClasses[
                              articulo.categoria.color || "blue"
                            ] || colorClasses.blue)
                          }
                        >
                          {articulo.categoria.nombre}
                        </span>
                      ) : null}

                      <h3 className="display text-xl mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                        {articulo.titulo}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-ink-soft">
                        <Calendar size={11} />

                        <span>
                          {formatearFecha(articulo.fechaPublicacion)}
                        </span>

                        {articulo.tiempoLectura ? (
                          <>
                            <span>-</span>

                            <div className="flex items-center gap-1">
                              <Clock size={11} />

                              <span>{articulo.tiempoLectura} min</span>
                            </div>
                          </>
                        ) : null}
                      </div>

                      {articulo.extracto ? (
                        <p className="text-sm text-ink-soft mt-3 leading-relaxed line-clamp-3 font-light">
                          {articulo.extracto}
                        </p>
                      ) : null}

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
                        <span>Leer articulo</span>

                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="reveal px-6 md:px-12 pb-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-brand-blue text-cream rounded-3xl p-12 md:p-16 relative overflow-hidden text-center">
            <div className="absolute -top-10 -right-10 opacity-15">
              <Torogoz size={200} />
            </div>

            <div className="relative z-10">
              <div className="eyebrow text-sun mb-4">
                Queres asesoria personalizada?
              </div>

              <h2 className="display text-4xl md:text-5xl mb-5">
                <span>Hablemos de tu </span>

                <span className="italic-display text-sun">
                  proxima inversion.
                </span>
              </h2>

              <p className="text-lg opacity-85 max-w-[540px] mx-auto mb-8 font-light leading-relaxed">
                Podemos ayudarte a comprar, vender o invertir en propiedades en
                El Salvador con una estrategia clara y acompanamiento real.
              </p>

              <WhatsAppLink
                href="https://wa.me/50379889533"
                className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
              >
                <span>Hablar por WhatsApp</span>

                <ArrowUpRight size={14} />
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}