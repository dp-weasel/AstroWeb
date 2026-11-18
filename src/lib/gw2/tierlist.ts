// Lógica de la tierlist de GW2 (/gw2/tierlist/): filas por defecto y reparto de
// las reacciones de EDM. Las plantillas y las frases son contenido editable
// (src/content/gw2/tierlist-*.yaml). Sin dependencias de Astro: lo usa también
// el navegador (src/scripts/tierlist/).
import type { PoseEdm } from "../edm";

export interface Tier {
  id: string;
  nombre: string;
  color: string;
}

/** Filas al restablecer, con los colores de la miniatura de tierlist de YouTube. */
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
/** "banco": la ficha volvió al banco. "duda": se soltó fuera de toda fila y volvió a su lugar. */
export type Nivel = (typeof niveles)[number] | "banco" | "duda";

export type ReaccionesEdm = Record<Nivel, ReaccionEdm>;

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
