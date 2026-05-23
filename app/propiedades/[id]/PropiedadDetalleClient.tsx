/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Square,
  Car,
  MapPin,
  Calendar,
  Layers,
  Mail,
  MessageCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { urlFor } from "@/lib/sanity";

type Props = {
  propiedad: any;
};

export default function PropiedadDetalleClient({
  propiedad,
}: Props) {
  const [activeImage, setActiveImage] = useState(0);

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

    const elements = document.querySelectorAll(".reveal");

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const allImages = [
    propiedad.fotoPortada,
    ...(propiedad.galeria || []),
  ].filter((img: any) => img?.asset);

  const getImageUrl = (
    image: any,
    width = 1600,
    height = 900
  ) => {
    if (!image?.asset) return "";

    try {
      return urlFor(image)
        .width(width)
        .height(height)
        .url();
    } catch {
      return "";
    }
  };

  const pricePerSqm =
    propiedad.areaConstruccion && propiedad.precio
      ? Math.round(
          propiedad.precio / propiedad.areaConstruccion
        )
      : null;

  const whatsappMsg = encodeURIComponent(
    `Hola, me interesa la propiedad ${propiedad.codigo}: "${propiedad.titulo}". Quisiera mas informacion.`
  );

  const telefonoAsesor =
    propiedad.asesor?.telefono || "50379889533";

  const nombreAsesor =
    propiedad.asesor?.nombre || "Mario Rivas";

  const displayAsesor =
    propiedad.asesor?.telefonoDisplay || "7988-9533";

  const cargoAsesor =
    propiedad.asesor?.cargo ||
    "Asesor Inmobiliario";

  const emailAsesor =
    propiedad.asesor?.email ||
    "info@estucasasv.com";

  const nextImage = () => {
    if (allImages.length === 0) return;

    setActiveImage(
      (prev) => (prev + 1) % allImages.length
    );
  };

  const prevImage = () => {
    if (allImages.length === 0) return;

    setActiveImage(
      (prev) =>
        (prev - 1 + allImages.length) %
        allImages.length
    );
  };

  const descripcionEsPortableText = Array.isArray(
    propiedad.descripcionLarga
  );

  return (
    <div className="bg-cream text-ink min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="pt-28 px-6 md:px-12 pb-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-ink-soft mb-6 flex-wrap">
            <Link
              href="/"
              className="opacity-70 hover:opacity-100"
            >
              <span>Inicio</span>
            </Link>

            <ChevronRight
              size={12}
              className="opacity-40"
            />

            <Link
              href="/propiedades"
              className="opacity-70 hover:opacity-100"
            >
              <span>Propiedades</span>
            </Link>

            <ChevronRight
              size={12}
              className="opacity-40"
            />

            <span className="text-brand-blue font-medium truncate max-w-[200px] md:max-w-none">
              {propiedad.titulo}
            </span>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start mb-2">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                {propiedad.etiqueta ? (
                  <span className="bg-sun text-brand-blue-deep px-3 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-semibold">
                    {propiedad.etiqueta}
                  </span>
                ) : null}

                <span className="text-[11px] tracking-[0.18em] uppercase text-ink-soft">
                  {propiedad.codigo}
                </span>

                <span className="text-[11px] tracking-[0.18em] uppercase text-ink-soft">
                  {propiedad.tipo}
                </span>
              </div>

              <h1 className="display text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight">
                {propiedad.titulo}
              </h1>

              {propiedad.zona ? (
                <div className="flex items-center gap-2 text-ink-soft">
                  <MapPin size={16} />

                  <span>
                    {propiedad.zona.nombre}
                    {propiedad.zona.municipio
                      ? `, ${propiedad.zona.municipio}`
                      : ""}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="text-right">
              <div className="display text-4xl md:text-5xl text-brand-blue">
                <span className="italic-display text-2xl text-sun">
                  $
                </span>

                {propiedad.precio?.toLocaleString() ||
                  "0"}
              </div>

              {pricePerSqm ? (
                <div className="text-xs text-ink-soft mt-1">
                  ${pricePerSqm}/m2 construido
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      {allImages.length > 0 ? (
        <section className="px-6 md:px-12 pb-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-stone">
              <img
                src={getImageUrl(
                  allImages[activeImage],
                  1600,
                  900
                )}
                alt={propiedad.titulo}
                className="w-full h-full object-cover"
              />

              {allImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-cream/90 hover:bg-cream text-ink w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-cream/90 hover:bg-cream text-ink w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-4 right-4 bg-ink/80 text-cream px-3 py-1.5 rounded-full text-xs">
                    {activeImage + 1} /{" "}
                    {allImages.length}
                  </div>
                </>
              ) : null}
            </div>

            {allImages.length > 1 ? (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {allImages.map(
                  (img: any, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setActiveImage(index)
                      }
                      className={
                        "flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all " +
                        (index === activeImage
                          ? "ring-2 ring-brand-blue"
                          : "opacity-60 hover:opacity-100")
                      }
                    >
                      <img
                        src={getImageUrl(
                          img,
                          200,
                          150
                        )}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* CONTENIDO */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_400px] gap-12">
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {propiedad.habitaciones ? (
                <div className="bg-cream-warm rounded-2xl p-5 border border-black/5">
                  <Bed
                    size={20}
                    className="text-brand-blue mb-2"
                  />

                  <div className="display text-2xl">
                    {propiedad.habitaciones}
                  </div>

                  <div className="text-xs text-ink-soft">
                    Habitaciones
                  </div>
                </div>
              ) : null}

              {propiedad.banosCompletos ? (
                <div className="bg-cream-warm rounded-2xl p-5 border border-black/5">
                  <Bath
                    size={20}
                    className="text-brand-blue mb-2"
                  />

                  <div className="display text-2xl">
                    {propiedad.banosCompletos}
                  </div>

                  <div className="text-xs text-ink-soft">
                    Banos
                  </div>
                </div>
              ) : null}

              {propiedad.areaConstruccion ? (
                <div className="bg-cream-warm rounded-2xl p-5 border border-black/5">
                  <Square
                    size={20}
                    className="text-brand-blue mb-2"
                  />

                  <div className="display text-2xl">
                    {propiedad.areaConstruccion}
                  </div>

                  <div className="text-xs text-ink-soft">
                    m2 construccion
                  </div>
                </div>
              ) : null}

              {propiedad.areaTerreno ? (
                <div className="bg-cream-warm rounded-2xl p-5 border border-black/5">
                  <Layers
                    size={20}
                    className="text-brand-blue mb-2"
                  />

                  <div className="display text-2xl">
                    {propiedad.areaTerreno}
                  </div>

                  <div className="text-xs text-ink-soft">
                    m2 terreno
                  </div>
                </div>
              ) : null}

              {propiedad.parqueos ? (
                <div className="bg-cream-warm rounded-2xl p-5 border border-black/5">
                  <Car
                    size={20}
                    className="text-brand-blue mb-2"
                  />

                  <div className="display text-2xl">
                    {propiedad.parqueos}
                  </div>

                  <div className="text-xs text-ink-soft">
                    Parqueos
                  </div>
                </div>
              ) : null}
            </div>

            {propiedad.descripcionCorta ? (
              <div className="reveal mb-10">
                <div className="eyebrow text-sun mb-3">
                  Resumen
                </div>

                <p className="text-lg leading-relaxed text-ink font-light">
                  {propiedad.descripcionCorta}
                </p>
              </div>
            ) : null}

            {propiedad.descripcionLarga ? (
              <div className="reveal mb-10">
                <div className="eyebrow text-sun mb-3">
                  Descripcion
                </div>

                <div className="text-[15px] leading-relaxed text-ink-soft font-light space-y-4">
                  {descripcionEsPortableText ? (
                    <PortableText
                      value={
                        propiedad.descripcionLarga
                      }
                    />
                  ) : (
                    <p className="whitespace-pre-wrap">
                      {propiedad.descripcionLarga}
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="bg-cream-warm border border-black/10 rounded-3xl p-7">
              <div className="eyebrow text-sun mb-4">
                Asesor asignado
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/10">
                {propiedad.asesor?.foto?.asset ? (
                  <img
                    src={getImageUrl(
                      propiedad.asesor.foto,
                      120,
                      120
                    )}
                    alt={nombreAsesor}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-brand-blue text-cream display text-2xl flex items-center justify-center">
                    {nombreAsesor.charAt(0)}
                  </div>
                )}

                <div>
                  <div className="display text-xl">
                    {nombreAsesor}
                  </div>

                  <div className="text-xs text-ink-soft">
                    {cargoAsesor}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center gap-3">
                  <MessageCircle
                    size={16}
                    className="text-brand-blue"
                  />

                  <span className="text-ink-soft">
                    WhatsApp:
                  </span>

                  <span className="font-medium">
                    {displayAsesor}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail
                    size={16}
                    className="text-brand-blue"
                  />

                  <span className="text-ink-soft">
                    Email:
                  </span>

                  <span className="font-medium text-xs">
                    {emailAsesor}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${telefonoAsesor}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-blue text-cream px-6 py-4 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-brand-blue-deep transition-colors"
                >
                  <span>
                    Escribir por WhatsApp
                  </span>

                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={`mailto:${emailAsesor}`}
                  className="w-full bg-transparent text-ink px-6 py-4 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2 border border-black/10 hover:bg-ink hover:text-cream hover:border-ink transition-all"
                >
                  <span>Enviar email</span>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-black/10 text-xs text-ink-soft text-center">
                <span>
                  Codigo: {propiedad.codigo}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="reveal px-6 md:px-12 pb-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-brand-blue text-cream rounded-3xl p-12 md:p-16 text-center">
            <div className="eyebrow text-sun mb-4">
              Te interesa esta propiedad?
            </div>

            <h2 className="display text-3xl md:text-4xl mb-5">
              <span>Agenda una </span>

              <span className="italic-display text-sun">
                visita.
              </span>
            </h2>

            <p className="text-base opacity-85 max-w-[540px] mx-auto mb-7 font-light leading-relaxed">
              Coordinamos visitas presenciales o
              video-tours en directo segun
              prefieras.
            </p>

            <a
              href={`https://wa.me/${telefonoAsesor}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
            >
              <span>
                WhatsApp{" "}
                {nombreAsesor.split(" ")[0]} -{" "}
                {displayAsesor}
              </span>

              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}