/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { sanityClient, urlFor } from "@/lib/sanity";
import { queryPropiedadPorCodigo } from "@/lib/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Colores de marca ES Tu Casa
const C = {
  cream: "#F6F1E7",
  creamWarm: "#EFE8D9",
  ink: "#141210",
  inkSoft: "#3A322B",
  blue: "#1B3A9C",
  blueDeep: "#0D2060",
  sun: "#F5A800",
  stone: "#E0D7C4",
};

const AMENIDADES: Record<string, string> = {
  piscina: "Piscina privada",
  jardin: "Jardín",
  chimenea: "Chimenea",
  ac: "Aire acondicionado central",
  seguridad: "Seguridad 24/7",
  "planta-electrica": "Planta eléctrica",
  cisterna: "Cisterna",
  cochera: "Cochera techada",
  bbq: "Área BBQ",
  vista: "Vista panorámica",
  gimnasio: "Gimnasio",
  salon: "Salón de usos múltiples",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: C.cream,
    fontFamily: "Helvetica",
    color: C.ink,
    paddingBottom: 50,
  },
  header: {
    backgroundColor: C.blueDeep,
    paddingVertical: 14,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: { color: C.cream, fontFamily: "Times-Roman", fontSize: 18 },
  brandSub: { color: C.sun, fontSize: 7, letterSpacing: 2 },
  codigo: { color: C.cream, fontSize: 9, letterSpacing: 1.5 },
  cover: { width: "100%", height: 260, objectFit: "cover" },
  body: { paddingHorizontal: 32, paddingTop: 20 },
  eyebrow: {
    color: C.sun,
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
  },
  titulo: {
    fontFamily: "Times-Roman",
    fontSize: 26,
    marginBottom: 6,
    lineHeight: 1.1,
  },
  ubicacion: { fontSize: 10, color: C.inkSoft, marginBottom: 14 },
  precioBox: {
    backgroundColor: C.blue,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  precioLabel: { color: C.sun, fontSize: 8, letterSpacing: 2 },
  precio: { color: C.cream, fontFamily: "Times-Roman", fontSize: 26 },
  operacion: { color: C.cream, fontSize: 9, textTransform: "uppercase" },
  specs: { flexDirection: "row", flexWrap: "wrap", marginBottom: 18 },
  spec: {
    width: "23.5%",
    marginRight: "2%",
    marginBottom: 8,
    backgroundColor: C.creamWarm,
    borderRadius: 8,
    padding: 10,
  },
  specValor: { fontFamily: "Times-Roman", fontSize: 18, color: C.blue },
  specLabel: { fontSize: 7.5, color: C.inkSoft, marginTop: 2 },
  parrafo: {
    fontSize: 10,
    lineHeight: 1.55,
    color: C.inkSoft,
    marginBottom: 8,
  },
  seccion: { marginBottom: 18 },
  galeria: { flexDirection: "row", flexWrap: "wrap" },
  fotoWrap: { width: "48.5%", marginBottom: 10 },
  fotoIzq: { marginRight: "3%" },
  foto: { width: "100%", height: 150, objectFit: "cover", borderRadius: 8 },
  fotoLabel: { fontSize: 8, color: C.inkSoft, marginTop: 4 },
  amenidades: { flexDirection: "row", flexWrap: "wrap" },
  amenidad: {
    fontSize: 9,
    backgroundColor: C.creamWarm,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  asesorBox: {
    backgroundColor: C.creamWarm,
    borderRadius: 10,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: C.sun,
  },
  asesorNombre: { fontFamily: "Times-Roman", fontSize: 18, marginBottom: 2 },
  asesorDato: { fontSize: 10, color: C.inkSoft, marginTop: 3 },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: C.inkSoft,
    borderTopWidth: 0.5,
    borderTopColor: C.stone,
    paddingTop: 6,
  },
});

function imgUrl(image: any, w: number, h: number) {
  if (!image?.asset) return null;
  try {
    return urlFor(image)
      .width(w)
      .height(h)
      .fit("crop")
      .format("jpg")
      .quality(80)
      .url();
  } catch {
    return null;
  }
}

// Acepta galería en formato viejo (imagen directa) y nuevo (imagen + etiqueta)
function procesarGaleria(galeria: any[] = []) {
  return galeria
    .map((item: any) => {
      if (item?.asset) return { image: item, label: null };
      if (item?.image?.asset)
        return { image: item.image, label: item.label || null };
      return null;
    })
    .filter(Boolean) as { image: any; label: string | null }[];
}

// Convierte la descripción larga (Portable Text) a párrafos simples
function textoPlano(desc: any): string[] {
  if (typeof desc === "string") return [desc];
  if (!Array.isArray(desc)) return [];
  return desc
    .filter((b: any) => b._type === "block")
    .map((b: any) => (b.children || []).map((c: any) => c.text).join(""))
    .filter((t: string) => t.trim().length > 0);
}

