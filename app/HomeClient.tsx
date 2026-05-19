"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Waves from "@/components/Waves";
import Sun from "@/components/Sun";
import Torogoz from "@/components/Torogoz";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Siguenos from "@/components/Siguenos";
import { urlFor } from "@/lib/sanity";

type Destacada = {
  _id: string;
  codigo: string;
  titulo: string;
  slug: string;
  tipo: string;
  precio: number;
  etiqueta?: string;
  fotoPortada?: unknown;
  habitaciones?: number;
  banosCompletos?: number;
  areaConstruccion?: number;
  areaTerreno?: number;
  zona?: {
    nombre: string;
    municipio?: string;
  };
};

type Props = {
  destacadas: Destacada[];
};

export default function HomeClient({ destacadas }: Props) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getImageUrl = (image: unknown, width = 800, height = 600) => {
    if (!image) return "";

    try {
      return urlFor(image).width(width).height(height).url();
    } catch {
      return "";
    }
  };

  const lanes = [
    {
      num: "I",
      title: "Busco propiedad",
      subtitle: "Comprador local",
      desc: "Casas, terrenos y apartamentos en todo el pais. Financiamiento bancario coordinado, visitas acompanadas.",
      link: "/propiedades",
      linkText: "Ver propiedades",
    },
    {
      num: "II",
      title: "Compro desde afuera",
      subtitle: "Hermano Lejano",
      desc: "Video-recorridos 4K, firma por poder, escribana de confianza y transferencia supervisada.",
      link: "/hermano-lejano",
      linkText: "Proceso remoto",
    },
    {
      num: "III",
      title: "Quiero vender",
      subtitle: "Propietario",
      desc: "Fotografia profesional, video-drone incluido, listado en portales y red de diaspora.",
      link: "/vender",
      linkText: "Conversemos",
    },
  ];

  const principal = destacadas[0];
  const secundarias = destacadas.slice(1, 4);

  return (
    <div className="bg-cream text-ink">
      <Navbar />

      {/* HERO */}
      <section className="pt-36 px-6 md:px-12 pb-16 relative overflow-hidden">
        <div className="hidden md:block absolute top-36 right-[6%] animate-float">
          <div className="animate-spin-slow">
            <Sun size={140} />
          </div>
        </div>

        <div className="hidden md:block absolute top-[300px] right-[10%] z-[1] animate-float">
          <div className="text-brand-blue drop-shadow-2xl">
            <Torogoz size={180} />
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex justify-between items-center mb-14 flex-wrap gap-4">
            <div className="eyebrow text-sun animate-fade-up">
              <span className="text-ink-soft">SV - Edicion</span> No 012 -
              Abril 2026
            </div>

            <div className="eyebrow text-ink-soft animate-fade-up hidden md:block">
              Asesoria inmobiliaria - El Salvador - Desde 2019
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 mb-16 items-start">
            <div className="max-w-[1100px]">
              <h1 className="display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] mb-6">
                <span className="block animate-fade-up">El Salvador</span>
                <span className="block animate-fade-up text-brand-blue">
                  <span className="bg-brand-blue text-cream px-4 rounded-xl mr-3 inline-block">
                    ES
                  </span>
                  <span className="italic-display">Tu Casa.</span>
                </span>
              </h1>

              <p className="text-[15px] text-ink-soft tracking-wide mt-3 max-w-[640px] animate-fade-up">
                <strong className="text-brand-blue font-semibold">ES</strong>{" "}
                es El Salvador. <strong>Tu Casa</strong> es lo que hacemos.
                Nuestro nombre es tambien nuestra promesa.
              </p>
            </div>

            <div className="reveal hidden lg:flex flex-col justify-center pt-12 pr-[180px] xl:pr-[200px]">
              <div className="relative">
                <div className="absolute -top-8 -left-2 display text-8xl text-sun opacity-60 leading-none select-none">
                  &ldquo;
                </div>

                <blockquote className="display text-3xl xl:text-4xl leading-tight text-ink relative pl-4">
                  <span className="block">Tu casa</span>
                  <span className="block">es el comienzo</span>
                  <span className="italic-display text-brand-blue">
                    de tu historia.
                  </span>
                </blockquote>

                <div className="mt-6 pl-4 border-l-2 border-sun">
                  <div className="eyebrow text-ink-soft mb-1">
                    Nuestra promesa
                  </div>
                  <div className="text-sm font-medium text-ink">
                    ES Tu Casa Inmobiliaria
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-end mb-14">
            <p className="reveal text-lg leading-relaxed text-ink-soft max-w-[520px] font-light">
              Propiedades destacadas desde San Salvador hasta la costa.
              Video-drone profesional, acompanamiento completo y red de
              compradores - aqui, o a ocho mil kilometros de distancia.
            </p>

            <div className="reveal flex gap-3 flex-wrap md:justify-end">
              <Link
                href="/propiedades"
                className="bg-brand-blue text-cream px-7 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2 border border-brand-blue hover:bg-brand-blue-deep transition-colors"
              >
                <span>Ver propiedades</span>
                <ArrowUpRight size={14} />
              </Link>

              <Link
                href="/hermano-lejano"
                className="bg-transparent text-ink px-7 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2 border border-black/10 hover:bg-ink hover:text-cream hover:border-ink transition-all"
              >
                <span>Compra desde el exterior</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 text-brand-blue">
          <Waves />
        </div>
      </section>

      {/* TRES CAMINOS */}
      <section className="reveal px-6 md:px-12 py-28">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-20 mb-20">
            <div>
              <div className="eyebrow text-sun mb-4">01 - Tres caminos</div>

              <h2 className="display text-5xl md:text-6xl">
                <span>Que te trajo </span>
                <br />
                <span className="italic-display text-brand-blue">
                  hasta aqui?
                </span>
              </h2>
            </div>

            <p className="text-lg text-ink-soft max-w-[520px] self-end font-light leading-relaxed">
              Tres historias distintas, tres recorridos distintos. Elige el tuyo
              y cuentanos tu caso - respondemos el mismo dia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lanes.map((lane) => (
              <Link
                key={lane.num}
                href={lane.link}
                className="group p-10 border border-black/10 rounded-3xl bg-cream-warm min-h-[360px] flex flex-col justify-between hover:bg-brand-blue hover:text-cream hover:border-brand-blue transition-all duration-500 cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="italic-display text-3xl text-sun">
                      {lane.num}
                    </span>

                    <ArrowUpRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-sun"
                    />
                  </div>

                  <div className="eyebrow mb-2 opacity-70">
                    {lane.subtitle}
                  </div>

                  <h3 className="display text-4xl mb-4">{lane.title}</h3>

                  <p className="text-[15px] leading-relaxed font-light">
                    {lane.desc}
                  </p>
                </div>

                <div className="eyebrow mt-8 tracking-[0.15em]">
                  <span>{lane.linkText}</span>
                  <span className="ml-1">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="text-brand-blue opacity-40">
        <Waves />
      </div>

      {/* PROPIEDADES DESTACADAS */}
      {destacadas.length > 0 ? (
        <section className="reveal px-6 md:px-12 py-28">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-end mb-16 flex-wrap gap-6">
              <div>
                <div className="eyebrow text-sun mb-4">
                  02 - Seleccion de la temporada
                </div>

                <h2 className="display text-5xl md:text-7xl">
                  <span>Propiedades </span>
                  <br />
                  <span className="italic-display text-brand-blue">
                    destacadas.
                  </span>
                </h2>
              </div>

              <Link
                href="/propiedades"
                className="bg-transparent text-ink px-7 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2 border border-black/10 hover:bg-ink hover:text-cream hover:border-ink transition-all"
              >
                <span>Ver todas</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {principal ? (
              <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 mb-6">
                <Link
                  href={`/propiedades/${principal.codigo}`}
                  className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone group cursor-pointer block"
                >
                  <span className="absolute top-6 left-6 bg-cream text-ink px-3 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase z-10">
                    <span>{principal.etiqueta || "Destacada"}</span>
                  </span>

                  {principal.fotoPortada ? (
                    <img
                      src={getImageUrl(principal.fotoPortada, 1200, 900)}
                      alt={principal.titulo}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/90 to-transparent text-cream">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-torogoz-bright animate-shimmer" />
                      <span className="eyebrow text-cream">
                        Disponible - {principal.tipo}
                      </span>
                    </div>

                    <h3 className="display text-4xl mb-2">
                      {principal.titulo}
                    </h3>

                    <div className="flex justify-between items-end flex-wrap gap-3">
                      <div className="text-sm opacity-80">
                        {principal.zona?.nombre || "El Salvador"}
                        {principal.areaConstruccion
                          ? ` - ${principal.areaConstruccion} m2`
                          : ""}
                      </div>

                      <div className="display text-4xl">
                        <span className="italic-display text-lg text-sun">
                          $
                        </span>
                        {principal.precio.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Link>

                {secundarias[0] ? (
                  <Link
                    href={`/propiedades/${secundarias[0].codigo}`}
                    className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone group cursor-pointer block"
                  >
                    {secundarias[0].etiqueta ? (
                      <span className="absolute top-6 left-6 bg-cream text-ink px-3 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase z-10">
                        <span>{secundarias[0].etiqueta}</span>
                      </span>
                    ) : null}

                    {secundarias[0].fotoPortada ? (
                      <img
                        src={getImageUrl(secundarias[0].fotoPortada, 800, 600)}
                        alt={secundarias[0].titulo}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                    ) : null}

                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent text-cream">
                      <div className="eyebrow text-cream mb-2">
                        {secundarias[0].tipo}
                        {secundarias[0].areaConstruccion
                          ? ` - ${secundarias[0].areaConstruccion} m2`
                          : ""}
                      </div>

                      <h3 className="display text-3xl mb-2">
                        {secundarias[0].titulo}
                      </h3>

                      <div className="display text-3xl">
                        <span className="text-sun text-sm">$</span>
                        {secundarias[0].precio.toLocaleString()}
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            ) : null}

            {secundarias.length > 1 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {secundarias.slice(1).map((property) => (
                  <Link
                    key={property._id}
                    href={`/propiedades/${property.codigo}`}
                    className="group cursor-pointer block"
                  >
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-stone">
                      {property.fotoPortada ? (
                        <img
                          src={getImageUrl(property.fotoPortada, 600, 450)}
                          alt={property.titulo}
                          className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                        />
                      ) : null}

                      <div className="absolute top-4 left-4">
                        <span className="bg-cream px-2.5 py-1.5 rounded-full italic-display text-[13px] text-brand-blue">
                          <span>{property.codigo}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="eyebrow text-ink-soft mb-1.5">
                          {property.tipo}
                        </div>

                        <h4 className="display text-[22px] mb-1">
                          {property.titulo}
                        </h4>

                        <div className="text-[13px] text-ink-soft">
                          {property.zona?.nombre || "El Salvador"}
                        </div>
                      </div>

                      <div className="display text-[22px] whitespace-nowrap">
                        <span className="text-xs text-sun">$</span>
                        {property.precio.toLocaleString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <Siguenos />

      {/* CTA */}
      <section className="reveal px-6 md:px-12 py-24 bg-cream-warm">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="eyebrow text-sun mb-4">Empieza la conversacion</div>

          <h2 className="display text-5xl md:text-6xl mb-6">
            <span>Tienes una </span>
            <span className="italic-display text-brand-blue">pregunta?</span>
          </h2>

          <p className="text-lg text-ink-soft max-w-[600px] mx-auto mb-10 font-light leading-relaxed">
            Escribenos por WhatsApp y te respondemos el mismo dia. Sin
            formularios complicados, sin esperas.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="https://wa.me/50379889533"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-blue text-cream px-7 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-brand-blue-deep transition-colors"
            >
              <span>WhatsApp Mario - 7988-9533</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="https://wa.me/50377303494"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
            >
              <span>WhatsApp Carlos - 7730-3494</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}