// Funciones helper para generar Schema.org JSON-LD
// Optimizado para Google + IA

const SITE_URL = "https://estucasasv.com";
const SITE_NAME = "ES Tu Casa Inmobiliaria";

function normalizePhone(phone?: string) {
  if (!phone) return undefined;

  const cleaned = phone.replace(/\s+/g, "").replace(/-/g, "");

  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("503")) return `+${cleaned}`;

  return `+503${cleaned}`;
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "ES Tu Casa",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 256,
      height: 256,
    },
    image: `${SITE_URL}/logo.png`,
    description:
      "Inmobiliaria salvadoreña especializada en compra, venta e inversión inmobiliaria. Atención personalizada para clientes locales y diáspora salvadoreña en el extranjero.",
    slogan: "El Salvador ES Tu Casa.",
    foundingDate: "2019",
    founder: [
      {
        "@type": "Person",
        name: "Mario Rivas",
        jobTitle: "Socio Fundador - Asesor Inmobiliario",
        telephone: "+50379889533",
        email: "info@estucasasv.com",
      },
      {
        "@type": "Person",
        name: "Carlos Díaz",
        jobTitle: "Socio Fundador - Asesor Comercial",
        telephone: "+50377303494",
        email: "info@estucasasv.com",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SV",
      addressRegion: "San Salvador",
      addressLocality: "San Salvador",
    },
    areaServed: [
      { "@type": "Country", name: "El Salvador" },
      { "@type": "AdministrativeArea", name: "San Salvador" },
      { "@type": "AdministrativeArea", name: "La Libertad" },
      { "@type": "AdministrativeArea", name: "Antiguo Cuscatlán" },
      { "@type": "AdministrativeArea", name: "Santa Tecla" },
    ],
    serviceType: [
      "Compra venta de propiedades",
      "Asesoría inmobiliaria",
      "Inversión inmobiliaria",
      "Atención a diáspora salvadoreña",
      "Video tours profesionales",
      "Coordinación de financiamiento bancario",
    ],
    knowsLanguage: ["Spanish", "English"],
    priceRange: "$$$",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+50379889533",
        contactType: "Customer Service",
        areaServed: ["SV", "US"],
        availableLanguage: ["Spanish", "English"],
        name: "Mario Rivas - Residencial y Diáspora",
      },
      {
        "@type": "ContactPoint",
        telephone: "+50377303494",
        contactType: "Sales",
        areaServed: ["SV"],
        availableLanguage: ["Spanish"],
        name: "Carlos Díaz - Comercial e Inversión",
      },
    ],
    sameAs: [
      "https://www.instagram.com/estucasa_elsalvador/",
      "https://www.facebook.com/Estucasasv",
      "https://www.tiktok.com/@estucasasvelsalvador",
      "https://www.youtube.com/@EStucasaInmobiliariaElsalvador",
    ],
  };
}

type AsesorSchema = {
  nombre: string;
  cargo?: string;
  telefono: string;
  email?: string;
  bio?: string;
  slug: string;
  fotoUrl?: string;
};

export function getPersonSchema(asesor: AsesorSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/asesores#${asesor.slug}`,
    name: asesor.nombre,
    jobTitle: asesor.cargo || "Asesor Inmobiliario",
    description: asesor.bio || undefined,
    telephone: normalizePhone(asesor.telefono),
    email: asesor.email || "info@estucasasv.com",
    image: asesor.fotoUrl || undefined,
    worksFor: {
      "@id": `${SITE_URL}/#organization`,
    },
    knowsAbout: [
      "Bienes raíces El Salvador",
      "Asesoría inmobiliaria",
      "Inversión inmobiliaria",
      "Mercado inmobiliario salvadoreño",
    ],
    nationality: {
      "@type": "Country",
      name: "El Salvador",
    },
  };
}

type ArticuloSchema = {
  titulo: string;
  slug: string;
  extracto: string;
  fechaPublicacion: string;
  imagenUrl?: string;
  autorNombre: string;
  autorSlug: string;
  tiempoLectura?: number;
  categoria?: string;
};

export function getArticleSchema(articulo: ArticuloSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/blog/${articulo.slug}`,
    headline: articulo.titulo,
    description: articulo.extracto,
    image: articulo.imagenUrl ? [articulo.imagenUrl] : undefined,
    datePublished: articulo.fechaPublicacion,
    dateModified: articulo.fechaPublicacion,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/asesores#${articulo.autorSlug}`,
      name: articulo.autorNombre,
      url: `${SITE_URL}/asesores`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${articulo.slug}`,
    },
    timeRequired: articulo.tiempoLectura
      ? `PT${articulo.tiempoLectura}M`
      : undefined,
    articleSection: articulo.categoria || undefined,
    inLanguage: "es-SV",
  };
}

type PropiedadSchema = {
  codigo: string;
  titulo: string;
  descripcion?: string;
  precio: number;
  tipo: string;
  habitaciones?: number;
  banosCompletos?: number;
  areaConstruccion?: number;
  areaTerreno?: number;
  parqueos?: number;
  zonaNombre?: string;
  zonaMunicipio?: string;
  fotoPortadaUrl?: string;
  asesorNombre?: string;
  asesorSlug?: string;
};

function getPropertySchemaType(tipo: string) {
  if (tipo === "apartamento") return "Apartment";
  if (tipo === "terreno") return "Landform";
  if (tipo === "comercial") return "CommercialProperty";

  return "SingleFamilyResidence";
}

export function getRealEstateListingSchema(prop: PropiedadSchema) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": getPropertySchemaType(prop.tipo),
    "@id": `${SITE_URL}/propiedades/${prop.codigo}`,
    name: prop.titulo,
    description: prop.descripcion || prop.titulo,
    url: `${SITE_URL}/propiedades/${prop.codigo}`,
    image: prop.fotoPortadaUrl ? [prop.fotoPortadaUrl] : undefined,
    address: {
      "@type": "PostalAddress",
      addressCountry: "SV",
      addressRegion: prop.zonaMunicipio || undefined,
      addressLocality: prop.zonaNombre || undefined,
    },
    offers: {
      "@type": "Offer",
      price: prop.precio,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
      url: `${SITE_URL}/propiedades/${prop.codigo}`,
    },
  };

  const additionalProperty: Array<Record<string, unknown>> = [];

  if (prop.habitaciones) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Habitaciones",
      value: prop.habitaciones,
    });
  }

  if (prop.banosCompletos) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Baños",
      value: prop.banosCompletos,
    });
  }

  if (prop.areaConstruccion) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Área de construcción",
      value: prop.areaConstruccion,
      unitCode: "MTK",
    });
  }

  if (prop.areaTerreno) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Área de terreno",
      value: prop.areaTerreno,
      unitCode: "MTK",
    });
  }

  if (prop.parqueos) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Parqueos",
      value: prop.parqueos,
    });
  }

  if (prop.zonaNombre) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Zona",
      value: prop.zonaNombre,
    });
  }

  if (prop.asesorNombre) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Asesor",
      value: prop.asesorNombre,
    });
  }

  if (additionalProperty.length > 0) {
    schema.additionalProperty = additionalProperty;
  }

  return schema;
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Asesoría inmobiliaria desde El Salvador. Propiedades destacadas, acompañamiento completo y red de compradores aquí y en el extranjero.",
    inLanguage: "es-SV",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/propiedades?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

type FAQ = {
  pregunta: string;
  respuesta: string;
};

export function getFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.respuesta,
      },
    })),
  };
}

export function jsonLdScript(schema: object) {
  return {
    __html: JSON.stringify(schema),
  };
}