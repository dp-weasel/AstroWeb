// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// El sitio se publica en la raíz del dominio en Cloudflare.
// SITE_URL (p. ej. https://weasel-shiro.example.com) es necesaria para el sitemap
// y las URLs absolutas de la vista previa al compartir (og:image, og:url).
// En Cloudflare se define como variable de build; en local no hace falta.
const site = process.env.SITE_URL || undefined;
// BASE_PATH: subcarpeta donde se publica (p. ej. /AstroWeb/ en el servidor local,
// que imita GitHub Pages). En Cloudflare no se define y el sitio va en la raíz.
const base = process.env.BASE_PATH || "/";
if (!site) console.warn("[astro.config] SITE_URL no está definida: se omiten sitemap y URLs absolutas.");

export default defineConfig({
  site,
  base,
  integrations: site ? [sitemap()] : [],
});
