import { defineField, defineType } from "sanity";

export default defineType({
  name: "categoria",
  title: "Categoria de Blog",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre de la categoria",
      description: "Ej: Guias, Zonas, Mercado, Diaspora",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL amigable",
      type: "slug",
      options: { source: "nombre", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripcion corta",
      description: "Aparece en la pagina de la categoria",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "color",
      title: "Color de etiqueta",
      description: "Como se muestra el badge de categoria",
      type: "string",
      options: {
        list: [
          { title: "Azul", value: "blue" },
          { title: "Sol", value: "sun" },
          { title: "Verde Torogoz", value: "torogoz" },
          { title: "Turquesa", value: "turquoise" },
        ],
      },
      initialValue: "blue",
    }),
  ],
  preview: {
    select: {
      title: "nombre",
      subtitle: "descripcion",
    },
  },
});