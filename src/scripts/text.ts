// Utilidades de texto compartidas entre el servidor (build) y el navegador.

/** Minúsculas y sin tildes, para que "mision" encuentre "Misión". */
export function normalize(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Pinta `text` dentro de `el` resaltando cada término con <mark>.
 * Se normaliza carácter a carácter para conservar la correspondencia entre
 * las posiciones del texto normalizado y las del original.
 */
export function highlight(el: HTMLElement, text: string, terms: string[]): void {
  if (terms.length === 0) {
    el.textContent = text;
    return;
  }
  let norm = "";
  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const n = normalize(text[i]);
    norm += n;
    for (let k = 0; k < n.length; k++) map.push(i);
  }
  const marked = new Array<boolean>(text.length).fill(false);
  for (const term of terms) {
    for (let at = norm.indexOf(term); at !== -1; at = norm.indexOf(term, at + 1)) {
      for (let j = map[at]; j <= map[at + term.length - 1]; j++) marked[j] = true;
    }
  }
  el.replaceChildren();
  let i = 0;
  while (i < text.length) {
    let j = i;
    while (j < text.length && marked[j] === marked[i]) j++;
    const chunk = text.slice(i, j);
    if (marked[i]) {
      const m = document.createElement("mark");
      m.textContent = chunk;
      el.append(m);
    } else {
      el.append(chunk);
    }
    i = j;
  }
}
