import { defineField, defineType } from "sanity";

export default defineType({
  name: "asesor",
  title: "Asesor",
  type: "document",

  fields: [
    defineField({
      name: "nombre",
      title: "Nombre completo",
      description: "Ej: Mario Rivas, Carlos Díaz",
      type: "string",
      validation: (Rule) => Rule.required().error("El nombre del asesor es obligatorio"),
    }),

    defineField({
      name: "slug",
      title: "URL amigable",
      description: "Se genera automáticamente desde el nombre",
      type: "slug",
      options: {
        source: "nombre",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("El slug es obligatorio"),
    }),

    defineField({
      name: "cargo",
      title: "Cargo",
      description: "Ej: Socio fundador, Asesor inmobiliario",
      type: "string",
      initialValue: "Asesor inmobiliario",
    }),

    defineField({
      name: "telefono",
      title: "Teléfono WhatsApp",
      description: "Con código de país, sin espacios ni guiones. Ej: 50379889533",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d+$/, {
            name: "solo números",
            invert: false,
          })
          .error("El teléfono debe llevar solo números, sin espacios ni guiones"),
    }),

    defineField({
      name: "telefonoDisplay",
      title: "Teléfono para mostrar",
      description: "Como se muestra al público. Ej: 7988-9533",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.email().warning("El correo no parece tener un formato válido"),
    }),

    defineField({
      name: "foto",
      title: "Foto de perfil",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "bio",
      title: "Biografía corta",
      description: "Un párrafo describiendo al asesor",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "activo",
      title: "Activo",
      description: "Desmarca si el asesor ya no trabaja aquí",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "nombre",
      subtitle: "cargo",
      media: "foto",
    },
  },
});