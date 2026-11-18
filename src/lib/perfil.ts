// Perfil de src/content/sitio/perfil.yaml, con el ícono de cada red.
import { leer } from "./contenido";
import { iconosRedes } from "./redes";

export async function leerPerfil() {
  const perfil = await leer("perfil");
  return { ...perfil, redes: perfil.redes.map((r) => ({ ...r, icon: iconosRedes[r.red] })) };
}

export type RedSocial = Awaited<ReturnType<typeof leerPerfil>>["redes"][number];
