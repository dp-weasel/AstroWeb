// Tierlist de GW2 en el navegador. Las opciones de cada versión llegan en
// data-config (ver src/components/tierlist/TierList.astro).
import { coloresExtra, type Plantilla, type frasesEdm } from "../../data/tierlist";
import { showToast } from "../toast";
import { copyText } from "../clipboard";
import { activarArrastre } from "./arrastre";
import { cargar, guardar, aEnlace, deEnlace, type Estado } from "./estado";
import { dibujar, aBlob } from "./exportar";

interface Config {
  opciones: { editarFilas?: boolean; filtros?: boolean; encabezado?: boolean; exportar?: boolean; directo?: boolean };
  plantillas: Plantilla[];
  frases: typeof frasesEdm;
  edm: Record<"inicio" | "arriba" | "medio" | "abajo" | "pool", string> | null;
}

const azar = <T>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

export function iniciarTierlist(raiz: HTMLElement): void {
  const { opciones: op, plantillas, frases, edm } = JSON.parse(raiz.dataset.config!) as Config;
  const $ = <T extends Element = HTMLElement>(sel: string) => raiz.querySelector<T>(sel);
  const contFilas = $("[data-filas]")!;
  const banco = $("[data-zona='banco']")!;
  const fichas = new Map([...banco.querySelectorAll<HTMLElement>(".ficha")].map((f) => [f.dataset.id!, f]));
  const orden = [...fichas.keys()];
  const validas = new Set(orden);

  let estado: Estado = cargar(validas);
  const compartido = deEnlace(validas);
  if (compartido) {
    const mio = estado;
    estado = compartido;
    history.replaceState(null, "", location.pathname + location.search);
    showToast("Abriste una lista compartida", {
      action: { label: "Volver a la mía", run: () => ((estado = mio), pintar(), guardar(estado)) },
    });
  }
  // Un enlace pegado con la página ya abierta solo cambia el #: se recarga para leerlo.
  addEventListener("hashchange", () => location.hash.startsWith("#t=") && location.reload());
  let seleccionada: HTMLElement | null = null;

  /* ---------- Pintar el estado ---------- */

  function pintar(): void {
    contFilas.replaceChildren(
      ...estado.filas.map((f, i) => {
        const fila = document.createElement("div");
        fila.className = "tl-fila";
        fila.dataset.fila = f.id;
        fila.style.setProperty("--color", f.color);
        const etiqueta = document.createElement(op.editarFilas ? "button" : "div");
        const largo = f.nombre.length;
        etiqueta.className = `tl-etiqueta ${largo <= 2 ? "corta" : largo <= 6 && !f.nombre.includes(" ") ? "media" : ""}`;
        etiqueta.textContent = f.nombre;
        if (op.editarFilas) {
          (etiqueta as HTMLButtonElement).type = "button";
          etiqueta.title = `Editar la fila ${f.nombre} (tecla ${i + 1})`;
          etiqueta.addEventListener("click", () => editarFila(f.id));
        }
        const zona = document.createElement("div");
        zona.className = "tl-zona";
        zona.dataset.zona = f.id;
        zona.setAttribute("aria-label", `Fila ${f.nombre}`);
        zona.append(...f.fichas.map((id) => fichas.get(id)!));
        fila.append(etiqueta, zona);
        return fila;
      }),
    );
    const ubicadas = new Set(estado.filas.flatMap((f) => f.fichas));
    banco.append(...orden.filter((id) => !ubicadas.has(id)).map((id) => fichas.get(id)!));
    for (const [id, f] of fichas) {
      if (estado.notas[id]) f.dataset.nota = "";
      else delete f.dataset.nota;
    }
    raiz.querySelectorAll<HTMLInputElement>("[data-subtitulo]").forEach((i) => (i.value = estado.subtitulo));
    filtrar();
    mostrarNota();
  }

  /** Lee del DOM dónde quedó cada ficha, ordena el banco y guarda. */
  function confirmar(movida?: HTMLElement): void {
    for (const f of estado.filas) {
      const zona = contFilas.querySelector<HTMLElement>(`[data-zona="${f.id}"]`);
      f.fichas = zona ? [...zona.querySelectorAll<HTMLElement>(".ficha")].map((x) => x.dataset.id!) : [];
    }
    const enBanco = new Set([...banco.children].map((x) => (x as HTMLElement).dataset.id));
    banco.append(...orden.filter((id) => enBanco.has(id)).map((id) => fichas.get(id)!));
    guardar(estado);
    if (movida) reaccionar(movida);
    mostrarNota();
  }

  function mover(ficha: HTMLElement, zona: HTMLElement): void {
    zona.append(ficha);
    confirmar(ficha);
    ficha.focus({ preventScroll: true });
  }

  /* ---------- Selección: tocar ficha y después fila ---------- */

  function seleccionar(f: HTMLElement | null): void {
    seleccionada?.setAttribute("aria-pressed", "false");
    seleccionada = f === seleccionada ? null : f;
    seleccionada?.setAttribute("aria-pressed", "true");
    raiz.classList.toggle("hay-seleccion", !!seleccionada);
    mostrarNota();
  }

  activarArrastre(raiz, {
    alSoltar: (ficha) => {
      seleccionar(null);
      confirmar(ficha);
    },
    alTocar: (ficha) => seleccionar(ficha),
  });

  raiz.addEventListener("click", (e) => {
    const t = e.target as Element;
    // Enter o espacio sobre una ficha (el mouse y el dedo pasan por activarArrastre).
    const ficha = t.closest<HTMLElement>(".ficha");
    if (ficha && e.detail === 0) return seleccionar(ficha);
    if (!seleccionada || t.closest(".ficha, .tl-etiqueta, button, input, select, textarea")) return;
    const zona = t.closest<HTMLElement>(".tl-fila")?.querySelector<HTMLElement>("[data-zona]") ?? t.closest<HTMLElement>("[data-zona]");
    if (!zona) return;
    const f = seleccionada;
    seleccionar(null);
    mover(f, zona);
  });

  raiz.addEventListener("keydown", (e) => {
    const f = (e.target as Element).closest<HTMLElement>(".ficha");
    if (!f || e.altKey || e.ctrlKey || e.metaKey) return;
    const zonas = contFilas.querySelectorAll<HTMLElement>("[data-zona]");
    if (/^[1-9]$/.test(e.key) && zonas[+e.key - 1]) mover(f, zonas[+e.key - 1]);
    else if (["0", "Backspace", "Delete"].includes(e.key) && f.parentElement !== banco) mover(f, banco);
    else if (e.key === "ArrowLeft" && f.previousElementSibling) {
      f.after(f.previousElementSibling);
      confirmar();
    } else if (e.key === "ArrowRight" && f.nextElementSibling && f.parentElement !== banco) {
      f.before(f.nextElementSibling);
      confirmar();
    } else if (e.key === "Escape") seleccionar(null);
    else return;
    e.preventDefault();
    f.focus();
  });

  /* ---------- Filtros del banco ---------- */

  function filtrar(): void {
    if (!op.filtros) return;
    const q = $<HTMLInputElement>("[data-buscar]")!.value.trim().toLowerCase();
    const tipo = $<HTMLSelectElement>("[data-tipo]")!.value;
    const exps = new Set([...raiz.querySelectorAll<HTMLInputElement>("[data-exp]:checked")].map((i) => i.value));
    const armas = new Set([...raiz.querySelectorAll<HTMLInputElement>("[data-armadura]:checked")].map((i) => i.value));
    for (const f of banco.querySelectorAll<HTMLElement>(".ficha")) {
      const base = f.dataset.exp === "base";
      f.hidden = !(
        (!q || f.dataset.buscar!.includes(q)) &&
        (tipo === "todas" || (tipo === "base") === base) &&
        (base || exps.has(f.dataset.exp!)) &&
        armas.has(f.dataset.armadura!)
      );
    }
    // Al volver al banco, una ficha filtrada no debe quedar oculta en una fila.
    contFilas.querySelectorAll<HTMLElement>(".ficha[hidden]").forEach((f) => (f.hidden = false));
  }
  if (op.filtros) {
    raiz.querySelector(".tl-filtros")!.addEventListener("input", filtrar);
    const nombres = $<HTMLInputElement>("[data-nombres]")!;
    nombres.addEventListener("change", () => raiz.classList.toggle("con-nombres", nombres.checked));
  }

  /* ---------- Título y plantillas ---------- */

  raiz.querySelectorAll<HTMLInputElement>("[data-subtitulo]").forEach((input) =>
    input.addEventListener("input", () => {
      estado.subtitulo = input.value;
      guardar(estado);
    }),
  );

  const selPlantilla = $<HTMLSelectElement>("[data-plantilla]");
  selPlantilla?.addEventListener("change", () => {
    const p = plantillas.find((x) => x.id === selPlantilla.value);
    selPlantilla.value = "";
    if (!p) return;
    const antes = structuredClone(estado);
    estado = { subtitulo: p.subtitulo, filas: p.tiers.map((t) => ({ ...t, fichas: [] })), notas: {} };
    const tipo = $<HTMLSelectElement>("[data-tipo]");
    if (tipo) tipo.value = p.soloBase ? "base" : "todas";
    pintar();
    guardar(estado);
    deshacible(`Plantilla «${p.nombre}» aplicada`, antes);
  });

  function deshacible(mensaje: string, antes: Estado): void {
    showToast(mensaje, { action: { label: "Deshacer", run: () => ((estado = antes), pintar(), guardar(estado)) } });
  }

  /* ---------- Edición de filas ---------- */

  const dialogo = $<HTMLDialogElement>("[data-dialogo]");
  let filaEditada = "";

  function editarFila(id: string): void {
    if (!dialogo) return;
    const f = estado.filas.find((x) => x.id === id)!;
    filaEditada = id;
    dialogo.querySelector<HTMLInputElement>("[data-fila-nombre]")!.value = f.nombre;
    dialogo.querySelector<HTMLInputElement>("[data-fila-color]")!.value = f.color;
    dialogo.showModal();
  }

  if (dialogo) {
    const nombre = dialogo.querySelector<HTMLInputElement>("[data-fila-nombre]")!;
    const color = dialogo.querySelector<HTMLInputElement>("[data-fila-color]")!;
    const actual = () => estado.filas.find((x) => x.id === filaEditada);
    const cambiar = () => {
      const f = actual();
      if (!f) return;
      f.nombre = nombre.value.trim() || f.nombre;
      f.color = color.value;
      pintar();
      guardar(estado);
    };
    nombre.addEventListener("input", cambiar);
    color.addEventListener("input", cambiar);
    dialogo.addEventListener("click", (e) => {
      const accion = (e.target as HTMLElement).closest<HTMLElement>("[data-fila]")?.dataset.fila;
      const i = estado.filas.findIndex((x) => x.id === filaEditada);
      if (!accion || i < 0) return;
      const antes = structuredClone(estado);
      const filas = estado.filas;
      if (accion === "subir" && i > 0) [filas[i - 1], filas[i]] = [filas[i], filas[i - 1]];
      if (accion === "bajar" && i < filas.length - 1) [filas[i + 1], filas[i]] = [filas[i], filas[i + 1]];
      if (accion === "vaciar") filas[i].fichas = [];
      if (accion === "borrar") {
        if (filas.length <= 1) return showToast("Tiene que quedar al menos una fila");
        filas.splice(i, 1);
        dialogo.close();
        deshacible("Fila borrada", antes);
      }
      pintar();
      guardar(estado);
    });
  }

  $("[data-accion='agregar-fila']")?.addEventListener("click", () => {
    const id = `f${Date.now().toString(36)}`;
    const usados = new Set(estado.filas.map((f) => f.color));
    const color = coloresExtra.find((c) => !usados.has(c)) ?? coloresExtra[0];
    estado.filas.push({ id, nombre: "Nueva", color, fichas: [] });
    pintar();
    guardar(estado);
    editarFila(id);
  });

  $("[data-accion='reiniciar']")!.addEventListener("click", () => {
    const antes = structuredClone(estado);
    estado.filas.forEach((f) => (f.fichas = []));
    estado.notas = {};
    pintar();
    guardar(estado);
    deshacible("Lista vaciada", antes);
  });

  /* ---------- Imagen y enlace ---------- */

  const imagenes = () => new Map([...fichas].map(([id, f]) => [id, f.querySelector("img")!]));
  const nombreArchivo = () =>
    `tierlist-gw2-${(estado.subtitulo || "lista").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w]+/g, "-").replace(/^-|-$/g, "")}.png`;

  $("[data-accion='descargar']")?.addEventListener("click", async () => {
    const url = URL.createObjectURL(await aBlob(await dibujar(estado, imagenes())));
    const a = Object.assign(document.createElement("a"), { href: url, download: nombreArchivo() });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  // Copiar imágenes al portapapeles solo anda en HTTPS (no en http://fedora.lan).
  const copiarImg = $<HTMLButtonElement>("[data-accion='copiar-imagen']");
  if (copiarImg && window.isSecureContext && "ClipboardItem" in window) {
    copiarImg.hidden = false;
    copiarImg.addEventListener("click", async () => {
      try {
        const blob = dibujar(estado, imagenes()).then(aBlob);
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        showToast("Imagen copiada: pegala en Discord o X");
      } catch {
        showToast("No se pudo copiar. Probá con Descargar.");
      }
    });
  }

  $("[data-accion='enlace']")?.addEventListener("click", async () => {
    try {
      await copyText(aEnlace(estado));
      showToast("Enlace copiado: quien lo abra ve tu lista");
    } catch {
      showToast("No se pudo copiar el enlace");
    }
  });

  $("[data-accion='pantalla']")?.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else raiz.requestFullscreen?.().catch(() => showToast("El navegador no dejó pasar a pantalla completa"));
  });

  /* ---------- Versión del directo: EDM y notas ---------- */

  const edmImg = $<HTMLImageElement>("[data-edm-img]");
  const edmTexto = $("[data-edm-texto]");
  const edmCaja = $(".tl-edm");

  function reaccionar(ficha: HTMLElement): void {
    if (!edm || !edmImg || !edmTexto || !edmCaja) return;
    const zona = ficha.closest<HTMLElement>("[data-zona]")!.dataset.zona!;
    const i = estado.filas.findIndex((f) => f.id === zona);
    const tipo = i < 0 ? "pool" : i === 0 ? "arriba" : i === estado.filas.length - 1 ? "abajo" : "medio";
    const fila = estado.filas[i]?.nombre ?? "";
    edmImg.src = edm[tipo];
    edmTexto.textContent = azar(frases[tipo]).replaceAll("{n}", ficha.dataset.nombre!).replaceAll("{t}", fila);
    edmCaja.classList.remove("reacciona");
    void edmCaja.offsetWidth; // reinicia la animación
    edmCaja.classList.add("reacciona");
  }

  const panelNotas = $("[data-notas]");
  const nota = $<HTMLTextAreaElement>("[data-nota]");

  /** Muestra la nota de la ficha elegida, para editarla y en el escenario. */
  function mostrarNota(): void {
    if (!panelNotas || !nota) return;
    const f = seleccionada && seleccionada.parentElement !== banco ? seleccionada : null;
    panelNotas.hidden = !f;
    const escena = $("[data-nota-escena]")!;
    const texto = f ? estado.notas[f.dataset.id!] ?? "" : "";
    escena.hidden = !texto;
    if (!f) return;
    const fila = estado.filas.find((x) => x.fichas.includes(f.dataset.id!))?.nombre ?? "";
    $("[data-nota-etiqueta]")!.textContent = `¿Por qué ${f.dataset.nombre} en ${fila}?`;
    if (document.activeElement !== nota) nota.value = texto;
    $("[data-nota-titulo]")!.textContent = `${f.dataset.nombre} · ${fila}`;
    $("[data-nota-texto]")!.textContent = texto;
  }

  nota?.addEventListener("input", () => {
    if (!seleccionada) return;
    const id = seleccionada.dataset.id!;
    if (nota.value.trim()) {
      estado.notas[id] = nota.value;
      seleccionada.dataset.nota = "";
    } else {
      delete estado.notas[id];
      delete seleccionada.dataset.nota;
    }
    guardar(estado);
    mostrarNota();
  });

  pintar();
}
