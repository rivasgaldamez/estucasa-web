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
        source:
          "/comparativa-de-precios-por-vara-cuadrada-en-san-salvador-2024-vs-2020",
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
    ];
  },
};
export default nextConfig;
