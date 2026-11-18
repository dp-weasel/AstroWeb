// Poses de EDM: los archivos de src/assets/brand/edm/, sin el .png.
// Sin dependencias de Astro: lo usan el esquema del contenido y el navegador.
// Para sumar una pose, agregá el PNG a esa carpeta y su nombre acá.

export const posesEdm = [
  "apuntando",
  "arrodillada",
  "brazos-cruzados",
  "cheer",
  "feliz-apuntando-arriba",
  "gritando",
  "hiss",
  "mirando-arriba-un-brazo",
  "riendo-en-el-suelo",
  "saludando",
  "shrug",
  "sorprendida",
  "sorprendida-mirando-a-la-izquierda",
  "triste",
  "triste-mirando-al-suelo",
] as const;

export type PoseEdm = (typeof posesEdm)[number];

/** Texto alternativo de cada pose, para cuando la imagen acompaña un texto. */
export const descripcionPose: Record<PoseEdm, string> = {
  apuntando: "EDM señalando",
  arrodillada: "EDM de rodillas, suplicando",
  "brazos-cruzados": "EDM de brazos cruzados",
  cheer: "EDM festejando",
  "feliz-apuntando-arriba": "EDM feliz, señalando hacia arriba",
  gritando: "EDM gritando",
  hiss: "EDM bufando",
  "mirando-arriba-un-brazo": "EDM mirando hacia arriba con un brazo levantado",
  "riendo-en-el-suelo": "EDM tirada en el suelo, muerta de risa",
  saludando: "EDM saludando",
  shrug: "EDM encogiéndose de hombros",
  sorprendida: "EDM sorprendida",
  "sorprendida-mirando-a-la-izquierda": "EDM sorprendida, mirando a un costado",
  triste: "EDM triste",
  "triste-mirando-al-suelo": "EDM triste, mirando al suelo",
};
