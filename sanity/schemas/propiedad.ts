import { defineArrayMember, defineField } from "sanity";

defineField({
  name: "galeria",
  title: "Galería de fotos",
  description:
    "Fotos adicionales. Puedes subirlas como imágenes simples o con etiqueta de área, por ejemplo: Dormitorio, Baño, Cocina, Sala, etc. Ambos formatos funcionan.",
  type: "array",
  group: "medios",
  of: [
    // Formato viejo: imagen directa sin etiqueta
    defineArrayMember({
      type: "image",
      title: "Imagen sin etiqueta",
      options: {
        hotspot: true,
      },
    }),

    // Formato nuevo: objeto con imagen + etiqueta
    defineArrayMember({
      type: "object",
      title: "Imagen con etiqueta",
      fields: [
        defineField({
          name: "image",
          title: "Foto",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "label",
          title: "Etiqueta / Área",
          description:
            "Ejemplo: Dormitorio Junior 1, Baño Principal, Cocina, Sala, Terraza, Jardín.",
          type: "string",
        }),
      ],
      preview: {
        select: {
          image: "image",
          label: "label",
        },
        prepare(selection) {
          const { image, label } = selection;

          return {
            title: label || "Imagen sin etiqueta",
            media: image,
          };
        },
      },
    }),
  ],
  options: {
    layout: "grid",
  },
});