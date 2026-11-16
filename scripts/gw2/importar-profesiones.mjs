// Copia los íconos de profesiones y élites de RecursosCC a src/assets/gw2/profesiones/.
//   npm run gw2:iconos
// Los originales vienen de la wiki con márgenes muy distintos (algunos son un
// símbolo chiquito en un lienzo de 512 px): se recorta el margen transparente y
// se centran todos en un cuadrado de 256 px para que se vean del mismo tamaño.
// Solo hace falta volver a correrlo si cambian o se suman íconos.
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ORIGEN = process.argv[2] ?? "../RecursosCC/GW2/Profesiones";
const DESTINO = "src/assets/gw2/profesiones";
const LADO = 256;
const MARGEN = 8;
/** Píxeles con menos opacidad que esto (0–255) cuentan como margen: algunos íconos traen un halo casi invisible. */
const ALFA_MINIMO = 48;

/** Rectángulo que ocupan los píxeles visibles de la imagen. */
async function cajaVisible(img) {
  const { data, info } = await img.clone().raw().toBuffer({ resolveWithObject: true });
  let x0 = info.width, y0 = info.height, x1 = -1, y1 = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * info.channels + 3] < ALFA_MINIMO) continue;
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

await mkdir(DESTINO, { recursive: true });
for (const archivo of (await readdir(ORIGEN)).filter((f) => f.endsWith(".png")).sort()) {
  // "002-Dragonhunter_icon_(highres).png" → "dragonhunter"
  const slug = archivo.replace(/^\d+-/, "").replace(/_icon.*$/, "").toLowerCase();
  const original = sharp(path.join(ORIGEN, archivo)).ensureAlpha();
  const caja = await cajaVisible(original);
  await original
    .extract(caja)
    .resize(LADO - 2 * MARGEN, LADO - 2 * MARGEN, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: MARGEN, bottom: MARGEN, left: MARGEN, right: MARGEN, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(path.join(DESTINO, `${slug}.png`));
  console.log(`${archivo} → ${slug}.png`);
}
