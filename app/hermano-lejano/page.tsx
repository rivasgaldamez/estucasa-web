"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Play,
  Plus,
  Minus,
  MessageCircle,
  Video,
  FileCheck,
  PenTool,
  ShieldCheck,
  Key,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Torogoz from "@/components/Torogoz";

export default function HermanoLejanoPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

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

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const process = [
    {
      num: "01",
      title: "Primera llamada",
      titleEn: "First call",
      desc: "Un Zoom de 30 minutos para conocerte, entender que buscas y explicarte como trabajamos. Sin compromiso.",
      descEn:
        "A 30-minute Zoom to get to know you and explain how we work. No commitment.",
      icon: MessageCircle,
    },
    {
      num: "02",
      title: "Video-recorrido 4K en vivo",
      titleEn: "Live 4K video tour",
      desc: "Visitamos las propiedades por ti con camara profesional. Te conectas en vivo y haces preguntas en tiempo real.",
      descEn:
        "We visit properties for you with professional cameras. You join live and ask questions.",
      icon: Video,
    },
    {
      num: "03",
      title: "Verificacion legal",
      titleEn: "Legal check",
      desc: "Verificamos escrituras en el CNR y revisamos gravamenes. Nada te toma por sorpresa.",
      descEn: "Title verification at the national registry CNR and lien check.",
      icon: FileCheck,
    },
    {
      num: "04",
      title: "Firma por poder",
      titleEn: "Signing by POA",
      desc: "Un familiar de confianza o una escribana autorizada firma por ti. Coordinamos todo el proceso notarial.",
      descEn: "A trusted relative or authorized notary signs on your behalf.",
      icon: PenTool,
    },
    {
      num: "05",
      title: "Transferencia supervisada",
      titleEn: "Supervised transfer",
      desc: "Acompanamiento bancario para la transferencia internacional. Cuenta escrow verificada.",
      descEn:
        "Banking support for the international wire to a verified escrow account.",
      icon: ShieldCheck,
    },
    {
      num: "06",
      title: "Entrega de llaves",
      titleEn: "Handover of keys",
      desc: "Grabamos la entrega completa, hacemos tour final en video y te enviamos el paquete documental digitalizado.",
      descEn:
        "We record the full handover and send the complete digital document package.",
      icon: Key,
    },
  ];

  const faqs = [
    {
      q: "Cuanto tarda todo el proceso?",
      a: "Entre 45 y 90 días desde la primera llamada hasta la entrega de llaves, dependiendo de financiamiento y tipo de propiedad.",
    },
    {
      q: "Puedo usar financiamiento bancario desde El Salvador?",
      a: "Si. Muchos bancos salvadorenos ofrecen creditos hipotecarios a compatriotas en el exterior con comprobacion de ingresos estadounidenses o canadienses.",
    },
    {
      q: "Como firmo si no puedo viajar?",
      a: "Dos opciones: firma por poder, donde un familiar o escribana firma por ti con poder notarial autenticado en el consulado; o firma electronica certificada, cuando aplica.",
    },
    {
      q: "Que pasa si me arrepiento antes de firmar?",
      a: "Hasta antes de firmar escritura no hay compromiso legal. Puedes retirarte del proceso en cualquier momento sin penalizacion.",
    },
    {
      q: "Cuanto cobran ustedes?",
      a: "Nuestra comision la paga tradicionalmente el vendedor, no el comprador. En casos donde actuamos como comprador-representante, se acuerda por escrito desde el inicio.",
    },
  ];

  const cities = [
    "Houston, TX",
    "Long Island, NY",
    "Los Angeles, CA",
    "Toronto, ON",
    "Maryland",
    "Virginia",
  ];

  return (
    <div className="text-cream min-h-screen">
      <Navbar variant="dark" />

      {/* HERO */}
      <section
        className="pt-36 px-6 md:px-12 pb-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0D2060 0%, #050E30 100%)",
        }}
      >
        <div className="hidden md:block absolute top-44 right-[8%] animate-float">
          <Torogoz size={160} />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="eyebrow text-sun mb-6">
            <span>Hermano Lejano - For Salvadorans Abroad</span>
          </div>

          <h1 className="display text-5xl md:text-7xl lg:text-8xl mb-8 max-w-[1100px]">
            <span className="block">Tu casa en El Salvador</span>
            <span className="block italic-display text-sun">
              te esta esperando.
            </span>
          </h1>

          <div className="max-w-[680px] mb-10">
            <p className="text-lg leading-relaxed opacity-90 font-light">
              <span>
                Comprar propiedad en El Salvador sin viajar, sin intermediarios{" "}
              </span>
              <span>de confianza dudosa y sin sorpresas al final.</span>
            </p>

            <p className="italic-display text-lg opacity-60 mt-2 leading-relaxed">
              Buying property in El Salvador without traveling, without shady
              middlemen, and without surprises at the end.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a
              href="https://wa.me/50379889533"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
            >
              <span>Quiero hablar por WhatsApp</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="#proceso"
              className="px-7 py-4 rounded-full text-sm border border-white/20 text-cream inline-flex items-center gap-2 hover:border-sun hover:text-sun transition-colors"
            >
              <Play size={14} />
              <span>Ver como funciona</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mt-20 pt-8 border-t border-white/15">
            <div>
              <div className="display text-5xl text-sun">12</div>
              <div className="text-sm opacity-70 mt-2">
                familias atendidas
              </div>
              <div className="italic-display text-sm opacity-50">
                families served
              </div>
            </div>

            <div>
              <div className="display text-5xl text-sun">
                <span>0</span>
                <span className="italic-display text-xl ml-1">viajes</span>
              </div>
              <div className="text-sm opacity-70 mt-2">
                necesarios para cerrar
              </div>
              <div className="italic-display text-sm opacity-50">
                trips required
              </div>
            </div>

            <div>
              <div className="display text-5xl text-sun">
                <span>6</span>
                <span className="italic-display text-xl ml-1">ciudades</span>
              </div>
              <div className="text-sm opacity-70 mt-2">
                en EE.UU. y Canada
              </div>
              <div className="italic-display text-sm opacity-50">
                in US and Canada
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section
        id="proceso"
        className="reveal px-6 md:px-12 py-24"
        style={{ background: "var(--color-cream-warm)", color: "#141210" }}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 max-w-[900px]">
            <div className="eyebrow text-sun mb-4">
              <span>02 - El proceso - The process</span>
            </div>

            <h2 className="display text-5xl md:text-7xl mb-4">
              <span>Seis pasos, </span>
              <span className="italic-display text-brand-blue">
                cero sorpresas.
              </span>
            </h2>

            <p className="italic-display text-2xl text-ink-soft opacity-70">
              Six steps, zero surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.num}
                  className="bg-cream border border-black/10 rounded-2xl p-8 hover:bg-brand-blue hover:text-cream hover:border-brand-blue transition-all duration-500 group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="italic-display text-5xl text-sun">
                      {step.num}
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-cream border border-black/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-sun transition-all">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="display text-2xl mb-1">{step.title}</h3>

                  <p className="italic-display text-base opacity-70 mb-4">
                    {step.titleEn}
                  </p>

                  <p className="text-sm leading-relaxed mb-2">{step.desc}</p>

                  <p className="italic-display text-xs opacity-60 leading-relaxed">
                    {step.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section
        className="px-6 md:px-12 py-24 text-cream relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0D2060 0%, #050E30 100%)",
        }}
      >
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="eyebrow text-sun mb-4">
            <span>04 - Desde donde nos escriben</span>
          </div>

          <h2 className="display text-5xl md:text-7xl mb-4 max-w-[900px]">
            <span>Seis ciudades, </span>
            <span className="italic-display text-sun">
              una casa que vuelve.
            </span>
          </h2>

          <p className="text-lg opacity-85 max-w-[600px] font-light leading-relaxed mb-10">
            Hemos trabajado con 12 familias salvadorenas viviendo en los Estados
            Unidos y Canada. Cada compra, documentada. Cada paso, grabado.
          </p>

          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm bg-white/5 border border-white/15 hover:bg-sun/10 hover:border-sun hover:text-sun transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-torogoz-bright" />
                <span>{city}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="reveal px-6 md:px-12 py-24"
        style={{ background: "var(--color-cream-warm)", color: "#141210" }}
      >
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <div className="eyebrow text-sun mb-4">
              <span>06 - Preguntas frecuentes</span>
            </div>

            <h2 className="display text-5xl md:text-6xl">
              <span>Lo que todos </span>
              <span className="italic-display text-brand-blue">
                preguntan primero.
              </span>
            </h2>
          </div>

          <div className="border-t border-black/10">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className={
                    isOpen
                      ? "border-b border-black/10 bg-cream"
                      : "border-b border-black/10"
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full flex justify-between items-center py-7 px-6 text-left cursor-pointer hover:bg-cream transition-colors"
                  >
                    <span className="display text-xl flex-1">{faq.q}</span>

                    <div
                      className={
                        isOpen
                          ? "w-9 h-9 rounded-full flex items-center justify-center border border-black/10 flex-shrink-0 bg-brand-blue text-cream"
                          : "w-9 h-9 rounded-full flex items-center justify-center border border-black/10 flex-shrink-0 bg-transparent text-ink"
                      }
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="px-6 pb-7">
                      <p className="text-[15px] leading-relaxed text-ink">
                        {faq.a}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 md:px-12 py-24"
        style={{ background: "var(--color-cream)", color: "#141210" }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <div className="eyebrow text-sun mb-4">
            <span>07 - Conversemos</span>
          </div>

          <h2 className="display text-5xl md:text-6xl mb-6">
            <span>Cuentanos tu caso.</span>
            <br />
            <span className="italic-display text-brand-blue">
              Te respondemos hoy.
            </span>
          </h2>

          <p className="text-lg text-ink-soft max-w-[600px] mx-auto mb-10 font-light leading-relaxed">
            Escribenos por WhatsApp directo a Mario o Carlos. Respondemos el
            mismo dia.
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
              href="https://wa.me/50373963858"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
            >
              <span>WhatsApp Carlos - 7396-3858</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}