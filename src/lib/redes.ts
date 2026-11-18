// Íconos de las redes que se pueden poner en src/content/sitio/perfil.yaml (campo `red`).
// Para sumar otra, agregala acá con su ícono de simple-icons.
import { siBluesky, siDiscord, siInstagram, siKick, siThreads, siTiktok, siTwitch, siX, siYoutube } from "simple-icons";

export const iconosRedes = {
  twitch: siTwitch,
  youtube: siYoutube,
  x: siX,
  kick: siKick,
  tiktok: siTiktok,
  instagram: siInstagram,
  discord: siDiscord,
  bluesky: siBluesky,
  threads: siThreads,
};

export type Red = keyof typeof iconosRedes;
export const redes = Object.keys(iconosRedes) as [Red, ...Red[]];
