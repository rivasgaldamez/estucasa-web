"use client";

import { useEnViewport, COLORS, cardStyle, Encabezado, PieMarca } from "./_shared";

/**
 * Infografía 5 — Precios en colonias populares: antes vs ahora
 * Barras horizontales que se llenan con animación al entrar en pantalla.
 */
export default function InfografiaColonias() {
  const { ref, visible } = useEnViewport();

  const colonias = [
    {
      nombre: "📍 Popotlán (Apopa)",
      barras: [
        { tag: "2016", label: "$16,500", pct: 22, bg: "#9FE1CB", txt: "#04342C" },
        { tag: "2026", label: "$75,000", pct: 100, bg: COLORS.orange, txt: "#fff" },
      ],
    },
    {
      nombre: "📍 Sierra Morena (Soyapango)",
      barras: [
        { tag: "2016", label: "$16,500", pct: 22, bg: "#9FE1CB", txt: "#04342C" },
        { tag: "2026", label: "$70,000", pct: 93, bg: COLORS.orange, txt: "#fff" },
      ],
    },
    {
      nombre: "📍 Las Jacarandas (Apopa)",
      barras: [
        { tag: "2016", label: "$16,000", pct: 21, bg: "#9FE1CB", txt: "#04342C" },
        { tag: "2026", label: "$78,000", pct: 100, bg: COLORS.orange, txt: "#fff" },
      ],
    },
  ];

  return (
    <div ref={ref} style={cardStyle}>
      <Encabezado
        icono="🏘️"
        fondoIcono="rgba(186,117,23,0.12)"
        colorIcono={COLORS.amber}
        titulo="Precios en Colonias Populares: Antes vs Ahora"
        subtitulo="El alza real en Apopa y Soyapango"
      />

      <div>
        {colonias.map((col) => (
          <div key={col.nombre} style={{ background: COLORS.bgLight, borderRadius: "14px", padding: "22px", marginBottom: "14px" }}>
            <div style={{ fontWeight: 700, fontSize: "17px", color: COLORS.textDark, marginBottom: "14px" }}>
              {col.nombre}
            </div>
            {col.barras.map((b, i) => (
              <div key={b.tag} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: COLORS.textLight, width: "50px", fontWeight: 500 }}>{b.tag}</span>
                <div style={{ flex: 1, height: "28px", background: "#e8e8e3", borderRadius: "8px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: visible ? `${b.pct}%` : "0%",
                      background: b.bg,
                      color: b.txt,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "12px",
                      fontWeight: 700,
                      fontSize: "13px",
                      transition: `width 1.1s ease-out ${i * 0.15}s`,
                    }}
                  >
                    {b.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <PieMarca fuente="Fuente: La Prensa Gráfica / CNR (2026)" />
    </div>
  );
}
