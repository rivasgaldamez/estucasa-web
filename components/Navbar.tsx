"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Home } from "lucide-react";

type NavbarProps = {
  variant?: "light" | "dark";
};

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <nav
      className={
        "fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3 transition-all duration-500 " +
        navBg +
        " " +
        textColor
      }
    >
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        <Link
          href="/"
          title="Volver al inicio"
          aria-label="Ir a la pagina de inicio"
          className="flex items-center gap-3 group relative"
        >
          <Image
            src="/logo.png"
            alt="ES Tu Casa Inmobiliaria - Inicio"
            width={56}
            height={56}
            className="object-contain transition-transform group-hover:scale-105"
            priority
          />

          <div className="hidden sm:block">
            <div className="display text-2xl leading-none">ES Tu Casa</div>
          </div>

          <span
            className={
              "absolute -bottom-9 left-0 text-[10px] tracking-[0.18em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap " +
              (isDark ? "text-cream" : "text-brand-blue")
            }
          >
            <span>&larr; Click para ir al inicio</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            href="/"
            className="hover:opacity-70 transition inline-flex items-center gap-1.5"
          >
            <Home size={14} />
            <span>Inicio</span>
          </Link>

          <Link href="/propiedades" className="hover:opacity-70 transition">
            <span>Propiedades</span>
          </Link>

          <Link href="/hermano-lejano" className="hover:opacity-70 transition">
            <span>Hermano Lejano</span>
          </Link>

          <Link href="/vender" className="hover:opacity-70 transition">
            <span>Vender</span>
          </Link>

          <Link href="/blog" className="hover:opacity-70 transition">
            <span>Blog</span>
          </Link>

          <Link href="/asesores" className="hover:opacity-70 transition">
            <span>Asesores</span>
          </Link>
        </div>

        <a
          href="https://wa.me/50379889533"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-blue text-cream px-6 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 border border-brand-blue hover:bg-brand-blue-deep transition-colors"
        >
          <span>WhatsApp</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </nav>
  );
}