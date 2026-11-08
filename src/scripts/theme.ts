type Theme = "dark" | "light";

export function initThemeToggle(button: HTMLButtonElement): void {
  const root = document.documentElement;

  const apply = (theme: Theme) => {
    root.dataset.theme = theme;
    button.setAttribute("aria-label", theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* almacenamiento no disponible: el tema solo dura esta visita */
    }
  };

  button.addEventListener("click", () => apply(root.dataset.theme === "dark" ? "light" : "dark"));
  apply(root.dataset.theme === "light" ? "light" : "dark");
}
