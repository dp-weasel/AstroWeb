// Lee un archivo de src/content/ (cada uno es una colección; ver src/content.config.ts).
//   const reglas = await leer("reglas");
import { getEntry, type CollectionEntry, type CollectionKey } from "astro:content";

/** Todas las colecciones menos los mensajes de GW2, que son varios archivos (ver lib/gw2/mensajes.ts). */
export type Archivo = Exclude<CollectionKey, "mensajes">;

export async function leer<C extends Archivo>(nombre: C): Promise<CollectionEntry<C>["data"]> {
  const entrada = await getEntry(nombre, nombre as never);
  if (!entrada) throw new Error(`No se encontró el archivo de contenido «${nombre}.yaml» en src/content/.`);
  return (entrada as CollectionEntry<C>).data;
}

/** Convierte **así** en negrita. El resto del texto se escapa, así que no admite HTML. */
export function conNegritas(texto: string): string {
  const seguro = texto.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  return seguro.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
