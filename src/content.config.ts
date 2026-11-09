// Colecciones de contenido. Cada archivo YAML de src/content/mensajes/ es una
// pestaña de /gw2/mensajes/: agregar un archivo agrega una pestaña.
// Si un archivo no cumple el esquema, `astro build` falla con un error claro
// en lugar de publicar una página rota.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const mensajes = defineCollection({
  loader: glob({ pattern: "*.{yaml,yml}", base: "./src/content/mensajes" }),
  schema: z.object({
    nombre: z.string().trim().min(1, "La pestaña necesita un nombre"),
    orden: z.number().int().optional(),
    mensajes: z.record(
      z.string().regex(/^[a-z][a-z0-9-]*$/, "La clave de cada mensaje va en minúsculas, sin espacios ni tildes (p. ej. tren-frostgorge)"),
      z.string({ error: "Cada mensaje debe ser un texto entre comillas" }).trim().min(1, "Hay un mensaje vacío"),
    ),
  }),
});

export const collections = { mensajes };
