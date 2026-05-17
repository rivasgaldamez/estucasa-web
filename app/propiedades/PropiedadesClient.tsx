/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  X,
  Bed,
  Bath,
  Square,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Torogoz from "@/components/Torogoz";
import { urlFor } from "@/lib/sanity";

type Props = {
  propiedades: any[];
};

const tiposPropiedad = [
  { value: "todas", label: "Todas" },
  { value: "Residencial", label: "Casas" },
  { value: "Apartamento", label: "Apartamentos" },
  { value: "Terreno", label: "Terrenos" },
  { value: "Comercial", label: "Comerciales" },
];

export default function PropiedadesClient({ propiedades }: Props) {
  const [activeTipo, setActiveTipo] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

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
    let result = [...propiedades];

    if (activeTipo !== "todas") {
      result = result.filter((propiedad) => propiedad.tipo === activeTipo);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      result = result.filter(
        (propiedad) =>
          propiedad.titulo?.toLowerCase().includes(query) ||
          propiedad.zona?.nombre?.toLowerCase().includes(query) ||
          propiedad.zona?.municipio?.toLowerCase().includes(query) ||
          propiedad.codigo?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeTipo, searchQuery, propiedades]);

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

            <span className="text-brand-blue font-medium">Propiedades</span>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-2">
            <div>
              <div className="eyebrow text-sun mb-3">Catalogo completo</div>

              <h1 className="display text-5xl md:text-7xl mb-4">
                <span>Encontra </span>
                <span className="italic-display text-brand-blue">tu casa.</span>
              </h1>

              <p className="text-lg text-ink-soft max-w-[600px] font-light leading-relaxed">
                Casas, apartamentos, terrenos y propiedades comerciales en todo
                el pais. Filtra por tipo o busca por zona.
              </p>
            </div>

            <div className="text-right">
              <div className="display text-5xl text-brand-blue leading-none">
                {filtered.length}
              </div>

              <div className="text-xs text-ink-soft tracking-wider uppercase mt-1">
                <span>
                  {filtered.length === 1 ? "propiedad" : "propiedades"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="px-6 md:px-12 pb-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex gap-2.5 overflow-x-auto pb-3 mb-4">
            {tiposPropiedad.map((tipo) => (
              <button
                key={tipo.value}
                type="button"
                onClick={() => setActiveTipo(tipo.value)}
                className={
                  activeTipo === tipo.value
                    ? "px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap bg-ink text-cream border-ink"
                    : "px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap bg-cream text-ink border-black/10 hover:border-brand-blue transition-colors"
                }
              >
                <span>{tipo.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-cream-warm border border-black/10 rounded-3xl p-2 flex items-center gap-1 max-w-[600px]">
            <div className="flex-1 bg-cream border border-black/10 rounded-full p-1 flex items-center">
              <Search size={16} className="text-brand-blue ml-3" />

              <input
                type="text"
                placeholder="Busca por zona, codigo o titulo..."
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

      {/* RESULTS */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1440px] mx-auto">
          {filtered.length === 0 ? (
            <div className="p-20 text-center bg-cream-warm rounded-3xl border border-dashed border-black/10">
              <Torogoz size={64} />

              <h3 className="display text-3xl mt-4 mb-3">
                <span>Sin resultados</span>
              </h3>

              <p className="text-sm text-ink-soft max-w-md mx-auto font-light">
                No encontramos propiedades con esos filtros. Probá cambiar el
                tipo o limpiar la busqueda.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((propiedad) => (
                <Link
                  key={propiedad._id}
                  href={`/propiedades/${propiedad.codigo}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone mb-4">
                    {propiedad.fotoPortada ? (
                      <img
                        src={getImageUrl(propiedad.fotoPortada, 800, 600)}
                        alt={propiedad.titulo}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : null}

                    {propiedad.etiqueta ? (
                      <span className="absolute top-4 left-4 bg-cream text-ink px-2.5 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase font-medium">
                        {propiedad.etiqueta}
                      </span>
                    ) : null}

                    <div className="absolute top-4 right-4">
                      <span className="bg-cream/95 px-2.5 py-1 rounded-full italic-display text-[13px] text-brand-blue">
                        {propiedad.codigo}
                      </span>
                    </div>
                  </div>

                  <div className="eyebrow text-ink-soft mb-1.5">
                    {propiedad.tipo}
                  </div>

                  <h3 className="display text-xl mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                    {propiedad.titulo}
                  </h3>

                  {propiedad.zona ? (
                    <div className="flex items-center gap-1.5 text-xs text-ink-soft mb-3">
                      <MapPin size={11} />
                      <span>
                        {propiedad.zona.nombre}
                        {propiedad.zona.municipio
                          ? `, ${propiedad.zona.municipio}`
                          : ""}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex items-center gap-4 text-xs text-ink-soft mb-3">
                    {propiedad.habitaciones ? (
                      <div className="flex items-center gap-1">
                        <Bed size={11} />
                        <span>{propiedad.habitaciones}</span>
                      </div>
                    ) : null}

                    {propiedad.banosCompletos ? (
                      <div className="flex items-center gap-1">
                        <Bath size={11} />
                        <span>{propiedad.banosCompletos}</span>
                      </div>
                    ) : null}

                    {propiedad.areaConstruccion ? (
                      <div className="flex items-center gap-1">
                        <Square size={11} />
                        <span>{propiedad.areaConstruccion} m2</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex justify-between items-end pt-3 border-t border-black/5">
                    <div className="display text-2xl">
                      <span className="text-xs text-sun">$</span>
                      {propiedad.precio?.toLocaleString()}
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-blue"
                    />
                  </div>
                </Link>
              ))}
            </div>
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
                No encontras lo que buscas?
              </div>

              <h2 className="display text-4xl md:text-5xl mb-5">
                <span>Cuentanos </span>
                <span className="italic-display text-sun">que necesitas.</span>
              </h2>

              <p className="text-lg opacity-85 max-w-[540px] mx-auto mb-8 font-light leading-relaxed">
                Tenemos propiedades fuera del catalogo publico. Escribinos y te
                conectamos con opciones que se ajusten a tu caso.
              </p>

              <a
                href="https://wa.me/50379889533"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
              >
                <span>Hablanos por WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}