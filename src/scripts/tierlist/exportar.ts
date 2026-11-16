// Dibuja la tierlist en un canvas para descargarla o copiarla como imagen
// El estilo copia la miniatura de tierlist de YouTube.
import type { Estado } from "./estado";

const ANCHO = 1280;
const MARGEN = 40;
const ETIQUETA = 130;
const ICONO = 92;
const HUECO = 10;
const CHARCOAL = "#212121";
const AMBER = "#ff9103";

function rectRedondeado(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Achica la letra hasta que el texto entre en el ancho (y en dos líneas como mucho). */
function textoAjustado(ctx: CanvasRenderingContext2D, texto: string, cx: number, cy: number, ancho: number, fuente: (px: number) => string) {
  const palabras = texto.split(/\s+/);
  for (let px = 52; px >= 14; px -= 2) {
    ctx.font = fuente(px);
    if (ctx.measureText(texto).width <= ancho) return ctx.fillText(texto, cx, cy);
    if (palabras.length > 1 && px <= 30) {
      const mitad = Math.ceil(palabras.length / 2);
      const [a, b] = [palabras.slice(0, mitad).join(" "), palabras.slice(mitad).join(" ")];
      if (Math.max(ctx.measureText(a).width, ctx.measureText(b).width) <= ancho) {
        ctx.fillText(a, cx, cy - px * 0.55);
        return ctx.fillText(b, cx, cy + px * 0.55);
      }
    }
  }
  ctx.fillText(texto, cx, cy);
}

export async function dibujar(e: Estado, imagenes: Map<string, HTMLImageElement>): Promise<HTMLCanvasElement> {
  await Promise.all([
    document.fonts.load('900 italic 80px "Montserrat Variable"'),
    document.fonts.load('40px "Russo One"'),
    document.fonts.load('700 24px "Lilita One"'),
  ]);
  await Promise.all([...imagenes.values()].map((img) => img.decode().catch(() => {})));

  const porLinea = Math.floor((ANCHO - 2 * MARGEN - ETIQUETA - HUECO) / (ICONO + HUECO));
  const altos = e.filas.map((f) => Math.max(1, Math.ceil(f.fichas.length / porLinea)) * (ICONO + HUECO) + HUECO);
  const cabecera = 150;
  const pie = 50;
  const alto = cabecera + altos.reduce((a, b) => a + b + HUECO, 0) + pie;

  const canvas = document.createElement("canvas");
  canvas.width = ANCHO;
  canvas.height = alto;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = CHARCOAL;
  ctx.fillRect(0, 0, ANCHO, alto);

  // Cabecera: TIER blanco y LIST naranja, con la etiqueta del tema al lado.
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.font = '900 italic 84px "Montserrat Variable"';
  ctx.lineWidth = 10;
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#111";
  const y = 80;
  ctx.strokeText("TIER", MARGEN, y);
  ctx.fillStyle = "#f2f2f2";
  ctx.fillText("TIER", MARGEN, y);
  const xList = MARGEN + ctx.measureText("TIER ").width;
  ctx.strokeText("LIST", xList, y);
  ctx.fillStyle = AMBER;
  ctx.fillText("LIST", xList, y);
  const finTitulo = xList + ctx.measureText("LIST").width + 30;
  if (e.subtitulo.trim()) {
    ctx.font = '900 italic 34px "Montserrat Variable"';
    const txt = e.subtitulo.trim().toUpperCase();
    const w = ctx.measureText(txt).width + 44;
    ctx.fillStyle = AMBER;
    rectRedondeado(ctx, finTitulo, y - 30, w, 60, 8);
    ctx.fill();
    ctx.fillStyle = CHARCOAL;
    ctx.fillText(txt, finTitulo + 22, y + 2);
  }
  ctx.font = '600 22px "Montserrat Variable"';
  ctx.fillStyle = "#b5b5b5";
  ctx.textAlign = "right";
  ctx.fillText("Guild Wars 2", ANCHO - MARGEN, y);

  // Filas
  let top = cabecera;
  e.filas.forEach((f, i) => {
    const h = altos[i];
    ctx.fillStyle = f.color;
    rectRedondeado(ctx, MARGEN, top, ETIQUETA, h, 12);
    ctx.fill();
    ctx.fillStyle = CHARCOAL;
    ctx.textAlign = "center";
    textoAjustado(ctx, f.nombre, MARGEN + ETIQUETA / 2, top + h / 2 + 2, ETIQUETA - 20, (px) => `${px}px "Russo One"`);

    ctx.fillStyle = "#2b2b2b";
    rectRedondeado(ctx, MARGEN + ETIQUETA + HUECO, top, ANCHO - 2 * MARGEN - ETIQUETA - HUECO, h, 12);
    ctx.fill();
    f.fichas.forEach((id, j) => {
      const img = imagenes.get(id);
      if (!img) return;
      const x = MARGEN + ETIQUETA + 2 * HUECO + (j % porLinea) * (ICONO + HUECO);
      const yy = top + HUECO + Math.floor(j / porLinea) * (ICONO + HUECO);
      ctx.drawImage(img, x, yy, ICONO, ICONO);
    });
    top += h + HUECO;
  });

  // Pie
  ctx.font = '22px "Lilita One"';
  ctx.fillStyle = "#8a8a8a";
  ctx.textAlign = "right";
  ctx.fillText("Weasel Shiro · tierlist de GW2", ANCHO - MARGEN, alto - pie / 2);
  return canvas;
}

export const aBlob = (c: HTMLCanvasElement) =>
  new Promise<Blob>((ok, mal) => c.toBlob((b) => (b ? ok(b) : mal(new Error("No se pudo generar la imagen"))), "image/png"));
