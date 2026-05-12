import { WHATSAPP_NUMBER } from "./constants";

type WhatsAppContext =
  | { kind: "general" }
  | { kind: "trial"; disciplina?: string; sede?: string }
  | { kind: "schedule"; disciplina: string; sede: string; dia: string; hora: string }
  | { kind: "competitivo" }
  | { kind: "consultoria" }
  | { kind: "shop" }
  | { kind: "membership" };

const messages: Record<WhatsAppContext["kind"], (ctx: WhatsAppContext) => string> = {
  general: () => "Hola, quería hacer una consulta sobre las clases.",
  trial: (ctx) => {
    const c = ctx as Extract<WhatsAppContext, { kind: "trial" }>;
    const disc = c.disciplina ? ` de ${c.disciplina}` : "";
    const sede = c.sede ? ` en sede ${c.sede}` : "";
    return `Hola, quería agendar mi clase de prueba${disc}${sede}.`;
  },
  schedule: (ctx) => {
    const c = ctx as Extract<WhatsAppContext, { kind: "schedule" }>;
    return `Hola, quería reservar la clase de ${c.disciplina} del ${c.dia} ${c.hora} en sede ${c.sede}.`;
  },
  competitivo: () =>
    "Hola, me interesa sumarme al equipo competitivo. ¿Cómo es el proceso?",
  consultoria: () =>
    "Hola, no estoy seguro qué disciplina probar. ¿Me ayudan a elegir?",
  shop: () => "Hola, quería preguntar por la indumentaria.",
  membership: () => "Hola, quiero información sobre los planes de membresía.",
};

export function whatsappLink(ctx: WhatsAppContext = { kind: "general" }): string {
  const text = messages[ctx.kind](ctx);
  const params = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text,
    type: "phone_number",
    app_absent: "0",
  });
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}
