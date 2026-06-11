"use client";

import { useState, useEffect, useRef } from "react";

/**
 * useEnViewport
 * --------------
 * Hook reutilizable que detecta cuándo un elemento entra en pantalla.
 * Devuelve una ref (que se asigna al contenedor) y un booleano "visible"
 * que pasa a true la primera vez que el elemento se ve.
 *
 * Se usa para disparar las animaciones de las infografías al hacer scroll.
 */
export function useEnViewport(threshold = 0.3) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // una vez visible, dejamos de observar
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * Paleta de colores de la marca ES Tu Casa.
 * Centralizada aquí para mantener consistencia entre todas las infografías.
 */
export const COLORS = {
  orange: "#D85A30",
  blue: "#185FA5",
  green: "#639922",
  amber: "#BA7517",
  red: "#E24B4A",
  textDark: "#2c2c2c",
  textLight: "#888",
  bgLight: "#f8f7f4",
  border: "#e8e8e3",
};

/**
 * Estilos base compartidos por el contenedor de cada infografía.
 */
export const cardStyle = {
  fontFamily: "'Poppins', system-ui, sans-serif",
  background: "#fff",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "20px",
  padding: "40px",
  margin: "40px 0",
  boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
  maxWidth: "100%",
};

/**
 * Componente de encabezado reutilizable (ícono + título + subtítulo).
 */
export function Encabezado({ icono, fondoIcono, colorIcono, titulo, subtitulo }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "32px",
        paddingBottom: "20px",
        borderBottom: `2px solid ${COLORS.bgLight}`,
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          background: fondoIcono,
          color: colorIcono,
          flexShrink: 0,
        }}
      >
        {icono}
      </div>
      <div>
        <div style={{ fontSize: "24px", fontWeight: 800, color: COLORS.textDark, lineHeight: 1.2 }}>
          {titulo}
        </div>
        <div style={{ fontSize: "14px", color: COLORS.textLight, marginTop: "2px" }}>
          {subtitulo}
        </div>
      </div>
    </div>
  );
}

/**
 * Pie de marca reutilizable (nombre + fuente).
 */
export function PieMarca({ fuente }) {
  return (
    <div
      style={{
        marginTop: "28px",
        paddingTop: "18px",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "14px", fontWeight: 700, color: COLORS.orange }}>
        ES Tu Casa Inmobiliaria
      </span>
      <span style={{ fontSize: "12px", color: "#aaa" }}>{fuente}</span>
    </div>
  );
}
