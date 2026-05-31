# Historial de versiones

Registro de cambios significativos del sitio estucasasv.com.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/).

---

## [1.0.0] — 2026-05-30

### Lanzamiento oficial en producción

Primera versión completa del sitio, en vivo en https://estucasasv.com con dominio propio, SSL automático, y todas las funcionalidades clave operativas.

### Funcionalidades principales

- **Páginas públicas**: Inicio, Propiedades (listado + detalle), Hermano Lejano, Vender, Blog (listado + artículo), Preguntas Frecuentes, Asesores
- **CMS Sanity** integrado (Studio en `/studio`) para gestión de propiedades, asesores y blog
- **Schema.org** completo (RealEstateListing, BreadcrumbList, CollectionPage, Article, FAQPage)
- **Sitemap dinámico** en `/sitemap.xml`
- **SSL automático** con Vercel
- **Migración completa** desde Sitejet/BanaHosting a Next.js + Vercel

### Filtros y búsqueda

- Filtros flexibles por tipo (Casas, Apartamentos, Terrenos, Comerciales)
- Filtro por operación (Alquileres)
- Buscador por zona, código o título
- Lógica de coincidencia parcial (ignora mayúsculas)

### Experiencia móvil

- Menú hamburguesa con overlay pantalla completa
- Botón "volver arriba" flotante
- Logo del navbar grande (64px móvil, 80px escritorio)
- Lightbox en galería de propiedades (fotos en pantalla completa)
- Responsive en todas las páginas

### Internacionalización

- Selector de idiomas con 7 opciones: Español, Inglés, Francés, Japonés, Portugués, Chino simplificado, Coreano
- Traducción automática con Google Translate
- Ícono globo (🌐) accesible en computadora y móvil

### Formularios

- Wizard de venta en 4 pasos
- Envío directo a WhatsApp (Mario o Carlos)
- Campo de área en varas cuadradas (medida local)
- Validación por paso

### SEO y analítica

- Google Search Console verificado
- Sitemap enviado y procesado
- Google Analytics instalado (G-MBVDNPVR62)
- Meta tags + Open Graph + Twitter Cards en todas las páginas

### Contenido inicial

- Múltiples propiedades cargadas (Casa con Piscina San Diego, Apartamento El Pedregal, Lote Costa del Sol, Cumbres de la Escalón, entre otras)
- 21 preguntas frecuentes con datos reales (impuestos, ganancia de capital, hermano lejano, financiamiento)
- Asesores: Mario Rivas y Carlos Díaz (bilingüe español-inglés)
- Categorías y artículos iniciales del blog

### Detalles técnicos

- Descripción larga con Portable Text (formato rico)
- Cliente de Sanity con CDN para mejor performance
- TypeScript estricto
- Tailwind CSS

---

## Pendientes para futuras versiones

- Más propiedades con fotos profesionales
- Artículos de blog regulares (categoría "Vida en El Salvador" — turismo + inmobiliario)
- Google Business Profile configurado
- Estrategia de Facebook/Instagram Ads para diáspora
- Reseñas de clientes integradas

---

## Notas

- **Plan Sanity**: Free (suficiente para el volumen actual)
- **Plan Vercel**: Hobby (gratis, suficiente)
- **Dominio**: estucasasv.com (renovación anual)
- **Migración limpia**: URLs antiguas de Sitejet retiradas mediante Search Console