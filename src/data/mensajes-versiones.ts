// Versiones de /gw2/mensajes/ que se comparan para elegir una (como se hizo con la tierlist).

export interface VersionMensajes {
  slug: string;
  nombre: string;
  idea: string;
  suma: string[];
}

export const versiones: VersionMensajes[] = [
  {
    slug: "marca",
    nombre: "1 · Con la marca",
    idea: "La misma página, vestida como la portada y la tierlist: más ancha, títulos de la marca y los pasos a la vista.",
    suma: ["Título y textos en voseo", "Buscador y pestañas en una barra", "Pestañas con cantidad de mensajes", "Tarjetas con borde y sombra de la marca", "Cómo se usa, en tres pasos"],
  },
  {
    slug: "armino",
    nombre: "2 · Con el Armiño",
    idea: "La 1, más el Armiño al costado: explica cómo se usa, habla cuando copiás y te muestra cómo se va a ver en el chat del juego.",
    suma: ["El Armiño acompaña mientras bajás", "Reacciona al copiar", "Vista previa del mensaje en el chat de GW2", "Avisa si el mensaje se pasa de 199"],
  },
  {
    slug: "escenario",
    nombre: "3 · El escenario",
    idea: "La 2 llevada a la portada: banner diagonal, franja de números, categorías como fichas y EDM opinando en un escenario como el de la tierlist.",
    suma: ["Banner y franja como la portada", "Categorías en una columna, con ícono", "EDM cambia de pose y opina de cada categoría", "Elegís el canal (/map, /squad…) y se copia con el comando", "Mensajes como bocadillos"],
  },
];

/** Lo que dice el Armiño (versión 2) y EDM (versión 3). Sin dependencias de Astro: lo usa el navegador. */
export const frases = {
  armino: {
    inicio: "Tocá un mensaje y se copia solo. Después, en el juego: Enter, Ctrl+V y Enter.",
    copiado: [
      "¡Copiado! Ahora Enter y Ctrl+V en el juego.",
      "Listo, ya lo tenés. Pegalo antes de que se te olvide.",
      "Copiado. Yo no puedo pegarlo, no tengo dedos. Bueno, sí, pero no.",
      "¡Ese está bueno! Ya está en tu portapapeles.",
    ],
    largo: "Ojo: tiene más de 199 caracteres y el juego lo va a cortar. Editalo con el lápiz.",
    categorias: {
      "mundo-abierto": "Metas, trenes y eventos. Lo de todos los días.",
      fractales: "Para armar grupo de fractales sin escribir todo a las apuradas.",
      raids: "Raids: acá conviene tener todo escrito de antemano.",
      personalizado: "Tus mensajes. Tocá «Agregar mensaje» y escribí el tuyo.",
    } as Record<string, string>,
  },
  edm: {
    inicio: "Elegí una categoría y tocá un mensaje. Yo superviso.",
    copiado: [
      "Copiado. Ahora pegalo, que no muerde.",
      "¿Ese? Bueno, vos sabrás.",
      "Enter, Ctrl+V, Enter. No es tan difícil, Weasel.",
      "¡Listo! Que se entere todo el mapa.",
      "Lo copié yo. Bueno, el navegador. Pero yo miré.",
    ],
    largo: "¡Te pasaste de 199! El juego lo va a cortar a la mitad.",
    categorias: {
      "mundo-abierto": "¿Otra vez el tren de champions? Bueno, dale.",
      fractales: "Fractales con Weasel. Llevá comida extra, por las dudas.",
      raids: "Raids. Respirá hondo y leé las mecánicas.",
      personalizado: "¿Mensajes propios? Mirá vos, qué organizado.",
    } as Record<string, string>,
  },
};

/** Canales del chat de GW2: el comando se pone delante del mensaje al copiarlo (versión 3). */
export const canales = [
  { id: "", nombre: "El que tengas", comando: "", etiqueta: "", color: "#f2f2f2" },
  { id: "map", nombre: "Mapa", comando: "/map ", etiqueta: "[Mapa]", color: "#e8d5a6" },
  { id: "squad", nombre: "Escuadrón", comando: "/squad ", etiqueta: "[Escuadrón]", color: "#8fd3ff" },
  { id: "party", nombre: "Grupo", comando: "/party ", etiqueta: "[Grupo]", color: "#6fa8ff" },
  { id: "guild", nombre: "Clan", comando: "/guild ", etiqueta: "[Clan]", color: "#86e07e" },
  { id: "say", nombre: "Decir", comando: "/say ", etiqueta: "[Decir]", color: "#ffffff" },
];
