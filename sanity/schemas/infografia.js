import { defineType, defineField } from "sanity";

/**
 * infografia (esquema de Sanity)
 * ------------------------------
 * Define un bloque insertable dentro del cuerpo (Portable Text) de un artículo.
 * El editor solo elige de una lista qué infografía mostrar — los datos viven
 * en el código del componente, no en Sanity.
 *
 * INSTALACIÓN: ver INSTRUCCIONES.md, sección 3.
 */
export default defineType({
  name: "infografia",
  title: "Infografía",
  type: "object",
  fields: [
    defineField({
      name: "tipo",
      title: "Tipo de infografía",
      type: "string",
      options: {
        list: [
          { title: "📈 Evolución de precios (m²)", value: "precios" },
          { title: "🔑 Los 5 factores", value: "factores" },
          { title: "💰 Desglose de costos", value: "costos" },
          { title: "👥 Acceso al mercado", value: "acceso" },
          { title: "🏘️ Comparativa de colonias", value: "colonias" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { tipo: "tipo" },
    prepare({ tipo }) {
      const titulos = {
        precios: "📈 Evolución de precios (m²)",
        factores: "🔑 Los 5 factores",
        costos: "💰 Desglose de costos",
        acceso: "👥 Acceso al mercado",
        colonias: "🏘️ Comparativa de colonias",
      };
      return {
        title: titulos[tipo] || "Infografía",
        subtitle: "Bloque de infografía animada",
      };
    },
  },
});
