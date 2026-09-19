import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },

  async redirects() {
    return [
      // ===== PROPIEDADES DEL SITIO VIEJO (/listing/...) =====
      // Cualquier URL antigua de propiedad redirige al catálogo nuevo.
      {
        source: "/listing/:path*",
        destination: "/propiedades",
        permanent: true,
      },
      // ===== ARCHIVOS .html DEL SITIO ANTIGUO =====
      {
        source: "/casas-caras.html",
        destination: "/propiedades",
        permanent: true,
      },
      // ===== ARTÍCULOS DE BLOG VIEJOS (coincidencia exacta) =====
      // Redirigen al blog general.
      {
        source:
          "/que-es-la-ubicacion-catastral-en-el-salvador-y-para-que-sirvedescubre-que-es-la-ubicacion-catastral-su-importancia-para-propietarios-y-compradores-en-el-salvador",
        destination: "/blog",
        permanent: true,
      },
      {
        // Cubre la versión con y sin emojis en la URL
        source:
          "/:slug(.*comparativa-de-precios-por-vara-cuadrada.*)",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/entendiendo-el-documento-extractada-en-el-salvador",
        destination: "/blog",
        permanent: true,
      },
      {
        source:
          "/el-viaje-de-comprar-un-inmueble-en-el-salvador-un-relato-paso-a-paso",
        destination: "/blog",
        permanent: true,
      },
      // ===== ARTÍCULOS REESCRITOS (recuperados del sitio viejo) =====
      {
        source:
          "/que-pasos-debo-seguir-para-poner-una-propiedad-en-alquiler",
        destination:
          "/blog/pasos-para-poner-una-propiedad-en-alquiler-en-el-salvador",
        permanent: true,
      },
      {
        source:
          "/que-impuestos-y-gastos-adicionales-debo-considerar-al-comprar-una-propiedad-en-el-salvador",
        destination:
          "/blog/impuestos-y-gastos-al-comprar-una-propiedad-en-el-salvador",
        permanent: true,
      },
      // ===== PÁGINA "NOSOTROS" ANTIGUA =====
      {
        source: "/about",
        destination: "/asesores",
        permanent: true,
      },

      // ===== NUEVO: ARCHIVOS DEL TEMA WORDPRESS =====
      { source: "/listing-region/:path*", destination: "/propiedades", permanent: true },
      { source: "/listing-category/:path*", destination: "/propiedades", permanent: true },
      { source: "/house-villa", destination: "/propiedades", permanent: true },
      { source: "/team/:path*", destination: "/asesores", permanent: true },
      { source: "/contact-us", destination: "/asesores", permanent: true },
      { source: "/news/:path*", destination: "/blog", permanent: true },
      { source: "/category/hermano-lejano/:path*", destination: "/hermano-lejano", permanent: true },

      // ===== NUEVO: PROPIEDAD VIEJA PUBLICADA COMO POST (con emoji) =====
      {
        source: "/:slug(.*casa-en-venta-en-bosques-de-lourdes.*)",
        destination: "/propiedades",
        permanent: true,
      },

      // ===== NUEVO: POSTS VIEJOS SOBRE COMPRA DESDE EL EXTERIOR =====
      { source: "/la-llave-dorada-para-hermanos-lejanos-los-requisitos-para-adquirir-un-inmueble-en-el-salvador", destination: "/hermano-lejano", permanent: true },
      { source: "/es-necesario-viajar-a-el-salvador-para-comprar-una-propiedad", destination: "/hermano-lejano", permanent: true },
      { source: "/ley-especial-transitoria-de-incentivos-y-tratos-preferenciales-destinados-al-favorecimiento-de-la-repatriacion-de-salvadorenos", destination: "/hermano-lejano", permanent: true },
      { source: "/como-puedo-financiar-la-compra-de-una-propiedad-en-el-salvador-desde-el-extranjero", destination: "/hermano-lejano", permanent: true },
      { source: "/hay-incentivos-fiscales-para-los-inversores-extranjeros-en-bienes-raices", destination: "/hermano-lejano", permanent: true },

      // ===== NUEVO: POSTS VIEJOS TIPO PREGUNTA =====
      { source: "/que-tipo-de-propiedades-estan-disponibles-para-compra", destination: "/preguntas-frecuentes", permanent: true },
      { source: "/como-puedo-obtener-asesoria-legal-y-financiera-confiable", destination: "/preguntas-frecuentes", permanent: true },
      { source: "/es-seguro-invertir-en-bienes-raices-en-el-salvador", destination: "/preguntas-frecuentes", permanent: true },

      // ===== NUEVO: POSTS VIEJOS DE GUÍA DE COMPRA =====
      { source: "/navegando-por-el-mar-de-informacion-en-bienes-raices-como-evitar-sorpresas-desagradables", destination: "/blog", permanent: true },
      { source: "/ojo-al-comprar-casa-en-el-salvador-evita-dolores-de-cabeza-legales", destination: "/blog", permanent: true },
      { source: "/tu-propio-hogar-en-el-salvador", destination: "/blog", permanent: true },
      { source: "/compra-de-inmuebles-en-el-salvador", destination: "/blog", permanent: true },
      { source: "/comprando-propiedad-en-el-salvador", destination: "/blog", permanent: true },
      { source: "/sonando-con-casa-propia-en-el-salvador-desenredemos-el-lio-de-los-creditos-hipotecarios", destination: "/blog", permanent: true },
      { source: "/el-salvadoreno-moderno-y-como-compra-casa-precalificate-y-descubre-tu-poder", destination: "/blog", permanent: true },
      { source: "/cuales-son-los-mejores-lugares-para-invertir-en-bienes-raices-en-el-salvador", destination: "/blog", permanent: true },
      { source: "/evolucion-de-la-inversion-inmobiliaria-en-el-salvador-mas-alla-de-las-ciudades", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;