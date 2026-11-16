// Configuración de la tierlist de GW2 (/gw2/tierlist/): filas, plantillas, frases
// de EDM y las versiones que se comparan. Sin dependencias de Astro: lo usa también
// el navegador (src/scripts/tierlist/).

export interface Tier {
  id: string;
  nombre: string;
  color: string;
}

/** Filas por defecto, con los colores de la miniatura de tierlist de YouTube. */
export const tiersBase: Tier[] = [
  { id: "s", nombre: "S", color: "#ff5a5a" },
  { id: "a", nombre: "A", color: "#ff9103" },
  { id: "b", nombre: "B", color: "#ffd54f" },
  { id: "c", nombre: "C", color: "#93d651" },
  { id: "d", nombre: "D", color: "#5fa8ff" },
];

/** Colores para las filas nuevas, en orden. */
export const coloresExtra = ["#b679d5", "#52d6c3", "#f48fb1", "#a1887f", "#90a4ae"];

export interface Plantilla {
  id: string;
  nombre: string;
  /** Texto de la etiqueta naranja debajo de TIER LIST. */
  subtitulo: string;
  tiers: Tier[];
  /** Si es true, la plantilla arranca mostrando solo las profesiones base. */
  soloBase?: boolean;
}

/** Temas listos para usar en un video o un directo. */
export const plantillas: Plantilla[] = [
  { id: "balance", nombre: "Balance", subtitulo: "Balance", tiers: tiersBase },
  {
    id: "empezar",
    nombre: "Para empezar",
    subtitulo: "Para empezar",
    soloBase: true,
    tiers: [
      { id: "ideal", nombre: "Ideal", color: "#93d651" },
      { id: "facil", nombre: "Fácil", color: "#ffd54f" },
      { id: "paciencia", nombre: "Con paciencia", color: "#ff9103" },
      { id: "veteranos", nombre: "Para veteranos", color: "#ff5a5a" },
    ],
  },
  {
    id: "diversion",
    nombre: "Más divertida",
    subtitulo: "Diversión",
    tiers: [
      { id: "amo", nombre: "La amo", color: "#ff5a5a" },
      { id: "divierte", nombre: "Divierte", color: "#ff9103" },
      { id: "meh", nombre: "Meh", color: "#ffd54f" },
      { id: "nopara", nombre: "No es para mí", color: "#5fa8ff" },
    ],
  },
  {
    id: "fashion",
    nombre: "Fashion Wars",
    subtitulo: "Fashion Wars",
    tiers: [
      { id: "divina", nombre: "Divina", color: "#d6249f" },
      { id: "linda", nombre: "Linda", color: "#b679d5" },
      { id: "normal", nombre: "Normal", color: "#90a4ae" },
      { id: "tinte", nombre: "Ni con tinte", color: "#a1887f" },
    ],
  },
  {
    id: "sinprobar",
    nombre: "¿La probé?",
    subtitulo: "Mi experiencia",
    tiers: [
      { id: "main", nombre: "Mi main", color: "#ff9103" },
      { id: "jugue", nombre: "La jugué", color: "#93d651" },
      { id: "probe", nombre: "La probé", color: "#ffd54f" },
      { id: "nunca", nombre: "Nunca", color: "#90a4ae" },
    ],
  },
];

/**
 * Lo que dice EDM al ubicar una ficha (versión 4). {n} es la especialización y {t}
 * la fila. "arriba" es la primera fila, "abajo" la última y "medio" el resto.
 */
export const frasesEdm = {
  arriba: [
    "¿{n} en {t}? Por fin una decisión con sentido.",
    "{n} arriba de todo. Respeto.",
    "¡Eso! {n} se lo merece.",
  ],
  medio: [
    "{n} en {t}… bueno, no voy a discutir. Hoy.",
    "Mmm, {n} en {t}. Aceptable.",
    "¿{t}? Le pondría una más. O una menos. Ya fue.",
  ],
  abajo: [
    "¿¡{n} en {t}!? Quiero hablar con el gerente.",
    "Pobre {n}. ¿Qué te hizo?",
    "{n} en {t}. El chat no va a estar de acuerdo.",
  ],
  pool: ["¿Te arrepentiste de {n}? Pasa.", "{n} vuelve al banco. Pensalo bien.", "Bueno, {n} queda sin lugar por ahora."],
};

export interface Version {
  slug: string;
  nombre: string;
  idea: string;
  suma: string[];
}

export const versiones: Version[] = [
  {
    slug: "simple",
    nombre: "1 · Simple",
    idea: "Lo justo: filas S a D y las 45 fichas. Arrastrás o tocás una ficha y después la fila.",
    suma: ["Arrastrar y soltar (también en el celular)", "Tocar ficha y fila", "Atajos de teclado", "Se guarda en el navegador"],
  },
  {
    slug: "configurable",
    nombre: "2 · Configurable",
    idea: "La simple, más filas editables y filtros para armar la lista que quieras.",
    suma: ["Filas con nombre y color propios", "Agregar, mover y borrar filas", "Filtros por tipo, expansión y armadura", "Buscador", "Nombres y expansión en las fichas"],
  },
  {
    slug: "compartir",
    nombre: "3 · Para compartir",
    idea: "Con el look de la miniatura de YouTube, plantillas temáticas y salida como imagen o enlace.",
    suma: ["Título TIER LIST con etiqueta", "Plantillas: Balance, Para empezar, Diversión, Fashion Wars…", "Descargar o copiar como imagen", "Enlace que guarda la lista"],
  },
  {
    slug: "directo",
    nombre: "4 · La del directo",
    idea: "Pensada para usar en stream: escenario 16:9, EDM opina de cada ficha y notas para explicar el porqué.",
    suma: ["Escenario 16:9 a pantalla completa", "EDM reacciona a cada ficha", "Notas por ficha", "Lugar para la votación del chat"],
  },
];
