"use client";

import { useEnViewport, COLORS, cardStyle, Encabezado, PieMarca } from "./_shared";

/**
 * Infografía 1 — Evolución del precio del m²
 * Barras que crecen con animación escalonada al entrar en pantalla.
 */
export default function InfografiaPrecios() {
  const { ref, visible } = useEnViewport();

  const data = [
    { year: "2016", value: 124 },
    { year: "2018", value: 145 },
    { year: "2020", value: 172 },
    { year: "2022", value: 198 },
    { year: "2024", value: 245 },
    { year: "2026", value: 276 },
  ];
  const maxVal = 276;

  return (
    <div ref={ref} style={cardStyle}>
      <Encabezado
        icono="📈"
        fondoIcono="rgba(216,90,48,0.12)"
        colorIcono={COLORS.orange}
        titulo="Evolución del Precio por m²"
        subtitulo="El metro cuadrado pasó de $124 a $276 (2016–2026)"
      />

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "260px", gap: "12px" }}>
        {data.map((d, i) => {
          const targetHeight = (d.value / maxVal) * 100;
          return (
            <div key={d.year} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: COLORS.textDark, marginBottom: "8px" }}>
                ${d.value}
              </div>
              <div
                style={{
                  width: "100%",
                  height: visible ? `${targetHeight}%` : "0%",
                  background: "linear-gradient(to top, #D85A30, #f0997b)",
                  borderRadius: "8px 8px 0 0",
                  minHeight: "20px",
                  transition: `height 1s ease-out ${i * 0.12}s`,
                }}
              />
              <div style={{ fontSize: "13px", color: COLORS.textLight, marginTop: "10px", fontWeight: 500 }}>
                {d.year}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "28px", background: "rgba(216,90,48,0.06)", borderLeft: `4px solid ${COLORS.orange}`, padding: "16px 20px", borderRadius: "8px" }}>
        <span style={{ fontSize: "14px", color: "#666" }}>
          <b style={{ color: COLORS.textDark }}>+122% en 10 años.</b> La aceleración mayor ocurrió entre 2021–2023.
        </span>
      </div>

      <PieMarca fuente="Fuente: Centro Nacional de Registros (CNR)" />
    </div>
  );
}
