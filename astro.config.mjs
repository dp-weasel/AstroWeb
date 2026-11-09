// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// La URL pública y la ruta base se configuran por entorno para poder publicar
// en GitHub Pages (https://dp-weasel.github.io/AstroWeb/) o en la raíz de
// otro dominio (p. ej. Cloudflare) sin tocar el código.
//   SITE_URL=https://dp-weasel.github.io BASE_PATH=/AstroWeb npm run build
// SITE_URL es necesaria para el sitemap y las URLs absolutas de la vista previa
// al compartir (og:image, og:url). En Cloudflare se define como variable de build.
const site = process.env.SITE_URL || undefined;
if (!site) console.warn("[astro.config] SITE_URL no está definida: se omiten sitemap y URLs absolutas.");

export default defineConfig({
  site,
  base: process.env.BASE_PATH || "/",
  integrations: site ? [sitemap()] : [],
});
