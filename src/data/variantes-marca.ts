// Variantes de portada con la marca de RecursosCC (/variantes-marca/).
// Son propuestas para comparar: no se enlazan desde el sitio y no se indexan.
// Los textos van en voseo (Weasel es argentino) y con mate, como en las escenas de OBS.

export interface Variante {
  slug: string;
  nombre: string;
  idea: string;
  /** Recursos de RecursosCC que usa. */
  recursos: string[];
  /** Secciones nuevas que suma (ver src/data/contenido.ts). */
  secciones: string[];
}

export const variantes: Variante[] = [
  {
    slug: "logotipo",
    nombre: "1 · Marca aplicada",
    idea: "La portada de hoy, con la tipografía y los colores de las escenas. Cambia poco y se ve “de la marca”.",
    recursos: ["Logo con círculo", "WEASEL en Russo One", "Títulos en Montserrat Black Italic"],
    secciones: ["Próximo directo", "Sobre mí", "Horario", "Cómo apoyar", "Más preguntas"],
  },
  {
    slug: "banner",
    nombre: "2 · Banner diagonal",
    idea: "El hero copia la composición del banner de Twitch: bloque naranja inclinado con el armiño y fondo oscuro con la marca de agua.",
    recursos: ["Banner de Twitch (composición)", "Logo sin círculo", "Marca de agua gris"],
    secciones: ["Números del canal", "Próximo directo", "Horario", "Qué se juega + votación", "Videos de YouTube", "Comandos del chat", "Más preguntas"],
  },
  {
    slug: "chillchat",
    nombre: "3 · Chillchat",
    idea: "La web se viste como la escena de charla: manchas óxido en los bordes, el Armiño en un marco de cámara con el anillo que gira y WEASEL montado sobre el borde.",
    recursos: ["Textura de los fondos chillchat", "Marco de cámara redondeado", "Anillo de la escena Juego", "Armiño que parpadea"],
    secciones: ["Próximo directo", "El rincón (setup)", "Reglas del chat", "Metas de afiliado", "Stickers de EDM"],
  },
  {
    slug: "armino",
    nombre: "4 · El Armiño te recibe",
    idea: "El Armiño (pngTuber) es el anfitrión: parpadea, mueve la boca mientras escribe en su bocadillo y se asoma desde el borde al final.",
    recursos: ["pngTuber (4 caras)", "Bocadillo crema con etiqueta naranja", "Fredoka y Lilita One"],
    secciones: ["Próximo directo", "Personajes", "Sobre mí", "Horario", "Metas de afiliado", "Cómo apoyar", "Más preguntas"],
  },
  {
    slug: "escena",
    nombre: "5 · La escena",
    idea: "La portada como un directo: ecualizador a 120 BPM, y EDM y el Armiño presentan cada sección charlando. Las preguntas frecuentes son un chat.",
    recursos: ["EDM (poses con borde)", "pngTuber", "Ecualizador de Starting Soon", "Bocadillos de los dos personajes"],
    secciones: ["Próximo directo", "Números", "Horario", "Qué se juega + votación", "Stickers de EDM", "Comandos del chat", "Metas de afiliado", "Videos", "Reglas", "Cómo apoyar", "Más preguntas en el chat"],
  },
  {
    slug: "mezcla",
    nombre: "6 · La mezcla",
    idea: "La escena (5) como base, con el banner de la 2, el equipo y la historia de la 4, las preguntas de la 2 y el Armiño despidiéndose al final (ahora entero).",
    recursos: ["Banner de Twitch (composición)", "EDM (poses con borde)", "pngTuber", "Bocadillos de los dos personajes"],
    secciones: ["Cómo es el canal (charla)", "Te presento al equipo", "Cómo empezó todo", "Stickers de EDM + cómo se usan", "Escribí y pasa algo", "Camino a Afiliado", "Lo último en YouTube", "Reglas de la casa", "Herramientas", "¿Querés dar una mano?", "Preguntas frecuentes"],
  },
];

/** Texto de presentación en voseo. */
export const intro =
  "¡Hola! Soy Weasel. Streameo Guild Wars 2 (y lo que pinte), aprendo sobre la marcha y siempre hay un mate cerca. Pasá, ponete cómodo.";

export const valores = [
  { emoji: "🎮", titulo: "Jugar sin presión", texto: "Aprendemos sobre la marcha. Equivocarse es parte del directo." },
  { emoji: "💬", titulo: "Buenas charlas", texto: "El chat es parte del juego: preguntá, aconsejá, contá tu anécdota." },
  { emoji: "🧉", titulo: "Crecer juntos", texto: "Un canal nuevo que crece con la gente que se suma. La pava está puesta." },
];

export const preguntas = [
  { q: "¿Cuándo hay directo?", a: "Los avisos salen en X. Si me seguís en Twitch, te llega la notificación apenas arranco." },
  { q: "Soy nuevo en Guild Wars 2, ¿puedo pasar igual?", a: "¡Obvio! El canal también aprende sobre la marcha. Preguntá lo que quieras en el chat." },
  { q: "¿Para qué son los mensajes de GW2?", a: "Son mensajes listos para copiar y pegar en el chat del juego: LFG, explicaciones de jefes, etc." },
  { q: "¿Jugás otras cosas?", a: "Guild Wars 2 es el principal, pero estoy abierto a probar otros juegos. ¿Alguna sugerencia?" },
];
