// Contenido de la portada (src/pages/index.astro).
// ⚠ Todavía hay SUPOSICIONES: los campos `ejemplo: true` o los comentarios EJEMPLO
// marcan lo inventado. Hay que cambiarlo por lo real o quitar la sección (ver todo.md).
import type { ImageMetadata } from "astro";
import edmSaludando from "../assets/brand/edm/saludando.png";
import edmCheer from "../assets/brand/edm/cheer.png";
import edmShrug from "../assets/brand/edm/shrug.png";
import edmRiendo from "../assets/brand/edm/riendo-en-el-suelo.png";
import edmTriste from "../assets/brand/edm/triste.png";
import edmHiss from "../assets/brand/edm/hiss.png";
import edmGritando from "../assets/brand/edm/gritando.png";
import edmSorprendida from "../assets/brand/edm/sorprendida.png";
import edmApuntando from "../assets/brand/edm/apuntando.png";
import edmBrazosArriba from "../assets/brand/edm/brazos-arriba.png";
import edmArrodillada from "../assets/brand/edm/arrodillada.png";
import edmCabizbaja from "../assets/brand/edm/triste-mirando-al-suelo.png";
import miniMarca from "../assets/brand/miniaturas/01-marca.png";
import miniGuia from "../assets/brand/miniaturas/08-guia.png";
import miniSerie from "../assets/brand/miniaturas/05-serie.png";
import miniReaccion from "../assets/brand/miniaturas/09-reaccion.png";
import miniTier from "../assets/brand/miniaturas/06-tierlist.png";

/* ------------------------------------------------------------------ */
/* Horario (EJEMPLO). Horas de Argentina (UTC−3, sin horario de verano). */
/* ------------------------------------------------------------------ */
export interface Directo {
  /** 0 = domingo … 6 = sábado, como Date.getDay(). */
  dia: number;
  hora: string; // "21:00"
  duracionHoras: number;
  plan: string;
  emoji: string;
}
export const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const horario: Directo[] = [
  { dia: 2, hora: "21:00", duracionHoras: 3, plan: "Fractales con el chat", emoji: "⚔️" },
  { dia: 4, hora: "21:00", duracionHoras: 3, plan: "Mundo abierto y charla", emoji: "🗺️" },
  { dia: 6, hora: "17:00", duracionHoras: 4, plan: "Sábado de lo que pinte", emoji: "🎲" },
];
export const zonaHoraria = "hora de Argentina";

/* ------------------------------------------------------------------ */
/* Sobre mí (EJEMPLO: la historia y los datos son supuestos).          */
/* ------------------------------------------------------------------ */
export const sobreMi = {
  parrafos: [
    "Soy Weasel, argentino, y un día me animé a prender la cámara. Empecé a streamear en 2026 casi sin saber nada de OBS, y fui armando el canal de a poco: las escenas, la música, los personajes… todo hecho a mano.",
    "¿Por qué Weasel Shiro? Weasel es comadreja en inglés, y shiro es blanco en japonés: un armiño blanco, como la mascota. Lo de los auriculares es porque la música es parte de cada directo.",
    "Juego Guild Wars 2 sin ser un experto: me pierdo en los mapas, muero en los fractales y pregunto todo. La idea es aprender juntos, con buena onda y un mate siempre a mano.",
  ],
  ficha: [
    { k: "Desde", v: "Argentina 🇦🇷" },
    { k: "Juego principal", v: "Guild Wars 2" },
    { k: "Clase favorita", v: "Guardián (EJEMPLO)" },
    { k: "Mate", v: "Amargo, con palo" },
    { k: "Música", v: "Siempre algo sonando" },
    { k: "Streameando desde", v: "2026" },
  ],
};

/* ------------------------------------------------------------------ */
/* Personajes del canal.                                               */
/* ------------------------------------------------------------------ */
export const personajes = [
  {
    id: "weasel",
    nombre: "Weasel",
    rol: "El que juega",
    texto: "Pone el mate, la música y la cara. Se pierde en los mapas con una seguridad admirable.",
    dato: "Frase típica: “Esperá que ya entiendo”.",
  },
  {
    id: "armino",
    nombre: "Armiño",
    rol: "La mascota",
    texto: "Un armiño blanco con auriculares. No juega, pero opina de todo. Si alguien lo nombra en el chat, se asoma.",
    dato: "Escribí “armiño” en el chat y fijate.",
  },
  {
    id: "edm",
    nombre: "EDM",
    rol: "La co-host",
    texto: "El personaje de Guild Wars 2 de Weasel. Impaciente, curiosa y bastante sarcástica. Saluda a cada persona nueva del chat.",
    dato: "Su nombre completo es un chiste interno. No preguntes.",
  },
];

