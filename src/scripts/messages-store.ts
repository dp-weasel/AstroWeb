// Cambios de cada persona sobre los mensajes, guardados en su navegador (localStorage).
// Solo se guardan las diferencias con los mensajes publicados; así, cuando se publican
// mensajes nuevos, aparecen sin pisar lo que la persona personalizó.

const STORAGE_KEY = "gw2-mensajes:v1";

export interface CustomMessage {
  id: string;
  text: string;
}

export interface Overrides {
  /** Texto nuevo de un mensaje publicado, por clave ("fractales/lfg-t4"). */
  edited: Record<string, string>;
  /** Claves de mensajes publicados que la persona eliminó. */
  deleted: string[];
  /** Mensajes propios, por id de pestaña (incluida "personalizado"). */
  added: Record<string, CustomMessage[]>;
}

export const emptyOverrides = (): Overrides => ({ edited: {}, deleted: [], added: {} });

function isOverrides(v: unknown): v is Overrides {
  if (!v || typeof v !== "object") return false;
  const o = v as Overrides;
  return (
    typeof o.edited === "object" && o.edited !== null &&
    Array.isArray(o.deleted) &&
    typeof o.added === "object" && o.added !== null
  );
}

export function loadOverrides(): Overrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyOverrides();
    const parsed: unknown = JSON.parse(raw);
    return isOverrides(parsed) ? parsed : emptyOverrides();
  } catch {
    return emptyOverrides();
  }
}

/** Devuelve false si el navegador no permite guardar (modo privado, almacenamiento bloqueado). */
export function saveOverrides(o: Overrides): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
    return true;
  } catch {
    return false;
  }
}

export function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10);
}
