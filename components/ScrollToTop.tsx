"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll);

    // Ejecutar una vez al montar
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Volver arriba"
      className={
        "fixed bottom-6 right-6 z-[90] w-12 h-12 rounded-full " +
        "bg-brand-blue text-cream shadow-lg " +
        "flex items-center justify-center " +
        "transition-all duration-300 " +
        "hover:bg-brand-blue-deep hover:-translate-y-1 active:scale-95 " +
        (visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none")
      }
    >
      <ArrowUp size={20} />
    </button>
  );
}