# Contenido editable

Todos los textos de la web están en esta carpeta, en archivos YAML. Para cambiar algo, editá
el archivo, guardá y listo: con `npm run dev` se ve al instante, y al subir a `master` se publica.

| Qué querés cambiar                              | Archivo                              |
| :---------------------------------------------- | :----------------------------------- |
| Nombre y redes sociales (y botones del banner)  | `sitio/perfil.yaml`                  |
| Enlaces del menú de arriba                      | `sitio/menu.yaml`                    |
| **Portada**                                     |                                      |
| Banner: línea de arriba, nombre, presentación   | `portada/banner.yaml`                |
| Franja naranja con los números                  | `portada/franja.yaml`                |
| Cómo es el canal (charla Armiño–EDM)            | `portada/como-es-el-canal.yaml`      |
| Te presento al equipo                           | `portada/equipo.yaml`                |
| Cómo empezó todo                                | `portada/historia.yaml`              |
| Los stickers de EDM                             | `portada/stickers.yaml`              |
| Escribí y pasa algo (comandos del chat)         | `portada/comandos.yaml`              |
| Camino a Afiliado (metas)                       | `portada/metas.yaml`                 |
| Lo último en YouTube                            | `portada/videos.yaml`                |
| Reglas de la casa                               | `portada/reglas.yaml`                |
| Herramientas                                    | `portada/herramientas.yaml`          |
| ¿Querés dar una mano?                           | `portada/apoyar.yaml`                |
| Preguntas frecuentes                            | `portada/preguntas.yaml`             |
| Despedida (EDM y el Armiño al final)            | `portada/despedida.yaml`             |
| Horario de los directos                         | `portada/horario.yaml`               |
| **Guild Wars 2**                                |                                      |
| Mensajes de GW2 (un archivo por pestaña)        | `gw2/mensajes/*.yaml`                |
| Textos de la página de mensajes y frases de EDM | `gw2/pagina-mensajes.yaml`           |
| Textos de la tierlist                           | `gw2/pagina-tierlist.yaml`           |
| Plantillas de la tierlist                       | `gw2/tierlist-plantillas.yaml`       |
| Lo que opina EDM en la tierlist                 | `gw2/tierlist-edm.yaml`              |

Cada archivo explica sus campos en los comentarios de arriba (las líneas con `#`).

## Reglas básicas de YAML

- `campo: valor`. Lo que va después de `#` es un comentario y no se muestra.
- La sangría (los espacios al principio) importa: usá espacios, nunca tabs.
- Las listas van con `- ` al principio de cada elemento.
- Poné el texto **entre comillas dobles** si tiene `:` o `#`, o si empieza con `!`, `*`, `@`, `[`
  o `{`. Ante la duda, comillas. Para una comilla dentro del texto: `\"`.
- Las fechas van como `"2026-09-28"`.

## Cosas que se repiten

- **`presenta`**: el globo que abre una sección. `quien: armino` o `quien: edm` (con `pose`).
- **`pose`**: nombre de una imagen de `src/assets/brand/edm/`, sin `.png` (p. ej. `shrug`, `cheer`).
  Para sumar una pose nueva, agregá el PNG ahí y su nombre en `src/lib/edm.ts`.
- **`etiqueta`**: la etiqueta punteada (EJEMPLO, Idea, Próximamente…) que marca lo que todavía es
  supuesto. Cuando el contenido sea real, borrá la línea y la etiqueta desaparece.
- **`**negrita**`**: en la charla de "Cómo es el canal", lo que va entre dobles asteriscos sale en negrita.

## Si algo está mal escrito

La compilación (`npm run build` o `npm run dev`) falla y dice qué archivo, qué campo y qué
esperaba, por ejemplo:

```text
reglas → reglas data does not match collection schema.
  presenta.pose: La pose de EDM tiene que ser una de: apuntando, arrodillada, …
```

En Cloudflare pasa lo mismo: si un archivo tiene un error, no se publica y queda la versión anterior.
