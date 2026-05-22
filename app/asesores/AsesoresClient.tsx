"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Torogoz from "@/components/Torogoz";
import { urlFor } from "@/lib/sanity";
import {
  getPersonSchema,
  getBreadcrumbSchema,
  jsonLdScript,
} from "@/lib/schema";

type Asesor = {
  _id: string;
  nombre: string;
  slug: string;
  cargo?: string;
  telefono: string;
  telefonoDisplay?: string;
  email?: string;
  foto?: unknown;
  fotoUrl?: string;
  bio?: string;
};

type Props = {
  asesores: Asesor[];
};

export default function AsesoresClient({ asesores }: Props) {
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

  const getImageUrl = (image: unknown, width = 600, height = 600) => {
    if (!image) return "";

    try {
      const img = image as { asset?: unknown };
      if (!img.asset) return "";

      return urlFor(image).width(width).height(height).url();
    } catch {
      return "";
    }
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Asesores", url: "/asesores" },
  ]);

  const personSchemas = asesores.map((asesor) =>
    getPersonSchema({
      nombre: asesor.nombre,
      cargo: asesor.cargo,
      telefono: asesor.telefono,
      email: asesor.email,
      bio: asesor.bio,
      slug: asesor.slug,
      fotoUrl: asesor.fotoUrl,
    })
  );

  return (
    <div className="bg-cream text-ink min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbSchema)}
      />

      {personSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(schema)}
        />
      ))}

      <Navbar />

      {/* HERO */}
      <section className="pt-32 px-6 md:px-12 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-ink-soft mb-6">
            <Link href="/" className="opacity-70 hover:opacity-100">
              <span>Inicio</span>
            </Link>

            <ChevronRight size={12} className="opacity-40" />

            <span className="text-brand-blue font-medium">Asesores</span>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-2">
            <div>
              <div className="eyebrow text-sun mb-3">El equipo</div>

              <h1 className="display text-5xl md:text-7xl mb-4">
                <span>Detras de cada propiedad, </span>
                <br />
                <span className="italic-display text-brand-blue">
                  hay personas reales.
                </span>
              </h1>

              <p className="text-lg text-ink-soft max-w-[600px] font-light leading-relaxed">
                No somos una franquicia. No somos un call center. Somos dos
                socios trabajando con pocos clientes a la vez, con atencion
                directa y sin plantillas.
              </p>
            </div>

            <div className="text-right">
              <div className="display text-5xl text-brand-blue leading-none">
                {asesores.length}
              </div>

              <div className="text-xs text-ink-soft tracking-wider uppercase mt-1">
                <span>
                  {asesores.length === 1 ? "asesor" : "asesores activos"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASESORES GRID */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1200px] mx-auto">
          {asesores.length === 0 ? (
            <div className="p-20 text-center bg-cream-warm rounded-3xl border border-dashed border-black/10">
              <h3 className="display text-3xl mb-3">
                <span>Sin asesores activos</span>
              </h3>

              <p className="text-sm text-ink-soft max-w-md mx-auto font-light">
                Carga asesores en Sanity Studio y apareceran aqui
                automaticamente.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {asesores.map((asesor) => {
                const primerNombre = asesor.nombre.split(" ")[0];
                const whatsappMsg = encodeURIComponent(
                  `Hola ${primerNombre}, quisiera mas informacion sobre sus servicios inmobiliarios.`
                );

                return (
                  <article
                    key={asesor._id}
                    className="reveal bg-cream-warm rounded-3xl overflow-hidden border border-black/10 hover:border-brand-blue transition-colors"
                  >
                    <div className="relative aspect-[4/3] bg-stone overflow-hidden">
                      {asesor.foto ? (
                        <img
                          src={getImageUrl(asesor.foto, 800, 600)}
                          alt={asesor.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-brand-blue text-cream display text-5xl flex items-center justify-center">
                            {asesor.nombre.charAt(0)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-8 md:p-10">
                      <div className="eyebrow text-sun mb-2">
                        {asesor.cargo || "Asesor inmobiliario"}
                      </div>

                      <h2 className="display text-3xl md:text-4xl mb-5">
                        {asesor.nombre}
                      </h2>

                      {asesor.bio ? (
                        <p className="text-[15px] leading-relaxed text-ink-soft mb-7 font-light">
                          {asesor.bio}
                        </p>
                      ) : null}

                      <div className="space-y-3 mb-7 pt-6 border-t border-black/10">
                        {asesor.telefonoDisplay ? (
                          <div className="flex items-center gap-3 text-sm">
                            <MessageCircle
                              size={16}
                              className="text-brand-blue"
                            />
                            <span className="text-ink-soft">WhatsApp:</span>
                            <span className="font-medium">
                              {asesor.telefonoDisplay}
                            </span>
                          </div>
                        ) : null}

                        {asesor.email ? (
                          <div className="flex items-center gap-3 text-sm">
                            <Mail size={16} className="text-brand-blue" />
                            <span className="text-ink-soft">Email:</span>
                            <span className="font-medium">{asesor.email}</span>
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={`https://wa.me/${asesor.telefono}?text=${whatsappMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-brand-blue text-cream px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-brand-blue-deep transition-colors flex-1"
                        >
                          <span>Escribir por WhatsApp</span>
                          <ArrowUpRight size={14} />
                        </a>

                        {asesor.email ? (
                          <a
                            href={`mailto:${asesor.email}`}
                            className="bg-transparent text-ink px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2 border border-black/10 hover:bg-ink hover:text-cream hover:border-ink transition-all flex-1"
                          >
                            <span>Email</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
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
                No sabes a quien escribir?
              </div>

              <h2 className="display text-4xl md:text-5xl mb-5">
                <span>Cuentanos tu caso </span>
                <br />
                <span className="italic-display text-sun">
                  y te asignamos al indicado.
                </span>
              </h2>

              <p className="text-lg opacity-85 max-w-[540px] mx-auto mb-8 font-light leading-relaxed">
                Mario maneja venta residencial y diaspora. Carlos maneja
                terrenos y propiedades comerciales. Cuentanos que buscas y
                conectas con el socio correcto.
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