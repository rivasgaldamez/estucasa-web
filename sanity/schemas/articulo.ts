import { defineField, defineType } from "sanity";

export default defineType({
  name: "articulo",
  title: "Articulo de Blog",
  type: "document",

  groups: [
    { name: "basico", title: "Basico", default: true },
    { name: "contenido", title: "Contenido" },
    { name: "seo", title: "SEO" },
  ],

  fields: [
    defineField({
      name: "titulo",
      title: "Titulo del articulo",
      description: "El titulo SEO. Idealmente 50-60 caracteres.",
      type: "string",
      group: "basico",
      validation: (Rule) =>
        Rule.required()
          .max(70)
          .warning("Mantenlo bajo 60 caracteres para SEO optimo"),
    }),

    defineField({
      name: "slug",
      title: "URL amigable",
      type: "slug",
      group: "basico",
      options: {
        source: "titulo",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "extracto",
      title: "Extracto / Resumen",
      description:
        "Aparece en el listado y como meta descripcion. 150-160 caracteres ideal.",
      type: "text",
      group: "basico",
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .max(180)
          .warning("Mantenlo bajo 160 caracteres"),
    }),

    defineField({
      name: "fechaPublicacion",
      title: "Fecha de publicacion",
      type: "datetime",
      group: "basico",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "categoria",
      title: "Categoria",
      type: "reference",
      group: "basico",
      to: [{ type: "categoria" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "autor",
      title: "Autor",
      type: "reference",
      group: "basico",
      to: [{ type: "asesor" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "imagenPortada",
      title: "Imagen de portada",
      description:
        "La imagen principal. Aparece en listado, detalle y al compartir.",
      type: "image",
      group: "basico",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "destacado",
      title: "Es destacado?",
      description: "Si esta marcado, aparece primero en el blog y en el home",
      type: "boolean",
      group: "basico",
      initialValue: false,
    }),

    defineField({
      name: "tiempoLectura",
      title: "Tiempo de lectura en minutos",
      description:
        "Estima cuantos minutos toma leer el articulo. Calcula 200 palabras = 1 min.",
      type: "number",
      group: "basico",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(60),
    }),

    defineField({
      name: "contenido",
      title: "Contenido del articulo",
      description:
        "El cuerpo completo del articulo. Puedes usar negritas, listas, links e imagenes.",
      type: "array",
      group: "contenido",
      of: [
        {
          type: "block",
          styles: [
            { title: "Parrafo", value: "normal" },
            { title: "Subtitulo H2", value: "h2" },
            { title: "Subtitulo H3", value: "h3" },
            { title: "Cita", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Italica", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
          lists: [
            { title: "Vinetas", value: "bullet" },
            { title: "Numerada", value: "number" },
          ],
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto alternativo SEO",
              description: "Describe la imagen para Google y accesibilidad",
            },
            {
              name: "caption",
              type: "string",
              title: "Pie de foto opcional",
            },
          ],
        },
        { type: "infografia" }
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "metaTitulo",
      title: "Meta titulo opcional",
      description:
        "Si lo dejas vacio, se usa el titulo principal. Solo cambialo si quieres uno distinto para Google.",
      type: "string",
      group: "seo",
      validation: (Rule) =>
        Rule.max(70).warning("Mantenlo bajo 60 caracteres"),
    }),

    defineField({
      name: "metaDescripcion",
      title: "Meta descripcion opcional",
      description:
        "Si lo dejas vacio, se usa el extracto. Es lo que Google muestra debajo del titulo.",
      type: "text",
      group: "seo",
      rows: 3,
      validation: (Rule) =>
        Rule.max(180).warning("Mantenlo bajo 160 caracteres"),
    }),

    defineField({
      name: "palabrasClave",
      title: "Palabras clave keywords",
      description: "Lista de keywords del articulo.",
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],

  preview: {
    select: {
      title: "titulo",
      subtitle: "extracto",
      media: "imagenPortada",
      categoria: "categoria.nombre",
    },
    prepare({ title, subtitle, media, categoria }) {
      return {
        title: title || "Sin titulo",
        subtitle: categoria ? `[${categoria}] ${subtitle || ""}` : subtitle,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Mas recientes primero",
      name: "recientesFirst",
      by: [{ field: "fechaPublicacion", direction: "desc" }],
    },
    {
      title: "Destacados primero",
      name: "destacadosFirst",
      by: [
        { field: "destacado", direction: "desc" },
        { field: "fechaPublicacion", direction: "desc" },
      ],
    },
  ],
});