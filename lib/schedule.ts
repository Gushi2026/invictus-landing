import scheduleData from "@/content/schedule.json";
import disciplinasData from "@/content/disciplinas.json";
import sedesData from "@/content/sedes.json";
import type { Dia } from "./constants";

export type ScheduleEntry = {
  sede: string;
  disciplina: string;
  dias: Dia[];
  hora: string;
  nivel?: string;
};

export type Disciplina = {
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  intencion: string[];
  infantil: boolean;
  soloEn?: string;
};

export type HorarioAtencion = {
  lun_vie: string;
  sab: string | null;
  dom: string | null;
};

export type Sede = {
  slug: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  pais: string;
  coords: { lat: number; lng: number };
  mapsUrl: string;
  horario_atencion?: HorarioAtencion;
};

export const schedule = scheduleData as ScheduleEntry[];
export const disciplinas = disciplinasData as Disciplina[];
export const sedes = sedesData as Sede[];

export function disciplinaBySlug(slug: string): Disciplina | undefined {
  return disciplinas.find((d) => d.slug === slug);
}

export function sedeBySlug(slug: string): Sede | undefined {
  return sedes.find((s) => s.slug === slug);
}

export function scheduleBySede(sedeSlug: string): ScheduleEntry[] {
  return schedule.filter((e) => e.sede === sedeSlug);
}

export function scheduleByDisciplina(disciplinaSlug: string): ScheduleEntry[] {
  return schedule.filter((e) => e.disciplina === disciplinaSlug);
}

export function scheduleByDia(dia: Dia): ScheduleEntry[] {
  return schedule.filter((e) => e.dias.includes(dia));
}

export function expandSchedule(): Array<ScheduleEntry & { dia: Dia }> {
  return schedule.flatMap((e) =>
    e.dias.map((dia) => ({ ...e, dia })),
  );
}

// ============================================================
// TIMETABLE V2 — helpers de grilla, current/next class, formato
// ============================================================

/** Días que se muestran en la grilla. Solo lun-vie por data actual. */
export const DAYS: Dia[] = ["lun", "mar", "mie", "jue", "vie"];

/** Etiquetas cortas para los días en headers de grid */
export const DAY_LABEL_SHORT: Record<Dia, string> = {
  lun: "Lun",
  mar: "Mar",
  mie: "Mié",
  jue: "Jue",
  vie: "Vie",
  sab: "Sáb",
  dom: "Dom",
};

/** Slugs de disciplinas → labels cortas pero LEGIBLES para mostrar en cells del grid */
export const DISC_LABEL: Record<string, string> = {
  boxeo: "Boxeo",
  "kick-boxing": "Kick Boxing",
  "muay-thai": "Muay Thai",
  mma: "MMA",
  "mma-infantil": "MMA Niños",
  lucha: "Lucha",
  bjj: "BJJ",
  taekwondo: "Taekwondo",
};

/** @deprecated Usar DISC_LABEL en su lugar — mantenido por backwards compat */
export const DISC_SHORT = DISC_LABEL;

/** Map de día JS (0=Dom..6=Sáb) → nuestro Dia code */
const JS_DAY_TO_DIA: Record<number, Dia> = {
  0: "dom",
  1: "lun",
  2: "mar",
  3: "mie",
  4: "jue",
  5: "vie",
  6: "sab",
};

/** Devuelve el Dia code (lun/mar/...) para una fecha JS */
export function diaFromDate(date: Date): Dia {
  return JS_DAY_TO_DIA[date.getDay()];
}

/** Convierte "HH:MM" a minutos desde medianoche */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Devuelve los minutos desde medianoche de una fecha JS */
export function dateToMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/**
 * Obtiene la lista única de horas (HH:MM) que aparecen en el schedule
 * para una sede dada, ordenadas. Si no se pasa sede, todas.
 */
export function getHoursForSede(sedeSlug?: string): string[] {
  const entries = sedeSlug ? scheduleBySede(sedeSlug) : schedule;
  const hours = new Set(entries.map((e) => e.hora));
  return Array.from(hours).sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
}

/**
 * Obtiene la entry que está en curso AHORA en la sede dada.
 * Una clase "está en curso" si:
 *  - el día actual es uno de sus `dias`
 *  - la hora actual está dentro de [hora, hora + 60min) — asumimos clases de 60min
 */
export function getCurrentClass(
  now: Date,
  sedeSlug: string,
): ScheduleEntry | null {
  const dia = diaFromDate(now);
  const nowMin = dateToMinutes(now);
  const sedeEntries = scheduleBySede(sedeSlug);

  const found = sedeEntries.find((e) => {
    if (!e.dias.includes(dia)) return false;
    const start = timeToMinutes(e.hora);
    return nowMin >= start && nowMin < start + 60;
  });

  return found ?? null;
}

/**
 * Obtiene la próxima clase en la sede dada después del momento `now`.
 * Busca en el día actual primero, después en los siguientes días de la semana.
 * Devuelve la entry + el Dia en que cae + el Date target.
 */
export function getNextClass(
  now: Date,
  sedeSlug: string,
): { entry: ScheduleEntry; dia: Dia; targetDate: Date } | null {
  const sedeEntries = scheduleBySede(sedeSlug);
  const nowMin = dateToMinutes(now);

  // Iterar desde hoy hacia adelante 7 días buscando la próxima clase
  for (let offset = 0; offset < 7; offset++) {
    const target = new Date(now);
    target.setDate(now.getDate() + offset);
    const dia = diaFromDate(target);

    // Entries del día candidato, ordenadas por hora
    const candidates = sedeEntries
      .filter((e) => e.dias.includes(dia))
      .sort((a, b) => timeToMinutes(a.hora) - timeToMinutes(b.hora));

    const next = candidates.find((e) => {
      const start = timeToMinutes(e.hora);
      // Si es hoy: tiene que ser después de ahora. Otro día: cualquiera.
      if (offset === 0) return start > nowMin;
      return true;
    });

    if (next) {
      const [h, m] = next.hora.split(":").map(Number);
      const targetDate = new Date(target);
      targetDate.setHours(h, m, 0, 0);
      return { entry: next, dia, targetDate };
    }
  }

  return null;
}

/**
 * Formatea cuánto tiempo falta hasta `target`.
 *  - <60min: "en X min"
 *  - <24h: "en Xh Ym"
 *  - 1d-6d: "en X días"
 */
export function formatTimeRemaining(now: Date, target: Date): string {
  const diffMs = target.getTime() - now.getTime();
  if (diffMs < 0) return "ya pasó";
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 60) return `en ${diffMin} min`;

  const diffHr = Math.floor(diffMin / 60);
  const remMin = diffMin % 60;

  if (diffHr < 24) {
    return remMin > 0 ? `en ${diffHr}h ${remMin}m` : `en ${diffHr}h`;
  }

  const diffDays = Math.floor(diffHr / 24);
  return `en ${diffDays} ${diffDays === 1 ? "día" : "días"}`;
}

