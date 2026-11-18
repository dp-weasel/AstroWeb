## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Este proyecto

- Todos los textos editables están en YAML en `src/content/` (guía: `src/content/LEEME.md`).
  Cada archivo es una colección con su esquema en `src/content.config.ts` y se lee con
  `leer("<nombre>")` de `src/lib/contenido.ts`. No escribir textos de contenido en los componentes.
- Los mensajes de GW2 son un YAML por pestaña en `src/content/gw2/mensajes/`. Sus claves son
  estables: el navegador guarda los cambios de cada persona por clave.
- Un componente por archivo en la subcarpeta que corresponda de `src/components/` (layout, marca,
  portada, mensajes, tierlist, ui); la lógica del navegador va en `src/scripts/<área>/`.
- Las poses de EDM se nombran sin `.png` y se listan en `src/lib/edm.ts`.
- Los colores salen de las variables de `src/styles/tokens.css` (temas claro y oscuro).
- Las imágenes van en `src/assets/` y se usan con `<Image>` de `astro:assets`; `public/` solo
  para archivos con URL fija (íconos, `og.png`). Ver `scripts/brand/`.
- El sitio vive en la raíz del dominio en Cloudflare, pero también se compila bajo una subcarpeta
  (`BASE_PATH=/AstroWeb/`, servidor local que imita GitHub Pages). Los enlaces internos y los
  archivos de `public/` pasan siempre por `ruta("/gw2/mensajes/")` de `src/lib/rutas.ts`.
  En los YAML se escriben como `/gw2/mensajes/`.
- Antes de hacer merge: `npm run check && npm run build`.
