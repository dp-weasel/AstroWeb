# Weasel Shiro

Página personal de Weasel Shiro como creador de contenido, hecha con [Astro](https://astro.build).
Se publica en Cloudflare: cada push a `master` (rama de producción) compila y publica.

| Ruta              | Página                                                         |
| :---------------- | :------------------------------------------------------------- |
| `/`               | Portada: bio y enlaces a Twitch, YouTube y X                   |
| `/gw2/mensajes/`  | Mensajes de Guild Wars 2 que se copian con un clic             |

## Editar la bio y las redes

Están en [`src/data/profile.ts`](src/data/profile.ts): nombre, frase, párrafos de la bio y la
lista de redes. La primera red de la lista es el botón destacado de la portada. Los íconos salen
del paquete `simple-icons`.

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
├── data/
│   ├── profile.ts              Bio y redes sociales
│   └── messages.json           Pestañas y mensajes de GW2
├── lib/messages.ts           Esquema y validación del JSON (en tiempo de compilación)
├── layouts/BaseLayout.astro  Documento base: <head>, cabecera, pie, tema sin parpadeo
├── components/               Una pieza de la interfaz por archivo, con sus estilos
│   ├── SiteHeader.astro        Cabecera común: marca, navegación y tema
│   ├── SiteFooter.astro        Pie común con las redes
│   ├── Hero.astro              Título de cada página (con logo, o compacto)
│   ├── Logo.astro              Logo (armiño con auriculares) en el círculo naranja
│   ├── SocialLinks.astro       Enlaces a redes (botones o solo íconos)
│   ├── ThemeToggle.astro       Botón de modo claro/oscuro
│   ├── SearchBox.astro         Buscador
│   ├── Tabs.astro              Pestañas y paneles
│   ├── MessageCard.astro       Mensaje copiable
│   └── Toast.astro             Aviso de "copiado"
├── scripts/                  Lógica del navegador, un módulo por funcionalidad
│   ├── theme.ts  tabs.ts  search.ts  clipboard.ts  toast.ts
│   └── text.ts                 Normalización y resaltado (compartido con el build)
├── styles/                   tokens.css (paleta y temas) y global.css
└── pages/                    Una ruta por archivo
    ├── index.astro             Portada
    ├── gw2/mensajes.astro      Mensajes de GW2
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
3. Usarlo en una página de `src/pages/`. Para una página nueva, crear el archivo ahí (la ruta
   sale de la ruta del archivo) y, si va en el menú, agregarla a `links` en `SiteHeader.astro`.
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

En Cloudflare hay que definir la variable de build `SITE_URL` con la URL pública (p. ej.
`https://tu-dominio`): sin ella no se generan el sitemap ni las URLs absolutas de la vista previa
al compartir. En local no hace falta.
