let timer: ReturnType<typeof setTimeout> | undefined;

interface ToastOptions {
  ms?: number;
  /** Botón opcional dentro del aviso, p. ej. «Deshacer». */
  action?: { label: string; run: () => void };
}

export function showToast(message: string, { ms = 1600, action }: ToastOptions = {}): void {
  const el = document.getElementById("toast");
  if (!el) return;
  const text = el.querySelector<HTMLElement>("[data-toast-text]")!;
  const button = el.querySelector<HTMLButtonElement>("[data-toast-action]")!;

  const hide = () => el.classList.remove("show");
  text.textContent = message;
  button.hidden = !action;
  button.onclick = action
    ? () => {
        action.run();
        hide();
      }
    : null;
  if (action) button.textContent = action.label;

  el.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(hide, action ? Math.max(ms, 5000) : ms);
}
