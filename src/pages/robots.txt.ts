// robots.txt generado al compilar, para que apunte al sitemap del dominio real.
import type { APIRoute } from "astro";
import { ruta } from "../lib/rutas";

export const GET: APIRoute = ({ site }) => {
  const lines = ["User-agent: *", "Allow: /"];
  if (site) {
    lines.push("", `Sitemap: ${new URL(ruta("/sitemap-index.xml"), site).href}`);
  }
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
