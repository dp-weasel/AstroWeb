// Esquema del contenido editable de src/content/ (ver src/content/LEEME.md).
// Cada archivo YAML es una colección: si no cumple su esquema, `astro build`
// falla con un error claro en lugar de publicar una página rota.
// Las páginas leen cada archivo con leer("<nombre>") de src/lib/contenido.ts.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { posesEdm } from "./lib/edm";
import { redes } from "./lib/redes";

/** Un único archivo de src/content/: la colección se llama como el archivo, sin .yaml. */
function archivo<S extends z.ZodType>(ruta: string, schema: S) {
  const barra = ruta.lastIndexOf("/");
  return defineCollection({
    loader: glob({ pattern: ruta.slice(barra + 1), base: `./src/content/${ruta.slice(0, barra)}` }),
    schema,
  });
}

/* ------------------------------ Piezas comunes ------------------------------ */

const texto = z.string().trim().min(1, "Hay un texto vacío");
const pose = z.enum(posesEdm, { error: `La pose de EDM tiene que ser una de: ${posesEdm.join(", ")}` });
/** Etiqueta punteada que marca contenido supuesto (EJEMPLO, Idea…). Borrala cuando el contenido sea real. */
const etiqueta = texto.optional();

/** Quién presenta la sección, con un globo de diálogo arriba del contenido. */
const presenta = z.discriminatedUnion("quien", [
  z.object({ quien: z.literal("armino"), texto }),
  z.object({ quien: z.literal("edm"), pose, texto }),
]);

/** Un turno de la charla: el Armiño o EDM (con su pose) diciendo algo. */
const turno = presenta;

/** Una fecha AAAA-MM-DD. YAML la convierte en Date si va sin comillas: se acepta igual. */
const fecha = z
  .union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha va como AAAA-MM-DD")])
  .transform((f) => (typeof f === "string" ? f : f.toISOString().slice(0, 10)));

/* ---------------------------------- Sitio ---------------------------------- */

const perfil = archivo(
  "sitio/perfil.yaml",
  z.object({
    nombre: texto,
    frase: texto.optional(),
    bio: z.array(texto).optional(),
    redes: z
      .array(
        z.object({
          red: z.enum(redes, { error: `La red tiene que ser una de: ${redes.join(", ")}` }),
          nombre: texto,
          usuario: texto,
          url: z.url("La url de la red no es válida"),
          boton: texto,
        }),
      )
      .min(1, "Tiene que haber al menos una red"),
  }),
);

const menu = archivo(
  "sitio/menu.yaml",
  z.object({
    enlaces: z.array(z.object({ texto, extra: texto.optional(), url: z.string().startsWith("/", "Los enlaces del menú empiezan con /") })),
  }),
);

/* --------------------------------- Portada --------------------------------- */

const banner = archivo(
  "portada/banner.yaml",
  z.object({ pestana: texto, descripcion: texto, antetitulo: texto, nombre: texto, intro: texto }),
);

const franja = archivo(
  "portada/franja.yaml",
  z.object({
    etiqueta,
    inicio_canal: fecha,
    datos: z.array(
      z.union([
        z.object({ auto: z.enum(["dia", "directos-por-semana", "seguidores"]), etiqueta: texto }),
        z.object({ valor: z.union([texto, z.number()]).transform(String), etiqueta: texto }),
      ]),
    ),
  }),
);

const comoEsElCanal = archivo("portada/como-es-el-canal.yaml", z.object({ titulo: texto, charla: z.array(turno).min(1) }));

const equipo = archivo(
  "portada/equipo.yaml",
  z.object({
    titulo: texto,
    presenta,
    personajes: z.array(
      z.object({ id: z.enum(["weasel", "armino", "edm"]), nombre: texto, rol: texto, texto, dato: texto.optional() }),
    ),
  }),
);

const historia = archivo(
  "portada/historia.yaml",
  z.object({
    titulo: texto,
    presenta,
    etiqueta,
    parrafos: z.array(texto).min(1),
    ficha: z.array(z.object({ dato: texto, valor: texto })).optional(),
  }),
);

const stickers = archivo(
  "portada/stickers.yaml",
  z.object({
    titulo: texto,
    presenta,
    stickers: z.array(z.object({ nombre: texto, pose, uso: texto })),
    nota: texto.optional(),
    etiqueta,
    usos: z.array(z.object({ cuando: texto, texto, etiqueta })),
  }),
);

const comandos = archivo(
  "portada/comandos.yaml",
  z.object({
    titulo: texto,
    presenta,
    comandos: z.array(z.object({ comando: texto, que_hace: texto, etiqueta })),
  }),
);

const metas = archivo(
  "portada/metas.yaml",
  z.object({
    titulo: texto,
    presenta,
    metas: z.array(z.object({ nombre: texto, actual: z.number(), meta: z.number().positive(), unidad: z.string().default("") })),
    premio: texto.optional(),
    nota: texto.optional(),
    etiqueta,
  }),
);

