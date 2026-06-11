"use client";

import InfografiaPrecios from "./InfografiaPrecios";
import InfografiaFactores from "./InfografiaFactores";
import InfografiaCostos from "./InfografiaCostos";
import InfografiaAcceso from "./InfografiaAcceso";
import InfografiaColonias from "./InfografiaColonias";

/**
 * Infografia (router)
 * -------------------
 * Recibe el "tipo" elegido en Sanity y renderiza el componente correcto.
 * Esto permite que en el editor de Sanity se elija de una lista desplegable
 * cuál infografía insertar, sin tocar código.
 *
 * Uso desde el renderizador de Portable Text (ver INSTRUCCIONES.md):
 *   <Infografia tipo={value.tipo} />
 */
const MAPA = {
  precios: InfografiaPrecios,
  factores: InfografiaFactores,
  costos: InfografiaCostos,
  acceso: InfografiaAcceso,
  colonias: InfografiaColonias,
};

export default function Infografia({ tipo }) {
  const Componente = MAPA[tipo];

  if (!Componente) {
    // Si el tipo no existe (p. ej. dato viejo), no rompe la página.
    return null;
  }

  return <Componente />;
}
