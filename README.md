# ES Tu Casa Inmobiliaria

Sitio web profesional para [estucasasv.com](https://estucasasv.com), inmobiliaria salvadoreña fundada por Mario Rivas y Carlos Díaz. Especializada en propiedades en El Salvador con enfoque especial en la diáspora salvadoreña ("Hermano Lejano").

> *El Salvador es tu casa.*

---

## Stack tecnológico

- **Framework**: Next.js 16 (App Router, Turbopack)
- **CMS**: Sanity (gestión de propiedades, asesores, blog)
- **Estilos**: Tailwind CSS
- **Hosting**: Vercel (plan Hobby)
- **Lenguaje**: TypeScript

---

## Funcionalidades principales

### Públicas
- **Inicio** con propiedades destacadas
- **Listado de propiedades** con filtros flexibles (Casas, Apartamentos, Terrenos, Comerciales, Alquileres) y buscador
- **Detalle de propiedad** con galería de fotos, lightbox a pantalla completa, datos completos, asesor asignado, contacto directo por WhatsApp
- **Hermano Lejano** — sección dedicada a la diáspora salvadoreña
- **Vender** — formulario tipo wizard que envía leads directo al WhatsApp de Mario o Carlos
- **Blog** con artículos categorizados (Portable Text)
- **Preguntas Frecuentes** (21 preguntas sobre impuestos, hermano lejano, financiamiento)
- **Asesores** con perfiles completos
- **Selector de idiomas** (7 idiomas: Español, Inglés, Francés, Japonés, Portugués, Chino simplificado, Coreano)

### Técnicas
- Menú hamburguesa móvil con overlay pantalla completa
- Botón "volver arriba" flotante
- Schema.org (datos estructurados para SEO)
- Sitemap dinámico (`/sitemap.xml`)
- Open Graph + Twitter Cards
- Google Analytics integrado
- SSL automático (Vercel)

---

## URLs importantes

| Recurso | URL |
|---------|-----|
| Sitio en producción | https://estucasasv.com |
| Sitio en Vercel | https://estucasa-web.vercel.app |
| Studio (admin Sanity) | https://estucasasv.com/studio |
| GitHub | https://github.com/rivasgaldamez/estucasa-web |
| Deployments Vercel | https://vercel.com/rivasgaldamez/estucasa-web |
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |

---

## Contacto

- **Mario Rivas** — WhatsApp 7988-9533 (+503 7988 9533)
- **Carlos Díaz** — WhatsApp 7396-3858 (+503 7396 3858) — *bilingüe español-inglés*
- **Email**: info@estucasasv.com
- **Redes**: Instagram, Facebook, TikTok, YouTube (@estucasa_elsalvador)

---

## Datos del proyecto

- **Sanity Project ID**: u5c3y71c
- **Sanity Dataset**: production
- **Google Analytics ID**: G-MBVDNPVR62
- **Plan Vercel**: Hobby (gratis)
- **Plan Sanity**: Free (gratis, hasta 10,000 documentos)

---

## Correr en local

### Requisitos
- Node.js 18+ instalado
- npm
- Variables de entorno configuradas

### Pasos

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Abrir http://localhost:3000

# Compilar para producción (verificar antes de push)
npm run build
```

### Estructura del proyecto

estucasa-web/
├── app/                    # Páginas (App Router de Next.js)
│   ├── propiedades/        # Listado y detalle de propiedades
│   ├── vender/             # Wizard de venta
│   ├── hermano-lejano/     # Sección diáspora
│   ├── blog/               # Blog con artículos
│   ├── asesores/           # Perfiles de asesores
│   ├── preguntas-frecuentes/
│   ├── studio/             # Sanity Studio embebido
│   └── layout.tsx          # Layout global
├── components/             # Componentes reutilizables
│   ├── Navbar.tsx          # Barra de navegación
│   ├── Footer.tsx          # Pie de página
│   ├── TranslateWidget.tsx # Selector de idiomas
│   ├── ScrollToTop.tsx     # Botón volver arriba
│   └── Torogoz.tsx         # Mascota del sitio
├── lib/
│   ├── sanity.ts           # Cliente de Sanity
│   ├── queries.ts          # Consultas GROQ
│   └── schema.ts           # Schema.org generators
├── sanity/                 # Schemas de Sanity (CMS)
└── public/                 # Archivos estáticos (logo, etc.)

---

## Deploy

El deploy es automático: cada `git push` a `main` activa un build en Vercel.

```bash
git add -A
git commit -m "descripción del cambio"
git push
```

En 3-5 minutos el cambio está en producción.

---

## Gestión de contenido

Todo el contenido (propiedades, asesores, blog) se administra desde el Studio:

1. Acceder a https://estucasasv.com/studio
2. Iniciar sesión con la cuenta autorizada
3. Crear/editar contenido
4. **Importante**: dar click en **"Publish"** para que los cambios sean visibles al público (los borradores no se muestran)

### Estados de propiedad

- `Disponible` — se muestra en el sitio
- `Reservada` — se muestra en el sitio
- `Vendida` — no se muestra
- `Borrador` (sin Publish) — no se muestra

---

## Licencia

Proyecto privado. Todos los derechos reservados © 2026 ES Tu Casa Inmobiliaria.

---

*Hecho con criterio, no con plantillas.*