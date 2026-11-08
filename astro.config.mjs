// @ts-check
import { defineConfig } from "astro/config";

// La URL pública y la ruta base se configuran por entorno para poder publicar
// en GitHub Pages (https://dp-weasel.github.io/AstroWeb/) o en la raíz de
// otro dominio (p. ej. Cloudflare) sin tocar el código.
//   SITE_URL=https://dp-weasel.github.io BASE_PATH=/AstroWeb npm run build
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || "/",
});
