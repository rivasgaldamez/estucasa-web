// Consultas a Sanity. Estas son las "preguntas" que el sitio le hace al CMS.

// ─── PROPIEDADES ───

export const queryPropiedades = `*[
  _type == "propiedad" 
  && estado in ["disponible", "reservada"]
] | order(destacada desc, _createdAt desc) {
  _id,
  codigo,
  titulo,
  "slug": slug.current,
  tipo,
  operacion,
  estado,
  precio,
  destacada,
  etiqueta,
  habitaciones,
  banosCompletos,
  banosVisita,
  areaConstruccion,
  areaTerreno,
  parqueos,
  fotoPortada,
  "fotoPortadaUrl": fotoPortada.asset->url,
  "zona": zona->{
    nombre,
    municipio,
    "slug": slug.current
  }
}`;

export const queryPropiedadPorCodigo = `*[
  _type == "propiedad" 
  && codigo == $codigo
][0] {
  _id,
  codigo,
  titulo,
  "slug": slug.current,
  tipo,
  operacion,
  estado,
  precio,
  destacada,
  etiqueta,
  habitaciones,
  banosCompletos,
  banosVisita,
  areaConstruccion,
  areaTerreno,
  niveles,
  parqueos,
  anoConstruccion,
  amenidades,
  fotoPortada,
  "fotoPortadaUrl": fotoPortada.asset->url,
  galeria,
  "galeriaUrls": galeria[].asset->url,
  videoYoutube,
  descripcionCorta,
  descripcionLarga,
  "zona": zona->{
    nombre,
    municipio,
    "slug": slug.current
  },
  "asesor": asesor->{
    nombre,
    cargo,
    telefono,
    telefonoDisplay,
    email,
    foto,
    "fotoUrl": foto.asset->url,
    bio,
    "slug": slug.current
  }
}`;

export const queryDestacadas = `*[
  _type == "propiedad" 
  && destacada == true
  && estado == "disponible"
] | order(_createdAt desc)[0...4] {
  _id,
  codigo,
  titulo,
  "slug": slug.current,
  tipo,
  precio,
  etiqueta,
  fotoPortada,
  "fotoPortadaUrl": fotoPortada.asset->url,
  habitaciones,
  banosCompletos,
  areaConstruccion,
  areaTerreno,
  "zona": zona->{
    nombre,
    municipio
  }
}`;

// ─── ASESORES ───

export const queryAsesores = `*[
  _type == "asesor" 
  && activo == true
] | order(_createdAt asc) {
  _id,
  nombre,
  "slug": slug.current,
  cargo,
  telefono,
  telefonoDisplay,
  email,
  foto,
  "fotoUrl": foto.asset->url,
  bio
}`;

// ─── BLOG: CATEGORIAS ───

export const queryCategorias = `*[
  _type == "categoria"
] | order(nombre asc) {
  _id,
  nombre,
  "slug": slug.current,
  descripcion,
  color
}`;

// ─── BLOG: ARTICULOS ───

export const queryArticulos = `*[
  _type == "articulo"
] | order(destacado desc, fechaPublicacion desc) {
  _id,
  titulo,
  "slug": slug.current,
  extracto,
  fechaPublicacion,
  imagenPortada,
  "imagenPortadaUrl": imagenPortada.asset->url,
  destacado,
  tiempoLectura,
  "categoria": categoria->{
    _id,
    nombre,
    "slug": slug.current,
    color
  },
  "autor": autor->{
    _id,
    nombre,
    foto,
    "fotoUrl": foto.asset->url,
    "slug": slug.current
  }
}`;

export const queryArticuloPorSlug = `*[
  _type == "articulo"
  && slug.current == $slug
][0] {
  _id,
  titulo,
  "slug": slug.current,
  extracto,
  fechaPublicacion,
  imagenPortada,
  "imagenPortadaUrl": imagenPortada.asset->url,
  destacado,
  tiempoLectura,
  contenido,
  metaTitulo,
  metaDescripcion,
  palabrasClave,
  "categoria": categoria->{
    _id,
    nombre,
    "slug": slug.current,
    color
  },
  "autor": autor->{
    _id,
    nombre,
    cargo,
    foto,
    "fotoUrl": foto.asset->url,
    bio,
    telefono,
    telefonoDisplay,
    "slug": slug.current
  }
}`;

export const queryArticulosRelacionados = `*[
  _type == "articulo"
  && categoria._ref == $categoriaId
  && _id != $articuloId
] | order(fechaPublicacion desc)[0...3] {
  _id,
  titulo,
  "slug": slug.current,
  extracto,
  fechaPublicacion,
  imagenPortada,
  "imagenPortadaUrl": imagenPortada.asset->url,
  tiempoLectura,
  "categoria": categoria->{
    _id,
    nombre,
    color
  }
}`;