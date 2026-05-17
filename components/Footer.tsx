import Link from "next/link";
import Image from "next/image";
import Waves from "./Waves";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream px-6 md:px-12 pt-20 pb-10 mt-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 text-sun opacity-30">
        <Waves />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/logo.png"
                alt="ES Tu Casa Inmobiliaria"
                width={72}
                height={72}
                className="object-contain"
              />

              <div>
                <div className="display text-2xl">ES Tu Casa</div>
                <div className="text-[9px] tracking-[0.22em] uppercase opacity-60 mt-0.5">
                  El Salvador - Inmobiliaria
                </div>
              </div>
            </div>

            <p className="italic-display text-sun text-xl mb-4">
              El Salvador es tu casa.
            </p>

            <p className="text-sm opacity-70 max-w-xs leading-relaxed">
              Asesoria inmobiliaria desde El Salvador. Propiedades destacadas,
              acompanamiento completo y red de compradores para salvadorenos aqui
              y en el extranjero.
            </p>
          </div>

          <div>
            <div className="eyebrow opacity-50 mb-4">Navegacion</div>

            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/propiedades" className="hover:text-sun transition">
                <span>Propiedades</span>
              </Link>

              <Link href="/hermano-lejano" className="hover:text-sun transition">
                <span>Hermano Lejano</span>
              </Link>

              <Link href="/vender" className="hover:text-sun transition">
                <span>Vender</span>
              </Link>

              <Link href="/blog" className="hover:text-sun transition">
                <span>Blog</span>
              </Link>

              <Link href="/asesores" className="hover:text-sun transition">
                <span>Asesores</span>
              </Link>
            </div>
          </div>

          <div>
            <div className="eyebrow opacity-50 mb-4">Contacto</div>

            <div className="flex flex-col gap-2.5 text-sm">
              <a href="tel:+50379889533" className="hover:text-sun transition">
                <span>Mario - 7988-9533</span>
              </a>

              <a href="tel:+50377303494" className="hover:text-sun transition">
                <span>Carlos - 7730-3494</span>
              </a>

              <a
                href="mailto:info@estucasasv.com"
                className="hover:text-sun transition"
              >
                <span>info@estucasasv.com</span>
              </a>

              <span>San Salvador, SV</span>
            </div>
          </div>

          <div>
            <div className="eyebrow opacity-50 mb-4">Siguenos</div>

            <div className="flex flex-col gap-2.5 text-sm">
              <a href="#" className="hover:text-sun transition">
                <span>Instagram</span>
              </a>

              <a href="#" className="hover:text-sun transition">
                <span>Facebook</span>
              </a>

              <a href="#" className="hover:text-sun transition">
                <span>YouTube</span>
              </a>

              <a
                href="https://wa.me/50379889533"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sun transition"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between gap-3 text-xs opacity-50">
          <div>
            <span>
              &copy; 2026 ES Tu Casa Inmobiliaria - Mario Rivas y Carlos Diaz
            </span>
          </div>

          <div className="italic-display text-base opacity-70">
            Hecho con criterio, no con plantillas.
          </div>
        </div>
      </div>
    </footer>
  );
}