const videos = archivo(
  "portada/videos.yaml",
  z.object({
    titulo: texto,
    cantidad: z.number().int().positive(),
    videos: z.array(z.object({ titulo: texto, miniatura: texto, duracion: texto, url: z.url().optional() })),
    nota: texto.optional(),
    etiqueta,
    ver_canal: texto,
  }),
);

const reglas = archivo(
  "portada/reglas.yaml",
  z.object({ titulo: texto, presenta, etiqueta, reglas: z.array(z.object({ titulo: texto, texto })) }),
);

const herramientas = archivo(
  "portada/herramientas.yaml",
  z.object({
    titulo: texto,
    herramientas: z.array(z.object({ emoji: texto, titulo: texto, texto, url: z.string().startsWith("/") })).min(1),
  }),
);

const apoyar = archivo(
  "portada/apoyar.yaml",
  z.object({
    titulo: texto,
    presenta,
    gratis: z.array(z.object({ emoji: texto, que: texto, detalle: texto })),
    cafecito: z.object({ url: z.url(), texto, nota: texto.optional() }),
    nota: texto.optional(),
  }),
);

const preguntas = archivo(
  "portada/preguntas.yaml",
  z.object({ titulo: texto, preguntas: z.array(z.object({ pregunta: texto, respuesta: texto })) }),
);

const despedida = archivo(
  "portada/despedida.yaml",
  z.object({ edm: z.object({ pose, texto }), armino_al_final: texto }),
);

const horario = archivo(
  "portada/horario.yaml",
  z.object({
    zona_horaria: texto,
    directos: z.array(
      z.object({
        dia: z.enum(["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]),
        hora: z.string().regex(/^\d{1,2}:\d{2}$/, "La hora va como 21:00"),
        duracion_horas: z.number().positive(),
        plan: texto,
        emoji: texto,
      }),
    ),
  }),
);

/* ----------------------------------- GW2 ----------------------------------- */

// Cada archivo de gw2/mensajes/ es una pestaña de /gw2/mensajes/: agregar un archivo agrega una pestaña.
const mensajes = defineCollection({
  loader: glob({ pattern: "*.{yaml,yml}", base: "./src/content/gw2/mensajes" }),
  schema: z.object({
    nombre: z.string().trim().min(1, "La pestaña necesita un nombre"),
    orden: z.number().int().optional(),
    mensajes: z.record(
      z.string().regex(/^[a-z][a-z0-9-]*$/, "La clave de cada mensaje va en minúsculas, sin espacios ni tildes (p. ej. tren-frostgorge)"),
      z.string({ error: "Cada mensaje debe ser un texto entre comillas" }).trim().min(1, "Hay un mensaje vacío"),
    ),
  }),
});

const dicho = z.object({ pose, frase: texto });

const paginaMensajes = archivo(
  "gw2/pagina-mensajes.yaml",
  z.object({
    pestana: texto,
    descripcion: texto,
    titulo: texto,
    intro: texto,
    edm: z.object({
      inicio: dicho,
      copiado: z.object({ poses: z.array(pose).min(1), frases: z.array(texto).min(1) }),
      largo: dicho,
      categorias: z.record(z.string(), dicho),
      otra: dicho,
    }),
  }),
);

const paginaTierlist = archivo(
  "gw2/pagina-tierlist.yaml",
  z.object({ pestana: texto, descripcion: texto, titulo: texto, intro: texto, edm_inicio: dicho }),
);

const color = z.string().regex(/^#[0-9a-fA-F]{6}$/, "El color va como #ff9103");
const id = z.string().regex(/^[a-z0-9-]+$/, "Los id van en minúsculas, sin espacios ni tildes");

const tierlistPlantillas = archivo(
  "gw2/tierlist-plantillas.yaml",
  z.object({
    plantillas: z
      .array(
        z.object({
          id,
          nombre: texto,
          subtitulo: texto,
          solo_base: z.boolean().default(false),
          filas: z.array(z.object({ id, nombre: texto, color })).min(1),
        }),
      )
      .transform((ps) => ps.map(({ solo_base, filas, ...p }) => ({ ...p, soloBase: solo_base, tiers: filas }))),
  }),
);

const reaccion = z.object({
  poses: z
    .array(z.union([pose.transform((p) => ({ pose: p })), z.object({ pose, espejo: z.boolean().optional() })]))
    .min(1),
  frases: z.array(texto).min(1),
});

const tierlistEdm = archivo(
  "gw2/tierlist-edm.yaml",
  z.object({ s: reaccion, a: reaccion, b: reaccion, c: reaccion, d: reaccion, duda: reaccion, banco: reaccion }),
);

export const collections = {
  perfil,
  menu,
  banner,
  franja,
  "como-es-el-canal": comoEsElCanal,
  equipo,
  historia,
  stickers,
  comandos,
  metas,
  videos,
  reglas,
  herramientas,
  apoyar,
  preguntas,
  despedida,
  horario,
  mensajes,
  "pagina-mensajes": paginaMensajes,
  "pagina-tierlist": paginaTierlist,
  "tierlist-plantillas": tierlistPlantillas,
  "tierlist-edm": tierlistEdm,
};
