"use client";

import { useEnViewport, COLORS, cardStyle, Encabezado, PieMarca } from "./_shared";

/**
 * Infografía 2 — Los 5 factores que encarecen la vivienda
 * Tarjetas que aparecen con fade-in escalonado al entrar en pantalla.
 */
export default function InfografiaFactores() {
  const { ref, visible } = useEnViewport();

  const factores = [
    { icono: "🏞️", titulo: "Tierra Cara", desc: "35-50% del precio final", color: COLORS.orange },
    { icono: "📋", titulo: "Trámites Lentos", desc: "6-12 meses de espera", color: COLORS.blue },
    { icono: "👷", titulo: "Mano de Obra", desc: "$10-13k por 80m²", color: COLORS.green },
    { icono: "🏠", titulo: "Oferta Exclusiva", desc: "Para quien puede pagar", color: COLORS.amber },
    { icono: "🏦", titulo: "Crédito Limitado", desc: "Excluye informales", color: COLORS.red },
  ];

  return (
    <div ref={ref} style={cardStyle}>
      <Encabezado
        icono="🔑"
        fondoIcono="rgba(44,44,44,0.08)"
        colorIcono={COLORS.textDark}
        titulo="Los 5 Factores que Encarecen la Vivienda"
        subtitulo="Cinco fuerzas que se refuerzan entre sí"
      />

      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
        {factores.map((f, i) => (
          <div
            key={f.titulo}
            style={{
              flex: "1 1 150px",
              background: COLORS.bgLight,
              borderRadius: "16px",
              padding: "28px 16px",
              textAlign: "center",
              borderTop: `5px solid ${f.color}`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease-out ${i * 0.1}s, transform 0.5s ease-out ${i * 0.1}s`,
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>{f.icono}</div>
            <div style={{ fontWeight: 700, fontSize: "16px", color: COLORS.textDark, marginBottom: "6px" }}>
              {f.titulo}
            </div>
            <div style={{ fontSize: "13px", color: COLORS.textLight, lineHeight: 1.4 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <PieMarca fuente="¿Por qué están caras las casas en El Salvador?" />
    </div>
  );
}
