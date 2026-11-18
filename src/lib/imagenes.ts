// Busca por nombre las imágenes que el contenido (src/content/) menciona:
// poses de EDM y miniaturas de videos. Solo para el build (usa import.meta.glob).
import type { ImageMetadata } from "astro";
import type { PoseEdm } from "./edm";

type Archivos = Record<string, { default: ImageMetadata }>;
const poses: Archivos = import.meta.glob("../assets/brand/edm/*.png", { eager: true });
const miniaturas: Archivos = import.meta.glob("../assets/brand/miniaturas/*.png", { eager: true });

const buscar = (archivos: Archivos, carpeta: string, nombre: string) => {
  const img = archivos[`../assets/brand/${carpeta}/${nombre}.png`];
  if (!img) throw new Error(`Falta la imagen src/assets/brand/${carpeta}/${nombre}.png`);
  return img.default;
};

export const imagenEdm = (pose: PoseEdm) => buscar(poses, "edm", pose);
export const miniatura = (nombre: string) => buscar(miniaturas, "miniaturas", nombre);
