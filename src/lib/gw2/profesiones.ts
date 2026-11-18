// Profesiones y especializaciones de élite de Guild Wars 2 para la tierlist.
// Los íconos salen de RecursosCC/GW2/Profesiones (ver scripts/gw2/importar-profesiones.mjs).
// Las profesiones van en castellano (como en el cliente en español) y las élites
// con su nombre en inglés, que es como se las nombra en el chat y en las guías.
import type { ImageMetadata } from "astro";

const iconos = import.meta.glob<{ default: ImageMetadata }>("../../assets/gw2/profesiones/*.png", { eager: true });
const icono = (slug: string) => {
  const img = iconos[`../../assets/gw2/profesiones/${slug}.png`];
  if (!img) throw new Error(`Falta el ícono de ${slug} en src/assets/gw2/profesiones/`);
  return img.default;
};

export type Armadura = "pesada" | "media" | "ligera";

/** Expansión en la que salió cada especialización. "base" es la profesión sin élite. */
export const expansiones = {
  base: { nombre: "Profesiones base (core)", corto: "Core" },
  hot: { nombre: "Heart of Thorns", corto: "HoT" },
  pof: { nombre: "Path of Fire", corto: "PoF" },
  eod: { nombre: "End of Dragons", corto: "EoD" },
  voe: { nombre: "Visions of Eternity", corto: "VoE" },
} as const;
export type Expansion = keyof typeof expansiones;

export interface Especializacion {
  /** Clave estable: se guarda en el navegador y en los enlaces compartidos. */
  id: string;
  nombre: string;
  profesion: string;
  expansion: Expansion;
  img: ImageMetadata;
}

export interface Profesion {
  id: string;
  nombre: string;
  armadura: Armadura;
  /** Color oficial de la profesión (el de la wiki y la interfaz del juego). */
  color: string;
  elites: [hot: string, pof: string, eod: string, voe: string];
}

export const profesiones: Profesion[] = [
  { id: "guardian", nombre: "Guardián", armadura: "pesada", color: "#72c1d9", elites: ["Dragonhunter", "Firebrand", "Willbender", "Luminary"] },
  { id: "warrior", nombre: "Guerrero", armadura: "pesada", color: "#ffd166", elites: ["Berserker", "Spellbreaker", "Bladesworn", "Paragon"] },
  { id: "revenant", nombre: "Retornado", armadura: "pesada", color: "#d16e5a", elites: ["Herald", "Renegade", "Vindicator", "Conduit"] },
  { id: "engineer", nombre: "Ingeniero", armadura: "media", color: "#d09c59", elites: ["Scrapper", "Holosmith", "Mechanist", "Amalgam"] },
  { id: "ranger", nombre: "Guardabosques", armadura: "media", color: "#8cdc82", elites: ["Druid", "Soulbeast", "Untamed", "Galeshot"] },
  { id: "thief", nombre: "Ladrón", armadura: "media", color: "#c08f95", elites: ["Daredevil", "Deadeye", "Specter", "Antiquary"] },
  { id: "elementalist", nombre: "Elementalista", armadura: "ligera", color: "#f68a87", elites: ["Tempest", "Weaver", "Catalyst", "Evoker"] },
  { id: "mesmer", nombre: "Hipnotizador", armadura: "ligera", color: "#b679d5", elites: ["Chronomancer", "Mirage", "Virtuoso", "Troubadour"] },
  { id: "necromancer", nombre: "Nigromante", armadura: "ligera", color: "#52a76f", elites: ["Reaper", "Scourge", "Harbinger", "Ritualist"] },
];

const ordenElites: Expansion[] = ["hot", "pof", "eod", "voe"];

/** Las 45 fichas: cada profesión base seguida de sus cuatro élites. */
export const especializaciones: Especializacion[] = profesiones.flatMap((p) => [
  { id: p.id, nombre: p.nombre, profesion: p.id, expansion: "base" as Expansion, img: icono(p.id) },
  ...p.elites.map((e, i) => ({
    id: e.toLowerCase(),
    nombre: e,
    profesion: p.id,
    expansion: ordenElites[i],
    img: icono(e.toLowerCase()),
  })),
]);
