"use client";

import { useEnViewport, COLORS, cardStyle, Encabezado, PieMarca } from "./_shared";

/**
 * Infografía 4 — ¿Quién puede comprar casa?
 * Filas que aparecen con fade-in escalonado al entrar en pantalla.
 */
export default function InfografiaAcceso() {
  const { ref, visible } = useEnViewport();

  const niveles = [
    { label: "Ingresos Bajos ($200-500)", desc: "Sin acceso a crédito. Vivienda informal única opción.", valor: "0%", color: COLORS.red },
    { label: "Medios-Bajos ($500-800)", desc: "Acceso muy limitado.", valor: "15%", color: "#EDB96A" },
    { label: "Medios ($800-1,200)", desc: "Requiere ahorros + FSV. Sobreendeudamiento.", valor: "40%", color: COLORS.amber },
    { label: "Medios-Altos ($1,200-1,500)", desc: "Acceso parcial.", valor: "70%", color: COLORS.blue },
    { label: "Ingresos Altos ($1,500+)", desc: "Acceso completo. A quién está dirigida la oferta.", valor: "95%", color: COLORS.green },
  ];

  return (
    <div ref={ref} style={cardStyle}>
      <Encabezado
        icono="👥"
        fondoIcono="rgba(226,75,74,0.12)"
        colorIcono={COLORS.red}
        titulo="¿Quién Puede Comprar Casa?"
        subtitulo="Acceso al mercado según nivel de ingresos"
      />

      <div>
        {niveles.map((n, i) => (
          <div
            key={n.label}
            style={{
              padding: "16px 22px",
              borderRadius: "10px",
              background: n.color,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `opacity 0.5s ease-out ${i * 0.1}s, transform 0.5s ease-out ${i * 0.1}s`,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "16px" }}>{n.label}</div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>{n.desc}</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: "24px" }}>{n.valor}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "22px", background: "rgba(226,75,74,0.06)", borderLeft: `4px solid ${COLORS.red}`, padding: "16px 20px", borderRadius: "8px" }}>
        <span style={{ fontSize: "14px", color: "#666" }}>
          <b style={{ color: COLORS.textDark }}>88%</b> de la vivienda nueva se enfoca en ingresos mayores a $1,500/mes.
        </span>
      </div>

      <PieMarca fuente="Fuente: Superintendencia de Competencia (2023)" />
    </div>
  );
}
