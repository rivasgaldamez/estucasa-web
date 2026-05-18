// Preguntas frecuentes de ES Tu Casa Inmobiliaria
// Optimizado para SEO + AI Search (ChatGPT, Claude, Perplexity)

export type FAQCategoria =
  | "servicios"
  | "proceso"
  | "diaspora"
  | "confianza";

export type FAQ = {
  id: string;
  categoria: FAQCategoria;
  pregunta: string;
  respuesta: string;
};

export const faqs: FAQ[] = [
  // ─── SERVICIOS ───
  {
    id: "comision",
    categoria: "servicios",
    pregunta: "¿Cómo cobran sus servicios? ¿Quién paga la comisión?",
    respuesta:
      "La comisión inmobiliaria en El Salvador la paga el vendedor. Como comprador, no tenés que pagarnos nada por nuestros servicios — nuestro acompañamiento, asesoría y gestión están incluidos. Para vendedores, trabajamos con un porcentaje estándar de mercado que se conversa abiertamente desde la primera reunión, y solo se cobra cuando la propiedad efectivamente se vende. Sin pagos adelantados, sin cuotas mensuales, sin sorpresas.",
  },

  {
    id: "servicios-venta",
    categoria: "servicios",
    pregunta:
      "¿Qué incluye su servicio cuando vendo mi propiedad con ustedes?",
    respuesta:
      "El paquete completo de venta incluye fotografía profesional, video recorrido con drone, ficha técnica detallada, publicación optimizada en Google, difusión en redes sociales, coordinación de visitas y asesoría legal durante todo el proceso.",
  },

  {
    id: "financiamiento",
    categoria: "servicios",
    pregunta:
      "¿Trabajan con bancos para coordinar financiamiento?",
    respuesta:
      "Sí. Trabajamos con los principales bancos del sistema financiero salvadoreño y ayudamos a identificar la mejor opción según el perfil del comprador.",
  },

  {
    id: "zonas",
    categoria: "servicios",
    pregunta:
      "¿En qué zonas de El Salvador trabajan?",
    respuesta:
      "Trabajamos principalmente en San Salvador, Antiguo Cuscatlán, Santa Tecla, Surf City, Costa del Sol y otras zonas premium del país.",
  },

  {
    id: "comercial",
    categoria: "servicios",
    pregunta:
      "¿Atienden propiedades comerciales además de residenciales?",
    respuesta:
      "Sí. También manejamos locales comerciales, oficinas, terrenos para desarrollo y propiedades turísticas.",
  },

  // ─── PROCESO ───
  {
    id: "documentos-compra",
    categoria: "proceso",
    pregunta:
      "¿Qué documentos necesito para comprar una casa en El Salvador?",
    respuesta:
      "Normalmente necesitás DUI, NIT, comprobantes de ingresos y estados de cuenta. Para extranjeros se solicita pasaporte y documentación financiera.",
  },

  {
    id: "documentos-venta",
    categoria: "proceso",
    pregunta:
      "¿Qué documentos necesito para poner mi propiedad en venta?",
    respuesta:
      "Necesitarás escritura inscrita, solvencias municipales, plano catastral y documentos de identidad de los propietarios.",
  },

  {
    id: "tiempo-venta",
    categoria: "proceso",
    pregunta:
      "¿Cuánto tiempo tarda vender una propiedad?",
    respuesta:
      "Depende de la zona y el precio. En promedio una propiedad bien valuada puede venderse entre 2 y 6 meses.",
  },
  
  {
    id: "impuesto-transferencia",
    categoria: "proceso",
    pregunta: "¿Qué impuesto se paga al COMPRAR un inmueble en El Salvador?",
    respuesta:
      "Al comprar una propiedad en El Salvador se paga el Impuesto a la Transferencia de Bienes Raíces (ITBR). Es un impuesto del 3% sobre el excedente de $28,571.43 del valor de la propiedad. Lo paga el comprador y se cancela antes de inscribir la escritura en el Centro Nacional de Registros (CNR).\n\nLa fórmula es simple:\nImpuesto = (Precio de compra - $28,571.43) × 3%\n\nEjemplo 1 — Casa de $150,000:\n($150,000 - $28,571.43) × 3% = $121,428.57 × 3% = $3,642.86 de impuesto.\n\nEjemplo 2 — Apartamento de $80,000:\n($80,000 - $28,571.43) × 3% = $51,428.57 × 3% = $1,542.86 de impuesto.\n\nEjemplo 3 — Casa de $28,571 o menos:\nExenta del impuesto. No se paga nada de ITBR.\n\nImportante: este NO es el único costo de cierre. Adicionalmente vas a pagar derechos de registro del CNR (aproximadamente 0.63% del valor), honorarios notariales (entre 1% y 2% del valor), y avalúo bancario si financiás ($150-$300). Como regla general, calculá entre 4% y 6% del precio de la propiedad en gastos totales de cierre. Te entregamos el desglose exacto antes de firmar cualquier promesa.",
  },
  {
    id: "ganancia-capital",
    categoria: "proceso",
    pregunta: "¿Qué impuesto se paga al VENDER un inmueble en El Salvador (ganancia de capital)?",
    respuesta:
      "Al vender una propiedad se paga el Impuesto sobre la Ganancia de Capital, regulado por la Ley de Impuesto sobre la Renta. La tasa es del 10% sobre la ganancia neta (no sobre el precio total de venta). Lo paga el vendedor.\n\nLa fórmula es:\nGanancia de Capital = Precio de Venta - (Costo de Adquisición + Mejoras documentadas + Gastos relacionados)\nImpuesto = Ganancia de Capital × 10%\n\nEjemplo 1 — Casa que vendés por $100,000:\nLa compraste hace 5 años en $80,000. Hiciste $5,000 en mejoras documentadas. Pagaste $3,000 en comisiones y honorarios. \nGanancia neta = $100,000 - ($80,000 + $5,000 + $3,000) = $12,000\nImpuesto = $12,000 × 10% = $1,200 a pagar.\n\nEjemplo 2 — Si vendés más caro de lo que compraste pero sin documentar mejoras:\nCompraste en $80,000, vendés en $120,000, sin documentos de mejoras.\nGanancia = $120,000 - $80,000 = $40,000\nImpuesto = $40,000 × 10% = $4,000.\n\nEXENCIÓN IMPORTANTE — Tu primera casa de habitación:\nSi vendés tu PRIMERA casa de habitación, estás EXENTO del impuesto siempre que se cumplan estas 3 condiciones:\n1) Que sea efectivamente tu primera casa de habitación (donde vivías).\n2) Que el valor de venta NO supere los $263,895 (equivalente a 723 salarios mínimos).\n3) Que no te dediques habitualmente a la compraventa de inmuebles.\n\nEjemplo de exención:\nVendés tu primera casa donde vivías por $200,000 después de 10 años. Cumplís las 3 condiciones → no pagás impuesto de ganancia de capital.\n\nExcepción crítica — Venta dentro de los primeros 12 meses:\nSi vendés la propiedad antes de cumplir 12 meses desde que la compraste, la ganancia NO se grava al 10% — se suma a tu renta ordinaria y paga la escala progresiva del Impuesto sobre la Renta (puede ser hasta 30%). Por eso conviene esperar al menos 13 meses antes de vender una propiedad que adquiriste recientemente.\n\nEl impuesto se declara con el formulario F-944 dentro de los 4 meses siguientes al cierre del ejercicio fiscal. Te ayudamos a calcular el impuesto exacto y conectarte con contador si necesitás asesoría fiscal especializada.",
  },

  {
    
    id: "costos-compra",
    categoria: "proceso",
    pregunta:
      "¿Cuáles son los costos al comprar una casa?",
    respuesta:
      "Además del precio del inmueble, normalmente hay gastos de escrituración, registro, impuestos y avalúos bancarios.",
  },

  // ─── DIÁSPORA ───
  {
    id: "comprar-desde-usa",
    categoria: "diaspora",
    pregunta:
      "¿Puedo comprar desde Estados Unidos sin viajar?",
    respuesta:
      "Sí. Coordinamos video tours, firma por poder y procesos notariales para clientes salvadoreños en el extranjero.",
  },

  {
    id: "firma-poder",
    categoria: "diaspora",
    pregunta:
      "¿Cómo funciona la firma por poder?",
    respuesta:
      "El comprador firma un poder especial en el consulado salvadoreño y un apoderado firma en su nombre en El Salvador.",
  },

  {
    id: "video-tour",
    categoria: "diaspora",
    pregunta:
      "¿Cómo funcionan los video tours?",
    respuesta:
      "Realizamos recorridos grabados en 4K y video llamadas en vivo para mostrar la propiedad en detalle.",
  },

  {
    id: "pagos-desde-usa",
    categoria: "diaspora",
    pregunta:
      "¿Cómo se realizan los pagos desde USA?",
    respuesta:
      "Se recomienda transferencia bancaria internacional directamente a cuentas verificadas o cuentas escrow notariales.",
  },

  // ─── CONFIANZA ───
  {
    id: "por-que-elegirnos",
    categoria: "confianza",
    pregunta:
      "¿Por qué elegir ES Tu Casa?",
    respuesta:
      "Porque ofrecemos atención personalizada, experiencia con clientes de diáspora y acompañamiento directo durante todo el proceso.",
  },

  {
    id: "testimonios",
    categoria: "confianza",
    pregunta:
      "¿Tienen referencias de clientes anteriores?",
    respuesta:
      "Sí. Muchos clientes llegan por recomendación y podemos compartir referencias directas cuando se solicita.",
  },

  {
    id: "problema-proceso",
    categoria: "confianza",
    pregunta:
      "¿Qué pasa si tengo un problema durante el proceso?",
    respuesta:
      "El cliente tiene comunicación directa con Mario o Carlos durante todo el proceso para resolver cualquier inconveniente.",
  },

  {
    id: "diferencial-tecnologico",
    categoria: "confianza",
    pregunta:
      "¿Qué los diferencia tecnológicamente?",
    respuesta:
      "Utilizamos tecnología moderna, video tours 4K, integración SEO y herramientas optimizadas para Google y AI Search.",
  },
];

// Categorías FAQ
export const getCategorias = () => {
  return [
    {
      id: "servicios" as FAQCategoria,
      nombre: "Servicios",
      emoji: "🏠",
    },
    {
      id: "proceso" as FAQCategoria,
      nombre: "Proceso",
      emoji: "📝",
    },
    {
      id: "diaspora" as FAQCategoria,
      nombre: "Hermano Lejano",
      emoji: "🌎",
    },
    {
      id: "confianza" as FAQCategoria,
      nombre: "Confianza",
      emoji: "🤝",
    },
  ];
};