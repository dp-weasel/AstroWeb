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

- La bio y las redes están en `src/data/profile.ts`. Los mensajes de GW2 están en
  `src/data/messages.json` y se validan en `src/lib/messages.ts`.
- Un componente por archivo en `src/components/`; la lógica del navegador va en `src/scripts/`.
- Los colores salen de las variables de `src/styles/tokens.css` (temas claro y oscuro).
- Las imágenes van en `src/assets/` y se usan con `<Image>` de `astro:assets`; `public/` solo
  para archivos con URL fija (íconos, `og.png`). Ver `scripts/brand/`.
- El sitio vive en la raíz del dominio (Cloudflare): los enlaces internos son absolutos (`/gw2/mensajes/`).
- Antes de hacer merge: `npm run check && npm run build`.