function FichaPDF({ p }: { p: any }) {
  const portada = imgUrl(p.fotoPortada, 1200, 700);
  const galeria = procesarGaleria(p.galeria).slice(0, 8);
  const parrafos = textoPlano(p.descripcionLarga);
  const precio = Number(p.precio) || 0;

  const specs = [
    { v: p.habitaciones, l: "Habitaciones" },
    { v: p.banosCompletos, l: "Baños" },
    { v: p.areaConstruccion, l: "m² construcción" },
    { v: p.areaTerreno, l: "v² terreno" },
    { v: p.parqueos, l: "Parqueos" },
    { v: p.niveles, l: "Niveles" },
    { v: p.anoConstruccion, l: "Año construcción" },
  ].filter((s) => s.v);

  const ubicacion = p.zona
    ? `${p.zona.nombre || ""}${p.zona.municipio ? `, ${p.zona.municipio}` : ""}`
    : "El Salvador";

  const asesorNombre = p.asesor?.nombre || "Mario Rivas";
  const asesorTel = p.asesor?.telefonoDisplay || "7988-9533";
  const asesorEmail = p.asesor?.email || "info@estucasasv.com";

  // Contactos que salen en la ficha (sin repetir si el asesor ya es Carlos)
  const contactos = [{ nombre: asesorNombre, tel: asesorTel }];
  if (!asesorNombre.toLowerCase().includes("carlos")) {
    contactos.push({ nombre: "Carlos Díaz", tel: "7396-3858" });
  }

  return (
    <Document
      title={`Ficha ${p.codigo} - ${p.titulo}`}
      author="ES Tu Casa Inmobiliaria"
    >
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <View>
            <Text style={styles.brand}>ES Tu Casa</Text>
            <Text style={styles.brandSub}>INMOBILIARIA · EL SALVADOR</Text>
          </View>
          <Text style={styles.codigo}>FICHA {p.codigo}</Text>
        </View>

        {portada ? <Image src={portada} style={styles.cover} /> : null}

        <View style={styles.body}>
          <Text style={styles.eyebrow}>
            {p.tipo || "Propiedad"}
            {p.etiqueta ? ` · ${p.etiqueta}` : ""}
          </Text>
          <Text style={styles.titulo}>{p.titulo}</Text>
          <Text style={styles.ubicacion}>{ubicacion}</Text>

          <View style={styles.precioBox}>
            <View>
              <Text style={styles.precioLabel}>PRECIO</Text>
              <Text style={styles.precio}>
                {precio > 0 ? `$${precio.toLocaleString("en-US")}` : "Consultar"}
              </Text>
            </View>
            <Text style={styles.operacion}>
              {p.operacion === "alquiler" ? "En alquiler" : "En venta"}
            </Text>
          </View>

          {specs.length > 0 ? (
            <View style={styles.specs}>
              {specs.map((s, i) => (
                <View key={i} style={styles.spec}>
                  <Text style={styles.specValor}>{String(s.v)}</Text>
                  <Text style={styles.specLabel}>{s.l}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {p.descripcionCorta || parrafos.length > 0 ? (
            <View style={styles.seccion}>
              <Text style={styles.eyebrow}>Descripción</Text>
              {p.descripcionCorta ? (
                <Text style={styles.parrafo}>{p.descripcionCorta}</Text>
              ) : null}
              {parrafos.map((t, i) => (
                <Text key={i} style={styles.parrafo}>
                  {t}
                </Text>
              ))}
            </View>
          ) : null}

          {p.amenidades?.length ? (
            <View style={styles.seccion} wrap={false}>
              <Text style={styles.eyebrow}>Amenidades</Text>
              <View style={styles.amenidades}>
                {p.amenidades.map((a: string, i: number) => (
                  <Text key={i} style={styles.amenidad}>
                    {AMENIDADES[a] || a}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}

          {galeria.length > 0 ? (
            <View style={styles.seccion} break>
              <Text style={styles.eyebrow}>Galería</Text>
              <View style={styles.galeria}>
                {galeria.map((g, i) => {
                  const url = imgUrl(g.image, 700, 450);
                  if (!url) return null;
                  return (
                    <View
                      key={i}
                      style={[styles.fotoWrap, i % 2 === 0 ? styles.fotoIzq : {}]}
                      wrap={false}
                    >
                      <Image src={url} style={styles.foto} />
                      {g.label ? (
                        <Text style={styles.fotoLabel}>{g.label}</Text>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}

          <View style={styles.asesorBox} wrap={false}>
            <Text style={styles.eyebrow}>Agenda tu visita</Text>
            {contactos.map((c, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={styles.asesorNombre}>{c.nombre}</Text>
                <Text style={styles.asesorDato}>WhatsApp: +503 {c.tel}</Text>
              </View>
            ))}
            <Text style={styles.asesorDato}>Email: {asesorEmail}</Text>
            <Text style={styles.asesorDato}>
              estucasasv.com/propiedades/{p.codigo}
            </Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>ES Tu Casa Inmobiliaria · estucasasv.com</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ codigo: string }> }
) {
  const { codigo } = await params;

  const propiedad = await sanityClient.fetch(queryPropiedadPorCodigo, {
    codigo,
  });

  if (!propiedad) {
    return new Response("Propiedad no encontrada", { status: 404 });
  }

  const buffer = await renderToBuffer(<FichaPDF p={propiedad} />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Ficha-${codigo}-ES-Tu-Casa.pdf"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}