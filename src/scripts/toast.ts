let timer: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string, ms = 1600): void {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("show"), ms);
}
