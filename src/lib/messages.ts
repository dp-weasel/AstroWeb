// Lee las pestañas de mensajes de la colección `mensajes` (ver src/content.config.ts).
import { getCollection } from "astro:content";
import { CUSTOM_TAB, GW2_CHAT_LIMIT } from "./gw2";

export interface Message {
  /** "<pestaña>/<clave>": identificador fijo con el que el navegador guarda los cambios de cada persona. */
  key: string;
  text: string;
}

export interface Category {
  /** Nombre del archivo sin extensión: se usa en la URL (#fractales) y en los ids del DOM. */
  id: string;
  name: string;
  messages: Message[];
}

/** Pestañas ordenadas por `orden` y, a igualdad, por nombre. */
export async function getCategories(): Promise<Category[]> {
  const entries = await getCollection("mensajes");

  if (entries.some((e) => e.id === CUSTOM_TAB.id)) {
    throw new Error(`src/content/mensajes/${CUSTOM_TAB.id}.yaml: ese nombre está reservado para la pestaña de mensajes propios.`);
  }

  entries.sort(
    (a, b) =>
      (a.data.orden ?? Infinity) - (b.data.orden ?? Infinity) || a.data.nombre.localeCompare(b.data.nombre, "es"),
  );

  return entries.map(({ id, data }) => {
    const messages = Object.entries(data.mensajes).map(([key, text]) => {
      if (text.length > GW2_CHAT_LIMIT) {
        console.warn(
          `[mensajes/${id}] «${key}» tiene ${text.length} caracteres ` +
            `(límite del chat de GW2: ${GW2_CHAT_LIMIT}): "${text.slice(0, 40)}…"`,
        );
      }
      return { key: `${id}/${key}`, text };
    });
    return { id, name: data.nombre, messages };
  });
}
