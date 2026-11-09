// Datos del perfil que se muestran en la portada, la cabecera y el pie.
// Para cambiar la bio o agregar una red, basta con editar este archivo.
import { siTwitch, siX, siYoutube, type SimpleIcon } from "simple-icons";

export const profile = {
  name: "Weasel Shiro",
  tagline: "Streamer · Guild Wars 2 y lo que venga",
  /** Un elemento por párrafo. */
  bio: [
    "🎧 ¡Hola! Soy Weasel, un streamer nuevo aprendiendo sobre la marcha.",
    "🎮 Me gusta jugar Guild Wars 2, aunque también estoy abierto a probar otros juegos.",
    "💬 El objetivo del canal es pasarla bien, compartir buenas charlas y crecer junto a la comunidad.",
    "Gracias por pasar y ser parte 💜",
  ],
  /** Texto corto de la portada, junto al logo. */
  intro:
    "¡Hola! Soy Weasel, un streamer nuevo aprendiendo sobre la marcha. El objetivo del canal es pasarla bien, compartir buenas charlas y crecer junto a la comunidad.",
};

/** Tarjetas de "Cómo es el canal" en la portada. */
export const valores = [
  { emoji: "🎮", titulo: "Jugar sin presión", texto: "Aprendiendo sobre la marcha. Equivocarse es parte del directo." },
  { emoji: "💬", titulo: "Buenas charlas", texto: "El chat es parte del juego: preguntas, consejos y anécdotas." },
  { emoji: "🌱", titulo: "Crecer juntos", texto: "Un canal nuevo que crece con la gente que se suma." },
];

/** Preguntas frecuentes de la portada. La primera aparece abierta. */
export const preguntas = [
  {
    q: "¿Cuándo hay directo?",
    a: "Los avisos de cada directo salen en X. Si te sigues en Twitch, te llega la notificación al empezar.",
  },
  {
    q: "Soy nuevo en Guild Wars 2, ¿puedo pasar igual?",
    a: "¡Claro! El canal también está aprendiendo sobre la marcha. Las preguntas en el chat son bienvenidas.",
  },
  {
    q: "¿Para qué son los mensajes de GW2?",
    a: "Son mensajes listos para copiar y pegar en el chat del juego (LFG, explicaciones de jefes, etc.).",
  },
  {
    q: "¿Juegas otras cosas?",
    a: "Guild Wars 2 es el juego principal, pero estoy abierto a probar otros juegos.",
  },
];

export interface Social {
  name: string;
  handle: string;
  url: string;
  icon: SimpleIcon;
  /** Acción del botón en la portada. */
  cta: string;
}

/** En orden de prioridad: la primera se destaca en la portada. */
export const socials: Social[] = [
  { name: "Twitch", handle: "weasel_shiro", url: "https://www.twitch.tv/weasel_shiro", icon: siTwitch, cta: "Ver en vivo" },
  { name: "YouTube", handle: "@Weasel_shiro", url: "https://www.youtube.com/@Weasel_shiro", icon: siYoutube, cta: "Ver videos" },
  { name: "X (Twitter)", handle: "@weasel_shiro", url: "https://x.com/weasel_shiro", icon: siX, cta: "Seguir" },
];
