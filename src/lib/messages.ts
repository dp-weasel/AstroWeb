// Carga y valida src/data/messages.json en tiempo de compilación.
// Si el archivo no cumple el esquema, `astro build` falla con un error claro
// en lugar de publicar una página rota.
import { z } from "astro/zod";
import raw from "../data/messages.json";

/** Límite de caracteres de un mensaje en el chat de Guild Wars 2. */
export const GW2_CHAT_LIMIT = 199;

const schema = z
  .record(
    z.string().trim().min(1, "El nombre de la pestaña no puede estar vacío"),
    z.array(z.string({ error: "Cada mensaje debe ser un texto entre comillas" }).trim().min(1, "Hay un mensaje vacío"), {
      error: "Cada pestaña debe ser una lista de mensajes: [\"...\", \"...\"]",
    }),
  )
  .refine((tabs) => Object.keys(tabs).length > 0, "messages.json no tiene pestañas");

export interface Category {
  /** Identificador estable para la URL (#fractales) y los ids del DOM. */
  id: string;
  name: string;
  messages: string[];
}

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function load(): Category[] {
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const detail = parsed.error.issues
      .map((i) => `  - ${i.path.join(" › ") || "(raíz)"}: ${i.message}`)
      .join("\n");
    throw new Error(`messages.json no es válido:\n${detail}`);
  }

  const used = new Set<string>();
  return Object.entries(parsed.data).map(([name, messages]) => {
    let id = slugify(name) || "pestana";
    while (used.has(id)) id += "-";
    used.add(id);

    for (const m of messages) {
      if (m.length > GW2_CHAT_LIMIT) {
        console.warn(
          `[messages.json] «${name}»: un mensaje tiene ${m.length} caracteres ` +
            `(límite del chat de GW2: ${GW2_CHAT_LIMIT}): "${m.slice(0, 40)}…"`,
        );
      }
    }
    return { id, name, messages };
  });
}

export const categories: Category[] = load();
