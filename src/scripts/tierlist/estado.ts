// Estado de la tierlist: qué ficha está en qué fila, nombres y colores de las
// filas y título. Se guarda en el navegador y se puede pasar en un enlace.
import { tiersBase, type Tier } from "../../data/tierlist";

export interface Fila extends Tier {
  /** Ids de las fichas en orden. */
  fichas: string[];
}

export interface Estado {
  subtitulo: string;
  filas: Fila[];
}

const CLAVE = "gw2-tierlist";

export const estadoInicial = (): Estado => ({
  subtitulo: "Balance",
  filas: tiersBase.map((t) => ({ ...t, fichas: [] })),
});

/** Descarta fichas desconocidas o repetidas (p. ej. de un enlace viejo o editado a mano). */
function limpiar(e: Estado, validas: Set<string>): Estado {
  const vistas = new Set<string>();
  for (const f of e.filas) {
    f.fichas = f.fichas.filter((id) => validas.has(id) && !vistas.has(id) && vistas.add(id));
  }
  return e;
}

function esEstado(x: unknown): x is Estado {
  const e = x as Estado;
  return !!e && Array.isArray(e.filas) && e.filas.every((f) => typeof f.id === "string" && Array.isArray(f.fichas));
}

export function cargar(validas: Set<string>): Estado {
  try {
    const crudo = JSON.parse(localStorage.getItem(CLAVE) ?? "null");
    if (esEstado(crudo)) {
      // Las listas guardadas antes de quitar las notas pueden traerlas: se descartan.
      const { subtitulo, filas } = { ...estadoInicial(), ...crudo };
      return limpiar({ subtitulo, filas }, validas);
    }
  } catch {
    // Sin almacenamiento (modo privado) o dato roto: se arranca de cero.
  }
  return estadoInicial();
}

export function guardar(e: Estado): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(e));
  } catch {
    // Sin almacenamiento: la lista vive solo mientras la página esté abierta.
  }
}

/* ---------- Enlaces: #t=<base64url de un JSON compacto> ---------- */

type Compacto = { s: string; f: [string, string, string[]][] };

const aBase64 = (txt: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(txt))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const deBase64 = (b64: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)));

export function aEnlace(e: Estado, base = location.href): string {
  const c: Compacto = { s: e.subtitulo, f: e.filas.map((f) => [f.nombre, f.color, f.fichas]) };
  const url = new URL(base);
  url.hash = `t=${aBase64(JSON.stringify(c))}`;
  return url.href;
}

/** Lee la lista del enlace, si hay una. */
export function deEnlace(validas: Set<string>): Estado | null {
  const m = location.hash.match(/^#t=([\w-]+)$/);
  if (!m) return null;
  try {
    const c = JSON.parse(deBase64(m[1])) as Compacto;
    const e: Estado = {
      subtitulo: String(c.s ?? ""),
      filas: c.f.map(([nombre, color, fichas], i) => ({ id: `f${i}`, nombre: String(nombre), color: String(color), fichas })),
    };
    return esEstado(e) ? limpiar(e, validas) : null;
  } catch {
    return null;
  }
}
