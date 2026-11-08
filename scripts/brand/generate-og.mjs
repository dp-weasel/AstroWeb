// Captura scripts/brand/og-card.html como public/og.png (1200×630) con Chrome sin interfaz.
//   npm run brand:og
// Usa `google-chrome` del sistema; otra ruta se indica con CHROME=/ruta/al/navegador.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const chrome = process.env.CHROME || "google-chrome";
const card = pathToFileURL(resolve("scripts/brand/og-card.html")).href;
const out = resolve("public/og.png");
const profile = mkdtempSync(join(tmpdir(), "og-chrome-"));

try {
  execFileSync(chrome, [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--allow-file-access-from-files",
    `--user-data-dir=${profile}`,
    "--window-size=1200,630",
    "--virtual-time-budget=3000", // espera a que carguen las fuentes
    `--screenshot=${out}`,
    card,
  ], { stdio: "inherit" });
  console.log(`Imagen generada: ${out}`);
} finally {
  rmSync(profile, { recursive: true, force: true });
}
