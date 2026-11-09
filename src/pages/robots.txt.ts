// robots.txt generado al compilar, para que apunte al sitemap del dominio real.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const lines = ["User-agent: *", "Allow: /"];
  if (site) {
    const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
    lines.push("", `Sitemap: ${new URL(`${base}sitemap-index.xml`, site).href}`);
  }
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
