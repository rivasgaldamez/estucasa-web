/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Torogoz from "@/components/Torogoz";
import { urlFor } from "@/lib/sanity";

type Props = {
  articulo: any;
  relacionados: any[];
};

const colorClasses: Record<string, string> = {
  blue: "bg-brand-blue text-cream",
  sun: "bg-sun text-brand-blue-deep",
  torogoz: "bg-torogoz text-cream",
  turquoise: "bg-turquoise text-ink",
};

export default function ArticuloDetalleClient({
  articulo,
  relacionados,
}: Props) {
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

  const getImageUrl = (image: any, w = 1600, h = 900) => {
    if (!image || !image.asset) return "";

    try {
      return urlFor(image).width(w).height(h).url();
    } catch {
      return "";
    }
  };

  const formatearFecha = (fecha: string) => {
    if (!fecha) return "";

    const d = new Date(fecha);

    if (Number.isNaN(d.getTime())) return "";

    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    return `${d.getDate()} de ${meses[d.getMonth()]}, ${d.getFullYear()}`;
  };

  const whatsappMsg = encodeURIComponent(
    `Hola, leí su artículo "${articulo.titulo}" y me gustaría más información.`
  );

  const telefonoAutor = articulo.autor?.telefono || "50379889533";
  const nombreAutor = articulo.autor?.nombre || "Mario Rivas";
  const displayAutor = articulo.autor?.telefonoDisplay || "7988-9533";

  return (
    <div className="bg-cream text-ink min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="pt-28 px-6 md:px-12 pb-12">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-ink-soft mb-8 flex-wrap">
            <Link href="/" className="opacity-70 hover:opacity-100">
              <span>Inicio</span>
            </Link>

            <ChevronRight size={12} className="opacity-40" />

            <Link href="/blog" className="opacity-70 hover:opacity-100">
              <span>Blog</span>
            </Link>

            {articulo.categoria ? (
              <>
                <ChevronRight size={12} className="opacity-40" />
                <span className="opacity-70">{articulo.categoria.nombre}</span>
              </>
            ) : null}
          </div>

          {articulo.categoria ? (
            <span
              className={
                "inline-block px-3 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-semibold mb-6 " +
                (colorClasses[articulo.categoria.color || "blue"] ||
                  colorClasses.blue)
              }
            >
              {articulo.categoria.nombre}
            </span>
          ) : null}

          <h1 className="display text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            {articulo.titulo}
          </h1>

          {articulo.extracto ? (
            <p className="text-xl text-ink-soft mb-8 leading-relaxed font-light max-w-[700px]">
              {articulo.extracto}
            </p>
          ) : null}

          <div className="flex items-center gap-6 text-sm text-ink-soft pb-8 border-b border-black/10 flex-wrap">
            {articulo.autor ? (
              <div className="flex items-center gap-3">
                {articulo.autor.foto && articulo.autor.foto.asset ? (
                  <img
                    src={getImageUrl(articulo.autor.foto, 80, 80)}
                    alt={articulo.autor.nombre}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-blue text-cream flex items-center justify-center font-medium">
                    {articulo.autor.nombre.charAt(0)}
                  </div>
                )}

                <div>
                  <div className="font-medium text-ink">
                    {articulo.autor.nombre}
                  </div>

                  {articulo.autor.cargo ? (
                    <div className="text-xs">{articulo.autor.cargo}</div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatearFecha(articulo.fechaPublicacion)}</span>
            </div>

            {articulo.tiempoLectura ? (
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{articulo.tiempoLectura} min de lectura</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* IMAGEN PORTADA */}
      {articulo.imagenPortada ? (
        <section className="px-6 md:px-12 pb-12">
          <div className="max-w-[1100px] mx-auto">
            <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-stone">
              <img
                src={getImageUrl(articulo.imagenPortada, 1600, 900)}
                alt={articulo.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* CONTENIDO */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-[760px] mx-auto">
          <article className="prose-articulo">
            {articulo.contenido && articulo.contenido.length > 0 ? (
              articulo.contenido.map((block: any, i: number) => {
                if (block._type === "block") {
                  const text = block.children
                    ? block.children.map((c: any) => c.text || "").join("")
                    : "";

                  if (block.style === "h2") {
                    return (
                      <h2
                        key={i}
                        className="display text-3xl md:text-4xl mt-12 mb-5"
                      >
                        {text}
                      </h2>
                    );
                  }

                  if (block.style === "h3") {
                    return (
                      <h3
                        key={i}
                        className="display text-2xl md:text-3xl mt-10 mb-4"
                      >
                        {text}
                      </h3>
                    );
                  }

                  if (block.style === "blockquote") {
                    return (
                      <blockquote
                        key={i}
                        className="border-l-4 border-sun pl-6 my-8 italic-display text-2xl text-ink-soft"
                      >
                        {text}
                      </blockquote>
                    );
                  }

                  if (block.listItem === "bullet") {
                    return (
                      <li
                        key={i}
                        className="text-lg leading-relaxed text-ink mb-2 ml-6 list-disc"
                      >
                        {text}
                      </li>
                    );
                  }

                  if (block.listItem === "number") {
                    return (
                      <li
                        key={i}
                        className="text-lg leading-relaxed text-ink mb-2 ml-6 list-decimal"
                      >
                        {text}
                      </li>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-lg leading-relaxed text-ink mb-5"
                    >
                      {block.children
                        ? block.children.map((child: any, j: number) => {
                            let element = child.text || "";

                            if (child.marks?.includes("strong")) {
                              element = <strong>{element}</strong>;
                            }

                            if (child.marks?.includes("em")) {
                              element = <em>{element}</em>;
                            }

                            return <span key={j}>{element}</span>;
                          })
                        : ""}
                    </p>
                  );
                }

                if (block._type === "image" && block.asset) {
                  return (
                    <figure key={i} className="my-10">
                      <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone">
                        <img
                          src={getImageUrl(block, 1200, 675)}
                          alt={block.alt || ""}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {block.caption ? (
                        <figcaption className="text-sm text-ink-soft text-center mt-3 italic">
                          {block.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  );
                }

                return null;
              })
            ) : (
              <p className="text-ink-soft">
                Este articulo aun no tiene contenido.
              </p>
            )}
          </article>
        </div>
      </section>

      {/* AUTOR CARD */}
      {articulo.autor ? (
        <section className="reveal px-6 md:px-12 pb-16">
          <div className="max-w-[760px] mx-auto">
            <div className="bg-cream-warm border border-black/10 rounded-3xl p-8 md:p-10">
              <div className="flex items-start gap-5 flex-wrap">
                {articulo.autor.foto && articulo.autor.foto.asset ? (
                  <img
                    src={getImageUrl(articulo.autor.foto, 200, 200)}
                    alt={articulo.autor.nombre}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-brand-blue text-cream display text-3xl flex items-center justify-center flex-shrink-0">
                    {articulo.autor.nombre.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-[260px]">
                  <div className="eyebrow text-sun mb-1">Sobre el autor</div>

                  <h3 className="display text-2xl mb-2">
                    {articulo.autor.nombre}
                  </h3>

                  {articulo.autor.cargo ? (
                    <div className="text-sm text-ink-soft mb-3">
                      {articulo.autor.cargo}
                    </div>
                  ) : null}

                  {articulo.autor.bio ? (
                    <p className="text-[15px] leading-relaxed text-ink-soft font-light mb-5">
                      {articulo.autor.bio}
                    </p>
                  ) : null}

                  <a
                    href={`https://wa.me/${telefonoAutor}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-blue text-cream px-5 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-brand-blue-deep transition-colors"
                  >
                    <span>
                      WhatsApp {nombreAutor.split(" ")[0]} - {displayAutor}
                    </span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ARTICULOS RELACIONADOS */}
      {relacionados.length > 0 ? (
        <section className="reveal px-6 md:px-12 pb-20">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
              <div>
                <div className="eyebrow text-sun mb-3">Lee tambien</div>

                <h2 className="display text-3xl md:text-4xl">
                  <span>Articulos </span>
                  <span className="italic-display text-brand-blue">
                    relacionados.
                  </span>
                </h2>
              </div>

              <Link
                href="/blog"
                className="text-sm font-medium inline-flex items-center gap-2 hover:text-brand-blue transition-colors"
              >
                <span>Ver todos</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relacionados.map((rel: any) => (
                <Link
                  key={rel._id}
                  href={`/blog/${rel.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone mb-4">
                    {rel.imagenPortada ? (
                      <img
                        src={getImageUrl(rel.imagenPortada, 600, 450)}
                        alt={rel.titulo}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : null}
                  </div>

                  {rel.categoria ? (
                    <span
                      className={
                        "inline-block px-2.5 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold mb-2 " +
                        (colorClasses[rel.categoria.color || "blue"] ||
                          colorClasses.blue)
                      }
                    >
                      {rel.categoria.nombre}
                    </span>
                  ) : null}

                  <h4 className="display text-xl mb-2 group-hover:text-brand-blue transition-colors">
                    {rel.titulo}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-ink-soft">
                    <Calendar size={11} />
                    <span>{formatearFecha(rel.fechaPublicacion)}</span>

                    {rel.tiempoLectura ? (
                      <>
                        <span>-</span>
                        <span>{rel.tiempoLectura} min</span>
                      </>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="reveal px-6 md:px-12 pb-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-brand-blue text-cream rounded-3xl p-12 md:p-16 relative overflow-hidden text-center">
            <div className="absolute -top-10 -right-10 opacity-15">
              <Torogoz size={200} />
            </div>

            <div className="relative z-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 mb-6"
              >
                <ChevronLeft size={14} />
                <span>Volver al blog</span>
              </Link>

              <h2 className="display text-4xl md:text-5xl mb-5">
                <span>Listo para </span>
                <span className="italic-display text-sun">conversar?</span>
              </h2>

              <p className="text-lg opacity-85 max-w-[540px] mx-auto mb-8 font-light leading-relaxed">
                Si este articulo te fue util y quieres asesoria especifica para
                tu caso, escribenos por WhatsApp.
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="https://wa.me/50379889533"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
                >
                  <span>WhatsApp Mario</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://wa.me/50377303994"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2 border border-white/25 text-cream hover:border-sun hover:text-sun transition-colors"
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