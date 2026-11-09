// Edición de mensajes en el navegador: editar, eliminar, restaurar y agregar.
//
// Los mensajes publicados llegan en el HTML (generado al compilar desde
// src/content/mensajes/). Al cargar, se leen de ahí y cada pestaña se vuelve a
// pintar aplicando los cambios guardados de la persona (ver messages-store.ts).
import { GW2_CHAT_LIMIT } from "../lib/gw2";
import { loadOverrides, newId, saveOverrides, type Overrides } from "./messages-store";
import { normalize } from "./text";
import { showToast } from "./toast";

type Origin = "base" | "edited" | "custom";

interface Item {
  key: string;
  text: string;
  origin: Origin;
}

/** Los mensajes propios usan "~" en la clave, que no puede aparecer en los publicados. */
const customKey = (tab: string, id: string) => `${tab}/~${id}`;
const parseKey = (key: string) => {
  const [tab, rest] = key.split("/", 2);
  return rest.startsWith("~") ? { tab, customId: rest.slice(1) } : { tab, customId: null };
};

const BADGES: Record<Origin, string> = { base: "", edited: "Editado", custom: "Tuyo" };

export function initMessageEditor(root: HTMLElement): void {
  const cardTemplate = root.querySelector<HTMLTemplateElement>("[data-card-template]")!;
  const editorTemplate = root.querySelector<HTMLTemplateElement>("[data-editor-template]")!;
  const panels = new Map<string, HTMLElement>();
  /** Mensajes publicados de cada pestaña, en orden. */
  const base = new Map<string, Map<string, string>>();

  for (const panel of root.querySelectorAll<HTMLElement>("[data-panel]")) {
    const tab = panel.dataset.panel!;
    panels.set(tab, panel);
    const messages = new Map<string, string>();
    for (const li of panel.querySelectorAll<HTMLElement>("[data-message]")) {
      messages.set(li.dataset.key!, li.dataset.text!);
    }
    base.set(tab, messages);
  }

  let state: Overrides = loadOverrides();
  let warnedStorage = false;

  const items = (tab: string): Item[] => {
    const deleted = new Set(state.deleted);
    const list: Item[] = [];
    for (const [key, text] of base.get(tab) ?? []) {
      if (deleted.has(key)) continue;
      const edited = state.edited[key];
      list.push(edited === undefined ? { key, text, origin: "base" } : { key, text: edited, origin: "edited" });
    }
    for (const c of state.added[tab] ?? []) list.push({ key: customKey(tab, c.id), text: c.text, origin: "custom" });
    return list;
  };

  const deletedCount = (tab: string) => state.deleted.filter((k) => base.get(tab)?.has(k)).length;

  const renderCard = (item: Item): HTMLElement => {
    const li = (cardTemplate.content.firstElementChild as HTMLElement).cloneNode(true) as HTMLElement;
    li.dataset.key = item.key;
    li.dataset.text = item.text;
    li.dataset.search = normalize(item.text);
    li.dataset.origin = item.origin;
    li.querySelector<HTMLElement>("[data-copy]")!.dataset.copy = item.text;
    li.querySelector<HTMLElement>("[data-message-text]")!.textContent = item.text;

    const count = li.querySelector<HTMLElement>("[data-count]")!;
    const over = item.text.length > GW2_CHAT_LIMIT;
    count.textContent = `${item.text.length}/${GW2_CHAT_LIMIT}`;
    count.classList.toggle("over", over);
    if (over) count.title = "Supera el límite del chat de GW2 y se cortará";
    else count.removeAttribute("title");

    const badge = li.querySelector<HTMLElement>("[data-badge]")!;
    badge.textContent = BADGES[item.origin];
    badge.hidden = item.origin === "base";
    li.querySelector<HTMLElement>('[data-action="restore"]')!.hidden = item.origin !== "edited";
    return li;
  };

  const render = (tab: string) => {
    const panel = panels.get(tab)!;
    const list = items(tab);
    panel.querySelector("[data-list]")!.replaceChildren(...list.map(renderCard));
    panel.querySelector<HTMLElement>("[data-no-messages]")!.hidden = list.length > 0;

    const restore = panel.querySelector<HTMLButtonElement>('[data-action="restore-deleted"]')!;
    const n = deletedCount(tab);
    restore.hidden = n === 0;
    restore.textContent = n === 1 ? "Restaurar 1 mensaje eliminado" : `Restaurar ${n} mensajes eliminados`;
  };

  const notifyChanged = () => document.dispatchEvent(new Event("messages:changed"));

  /** Guarda, vuelve a pintar la pestaña y avisa al buscador. */
  const commit = (tab: string, next: Overrides) => {
    state = next;
    if (!saveOverrides(state) && !warnedStorage) {
      warnedStorage = true;
      showToast("Tu navegador no permite guardar: los cambios se perderán al cerrar la página", { ms: 4000 });
    }
    render(tab);
    notifyChanged();
  };

  const clone = (): Overrides => structuredClone(state);

  const focusCard = (key: string) =>
    root.querySelector<HTMLElement>(`[data-message][data-key="${CSS.escape(key)}"] [data-copy]`)?.focus();

  // --- Formulario de edición -------------------------------------------------

  /** Abre el formulario en lugar de `replace` (editar) o al final de la lista (agregar). */
  const openEditor = (tab: string, opts: { replace?: HTMLElement; initial?: string; onSave: (text: string) => void }) => {
    closeEditors();
    const item = (editorTemplate.content.firstElementChild as HTMLElement).cloneNode(true) as HTMLElement;
    const form = item.querySelector<HTMLFormElement>("[data-editor]")!;
    const input = item.querySelector<HTMLTextAreaElement>("[data-editor-input]")!;
    const status = item.querySelector<HTMLElement>("[data-editor-status]")!;
    const count = item.querySelector<HTMLElement>("[data-editor-count]")!;
    const hint = item.querySelector<HTMLElement>("[data-editor-hint]")!;
    const save = item.querySelector<HTMLButtonElement>("[data-editor-save]")!;

    // El chat de GW2 es de una sola línea: los saltos de línea se convierten en espacios.
    const value = () => input.value.replace(/\s*\n+\s*/g, " ").trim();
    const validate = () => {
      const text = value();
      const over = text.length > GW2_CHAT_LIMIT;
      count.textContent = `${text.length}/${GW2_CHAT_LIMIT}`;
      status.classList.toggle("over", over);
      hint.textContent = over
        ? `Sobran ${text.length - GW2_CHAT_LIMIT}: el chat de GW2 admite hasta ${GW2_CHAT_LIMIT} caracteres.`
        : text.length === 0
          ? "Escribe un mensaje."
          : "";
      save.disabled = over || text.length === 0;
    };

    input.value = opts.initial ?? "";
    input.addEventListener("input", validate);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
      }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validate();
      if (!save.disabled) opts.onSave(value());
    });
    form.querySelector('[data-action="cancel"]')!.addEventListener("click", () => cancel());

    const cancel = () => {
      const key = opts.replace?.dataset.key;
      render(tab);
      notifyChanged();
      if (key) focusCard(key);
      else panels.get(tab)!.querySelector<HTMLElement>('[data-action="add"]')!.focus();
    };

    if (opts.replace) opts.replace.replaceWith(item);
    else panels.get(tab)!.querySelector("[data-list]")!.append(item);
    panels.get(tab)!.querySelector<HTMLElement>("[data-no-messages]")!.hidden = true;
    validate();
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  };

  /** Cierra cualquier formulario abierto (sin guardar) volviendo a pintar su pestaña. */
  const closeEditors = () => {
    for (const [tab, panel] of panels) if (panel.querySelector("[data-editor-item]")) render(tab);
  };

  // --- Acciones --------------------------------------------------------------

  const edit = (li: HTMLElement) => {
    const key = li.dataset.key!;
    const { tab, customId } = parseKey(key);
    openEditor(tab, {
      replace: li,
      initial: li.dataset.text,
      onSave: (text) => {
        const next = clone();
        if (customId) {
          const c = next.added[tab]?.find((m) => m.id === customId);
          if (c) c.text = text;
        } else if (text === base.get(tab)?.get(key)) {
          delete next.edited[key]; // volvió a quedar igual al original
        } else {
          next.edited[key] = text;
        }
        commit(tab, next);
        focusCard(key);
        showToast("Mensaje guardado");
      },
    });
  };

  const add = (tab: string) => {
    openEditor(tab, {
      onSave: (text) => {
        const next = clone();
        const id = newId();
        (next.added[tab] ??= []).push({ id, text });
        commit(tab, next);
        focusCard(customKey(tab, id));
        showToast("Mensaje agregado");
      },
    });
  };

  const remove = (li: HTMLElement) => {
    const key = li.dataset.key!;
    const { tab, customId } = parseKey(key);
    const before = clone();
    const next = clone();
    if (customId) {
      next.added[tab] = (next.added[tab] ?? []).filter((m) => m.id !== customId);
    } else {
      delete next.edited[key];
      next.deleted.push(key);
    }
    commit(tab, next);
    showToast("Mensaje eliminado", { action: { label: "Deshacer", run: () => commit(tab, before) } });
  };

  const restore = (li: HTMLElement) => {
    const key = li.dataset.key!;
    const { tab } = parseKey(key);
    const before = clone();
    const next = clone();
    delete next.edited[key];
    commit(tab, next);
    focusCard(key);
    showToast("Texto original restaurado", { action: { label: "Deshacer", run: () => commit(tab, before) } });
  };

  const restoreDeleted = (tab: string) => {
    const next = clone();
    const keys = base.get(tab)!;
    next.deleted = next.deleted.filter((k) => !keys.has(k));
    commit(tab, next);
    showToast("Mensajes restaurados");
  };

  root.addEventListener("click", (e) => {
    const button = (e.target as Element).closest<HTMLElement>("[data-action]");
    if (!button || !root.contains(button)) return;
    const li = button.closest<HTMLElement>("[data-message]");
    const tab = button.closest<HTMLElement>("[data-panel]")?.dataset.panel;
    switch (button.dataset.action) {
      case "edit": if (li) edit(li); break;
      case "delete": if (li) remove(li); break;
      case "restore": if (li) restore(li); break;
      case "add": if (tab) add(tab); break;
      case "restore-deleted": if (tab) restoreDeleted(tab); break;
    }
  });

  for (const tab of panels.keys()) render(tab);
  notifyChanged();
}
