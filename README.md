# Weasel Shiro · Mensajes de GW2

Sitio estático hecho con [Astro](https://astro.build) con mensajes de Guild Wars 2 que se
copian con un clic para pegarlos en el chat del juego. Se publica en Cloudflare (rama de
producción: `master`).

## Editar los mensajes

Todo el contenido está en [`src/data/messages.json`](src/data/messages.json). **Cada clave es una
pestaña** y su valor es la lista de mensajes. El orden de las claves es el orden de las pestañas.

```json
{
  "Mundo abierto": ["mensaje 1", "mensaje 2"],
  "Misiones de clan": ["Una clave nueva crea una pestaña nueva"]
}
```

Al hacer push a `master`, Cloudflare valida el JSON, compila y publica. Si el JSON tiene
un error (sintaxis, mensaje vacío, valor que no es una lista), la compilación falla y la versión
publicada no cambia. Los mensajes de más de 199 caracteres (límite del chat de GW2) generan un aviso.

## Estructura

```text
src/
├── assets/brand/             Imágenes de la marca (logo y variantes); Astro las optimiza al compilar
├── data/messages.json        Contenido: pestañas y mensajes
├── lib/messages.ts           Esquema y validación del JSON (en tiempo de compilación)
├── layouts/BaseLayout.astro  Documento base: <head>, fuentes, tema sin parpadeo
├── components/               Una pieza de la interfaz por archivo, con sus estilos
│   ├── Hero.astro              Encabezado con el ícono y el título
│   ├── Logo.astro              Logo (armiño con auriculares) en el círculo naranja
│   ├── ThemeToggle.astro       Botón de modo claro/oscuro
│   ├── SearchBox.astro         Buscador
│   ├── Tabs.astro              Pestañas y paneles
│   ├── MessageCard.astro       Mensaje copiable
│   └── Toast.astro             Aviso de "copiado"
├── scripts/                  Lógica del navegador, un módulo por funcionalidad
│   ├── theme.ts  tabs.ts  search.ts  clipboard.ts  toast.ts
│   └── text.ts                 Normalización y resaltado (compartido con el build)
├── styles/                   tokens.css (paleta y temas) y global.css
└── pages/
    ├── index.astro             Compone la página a partir de los componentes
    └── robots.txt.ts           robots.txt con la URL del sitemap
public/                       Archivos servidos tal cual: favicon.ico, favicon-96.png,
                              apple-touch-icon.png y og.png (vista previa al compartir)
scripts/brand/                Generadores de los íconos y de og.png a partir del logo
```

### Imágenes

- Las imágenes que usa la página van en `src/assets/` y se importan con `<Image>` de
  `astro:assets`: Astro las convierte a WebP en varios tamaños.
- `public/` es solo para archivos que necesitan una URL fija (favicon, `og.png`).
- Si cambia el logo: `npm run brand:icons` regenera los íconos y `npm run brand:og` regenera
  `og.png` desde la plantilla `scripts/brand/og-card.html` (usa el Chrome del sistema).

### Cómo agregar una funcionalidad

1. Crear un componente en `src/components/` con su HTML y su `<style>` (los estilos quedan
   aislados en el componente).
2. Si necesita interactividad, escribir la lógica en `src/scripts/<funcionalidad>.ts` e
   importarla desde un `<script>` del componente.
3. Usarlo en `src/pages/index.astro` (o crear otra página en `src/pages/`).
4. Usar siempre las variables de `src/styles/tokens.css` para los colores, así funciona en ambos temas.

## Comandos

| Comando           | Acción                                                  |
| :---------------- | :------------------------------------------------------ |
| `npm install`     | Instala las dependencias                                |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`       |
| `npm run check`   | Verifica tipos y plantillas                             |
| `npm run build`   | Compila el sitio en `dist/`                             |
| `npm run preview` | Sirve `dist/` para revisarlo antes de publicar          |
| `npm run brand:icons` | Regenera los íconos de `public/` desde el logo      |
| `npm run brand:og` | Regenera `public/og.png` (vista previa al compartir)   |

La URL pública y la ruta base se configuran por entorno (`SITE_URL`, `BASE_PATH`). En
Cloudflare hay que definir `SITE_URL` (p. ej. `https://tu-dominio`) en las variables de build:
sin ella no se generan el sitemap ni las URLs absolutas de la vista previa al compartir.
En local no hace falta definirlas.
