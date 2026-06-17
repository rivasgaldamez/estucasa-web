import { defineField, defineType } from "sanity";

export default defineType({
  name: "propiedad",
  title: "Propiedad",
  type: "document",

  groups: [
    { name: "basico", title: "Basico", default: true },
    { name: "detalles", title: "Detalles" },
    { name: "ubicacion", title: "Ubicacion" },
    { name: "medios", title: "Fotos y video" },
    { name: "contenido", title: "Descripcion" },
  ],

  fields: [
    defineField({
      name: "codigo",
      title: "Codigo unico",
      description: "Ej: ETC-012. Se usa en la URL y para referencia interna.",
      type: "string",
      group: "basico",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "titulo",
      title: "Titulo de la propiedad",
      description: "Ej: Residencia en La Sultana",
      type: "string",
      group: "basico",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "URL amigable",
      type: "slug",
      group: "basico",
      options: {
        source: "codigo",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tipo",
      title: "Tipo de propiedad",
      type: "string",
      group: "basico",
      options: {
        list: [
          { title: "Casa / Residencia", value: "casa" },
          { title: "Apartamento", value: "apartamento" },
          { title: "Terreno", value: "terreno" },
          { title: "Comercial", value: "comercial" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "operacion",
      title: "Operacion",
      type: "string",
      group: "basico",
      options: {
        list: [
          { title: "Venta", value: "venta" },
          { title: "Alquiler", value: "alquiler" },
        ],
        layout: "radio",
      },
      initialValue: "venta",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "estado",
      title: "Estado",
      type: "string",
      group: "basico",
      options: {
        list: [
          { title: "Disponible", value: "disponible" },
          { title: "Reservada", value: "reservada" },
          { title: "Vendida", value: "vendida" },
          { title: "En pausa", value: "pausada" },
        ],
      },
      initialValue: "disponible",
    }),

    defineField({
      name: "precio",
      title: "Precio (USD)",
      description: "Sin comas ni puntos. Ej: 620000",
      type: "number",
      group: "basico",
      validation: (Rule) => Rule.required().positive(),
    }),

    defineField({
      name: "destacada",
      title: "Es destacada?",
      description: "Si esta marcada, aparece en el home y al inicio del listado",
      type: "boolean",
      group: "basico",
      initialValue: false,
    }),

    defineField({
      name: "etiqueta",
      title: "Etiqueta especial",
      description: "Aparece como badge. Ej: Vista al mar, Penthouse",
      type: "string",
      group: "basico",
    }),

    defineField({
      name: "habitaciones",
      title: "Habitaciones",
      type: "number",
      group: "detalles",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "banosCompletos",
      title: "Banos completos",
      type: "number",
      group: "detalles",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "banosVisita",
      title: "Banos de visita",
      type: "number",
      group: "detalles",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "areaConstruccion",
      title: "Area de construccion (m2)",
      type: "number",
      group: "detalles",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "areaTerreno",
      title: "Area de terreno (m2 o v2)",
      type: "number",
      group: "detalles",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "niveles",
      title: "Niveles",
      type: "number",
      group: "detalles",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "parqueos",
      title: "Parqueos",
      type: "number",
      group: "detalles",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "anoConstruccion",
      title: "Ano de construccion",
      type: "number",
      group: "detalles",
      validation: (Rule) => Rule.min(1800),
    }),

    defineField({
      name: "amenidades",
      title: "Amenidades",
      description: "Marca todas las que aplican",
      type: "array",
      group: "detalles",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Piscina privada", value: "piscina" },
          { title: "Jardin", value: "jardin" },
          { title: "Chimenea", value: "chimenea" },
          { title: "Aire acondicionado central", value: "ac" },
          { title: "Seguridad 24/7", value: "seguridad" },
          { title: "Planta electrica", value: "planta-electrica" },
          { title: "Cisterna", value: "cisterna" },
          { title: "Cochera techada", value: "cochera" },
          { title: "Area BBQ", value: "bbq" },
          { title: "Vista panoramica", value: "vista" },
          { title: "Gimnasio", value: "gimnasio" },
          { title: "Salon de usos multiples", value: "salon" },
        ],
      },
    }),

    defineField({
      name: "zona",
      title: "Zona",
      description: "Selecciona de las zonas que ya creaste",
      type: "reference",
      group: "ubicacion",
      to: [{ type: "zona" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "direccionPrivada",
      title: "Direccion exacta (privada)",
      description: "NO se muestra publicamente. Solo para uso interno del equipo.",
      type: "string",
      group: "ubicacion",
    }),

    defineField({
      name: "fotoPortada",
      title: "Foto de portada",
      description: "La foto principal que aparece en el listado y al inicio del detalle",
      type: "image",
      group: "medios",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "galeria",
      title: "Galería de fotos",
      description:
        "Fotos adicionales. Puedes subirlas como imágenes simples o con etiqueta de área, por ejemplo: Dormitorio, Baño, Cocina, Sala, etc. Ambos formatos funcionan.",
      type: "array",
      group: "medios",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          title: "Imagen (sin etiqueta)",
        },
        {
          type: "object",
          title: "Imagen con etiqueta",
          fields: [
            defineField({
              name: "image",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Etiqueta / Área (opcional)",
              description:
                "Ej: Dormitorio Junior 1, Baño Principal, Cocina, Sala, Terraza, Jardín",
              type: "string",
            }),
          ],
          preview: {
            select: {
              image: "image",
              label: "label",
            },
            prepare(selection: any) {
              return {
                title: selection.label || "(sin etiqueta)",
                media: selection.image,
              };
            },
          },
        },
      ],
      options: { layout: "grid" },
    }),

    defineField({
      name: "videoYoutube",
      title: "Video de YouTube (opcional)",
      description: "URL completa del video",
      type: "url",
      group: "medios",
    }),

    defineField({
      name: "descripcionCorta",
      title: "Descripcion corta",
      description: "Un parrafo resumen. Aparece en meta tags y redes sociales.",
      type: "text",
      group: "contenido",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: "descripcionLarga",
      title: "Descripcion larga",
      description: "Texto completo de la propiedad. Puedes usar varios parrafos.",
      type: "array",
      group: "contenido",
      of: [
        {
          type: "block",
          styles: [{ title: "Parrafo", value: "normal" }],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Italica", value: "em" },
            ],
            annotations: [],
          },
          lists: [],
        },
      ],
    }),

    defineField({
      name: "asesor",
      title: "Asesor asignado",
      description: "Selecciona el asesor responsable de esta propiedad",
      type: "reference",
      group: "contenido",
      to: [{ type: "asesor" }],
    }),
  ],

  preview: {
    select: {
      title: "titulo",
      subtitle: "codigo",
      media: "fotoPortada",
      precio: "precio",
      estado: "estado",
    },
    prepare({ title, subtitle, media, precio, estado }) {
      const precioTexto =
        typeof precio === "number" ? `$${precio.toLocaleString()}` : "Sin precio";

      return {
        title: title || "Sin titulo",
        subtitle: `${subtitle || "Sin codigo"} - ${precioTexto} - ${
          estado || "Sin estado"
        }`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Mas recientes primero",
      name: "recientesFirst",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Precio: menor a mayor",
      name: "precioAsc",
      by: [{ field: "precio", direction: "asc" }],
    },
    {
      title: "Precio: mayor a menor",
      name: "precioDesc",
      by: [{ field: "precio", direction: "desc" }],
    },
    {
      title: "Destacadas primero",
      name: "destacadasFirst",
      by: [
        { field: "destacada", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
});