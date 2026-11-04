// Funciones helper para generar Schema.org JSON-LD
// Optimizado para Google + IA

const SITE_URL = "https://estucasasv.com";
const SITE_NAME = "ES Tu Casa Inmobiliaria";

// Correo público del sitio. Para cambiarlo en todo el schema, edita SOLO esta línea.
const CONTACT_EMAIL = "estucasasv@gmail.com";

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
    telephone: "+50379889533",
    email: CONTACT_EMAIL,
    founder: [
      {
        "@type": "Person",
        name: "Mario Rivas",
        jobTitle: "Socio Fundador - Asesor Inmobiliario",
        telephone: "+50379889533",
        email: CONTACT_EMAIL,
      },
      {
        "@type": "Person",
        name: "Carlos Díaz",
        jobTitle: "Socio Fundador - Asesor Comercial",
        telephone: "+50373963858",
        email: CONTACT_EMAIL,
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
        telephone: "+50373963858",
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
    email: asesor.email || CONTACT_EMAIL,
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
  fechaModificacion?: string;
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
    dateModified: articulo.fechaModificacion || articulo.fechaPublicacion,
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
  operacion?: string;
  estado?: string;
  habitaciones?: number;
  banosCompletos?: number;
  areaConstruccion?: number;
  areaTerreno?: number;
  // "m2" o "v2". Si viene vacío se asume varas cuadradas, igual que la ficha.
  unidadTerreno?: string;
  parqueos?: number;
  zonaNombre?: string;
  zonaMunicipio?: string;
  fotoPortadaUrl?: string;
  asesorNombre?: string;
  asesorSlug?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
};

function getPropertySchemaType(tipo: string) {
  if (tipo === "apartamento") return "Apartment";
  // Terrenos y locales comerciales: Place es el tipo genérico y siempre válido.
  if (tipo === "terreno" || tipo === "comercial") return "Place";

  return "SingleFamilyResidence";
}

function getAvailability(estado?: string) {
  if (estado === "vendida") return "https://schema.org/SoldOut";
  if (estado === "reservada") return "https://schema.org/Reserved";
  if (estado === "pausada") return "https://schema.org/OutOfStock";

  return "https://schema.org/InStock";
}

export function getRealEstateListingSchema(prop: PropiedadSchema) {
  const url = `${SITE_URL}/propiedades/${prop.codigo}`;
  const tieneHabitaciones =
    prop.tipo !== "terreno" && prop.tipo !== "comercial";

  // El inmueble en sí (la casa, el apartamento o el terreno)
  const inmueble: Record<string, unknown> = {
    "@type": getPropertySchemaType(prop.tipo),
    "@id": `${url}#inmueble`,
    name: prop.titulo,
    address: {
      "@type": "PostalAddress",
      addressCountry: "SV",
      addressRegion: prop.zonaMunicipio || undefined,
      addressLocality: prop.zonaNombre || undefined,
    },
  };

  if (tieneHabitaciones && prop.habitaciones) {
    inmueble.numberOfBedrooms = prop.habitaciones;
  }

  if (tieneHabitaciones && prop.banosCompletos) {
    inmueble.numberOfBathroomsTotal = prop.banosCompletos;
  }

  if (prop.areaConstruccion) {
    inmueble.floorSize = {
      "@type": "QuantitativeValue",
      value: prop.areaConstruccion,
      unitCode: "MTK",
      unitText: "m²",
    };
  }

  const additionalProperty: Array<Record<string, unknown>> = [];

  if (prop.areaTerreno) {
    // Se publica la unidad tal como está guardada en Sanity, sin convertir.
    const enMetros = prop.unidadTerreno === "m2";

    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Área de terreno",
      value: prop.areaTerreno,
      ...(enMetros
        ? { unitCode: "MTK", unitText: "m²" }
        : { unitText: "v²" }),
    });
  }

  if (prop.parqueos) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Parqueos",
      value: prop.parqueos,
    });
  }

  if (additionalProperty.length > 0) {
    inmueble.additionalProperty = additionalProperty;
  }

  // El anuncio (la página): precio, disponibilidad, vendedor y autor
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${url}#anuncio`,
    url,
    name: prop.titulo,
    description: prop.descripcion || prop.titulo,
    inLanguage: "es-SV",
    datePosted: prop.fechaCreacion || undefined,
    dateModified: prop.fechaModificacion || undefined,
    image: prop.fotoPortadaUrl ? [prop.fotoPortadaUrl] : undefined,
    author:
      prop.asesorNombre && prop.asesorSlug
        ? {
            "@type": "Person",
            "@id": `${SITE_URL}/asesores#${prop.asesorSlug}`,
            name: prop.asesorNombre,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      price: prop.precio,
      priceCurrency: "USD",
      availability: getAvailability(prop.estado),
      businessFunction:
        prop.operacion === "alquiler"
          ? "http://purl.org/goodrelations/v1#LeaseOut"
          : "http://purl.org/goodrelations/v1#Sell",
      url,
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    mainEntity: inmueble,
  };

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