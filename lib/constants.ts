export const WHATSAPP_NUMBER = "5492216945593";

export const WHATSAPP_BASE_URL =
  "https://api.whatsapp.com/send/?phone=" +
  WHATSAPP_NUMBER +
  "&type=phone_number&app_absent=0";

export const SHOP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScCKwr2NewvF_6fyfqsPVlClLKEii6At9MKV-l9XKJROjfyhw/viewform?usp=header";

export const INSTAGRAM_URL = "https://www.instagram.com/invictuslaplata/";

/** Pagos — actualizar cuando dueños confirmen método */
export const MERCADO_PAGO_URL = ""; // ej: "https://mpago.la/XXXXXX"
export const TRANSFERENCIA = {
  alias: "", // ej: "INVICTUS.LA-PLATA"
  cbu: "", // ej: "0000003100000000000000"
  titular: "", // ej: "Martín Giralda"
} as const;
export const PRECIO_MENSUAL = ""; // ej: "$XX.XXX"

/**
 * Blur placeholder negro Invictus (1x1 PNG base64).
 * Para usar como `placeholder="blur"` + `blurDataURL={BLUR_BLACK}` en next/image.
 * Da un fade-in suave desde negro mientras carga la imagen.
 */
export const BLUR_BLACK =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

export const BRAND = {
  nombre: "INVICTUS",
  nombreCompleto: "INVICTUS Mixed Martial Arts",
  ciudad: "La Plata",
  tagline: "La actitud se entrena.",
} as const;

export const DIAS = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"] as const;
export type Dia = (typeof DIAS)[number];

export const DIAS_LABEL: Record<Dia, string> = {
  lun: "Lunes",
  mar: "Martes",
  mie: "Miércoles",
  jue: "Jueves",
  vie: "Viernes",
  sab: "Sábado",
  dom: "Domingo",
};

export const DIAS_LABEL_SHORT: Record<Dia, string> = {
  lun: "Lun",
  mar: "Mar",
  mie: "Mié",
  jue: "Jue",
  vie: "Vie",
  sab: "Sáb",
  dom: "Dom",
};