/* ------------------------------------------------------------------ */
/* Números del canal (EJEMPLO).                                        */
/* ------------------------------------------------------------------ */
export const numeros = [
  { valor: "24", etiqueta: "directos hechos" },
  { valor: "62 h", etiqueta: "en vivo" },
  { valor: "~380", etiqueta: "mates cebados" },
  { valor: "∞", etiqueta: "veces que EDM tuvo razón" },
];

/* ------------------------------------------------------------------ */
/* Franja debajo del banner (variante 6).                              */
/* ------------------------------------------------------------------ */
/** EJEMPLO: fecha del primer directo, para contar los días de la aventura. */
export const inicioCanal = "2026-09-28";

export interface DatoFranja {
  valor: string;
  etiqueta: string;
  /** "dia": el valor se recalcula en el navegador a partir de inicioCanal. */
  auto?: "dia";
}

const diasDesde = (fecha: string) => Math.floor((Date.now() - Date.parse(`${fecha}T00:00:00-03:00`)) / 864e5) + 1;

/* ------------------------------------------------------------------ */
/* Metas: requisitos reales de Afiliado de Twitch, con progreso EJEMPLO. */
/* ------------------------------------------------------------------ */
export const metas = {
  titulo: "Camino a Afiliado de Twitch",
  items: [
    { nombre: "Seguidores", actual: 31, meta: 50, unidad: "" },
    { nombre: "Horas en vivo (últimos 30 días)", actual: 6.5, meta: 8, unidad: " h" },
    { nombre: "Días distintos con directo", actual: 7, meta: 7, unidad: "" },
    { nombre: "Promedio de espectadores", actual: 2.4, meta: 3, unidad: "" },
  ],
  premio: "Al llegar: stream especial de festejo con la pava a full y emotes de EDM para el canal.",
};

/* ------------------------------------------------------------------ */
/* Emotes / stickers de EDM (las poses existen; los nombres son EJEMPLO). */
/* ------------------------------------------------------------------ */
export const emotes: { nombre: string; img: ImageMetadata; uso: string }[] = [
  { nombre: "edmHola", img: edmSaludando, uso: "para saludar" },
  { nombre: "edmHype", img: edmCheer, uso: "cuando sale el loot" },
  { nombre: "edmLOL", img: edmRiendo, uso: "cuando Weasel se cae" },
  { nombre: "edmShrug", img: edmShrug, uso: "“ni idea”" },
  { nombre: "edmF", img: edmTriste, uso: "wipe en el fractal" },
  { nombre: "edmHiss", img: edmHiss, uso: "backseat no pedido" },
  { nombre: "edmGRITO", img: edmGritando, uso: "jefe al 1 %" },
  { nombre: "edmQue", img: edmSorprendida, uso: "plot twist" },
  { nombre: "edmMira", img: edmApuntando, uso: "¡ahí está el cofre!" },
  { nombre: "edmWiii", img: edmBrazosArriba, uso: "subieron de nivel" },
  { nombre: "edmPorfa", img: edmArrodillada, uso: "pedir un mate" },
  { nombre: "edmSad", img: edmCabizbaja, uso: "se terminó el directo" },
];

/* ------------------------------------------------------------------ */
/* Lo que pasa en el chat. Las 3 primeras ya existen en las escenas de OBS. */
/* ------------------------------------------------------------------ */
export const comandos = [
  { cmd: "!edm", que: "EDM te contesta en pantalla con una frase al azar.", real: true },
  { cmd: "mate", que: "Nombrá el mate en cualquier mensaje y EDM opina al respecto.", real: true },
  { cmd: "armiño", que: "Nombrá al Armiño y se asoma desde abajo de la pantalla.", real: true },
  { cmd: "jaja", que: "Si el chat se ríe, EDM se tira al piso de la risa.", real: true },
  { cmd: "tu primer mensaje", que: "EDM te saluda por tu nombre la primera vez que hablás.", real: true },
  { cmd: "!horario", que: "Te dice cuándo es el próximo directo.", real: false },
  { cmd: "!redes", que: "YouTube, X y esta web.", real: false },
  { cmd: "!lurk", que: "Avisá que mirás de fondo. Cuenta igual, y mucho.", real: false },
];

