# Pendientes de la portada

Lo que falta definir para pasar la **variante 6 · La mezcla** (`/variantes-marca/mezcla/`) a la portada real.
Casi todo el contenido nuevo está en `src/data/contenido.ts`. En la página, lo supuesto lleva la etiqueta
punteada **EJEMPLO**, **IDEA** o **HISTORIA SUPUESTA**.

## Imágenes

- [ ] **Logo nuevo del Armiño.** El logo actual (ceño fruncido, sombreado, auriculares realistas) no
      combina con el pngTuber que aparece en el resto de la página. La idea es un Armiño amigable,
      en el estilo plano del pngTuber y con auriculares. `<ArminoVivo auriculares />` muestra un
      prototipo hecho en SVG que puede servir de referencia para quien lo dibuje.
- [ ] Cuando esté el logo nuevo, reemplazarlo en todos lados: el banner, la marca de agua, la cabecera
      (`SiteHeader`), el componente `Logo` y los íconos y la vista previa al compartir
      (`npm run brand:icons` y `npm run brand:og`). Fuera de la web: avatares de Twitch, YouTube y X,
      y las escenas de OBS.
- [ ] **Foto de Weasel** para la tarjeta de "Te presento al equipo" (hoy dice "Tu foto acá").
- [ ] Miniaturas reales de los videos que se muestren (hoy son las plantillas de ObsScenes).

## Textos

- [ ] **"Cómo empezó todo"** (`sobreMi.parrafos`): la historia es inventada. Revisar el año de inicio, el
      porqué del nombre (¿Shiro = blanco?) y lo de la música.
- [ ] **Personajes** (`personajes`): revisar los textos, sobre todo la frase típica de Weasel
      ("Esperá que ya entiendo") y el dato de EDM.
- [ ] **Intro del banner** (`intro` en `variantes-marca.ts`) y la línea de arriba del nombre
      ("Directos de Guild Wars 2 · y lo que pinte").
- [ ] **Reglas de la casa** (`reglas`): son una propuesta. Confirmar o ajustar.
- [ ] **Preguntas frecuentes** (`preguntasExtra`): confirmar las respuestas de "¿Puedo jugar con
      Weasel?" (¿se arman grupos con el chat?) y "¿Qué música suena?".
- [ ] La portada actual (`src/data/profile.ts`) todavía usa tú: "Si te sigues", "¿Juegas otras cosas?".
      Pasarla a voseo o reemplazarla por los textos de la variante 6.

## Datos

- [ ] **Fecha del primer directo** (`inicioCanal`, hoy 28/09/2026): con ella se calcula el
      "Día N de la aventura" de la franja.
- [ ] **Camino a Afiliado** (`metas`): los requisitos son los reales de Twitch, pero el progreso es
      inventado (31/50 seguidores, 6,5/8 h, 7/7 días, 2,4/3 espectadores). Hay que actualizarlo a mano
      o buscar la forma de traerlo de Twitch.
- [ ] **Premio de la meta** (`metas.premio`): "stream especial de festejo… y emotes de EDM".
- [ ] **Horario** (`horario`): martes y jueves 21:00, sábado 17:00, todo inventado. Hoy solo se usa para
      "3 directos por semana" en la franja.
- [ ] **Franja debajo del banner** (`franja`): decidir los cuatro datos. Ideas: cuenta regresiva al
      próximo directo, último logro, jugando ahora, tema del sábado o una cinta que corre.
- [ ] **Videos de YouTube** (`videos`): títulos y duraciones inventados, y todos enlazan al canal en vez
      de al video. Hay que agregar la URL de cada video.

## Stickers de EDM y el chat

- [ ] **Nombres de los stickers** (`emotes`): `edmHola`, `edmHype`… En Twitch los emotes llevan el prefijo
      del canal, que se elige al ser Afiliado (por ejemplo `weaselHola`), así que conviene decidir los
      nombres pensando en eso.
- [ ] **Stickers en pantalla (idea):** que escribir el nombre de un sticker en el chat haga aparecer a EDM
      con esa pose. Se haría en `ObsScenes/shared/reacciones.js`.
- [ ] **7TV (idea):** subir los stickers como emotes para quienes tengan la extensión.
- [ ] **Comandos del chat:** `!edm`, "mate", "armiño", "jaja" y el saludo ya existen en las escenas.
      `!horario`, `!redes` y `!lurk` son ideas: hacen falta en un bot (StreamElements, Nightbot) o hay
      que sacarlos de la lista.

## Enlaces

- [x] Cafecito: https://cafecito.app/weasel_shiro
- [ ] ¿Discord u otro espacio de comunidad? Si existe, sumarlo a "¿Querés dar una mano?" y a las redes.

## Antes de publicar

- [ ] Reemplazar `src/pages/index.astro` por la variante 6 (sin la barra de variantes ni el `noindex`).
- [ ] Revisar la variante en el tema claro: las capturas se hicieron solo en el oscuro.
- [ ] Limpiar lo que no se use: las páginas de `/variantes-marca/`, las secciones que no entraron
      (`Horario`, `ProximoDirecto`, `Juegos`, `Rincon`), las imágenes sobrantes de `src/assets/brand/`
      y las fuentes que queden sin usar.
- [ ] Sacar todas las etiquetas EJEMPLO, IDEA o HISTORIA SUPUESTA que queden.
- [ ] `npm run check && npm run build`, merge a `master` y revisar en Cloudflare.
