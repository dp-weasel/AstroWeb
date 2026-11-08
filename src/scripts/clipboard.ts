import { showToast } from "./toast";

export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // Respaldo para contextos no seguros (p. ej. http en la red local).
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  if (!ok) throw new Error("No se pudo copiar");
}

/** Copia el contenido de data-copy al hacer clic en cualquier botón que lo tenga. */
export function initCopyButtons(root: ParentNode = document): void {
  root.addEventListener("click", async (e) => {
    const btn = (e.target as Element).closest<HTMLElement>("[data-copy]");
    if (!btn) return;
    const label = btn.querySelector<HTMLElement>("[data-copy-label]");
    try {
      await copyText(btn.dataset.copy ?? "");
      btn.classList.add("copied");
      if (label) label.textContent = "¡Copiado!";
      showToast("Mensaje copiado");
      setTimeout(() => {
        btn.classList.remove("copied");
        if (label) label.textContent = "Copiar";
      }, 1600);
    } catch {
      showToast("No se pudo copiar");
    }
  });
}
