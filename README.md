# Weasel Shiro

Página personal de Weasel Shiro como creador de contenido, hecha con [Astro](https://astro.build).
Se publica en Cloudflare: cada push a `master` (rama de producción) compila y publica.

| Ruta              | Página                                                         |
| :---------------- | :------------------------------------------------------------- |
| `/`               | Portada: presentación, redes, cómo es el canal, herramientas y preguntas frecuentes |
| `/gw2/mensajes/`  | Mensajes de Guild Wars 2 que se copian con un clic             |
| `/gw2/tierlist/`  | Tierlist de profesiones de GW2, con EDM opinando              |

## Editar los textos

Todo el contenido está en archivos YAML dentro de [`src/content/`](src/content/): uno por
sección de la portada, el perfil y las redes, el menú, y los textos de las páginas de GW2.
La guía [`src/content/LEEME.md`](src/content/LEEME.md) dice qué archivo cambia qué y cómo
escribirlos. Al compilar se valida cada archivo contra su esquema (`src/content.config.ts`).

## Editar los mensajes de GW2

Cada archivo de [`src/content/gw2/mensajes/`](src/content/gw2/mensajes/) es **una pestaña**: agregar un
archivo `.yaml` agrega una pestaña y borrarlo la quita. El nombre del archivo es el que aparece en
la URL (`/gw2/mensajes/#fractales`).

```yaml
nombre: Fractales          # Texto de la pestaña
orden: 2                   # Posición (opcional; sin él, van al final por nombre)
mensajes:
  lfg-t4: "LFG T4 diarios + recomendados, busco healer…"
  jefe-final: "En el jefe final: stackeen en la marca…"
```

- La **clave** de cada mensaje (`lfg-t4`) va en minúsculas, sin espacios ni tildes, y no debe
  cambiar si solo corriges el texto: es lo que permite conservar los cambios que cada persona hizo
  en su navegador. Si cambias la clave, para el navegador es un mensaje nuevo.
- El **texto** va entre comillas dobles (así no fallan los `:` del medio). Para usar comillas
  dentro del texto, escríbelas como `\"`.
- `personalizado` es un nombre reservado: esa pestaña la llena cada persona en su navegador.

Al hacer push a `master`, Cloudflare valida los archivos, compila y publica. Si un archivo tiene un
error, la compilación falla con un mensaje claro y la versión publicada no cambia. Los mensajes de
más de 199 caracteres (límite del chat de GW2) generan un aviso. Con la extensión de YAML de VS Code
se autocompletan los campos y se marcan los errores al escribir (el esquema lo genera
`npm run dev`/`build` en `.astro/`).

### Cambios de cada persona (en su navegador)

En la página, cada persona puede **editar**, **eliminar** (con «Deshacer» y «Restaurar
eliminados») y **agregar** mensajes en cualquier pestaña, y tener los suyos en **Personalizado**.
El editor no deja guardar textos vacíos ni de más de 199 caracteres.

Se guarda en `localStorage` (clave `gw2-mensajes:v1`) solo la diferencia con lo publicado:
textos editados, claves eliminadas y mensajes agregados. Por eso los mensajes nuevos que publiques
le aparecen a todo el mundo, y si una persona editó un mensaje, conserva su versión aunque cambies
el original. Ver `src/scripts/mensajes/messages-store.ts` y `src/scripts/mensajes/messages-editor.ts`.

## Estructura

```text
src/
├── content/                  TEXTOS EDITABLES (YAML). Guía: src/content/LEEME.md
│   ├── sitio/                  perfil.yaml (nombre y redes), menu.yaml
│   ├── portada/                Un archivo por sección de la portada
│   └── gw2/                    Textos de las páginas de GW2, plantillas y frases de EDM
│       └── mensajes/*.yaml       Pestañas y mensajes de GW2 (un archivo por pestaña)
├── content.config.ts         Esquema de cada YAML (se valida al compilar)
├── assets/                   Imágenes que Astro optimiza al compilar
│   ├── brand/                  Logo, Armiño (SVG), poses de EDM, miniaturas de videos
│   └── gw2/profesiones/        Íconos de la tierlist
├── lib/                      Lógica compartida
│   ├── contenido.ts            leer("<archivo>"): lee un YAML de src/content/
│   ├── perfil.ts  redes.ts     Perfil con el ícono de cada red
│   ├── edm.ts  imagenes.ts     Poses de EDM y búsqueda de imágenes por nombre
│   └── gw2/                    Límite del chat, pestañas, profesiones y lógica de la tierlist
├── layouts/BaseLayout.astro  Documento base: <head>, cabecera, pie, tema sin parpadeo
├── components/               Una pieza de la interfaz por archivo, con sus estilos
│   ├── layout/                 Cabecera, pie, redes y botón de tema
│   ├── marca/                  Armiño animado, bocadillos, botones de redes, logo
│   ├── portada/                Secciones de la portada y el globo que las presenta
│   ├── mensajes/               Buscador, pestañas, mensaje copiable y editor
│   ├── tierlist/               La tierlist
│   └── ui/                     Piezas genéricas: avisos (Toast), etiqueta EJEMPLO, Hero
├── scripts/                  Lógica del navegador
│   ├── comun/                  Tema, portapapeles, avisos, normalización de texto
│   ├── mensajes/               Pestañas, búsqueda y edición de mensajes (localStorage)
│   └── tierlist/               Estado, arrastre y exportación de la tierlist
├── styles/                   tokens.css (paleta y temas), global.css, marca.css, mensajes.css
└── pages/                    Una ruta por archivo
    ├── index.astro             Portada
    ├── gw2/mensajes/index.astro  Mensajes de GW2
    ├── gw2/tierlist.astro      Tierlist de GW2
    └── robots.txt.ts           robots.txt con la URL del sitemap
public/                       Archivos servidos tal cual: favicon.ico, favicon-96.png,
                              apple-touch-icon.png y og.png (vista previa al compartir)
scripts/brand/                Generadores de los íconos y de og.png a partir del logo
scripts/gw2/                  Importa los íconos de profesiones desde RecursosCC
```

### Imágenes

- Las imágenes que usa la página van en `src/assets/` y se importan con `<Image>` de
  `astro:assets`: Astro las convierte a WebP en varios tamaños.
- `public/` es solo para archivos que necesitan una URL fija (favicon, `og.png`).
- Si cambia el logo: `npm run brand:icons` regenera los íconos y `npm run brand:og` regenera
  `og.png` desde la plantilla `scripts/brand/og-card.html` (usa el Chrome del sistema).

### Cómo agregar una funcionalidad

1. Crear un componente en la subcarpeta que corresponda de `src/components/` con su HTML y su
   `<style>` (los estilos quedan aislados en el componente).
2. Los textos no van en el componente: van en un YAML de `src/content/`, con su esquema en
   `src/content.config.ts` (`archivo("<carpeta>/<nombre>.yaml", z.object(…))`), y se leen con
   `await leer("<nombre>")`. Sumarlo a la tabla de `src/content/LEEME.md`.
3. Si necesita interactividad, escribir la lógica en `src/scripts/<funcionalidad>/` e
   importarla desde un `<script>` del componente.
4. Usarlo en una página de `src/pages/`. Para una página nueva, crear el archivo ahí (la ruta
   sale de la ruta del archivo) y, si va en el menú, agregarla a `src/content/sitio/menu.yaml`.
5. Usar siempre las variables de `src/styles/tokens.css` para los colores, así funciona en ambos temas.

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

`BASE_PATH` (opcional) compila el sitio en una subcarpeta, p. ej. `BASE_PATH=/AstroWeb/ npm run build`
para el servidor local (`http://fedora.lan/AstroWeb/`). Sin ella, el sitio va en la raíz. Por eso
los enlaces internos usan `ruta()` de `src/lib/rutas.ts`.
