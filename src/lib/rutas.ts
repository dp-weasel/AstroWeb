// Ruta base del sitio. En Cloudflare es la raíz ("/"); en el servidor local se
// compila con BASE_PATH=/AstroWeb/ (ver astro.config.mjs).
//   ruta("/gw2/mensajes/") → "/gw2/mensajes/" o "/AstroWeb/gw2/mensajes/"
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const ruta = (p: string) => (/^[a-z]+:/i.test(p) ? p : `${base}${p.startsWith("/") ? p : `/${p}`}`);
