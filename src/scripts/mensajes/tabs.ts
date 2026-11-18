// Pestañas accesibles (patrón WAI-ARIA): clic, flechas/Inicio/Fin y enlace por hash (#fractales).

export function initTabs(container: HTMLElement): void {
  const tabs = [...container.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const ids = tabs.map((t) => t.dataset.tabId!);
  if (ids.length === 0) return;

  const select = (id: string, { focus = false, updateHash = true } = {}) => {
    for (const tab of tabs) {
      const active = tab.dataset.tabId === id;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")!)!.hidden = !active;
      if (active && focus) tab.focus();
    }
    if (updateHash) history.replaceState(null, "", `#${id}`);
  };

  for (const tab of tabs) tab.addEventListener("click", () => select(tab.dataset.tabId!));

  container.querySelector('[role="tablist"]')!.addEventListener("keydown", (e) => {
    const ev = e as KeyboardEvent;
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    const next = {
      ArrowRight: (current + 1) % ids.length,
      ArrowLeft: (current - 1 + ids.length) % ids.length,
      Home: 0,
      End: ids.length - 1,
    }[ev.key];
    if (next === undefined) return;
    ev.preventDefault();
    select(ids[next], { focus: true });
  });

  const syncWithHash = () => {
    const fromHash = decodeURIComponent(location.hash.slice(1));
    if (ids.includes(fromHash)) select(fromHash, { updateHash: false });
  };
  window.addEventListener("hashchange", syncWithHash);
  syncWithHash();
}
