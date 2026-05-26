"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle2,
  Shield,
  Camera,
  Video,
  Globe2,
  Users,
  FileCheck,
  BarChart3,
  Target,
  Eye,
  HandCoins,
  MessageCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Torogoz from "@/components/Torogoz";

export default function VenderPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [wizardStep, setWizardStep] = useState(1);

  const [formData, setFormData] = useState({
    propertyType: "",
    zone: "",
    area: "",
    timing: "",
    name: "",
    whatsapp: "",
    email: "",
  });

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

  const processSteps = [
    {
      num: "01",
      title: "Conversacion inicial",
      desc: "Una llamada de 20 minutos donde conoces el proceso y conversamos sobre tu propiedad.",
      icon: MessageCircle,
    },
    {
      num: "02",
      title: "Visita y orientacion",
      desc: "Visitamos tu propiedad y conversamos una orientacion de precio basada en el mercado actual.",
      icon: BarChart3,
    },
    {
      num: "03",
      title: "Sesion fotografica y drone",
      desc: "Fotografo profesional, drone 4K y video de recorrido. Coordinamos todo.",
      icon: Camera,
    },
    {
      num: "04",
      title: "Lanzamiento multi-canal",
      desc: "Publicacion simultanea en portales, redes sociales, grupos de realtors y red de diaspora.",
      icon: Globe2,
    },
    {
      num: "05",
      title: "Gestion de interesados",
      desc: "Filtramos, agendamos visitas, acompanamos el recorrido y negociamos por ti.",
      icon: Users,
    },
    {
      num: "06",
      title: "Cierre acompanado",
      desc: "Coordinamos escritura, transferencia y entrega. Todo listo sin tramitologia de ultima hora.",
      icon: FileCheck,
    },
  ];

  const whatsIncluded = [
    {
      icon: Camera,
      title: "Fotografia profesional",
      desc: "Sesion completa con fotografo. Sin celulares, sin flash directo.",
    },
    {
      icon: Video,
      title: "Video drone 4K",
      desc: "Tour aereo mas recorrido interior profesional.",
    },
    {
      icon: BarChart3,
      title: "Orientacion de precio",
      desc: "Conversamos el precio ideal de publicacion y piso de negociacion.",
    },
    {
      icon: Globe2,
      title: "Portales principales",
      desc: "Encuentra24, OLX, Cari Casas, Evisos y mas. Simultaneo.",
    },
    {
      icon: Users,
      title: "Red de realtors SV",
      desc: "Activamos grupos profesionales de bienes raices del pais.",
    },
    {
      icon: Target,
      title: "Red diaspora",
      desc: "Compartimos con salvadorenos en Houston, Toronto, NY, DC y mas.",
    },
    {
      icon: Eye,
      title: "Reporte semanal",
      desc: "Te enviamos estadisticas reales: visitas, interesados, feedback.",
    },
    {
      icon: Shield,
      title: "Visitas filtradas",
      desc: "Solo compradores pre-cualificados. Nada de curiosos.",
    },
    {
      icon: HandCoins,
      title: "Negociacion experta",
      desc: "Negociamos por ti para maximizar el precio final de venta.",
    },
  ];

  const faqs = [
    {
      q: "Cuanto tarda en venderse una propiedad?",
      a: "En promedio 60 a 180 dias, dependiendo de precio, zona y tipo. La clave es salir con un precio realista desde el inicio.",
    },
    {
      q: "Tengo que darles exclusividad?",
      a: "No es obligatorio, pero si recomendado. Una propiedad con multiples inmobiliarias sin exclusividad suele venderse peor. Somos transparentes sobre esto desde el inicio.",
    },
    {
      q: "Que pasa si mi propiedad no se vende?",
      a: "No cobramos comision si no vendemos. Los gastos operativos de fotografia, publicacion y campanas los asumimos nosotros.",
    },
    {
      q: "Necesito un avaluo profesional?",
      a: "Sí, lo recomendamos. Un avalúo formal con perito autorizado te da un precio certero y respaldado: evita que vendas por debajo del valor real de mercado o que pongas un precio tan alto que la propiedad no se venda. Además, es indispensable para trámites oficiales como banco, herencia o divorcio. Si lo necesitás, te referimos a un perito de confianza.",
    },
    {
      q: "Como manejan las visitas si yo no puedo estar?",
      a: "Nosotros acompanamos cada visita. Coordinamos horarios contigo, filtramos compradores y te enviamos feedback de cada visita.",
    },
    {
      q: "Trabajan con compradores de EE.UU. y Canada?",
      a: "Si, es uno de nuestros diferenciadores. Tenemos red activa en varias ciudades y experiencia con compras remotas completas.",
    },
  ];

  const isStep1Valid = Boolean(formData.propertyType && formData.zone);
  const isStep2Valid = Boolean(formData.area);
  const isStep3Valid = Boolean(formData.name && formData.whatsapp);

  const nextStep = () => setWizardStep((step) => Math.min(step + 1, 4));
  const prevStep = () => setWizardStep((step) => Math.max(step - 1, 1));

  const buildWhatsappMessage = () => {
    const tipoLabels: Record<string, string> = {
      casa: "Casa",
      apartamento: "Apartamento",
      terreno: "Terreno",
      comercial: "Comercial",
    };

    const tipo = tipoLabels[formData.propertyType] || formData.propertyType;

    const lineas = [
      "Hola! Quiero vender mi propiedad con ES Tu Casa.",
      "",
      "*Tipo:* " + tipo,
      "*Zona:* " + formData.zone,
      "*Area aproximada:* " + formData.area,
      "*Tiempo para vender:* " + (formData.timing || "No especificado"),
      "",
      "*Mis datos:*",
      "Nombre: " + formData.name,
      "WhatsApp: " + formData.whatsapp,
      "Email: " + (formData.email || "No proporcionado"),
    ];

    return encodeURIComponent(lineas.join("\n"));
  };

  const enviarAWhatsApp = (numero: string) => {
    const mensaje = buildWhatsappMessage();
    const url = "https://wa.me/" + numero + "?text=" + mensaje;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-cream text-ink min-h-screen">
      <Navbar variant="dark" />

      {/* HERO */}
      <section
        className="pt-36 px-6 md:px-12 pb-24 relative overflow-hidden text-cream"
        style={{
          background: "linear-gradient(180deg, #0D2060 0%, #050E30 100%)",
        }}
      >
        <div className="hidden md:block absolute top-48 right-[10%] animate-float">
          <Torogoz size={180} />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="eyebrow text-sun mb-6">
            <span>Para propietarios - Vender en El Salvador</span>
          </div>

          <h1 className="display text-5xl md:text-7xl lg:text-8xl mb-8 max-w-[1200px]">
            <span>Vender tu propiedad, </span>
            <span className="italic-display text-sun">bien hecho.</span>
          </h1>

          <div className="max-w-[680px] mb-10">
            <p className="text-lg leading-relaxed opacity-90 font-light">
              <span>
                Fotografia profesional, video-drone 4K, publicacion multi-canal
                y{" "}
              </span>
              <strong className="text-sun">acompanamiento completo</strong>
              <span>
                {" "}
                - aqui, o para propietarios salvadorenos que viven fuera del
                pais.
              </span>
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a
              href="#wizard"
              className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
            >
              <span>Conversemos sobre tu propiedad</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="#proceso"
              className="px-7 py-4 rounded-full text-sm border border-white/20 text-cream inline-flex items-center gap-2 hover:border-sun hover:text-sun transition-colors"
            >
              <span>Ver como trabajamos</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mt-20 pt-8 border-t border-white/15">
            <div>
              <div className="display text-5xl text-sun">4K</div>
              <div className="text-sm opacity-70 mt-2">
                video-drone profesional incluido
              </div>
            </div>

            <div>
              <div className="display text-5xl text-sun">
                <span>6+</span>
                <span className="italic-display text-xl ml-1">ciudades</span>
              </div>
              <div className="text-sm opacity-70 mt-2">
                red de diaspora EE.UU. y Canada
              </div>
            </div>

            <div>
              <div className="display text-5xl text-sun">24h</div>
              <div className="text-sm opacity-70 mt-2">
                respuesta garantizada
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE NOSOTROS */}
      <section className="reveal px-6 md:px-12 py-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
            <div>
              <div className="eyebrow text-sun mb-4">01 - Por que nosotros</div>

              <h2 className="display text-5xl md:text-6xl mb-8">
                <span>Vender bien es </span>
                <span className="italic-display text-brand-blue">
                  acompanamiento.
                </span>
              </h2>

              <div className="text-[17px] leading-relaxed text-ink-soft font-light space-y-4">
                <p>
                  Una propiedad no se vende con una foto de celular y un anuncio
                  generico. Se vende con{" "}
                  <strong className="text-brand-blue">
                    presentacion profesional
                  </strong>
                  , estrategia multi-canal y red activa de compradores.
                </p>

                <p>
                  Te acompanamos de principio a fin - fotografia, video-drone
                  4K, publicacion simultanea en portales principales y
                  activacion de nuestra red de diaspora salvadorena.
                </p>

                <p>
                  Filtramos a los curiosos. Solo te llegan compradores serios.
                </p>
              </div>
            </div>

            <div className="bg-cream-warm border border-black/10 rounded-3xl p-10 relative">
              <div className="absolute -top-3 right-6 bg-sun text-brand-blue-deep px-4 py-1 rounded-full text-[11px] tracking-wider uppercase font-bold">
                Servicio completo
              </div>

              <div className="italic-display text-6xl text-sun leading-none mb-4">
                <span>&ldquo;</span>
              </div>

              <p className="display text-2xl leading-snug mb-6">
                <span>Tu tiempo vale. </span>
                <span className="italic-display text-brand-blue">
                  No lo gastamos en curiosos.
                </span>
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10">
                <div>
                  <div className="eyebrow text-ink-soft mb-1">
                    Presentacion
                  </div>
                  <div className="text-sm font-medium">
                    Fotografia + video-drone 4K
                  </div>
                </div>

                <div>
                  <div className="eyebrow text-ink-soft mb-1">
                    Distribucion
                  </div>
                  <div className="text-sm font-medium">
                    Portales + redes + diaspora
                  </div>
                </div>

                <div>
                  <div className="eyebrow text-ink-soft mb-1">Filtro</div>
                  <div className="text-sm font-medium">
                    Compradores pre-cualificados
                  </div>
                </div>

                <div>
                  <div className="eyebrow text-ink-soft mb-1">Cierre</div>
                  <div className="text-sm font-medium">
                    Coordinacion legal completa
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-cream-warm rounded-2xl p-6 border border-black/10 border-l-4 border-l-turquoise flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-turquoise text-cream flex items-center justify-center flex-shrink-0">
              <Shield size={18} />
            </div>

            <div>
              <div className="eyebrow text-turquoise mb-1">
                <span>Necesitas un avaluo formal?</span>
              </div>

              <p className="text-sm leading-relaxed text-ink-soft">
                Si el tramite es para banco, sucesion, divorcio o cualquier
                proceso legal, necesitas un{" "}
                <strong>avaluo oficial de un perito valuador autorizado</strong>.
                Con gusto te referimos a uno de confianza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section
        id="proceso"
        className="reveal px-6 md:px-12 py-24 bg-cream-warm"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 max-w-[900px]">
            <div className="eyebrow text-sun mb-4">02 - Nuestro proceso</div>

            <h2 className="display text-5xl md:text-7xl">
              <span>Vender bien es </span>
              <span className="italic-display text-brand-blue">metodo,</span>
              <br />
              <span>no suerte.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {processSteps.map((step) => {
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

                  <h3 className="display text-2xl mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUE INCLUYE */}
      <section className="reveal px-6 md:px-12 py-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 max-w-[900px]">
            <div className="eyebrow text-sun mb-4">03 - Servicio completo</div>

            <h2 className="display text-5xl md:text-7xl">
              <span>Todo incluido.</span>
              <br />
              <span className="italic-display text-brand-blue">
                Tu vives tu vida.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {whatsIncluded.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-6 bg-cream border border-black/10 rounded-2xl hover:border-brand-blue transition-all"
                >
                  <div className="w-11 h-11 min-w-[44px] rounded-lg bg-brand-blue text-cream flex items-center justify-center">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-1">
                      {item.title}
                    </h4>

                    <p className="text-xs text-ink-soft leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-cream-warm rounded-3xl p-8 border border-black/10 flex justify-between items-center flex-wrap gap-6">
            <div className="flex-1 min-w-[280px]">
              <div className="eyebrow text-sun mb-2">Sobre los honorarios</div>

              <p className="display text-2xl max-w-[640px]">
                <span>Conversamos los honorarios cuando veas el </span>
                <span className="italic-display text-brand-blue">
                  valor que agregamos.
                </span>
              </p>

              <p className="text-sm text-ink-soft mt-2 font-light">
                Cada caso es distinto. Te presentamos una propuesta
                personalizada.
              </p>
            </div>

            <a
              href="#wizard"
              className="bg-brand-blue text-cream px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-brand-blue-deep transition-colors"
            >
              <span>Empezar la conversacion</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* WIZARD */}
      <section
        id="wizard"
        className="reveal px-6 md:px-12 py-24 bg-cream-warm"
      >
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <div className="eyebrow text-sun mb-4">
              04 - Conversemos sobre tu propiedad
            </div>

            <h2 className="display text-5xl md:text-6xl mb-5">
              <span>Cuentanos de tu </span>
              <span className="italic-display text-brand-blue">
                propiedad.
              </span>
            </h2>

            <p className="text-[17px] text-ink-soft max-w-[600px] mx-auto font-light leading-relaxed">
              Tres pasos rapidos. Mario o Carlos te contactan el mismo dia, sin
              compromiso y sin costo.
            </p>
          </div>

          <div className="bg-cream rounded-3xl p-8 md:p-12 border border-black/10">
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={
                    wizardStep === step
                      ? "flex-1 h-[3px] rounded bg-brand-blue"
                      : wizardStep > step
                      ? "flex-1 h-[3px] rounded bg-sun"
                      : "flex-1 h-[3px] rounded bg-black/10"
                  }
                />
              ))}
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="eyebrow text-brand-blue">
                <span>Paso {wizardStep} de 4</span>
              </div>
            </div>

            {wizardStep === 1 ? (
              <div>
                <h3 className="display text-3xl mb-6">
                  <span>Que tipo de propiedad </span>
                  <span className="italic-display text-brand-blue">
                    quieres vender?
                  </span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {[
                    { value: "casa", label: "Casa" },
                    { value: "apartamento", label: "Apartamento" },
                    { value: "terreno", label: "Terreno" },
                    { value: "comercial", label: "Comercial" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          propertyType: option.value,
                        })
                      }
                      className={
                        formData.propertyType === option.value
                          ? "p-5 rounded-xl bg-brand-blue text-cream border border-brand-blue font-medium text-sm"
                          : "p-5 rounded-xl bg-cream-warm text-ink border border-black/10 font-medium text-sm hover:border-brand-blue"
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <h3 className="display text-3xl mb-4">
                  <span>En que zona </span>
                  <span className="italic-display text-brand-blue">
                    esta ubicada?
                  </span>
                </h3>

                <input
                  type="text"
                  placeholder="Ej: Colonia Escalon, San Salvador"
                  value={formData.zone}
                  onChange={(event) =>
                    setFormData({ ...formData, zone: event.target.value })
                  }
                  className="w-full bg-cream-warm border border-black/10 rounded-xl px-5 py-4 text-[15px] outline-none focus:border-brand-blue mb-6"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStep1Valid}
                    className={
                      isStep1Valid
                        ? "bg-brand-blue text-cream px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-brand-blue-deep"
                        : "bg-brand-blue/40 text-cream/60 px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 cursor-not-allowed"
                    }
                  >
                    <span>Continuar</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : null}

            {wizardStep === 2 ? (
              <div>
                <h3 className="display text-3xl mb-6">
                  <span>Algunos datos </span>
                  <span className="italic-display text-brand-blue">
                    rapidos.
                  </span>
                </h3>

                <div className="mb-5">
                  <label className="eyebrow text-ink-soft mb-2 block">
                    Area aproximada
                  </label>

                  <input
                    type="text"
                    placeholder="Ej. 1200 varas cuadradas"
                    value={formData.area}
                    onChange={(event) =>
                      setFormData({ ...formData, area: event.target.value })
                    }
                    className="w-full bg-cream-warm border border-black/10 rounded-xl px-5 py-4 text-[15px] outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="mb-8">
                  <label className="eyebrow text-ink-soft mb-2 block">
                    En cuanto tiempo pensarias vender?
                  </label>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Ya", "1-3 meses", "3-6 meses", "Solo curiosidad"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, timing: option })
                          }
                          className={
                            formData.timing === option
                              ? "p-3 rounded-xl bg-brand-blue text-cream border border-brand-blue text-sm font-medium"
                              : "p-3 rounded-xl bg-cream-warm border border-black/10 text-sm font-medium hover:border-brand-blue"
                          }
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-transparent border border-black/10 px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-ink hover:text-cream"
                  >
                    <ArrowLeft size={14} />
                    <span>Atras</span>
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStep2Valid}
                    className={
                      isStep2Valid
                        ? "bg-brand-blue text-cream px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-brand-blue-deep"
                        : "bg-brand-blue/40 text-cream/60 px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 cursor-not-allowed"
                    }
                  >
                    <span>Continuar</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : null}

            {wizardStep === 3 ? (
              <div>
                <h3 className="display text-3xl mb-2">
                  <span>Como te </span>
                  <span className="italic-display text-brand-blue">
                    contactamos?
                  </span>
                </h3>

                <p className="text-sm text-ink-soft mb-6 font-light">
                  Tu informacion no se comparte con nadie mas. Solo Mario o
                  Carlos te contactaran.
                </p>

                <div className="mb-4">
                  <label className="eyebrow text-ink-soft mb-2 block">
                    Tu nombre
                  </label>

                  <input
                    type="text"
                    placeholder="Nombre y apellido"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                    className="w-full bg-cream-warm border border-black/10 rounded-xl px-5 py-4 text-[15px] outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="eyebrow text-ink-soft mb-2 block">
                      WhatsApp
                    </label>

                    <input
                      type="tel"
                      placeholder="7777-7777"
                      value={formData.whatsapp}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          whatsapp: event.target.value,
                        })
                      }
                      className="w-full bg-cream-warm border border-black/10 rounded-xl px-5 py-4 text-[15px] outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="eyebrow text-ink-soft mb-2 block">
                      Email opcional
                    </label>

                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          email: event.target.value,
                        })
                      }
                      className="w-full bg-cream-warm border border-black/10 rounded-xl px-5 py-4 text-[15px] outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-transparent border border-black/10 px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-ink hover:text-cream"
                  >
                    <ArrowLeft size={14} />
                    <span>Atras</span>
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStep3Valid}
                    className={
                      isStep3Valid
                        ? "bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft"
                        : "bg-sun/40 text-brand-blue-deep/60 px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 cursor-not-allowed"
                    }
                  >
                    <span>Revisar y enviar</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ) : null}

            {wizardStep === 4 ? (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-full bg-torogoz text-cream flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>

                <h3 className="display text-4xl mb-4">
                  <span>Casi </span>
                  <span className="italic-display text-brand-blue">listo!</span>
                </h3>

                <p className="text-[17px] text-ink-soft max-w-[480px] mx-auto mb-8 font-light leading-relaxed">
                  Elige a quien enviar tu informacion. Se abrira WhatsApp con
                  todos tus datos listos - solo toca enviar.
                </p>

                <div className="flex gap-3 justify-center flex-wrap mb-6">
                  <button
                    type="button"
                    onClick={() => enviarAWhatsApp("50379889533")}
                    className="bg-brand-blue text-cream px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-brand-blue-deep transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Enviar a Mario - 7988-9533</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => enviarAWhatsApp("50373963858")}
                    className="bg-sun text-brand-blue-deep px-7 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-sun-soft transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Enviar a Carlos - 7396-3858</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-transparent border border-black/10 px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-ink hover:text-cream transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Atras</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="reveal px-6 md:px-12 py-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <div className="eyebrow text-sun mb-4">
              06 - Preguntas frecuentes
            </div>

            <h2 className="display text-5xl md:text-6xl">
              <span>Lo que otros </span>
              <span className="italic-display text-brand-blue">
                propietarios preguntan.
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
                      ? "border-b border-black/10 bg-cream-warm"
                      : "border-b border-black/10"
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full flex justify-between items-center py-7 px-6 text-left cursor-pointer hover:bg-cream-warm transition-colors"
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

      <Footer />
    </div>
  );
}