/* ------------------------------------------------------------------ */
/* Reglas del chat (EJEMPLO, pensadas para el tono del canal).          */
/* ------------------------------------------------------------------ */
export const reglas = [
  { titulo: "Buena onda ante todo", texto: "Acá nadie sabe todo. Ni Weasel. Sobre todo Weasel." },
  { titulo: "El backseat se pide, no se impone", texto: "Si Weasel pide ayuda, ¡a full! Si no, dejalo equivocarse en paz." },
  { titulo: "Nada de spoilers", texto: "De historias, de juegos y de finales de temporada. Avisá antes." },
  { titulo: "Cero odio", texto: "Sin insultos, sin discriminación, sin discusiones de política. Se banean sin aviso." },
  { titulo: "Todos los idiomas, todas las experiencias", texto: "Recién llegados y veteranos de Tyria son igual de bienvenidos." },
];

/* ------------------------------------------------------------------ */
/* Videos de YouTube (las miniaturas son reales; títulos EJEMPLO).      */
/* ------------------------------------------------------------------ */
export const videos = [
  { titulo: "Cómo empezar en Guild Wars 2 (sin morir en el intento)", img: miniGuia, duracion: "12:40" },
  { titulo: "La aventura sigue · Día 12", img: miniSerie, duracion: "1:58:03" },
  { titulo: "¿¡QUÉ!? Lo mejor del mes", img: miniReaccion, duracion: "8:15" },
  { titulo: "Tier list de clases según alguien que recién empieza", img: miniTier, duracion: "15:22" },
  { titulo: "Directo completo: juegos, mate y charla", img: miniMarca, duracion: "2:31:10" },
];

/* ------------------------------------------------------------------ */
/* Cómo apoyar.                                                        */
/* ------------------------------------------------------------------ */
export const apoyar = {
  gratis: [
    { emoji: "💜", que: "Seguir en Twitch", detalle: "Y activar la campanita para enterarte cuando arranco." },
    { emoji: "👀", que: "Dejar el directo abierto", detalle: "Aunque mires de fondo, suma un montón para un canal chico." },
    { emoji: "💬", que: "Escribir en el chat", detalle: "Un “hola” ya cuenta. EDM te va a saludar." },
    { emoji: "🔁", que: "Compartir", detalle: "Un clip, un video o esta página con alguien a quien le pueda gustar." },
    { emoji: "👑", que: "Sub con Prime", detalle: "Si tenés Amazon Prime, tenés una sub gratis por mes para regalar." },
  ],
  cafecito: { url: "https://cafecito.app/weasel_shiro", texto: "Invitame un cafecito", nota: "Aunque acá se toma mate 🧉" },
};

/* ------------------------------------------------------------------ */
/* Presentación del banner y preguntas frecuentes.                     */
/* ------------------------------------------------------------------ */
/** Texto de presentación en voseo. */
export const intro =
  "¡Hola! Soy Weasel. Streameo Guild Wars 2 (y lo que pinte), aprendo sobre la marcha y siempre hay un mate cerca. Pasá, ponete cómodo.";

export const preguntas = [
  { q: "¿Cuándo hay directo?", a: "Los avisos salen en X. Si me seguís en Twitch, te llega la notificación apenas arranco." },
  { q: "Soy nuevo en Guild Wars 2, ¿puedo pasar igual?", a: "¡Obvio! El canal también aprende sobre la marcha. Preguntá lo que quieras en el chat." },
  { q: "¿Para qué son los mensajes de GW2?", a: "Son mensajes listos para copiar y pegar en el chat del juego: LFG, explicaciones de jefes, etc." },
  { q: "¿Jugás otras cosas?", a: "Guild Wars 2 es el principal, pero estoy abierto a probar otros juegos. ¿Alguna sugerencia?" },
];

export const preguntasExtra = [
  { q: "¿Tengo que jugar Guild Wars 2 para pasar?", a: "Para nada. La mitad del directo es charla. Y si te dan ganas de probarlo, el juego base es gratis." },
  { q: "¿Puedo jugar con Weasel?", a: "En los directos de fractales y mundo abierto se arman grupos con el chat. Preguntá en el directo." },
  { q: "¿Qué música suena en los directos?", a: "Música libre de derechos y temas que no traigan problemas con Twitch. Si te gusta uno, preguntá: aparece en pantalla." },
];

/** Se arma acá abajo porque usa las metas y el horario de más arriba. */
export const franja: DatoFranja[] = [
  { valor: `Día ${diasDesde(inicioCanal)}`, etiqueta: "de la aventura", auto: "dia" },
  { valor: String(horario.length), etiqueta: "directos por semana" },
  { valor: `${metas.items[0].actual}/${metas.items[0].meta}`, etiqueta: "seguidores para Afiliado" },
  { valor: "∞", etiqueta: "veces que EDM tuvo razón" },
];
