import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Red = {
  nombre: string;
  handle: string;
  url: string;
  icon: ReactNode;
};

export default function Siguenos() {
  const redes: Red[] = [
    {
      nombre: "Instagram",
      handle: "@estucasa_elsalvador",
      url: "https://www.instagram.com/estucasa_elsalvador/",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      nombre: "Facebook",
      handle: "@Estucasasv",
      url: "https://www.facebook.com/Estucasasv",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      nombre: "TikTok",
      handle: "@estucasasvelsalvador",
      url: "https://www.tiktok.com/@estucasasvelsalvador",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      nombre: "YouTube",
      handle: "@EStucasaInmobiliariaElsalvador",
      url: "https://www.youtube.com/@EStucasaInmobiliariaElsalvador",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ];

  return (
    <section className="reveal px-6 md:px-12 py-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow text-sun mb-4">Encuentranos en redes</div>

          <h2 className="display text-4xl md:text-6xl mb-5">
            <span>Donde el dia a dia </span>
            <br />
            <span className="italic-display text-brand-blue">se cuenta.</span>
          </h2>

          <p className="text-lg text-ink-soft max-w-[540px] mx-auto font-light leading-relaxed">
            Propiedades nuevas, recorridos en video, tips de inversion y vida
            cotidiana. Seguinos donde mas te guste.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {redes.map((red) => (
            <a
              key={red.nombre}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-cream-warm border border-black/10 rounded-3xl p-7 md:p-8 flex flex-col items-center text-center hover:bg-brand-blue hover:border-brand-blue hover:text-cream transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-blue text-cream flex items-center justify-center mb-5 group-hover:bg-cream group-hover:text-brand-blue transition-all duration-500">
                {red.icon}
              </div>

              <div className="display text-xl mb-1.5">{red.nombre}</div>

              <div className="text-xs opacity-60 tracking-wider mb-5 group-hover:opacity-80 transition-opacity">
                {red.handle}
              </div>

              <div className="text-[11px] tracking-[0.2em] uppercase font-semibold inline-flex items-center gap-1.5 mt-auto">
                <span>Seguir</span>
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}