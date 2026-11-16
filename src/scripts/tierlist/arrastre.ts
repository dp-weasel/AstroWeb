// Arrastrar y soltar con Pointer Events: anda igual con mouse, lápiz y dedo
// (el drag and drop nativo de HTML no funciona en pantallas táctiles).
// Mientras se arrastra, la ficha real se mueve de lugar y una copia sigue al puntero.

interface Opciones {
  /** Se llama al soltar una ficha en una zona (fila o banco). */
  alSoltar: (ficha: HTMLElement, zona: HTMLElement) => void;
  /** Se llama cuando se toca una ficha sin arrastrarla. */
  alTocar: (ficha: HTMLElement) => void;
}

const UMBRAL = 6; // px que hay que mover para que cuente como arrastre

export function activarArrastre(raiz: HTMLElement, { alSoltar, alTocar }: Opciones): void {
  raiz.addEventListener("pointerdown", (ev) => {
    const ficha = (ev.target as Element).closest<HTMLElement>(".ficha");
    if (!ficha || ev.button !== 0) return;
    ev.preventDefault(); // evita que el navegador arrastre la imagen
    // Se escucha en el documento y no con setPointerCapture: mover la ficha de
    // fila la saca del DOM un instante y el navegador suelta la captura.
    const puntero = ev.pointerId;

    const inicio = { x: ev.clientX, y: ev.clientY };
    const caja = ficha.getBoundingClientRect();
    const agarre = { x: ev.clientX - caja.left, y: ev.clientY - caja.top };
    let copia: HTMLElement | null = null;
    let zona: HTMLElement | null = null;

    const mover = (e: PointerEvent) => {
      if (e.pointerId !== puntero) return;
      if (!copia) {
        if (Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y) < UMBRAL) return;
        copia = ficha.cloneNode(true) as HTMLElement;
        copia.classList.add("ficha-copia");
        copia.style.width = `${caja.width}px`;
        copia.style.height = `${caja.height}px`;
        document.body.append(copia);
        ficha.classList.add("arrastrando");
        raiz.classList.add("con-arrastre");
      }
      copia.style.transform = `translate(${e.clientX - agarre.x}px, ${e.clientY - agarre.y}px) rotate(-4deg)`;

      const debajo = document.elementFromPoint(e.clientX, e.clientY);
      const nueva = debajo?.closest<HTMLElement>("[data-zona]") ?? null;
      if (nueva !== zona) {
        zona?.classList.remove("encima");
        nueva?.classList.add("encima");
        zona = nueva;
      }
      if (zona) {
        const antes = fichaSiguiente(zona, e.clientX, e.clientY, ficha);
        const yaEsta = antes ? antes.previousElementSibling === ficha : zona.lastElementChild === ficha;
        if (!yaEsta) zona.insertBefore(ficha, antes);
      }
    };

    const soltar = (e: PointerEvent) => {
      if (e.pointerId !== puntero) return;
      document.removeEventListener("pointermove", mover);
      document.removeEventListener("pointerup", soltar);
      document.removeEventListener("pointercancel", soltar);
      zona?.classList.remove("encima");
      raiz.classList.remove("con-arrastre");
      if (!copia) return void (e.type === "pointerup" && alTocar(ficha));
      copia.remove();
      ficha.classList.remove("arrastrando");
      const destino = ficha.closest<HTMLElement>("[data-zona]");
      if (destino) alSoltar(ficha, destino);
    };

    document.addEventListener("pointermove", mover);
    document.addEventListener("pointerup", soltar);
    document.addEventListener("pointercancel", soltar);
  });
}

/**
 * Ficha de la zona antes de la cual iría la que se arrastra, según la posición
 * del puntero en orden de lectura (filas de izquierda a derecha y de arriba abajo).
 */
function fichaSiguiente(zona: HTMLElement, x: number, y: number, arrastrada: HTMLElement): HTMLElement | null {
  for (const f of zona.querySelectorAll<HTMLElement>(".ficha:not([hidden])")) {
    if (f === arrastrada) continue;
    const r = f.getBoundingClientRect();
    if (y < r.top) return f;
    if (y <= r.bottom && x < r.left + r.width / 2) return f;
  }
  return null;
}
