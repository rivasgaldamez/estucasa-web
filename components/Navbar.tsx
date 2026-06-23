"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Home,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import WhatsAppLink from "./WhatsAppLink";

type NavbarProps = {
  variant?: "light" | "dark";
};

type NavLink = {
  href: string;
  label: string;
  icon?: LucideIcon;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/hermano-lejano", label: "Hermano Lejano" },
  { href: "/vender", label: "Vender" },
  { href: "/blog", label: "Blog" },
  { href: "/preguntas-frecuentes", label: "Preguntas" },
  { href: "/asesores", label: "Asesores" },
];

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isDark = variant === "dark";

  let navBg = "bg-transparent";

  if (scrolled && isDark) {
    navBg =
      "bg-[rgba(13,32,96,0.94)] backdrop-blur-xl border-b border-white/10";
  } else if (scrolled && !isDark) {
    navBg =
      "bg-[rgba(246,241,231,0.94)] backdrop-blur-xl border-b border-black/10";
  }

  const textColor = isDark ? "text-cream" : "text-ink";

  return (
    <>
      <nav
        className={`${navBg} ${textColor} fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3 transition-all duration-500`}
      >
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <Link
            href="/"
            title="Volver al inicio"
            aria-label="Ir a la página de inicio"
            className="flex items-center gap-3 group relative"
          >
            <Image
              src="/logo.png"
              alt="ES Tu Casa Inmobiliaria - Inicio"
              width={80}
              height={80}
              className="object-contain transition-transform group-hover:scale-105"
              priority
            />

            <div className="hidden sm:block">
              <div className="display text-2xl leading-none">ES Tu Casa</div>
            </div>
          </Link>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:opacity-70 transition inline-flex items-center gap-1.5"
                >
                  {Icon ? <Icon size={14} /> : null}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* ACCIONES DERECHA */}
          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher />

            <WhatsAppLink
              href="https://wa.me/50379889533"
              className="hidden md:inline-flex bg-brand-blue text-cream px-6 py-3.5 rounded-full text-sm font-medium items-center gap-2 border border-brand-blue hover:bg-brand-blue-deep transition-colors"
              ariaLabel="Escribir por WhatsApp"
            >
              <span>WhatsApp </span>
              <ArrowUpRight size={14} />
            </WhatsAppLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-current"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL OVERLAY */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[100] bg-brand-blue text-cream flex flex-col md:hidden"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-white/15">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="display text-2xl"
              aria-label="Ir a la página de inicio"
            >
              ES Tu Casa
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* LINKS */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="display text-4xl py-3 border-b border-white/10 hover:text-sun transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* WHATSAPP */}
          <div className="px-8 pb-10">
            <WhatsAppLink
              href="https://wa.me/50379889533"
              onClick={() => setMenuOpen(false)}
              className="w-full bg-sun text-brand-blue-deep px-6 py-4 rounded-full text-base font-semibold inline-flex items-center justify-center gap-2"
              ariaLabel="Escribir por WhatsApp"
            >
              <span>Escribinos por WhatsApp</span>
              <ArrowUpRight size={16} />
            </WhatsAppLink>
          </div>
        </div>
      ) : null}
    </>
  );
}