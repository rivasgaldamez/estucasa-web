import { defineField, defineType } from "sanity";

export default defineType({
  name: "zona",
  title: "Zona",
  type: "document",

  fields: [
    defineField({
      name: "nombre",
      title: "Nombre de la zona",
      description: "Ej: Antiguo Cuscatlan, Colonia Escalon, Costa del Sol",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "URL amigable",
      description: "Se genera automaticamente al hacer click en Generate",
      type: "slug",
      options: {
        source: "nombre",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "municipio",
      title: "Municipio",
      description: "Ej: La Libertad, San Salvador",
      type: "string",
    }),
  ],

  preview: {
    select: {
      title: "nombre",
      subtitle: "municipio",
    },
  },
});