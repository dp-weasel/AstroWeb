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
};

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
