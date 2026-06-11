"use client";

import { useEnViewport, COLORS, cardStyle, Encabezado, PieMarca } from "./_shared";

/**
 * Infografía 3 — Desglose de costos de una casa
 * Barras horizontales que se llenan con animación al entrar en pantalla.
 */
export default function InfografiaCostos() {
  const { ref, visible } = useEnViewport();

  const costos = [
    { nombre: "🏞️ Tierra", label: "40% · $28,000", pct: 40, color: COLORS.blue },
    { nombre: "👷 Mano de Obra", label: "25% · $17,500", pct: 25, color: COLORS.green },
    { nombre: "🧱 Materiales", label: "20% · $14,000", pct: 20, color: COLORS.amber },
    { nombre: "📋 Trámites y Financiamiento", label: "15% · $10,500", pct: 15, color: COLORS.orange },
  ];

  return (
    <div ref={ref} style={cardStyle}>
      <Encabezado
        icono="💰"
        fondoIcono="rgba(24,95,165,0.12)"
        colorIcono={COLORS.blue}
        titulo="¿En Qué Se Va el Dinero?"
        subtitulo="Desglose de costos en una casa de $70,000"
      />

      <div>
        {costos.map((c, i) => (
          <div key={c.nombre} style={{ marginBottom: "22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontWeight: 600, fontSize: "15px", color: COLORS.textDark }}>{c.nombre}</span>
              <span style={{ fontWeight: 700, fontSize: "14px", color: c.color }}>{c.label}</span>
            </div>
            <div style={{ height: "34px", background: COLORS.bgLight, borderRadius: "10px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: visible ? `${c.pct}%` : "0%",
                  background: c.color,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "14px",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "13px",
                  transition: `width 1.2s ease-out ${i * 0.1}s`,
                }}
              >
                {c.pct}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <PieMarca fuente="Fuente: CASALCO" />
    </div>
  );
}
