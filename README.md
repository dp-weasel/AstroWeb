# Weasel Shiro · Mensajes de GW2

Sitio estático hecho con [Astro](https://astro.build) con mensajes de Guild Wars 2 que se
copian con un clic para pegarlos en el chat del juego. Se publica en GitHub Pages.

## Editar los mensajes

Todo el contenido está en [`src/data/messages.json`](src/data/messages.json). **Cada clave es una
pestaña** y su valor es la lista de mensajes. El orden de las claves es el orden de las pestañas.

```json
{
  "Mundo abierto": ["mensaje 1", "mensaje 2"],
  "Misiones de clan": ["Una clave nueva crea una pestaña nueva"]
}
```

Al hacer push a `master`, GitHub Actions valida el JSON, compila y publica. Si el JSON tiene
un error (sintaxis, mensaje vacío, valor que no es una lista), la compilación falla y la versión
publicada no cambia. Los mensajes de más de 199 caracteres (límite del chat de GW2) generan un aviso.

## Estructura

```text
src/
├── data/messages.json        Contenido: pestañas y mensajes
├── lib/messages.ts           Esquema y validación del JSON (en tiempo de compilación)
├── layouts/BaseLayout.astro  Documento base: <head>, fuentes, tema sin parpadeo
├── components/               Una pieza de la interfaz por archivo, con sus estilos
│   ├── Hero.astro              Encabezado con el ícono y el título
│   ├── StoatBadge.astro        Ícono del armiño hecho con CSS
│   ├── ThemeToggle.astro       Botón de modo claro/oscuro
│   ├── SearchBox.astro         Buscador
│   ├── Tabs.astro              Pestañas y paneles
│   ├── MessageCard.astro       Mensaje copiable
│   └── Toast.astro             Aviso de "copiado"
├── scripts/                  Lógica del navegador, un módulo por funcionalidad
│   ├── theme.ts  tabs.ts  search.ts  clipboard.ts  toast.ts
│   └── text.ts                 Normalización y resaltado (compartido con el build)
├── styles/                   tokens.css (paleta y temas) y global.css
└── pages/index.astro         Compone la página a partir de los componentes
```

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

La URL pública y la ruta base se configuran por entorno (`SITE_URL`, `BASE_PATH`); en GitHub
Actions se toman de la configuración de Pages. En local no hace falta definirlas.
