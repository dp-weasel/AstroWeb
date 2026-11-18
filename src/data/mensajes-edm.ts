// Lo que dice EDM en /gw2/mensajes/. Sin dependencias de Astro: lo usa también el navegador.

export const frasesEdm = {
  inicio: "Elegí una categoría y tocá un mensaje. Yo superviso.",
  copiado: [
    "Copiado. Ahora pegalo, que no muerde.",
    "¿Ese? Bueno, vos sabrás.",
    "Enter, Ctrl+V, Enter. No es tan difícil, Weasel.",
    "¡Listo! Que se entere todo el mapa.",
    "Lo copié yo. Bueno, el navegador. Pero yo miré.",
  ],
  largo: "¡Te pasaste de 199! El juego lo va a cortar a la mitad. Editalo con el lápiz.",
  /** Por id de pestaña (nombre del YAML en src/content/mensajes/). Las que no estén usan `otra`. */
  categorias: {
    "mundo-abierto": "¿Otra vez el tren de champions? Bueno, dale.",
    fractales: "Fractales con Weasel. Llevá comida extra, por las dudas.",
    raids: "Raids. Respirá hondo y leé las mecánicas.",
    personalizado: "¿Mensajes propios? Mirá vos, qué organizado.",
  } as Record<string, string>,
  otra: "Buena elección. Creo.",
};
