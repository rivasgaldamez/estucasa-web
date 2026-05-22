/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  X,
  ChevronRight,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Torogoz from "@/components/Torogoz";
import { getCategorias } from "@/lib/faqs";

type FAQ = {
  id: string;
  categoria: string;
  pregunta: string;
  respuesta: string;
};

type Props = {
  faqs: FAQ[];
};

export default function PreguntasFrecuentesClient({ faqs }: Props) {
  const [activeCategoria, setActiveCategoria] = useState("todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const categorias = getCategorias();

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

  const filtered = useMemo(() => {
    let result = [...faqs];

    if (activeCategoria !== "todas") {
      result = result.filter((faq) => faq.categoria === activeCategoria);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      result = result.filter(
        (faq) =>
          faq.pregunta.toLowerCase().includes(query) ||
          faq.respuesta.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategoria, searchQuery, faqs]);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-cream text-ink min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 px-6 md:px-12 pb-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-ink-soft mb-6">
            <Link href="/" className="opacity-70 hover:opacity-100">
              <span>Inicio</span>
            </Link>

            <ChevronRight size={12} className="opacity-40" />

            <span className="text-brand-blue font-medium">
              Preguntas Frecuentes
            </span>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-2">
            <div>
              <div className="eyebrow text-sun mb-3">Resolvemos tus dudas</div>

              <h1 className="display text-5xl md:text-7xl mb-4">
                <span>Preguntas </span>
                <br />
                <span className="italic-display text-brand-blue">
                  frecuentes.
                </span>
              </h1>

              <p className="text-lg text-ink-soft max-w-[600px] font-light leading-relaxed">
                Respuestas claras sobre comprar y vender propiedades en El
                Salvador. Impuestos, costos, procesos, diaspora y mas. Si tu
                pregunta no esta aqui, escribinos por WhatsApp.
              </p>
            </div>

            <div className="text-right">
              <div className="display text-5xl text-brand-blue leading-none">
                {filtered.length}
              </div>

              <div className="text-xs text-ink-soft tracking-wider uppercase mt-1">
                <span>
                  {filtered.length === 1 ? "pregunta" : "preguntas"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="px-6 md:px-12 pb-10">
        <div className="max-w-[1100px] mx-auto">
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

            {categorias.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoria(cat.id)}
                className={
                  activeCategoria === cat.id
                    ? "px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap bg-ink text-cream border-ink"
                    : "px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap bg-cream text-ink border-black/10 hover:border-brand-blue transition-colors"
                }
              >
                {cat.emoji} {cat.nombre}
              </button>
            ))}
          </div>

          <div className="bg-cream-warm border border-black/10 rounded-3xl p-2 flex items-center gap-1 max-w-[600px]">
            <div className="flex-1 bg-cream border border-black/10 rounded-full p-1 flex items-center">
              <Search size={16} className="text-brand-blue ml-3" />

              <input
                type="text"
                placeholder="Busca por palabra clave..."
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

      {/* PREGUNTAS */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-[1100px] mx-auto">
          {filtered.length === 0 ? (
            <div className="p-20 text-center bg-cream-warm rounded-3xl border border-dashed border-black/10">
              <HelpCircle size={48} className="mx-auto text-ink-soft mb-4" />

              <h3 className="display text-3xl mb-3">
                <span>Sin resultados</span>
              </h3>

              <p className="text-sm text-ink-soft max-w-md mx-auto font-light">
                No encontramos preguntas con esos filtros. Probá cambiar la
                categoria o limpiar la busqueda.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <article
                    key={faq.id}
                    className={
                      "rounded-2xl border transition-all overflow-hidden " +
                      (isOpen
                        ? "bg-cream-warm border-brand-blue"
                        : "bg-cream-warm border-black/10 hover:border-brand-blue/40")
                    }
                  >
                    <button
                      type="button"
                      onClick={() => toggleOpen(faq.id)}
                      className="w-full text-left p-6 md:p-7 flex items-start justify-between gap-4"
                    >
                      <h3 className="display text-lg md:text-xl leading-tight flex-1">
                        {faq.pregunta}
                      </h3>

                      <div
                        className={
                          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all " +
                          (isOpen
                            ? "bg-brand-blue text-cream rotate-180"
                            : "bg-cream text-ink border border-black/10")
                        }
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    {isOpen ? (
                      <div className="px-6 md:px-7 pb-6 md:pb-7 pt-0">
                        <div className="pt-5 border-t border-black/10">
                          <p className="text-[15px] leading-relaxed text-ink-soft font-light whitespace-pre-line">
                            {faq.respuesta}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="reveal px-6 md:px-12 pb-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-brand-blue text-cream rounded-3xl p-12 md:p-16 relative overflow-hidden text-center">
            <div className="absolute -top-10 -right-10 opacity-15">
              <Torogoz size={200} />
            </div>

            <div className="relative z-10">
              <div className="eyebrow text-sun mb-4">
                Tu pregunta no esta aqui?
              </div>

              <h2 className="display text-4xl md:text-5xl mb-5">
                <span>Escribinos </span>
                <span className="italic-display text-sun">directamente.</span>
              </h2>

              <p className="text-lg opacity-85 max-w-[540px] mx-auto mb-8 font-light leading-relaxed">
                Cada caso inmobiliario es distinto. Si tu situacion es
                especifica o queres asesoria personalizada, hablanos por
                WhatsApp y te respondemos en pocas horas.
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="https://wa.me/50379889533?text=Hola%20Mario%2C%20tengo%20una%20pregunta%20sobre%20su%20servicio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
                >
                  <span>WhatsApp Mario - 7988-9533</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://wa.me/50377303994?text=Hola%20Carlos%2C%20tengo%20una%20pregunta%20sobre%20su%20servicio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2 border border-white/25 text-cream hover:border-sun hover:text-sun transition-colors"
                >
                  <span>WhatsApp Carlos - 7730-3994</span>
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