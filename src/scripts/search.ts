import { highlight, normalize } from "./text";

// Filtra los mensajes de todas las pestañas (deben aparecer todas las palabras),
// actualiza el contador de cada pestaña y el aviso de "sin resultados".
export function initSearch(input: HTMLInputElement): void {
  const apply = () => {
    const raw = input.value.trim();
    const terms = normalize(raw).split(/\s+/).filter(Boolean);
    const counts = new Map<string, number>();

    for (const panel of document.querySelectorAll<HTMLElement>('[role="tabpanel"]')) {
      let visible = 0;
      for (const li of panel.querySelectorAll<HTMLElement>("[data-message]")) {
        const match = terms.every((t) => li.dataset.search!.includes(t));
        li.hidden = !match;
        if (match) visible++;
        highlight(li.querySelector("[data-message-text]")!, li.dataset.text!, match ? terms : []);
      }
      counts.set(panel.id, visible);
    }

    const withMatches: string[] = [];
    for (const tab of document.querySelectorAll<HTMLElement>('[role="tab"]')) {
      const n = counts.get(tab.getAttribute("aria-controls")!) ?? 0;
      const badge = tab.querySelector<HTMLElement>("[data-tab-count]")!;
      badge.textContent = String(n);
      badge.hidden = terms.length === 0;
      if (n > 0) withMatches.push(tab.querySelector(".tab-name")!.textContent!);
    }

    for (const panel of document.querySelectorAll<HTMLElement>('[role="tabpanel"]')) {
      const empty = panel.querySelector<HTMLElement>("[data-empty]")!;
      const none = terms.length > 0 && counts.get(panel.id) === 0;
      empty.hidden = !none;
      if (none) {
        let msg = `No se encontró ningún mensaje con «${raw}» en esta pestaña.`;
        if (withMatches.length) msg += ` Hay coincidencias en: ${withMatches.join(", ")}.`;
        empty.textContent = msg;
      }
    }
  };

  input.addEventListener("input", apply);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && input.value) {
      input.value = "";
      apply();
    }
  });
  // El navegador puede restaurar el texto al volver atrás en el historial.
  if (input.value) apply();
}
