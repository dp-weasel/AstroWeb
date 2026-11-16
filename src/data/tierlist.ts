// Configuración de la tierlist de GW2 (/gw2/tierlist/): filas, plantillas y
// frases de EDM. Sin dependencias de Astro: lo usa también
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

/** Poses de EDM (archivos de src/assets/brand/edm/, sin el .png). */
export type PoseEdm =
  | "saludando"
  | "cheer"
  | "feliz-apuntando-arriba"
  | "apuntando"
  | "shrug"
  | "sorprendida-mirando-a-la-izquierda"
  | "triste"
  | "triste-mirando-al-suelo"
  | "hiss";

export interface ReaccionEdm {
  /**
   * Se elige una al azar, pero ninguna sale más de dos veces seguidas si hay otra
   * para elegir. `espejo` la da vuelta para que mire hacia la tierlist.
   */
  poses: { pose: PoseEdm; espejo?: boolean }[];
  /** Se elige una al azar, con la misma regla que las poses. {n} es la especialización y {t} la fila. */
  frases: string[];
}

/** Niveles de reacción, de la mejor fila a la peor, más el banco. */
export const niveles = ["s", "a", "b", "c", "d"] as const;
export type Nivel = (typeof niveles)[number] | "banco";

/**
 * Qué nivel de reacción le toca a la fila i de n. Con cinco filas es uno por fila.
 * Con otra cantidad se reparten de forma pareja: la primera fila siempre es S,
 * la última siempre es D y las del medio caen en el nivel más cercano.
 *   4 filas → S, A, C, D        6 filas → S, A, B, C, C, D
 *   3 filas → S, B, D           7 filas → S, A, A, B, C, C, D
 */
export function nivelDeFila(i: number, n: number): Nivel {
  if (n <= 1) return "s";
  return niveles[Math.round((i * (niveles.length - 1)) / (n - 1))];
}

/** Lo que hace y dice EDM al ubicar una ficha (los números son los de RecursosCC/edm-borde). */
export const reaccionesEdm: Record<Nivel, ReaccionEdm> = {
  s: {
    poses: [{ pose: "cheer" }, { pose: "feliz-apuntando-arriba" }], // 010 y 009
    frases: ["¿{n} en {t}? Por fin una decisión con sentido.", "{n} arriba de todo. Respeto.", "¡Eso! {n} se lo merece."],
  },
  a: {
    poses: [{ pose: "shrug" }], // 015
    frases: [
      "A {n} le faltó farmear más aura.",
      "Casi S. {n} se quedó sin aura en la última curva.",
      "{n} en {t}: buena, pero le falta un poquito de aura.",
    ],
  },
  b: {
    poses: [{ pose: "shrug" }, { pose: "sorprendida-mirando-a-la-izquierda", espejo: true }], // 015 y 011
    frases: ["{n} en {t}… bueno, no voy a discutir. Hoy.", "Mmm, {n} en {t}. Aceptable.", "¿{t}? Le pondría una más. O una menos. Ya fue."],
  },
  c: {
    poses: [{ pose: "shrug" }, { pose: "triste" }, { pose: "triste-mirando-al-suelo" }, { pose: "apuntando" }], // 015, 008, 014 y 013
    frases: ["¿{n} en {t}? Bueno… tiene sus días.", "Pobre {n}, merecía un poquito más.", "{n} en {t}. No lloro, me entró yerba en el ojo."],
  },
  d: {
    poses: [{ pose: "hiss" }, { pose: "triste" }, { pose: "triste-mirando-al-suelo" }, { pose: "apuntando" }], // 005, 008, 014 y 013
    frases: ["¿¡{n} en {t}!? Quiero hablar con el gerente.", "Pobre {n}. ¿Qué te hizo?", "{n} en {t}. El chat no va a estar de acuerdo."],
  },
  banco: {
    poses: [{ pose: "triste" }],
    frases: ["¿Te arrepentiste de {n}? Pasa.", "{n} vuelve al banco. Pensalo bien.", "Bueno, {n} queda sin lugar por ahora."],
  },
};
