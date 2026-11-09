// Constantes compartidas entre el build y el navegador (sin dependencias de Astro).

/** Límite de caracteres de un mensaje en el chat de Guild Wars 2. */
export const GW2_CHAT_LIMIT = 199;

/** Pestaña que solo existe en el navegador, con los mensajes propios de cada persona. */
export const CUSTOM_TAB = { id: "personalizado", name: "Personalizado" } as const;
