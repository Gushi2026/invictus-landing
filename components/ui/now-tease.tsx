"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  disciplinaBySlug,
  formatTimeRemaining,
  getCurrentClass,
  getNextClass,
  sedeBySlug,
  type ScheduleEntry,
} from "@/lib/schedule";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type NowTeaseProps = {
  sedeSlug: string;
  className?: string;
};

/**
 * Header dinámico "AHORA / PRÓXIMA" basado en la hora real del cliente.
 *  - Si hay clase en curso para la sede dada → la muestra con dot rojo pulsante.
 *  - Sino → muestra la próxima clase + countdown ("en 2h 15m").
 *  - Tick cada 60s para refrescar countdown.
 */
export function NowTease({ sedeSlug, className }: NowTeaseProps) {
  const [now, setNow] = useState<Date | null>(null);

  // Inicializar y tickear cada minuto. SSR-safe: arranca en null.
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // SSR / pre-mount: render placeholder estático para evitar hydration mismatch
  if (!now) {
    return (
      <div
        className={cn(
          "flex flex-col gap-2 rounded-2xl border border-white/10 bg-invictus-black/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
          className,
        )}
        aria-label="Próxima clase"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-invictus-gray-500">
            Próxima
          </span>
          <span className="text-sm text-invictus-gray-300">Cargando…</span>
        </div>
      </div>
    );
  }

  const sede = sedeBySlug(sedeSlug);
  const current = getCurrentClass(now, sedeSlug);
  const nextResult = !current ? getNextClass(now, sedeSlug) : null;
  const nextEntry = nextResult?.entry;
  const nextDate = nextResult?.targetDate;

  // Estado: hay clase en curso
  if (current && sede) {
    return <CurrentRow entry={current} sedeNombre={sede.nombre} className={className} />;
  }

  // Estado: hay próxima clase
  if (nextEntry && nextDate && sede) {
    return (
      <NextRow
        entry={nextEntry}
        sedeNombre={sede.nombre}
        targetDate={nextDate}
        now={now}
        className={className}
      />
    );
  }

  // Estado: no hay próxima (raro — sería gym cerrado por mucho)
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-white/10 bg-invictus-black/60 px-5 py-4",
        className,
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-invictus-gray-500">
        Sin clases programadas en esta sede.
      </span>
    </div>
  );
}

function CurrentRow({
  entry,
  sedeNombre,
  className,
}: {
  entry: ScheduleEntry;
  sedeNombre: string;
  className?: string;
}) {
  const disc = disciplinaBySlug(entry.disciplina);
  const discName = disc?.nombre ?? entry.disciplina;

  return (
    <div
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-invictus-red/40 bg-invictus-red/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
        className,
      )}
      aria-label={`En curso: ${discName} a las ${entry.hora} en ${sedeNombre}`}
    >
      <div className="flex items-center gap-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-invictus-red opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-invictus-red" />
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-invictus-red">
            En curso · {entry.hora}
          </span>
          <span className="font-display text-xl leading-tight tracking-[-0.005em] text-invictus-white sm:text-2xl">
            {discName}
            {entry.nivel && (
              <span className="ml-2 rounded-full bg-invictus-red/20 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-widest text-invictus-red">
                {entry.nivel}
              </span>
            )}
          </span>
          <span className="text-xs text-invictus-gray-300">{sedeNombre}</span>
        </div>
      </div>

      <a
        href={whatsappLink({
          kind: "schedule",
          disciplina: discName,
          sede: sedeNombre,
          dia: "hoy",
          hora: entry.hora,
        })}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cta inline-flex items-center gap-1.5 self-start rounded-full bg-invictus-red px-4 py-2 text-xs font-medium text-invictus-white transition-colors hover:bg-invictus-red-deep sm:self-auto"
      >
        Tomála
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
        />
      </a>
    </div>
  );
}

function NextRow({
  entry,
  sedeNombre,
  targetDate,
  now,
  className,
}: {
  entry: ScheduleEntry;
  sedeNombre: string;
  targetDate: Date;
  now: Date;
  className?: string;
}) {
  const disc = disciplinaBySlug(entry.disciplina);
  const discName = disc?.nombre ?? entry.disciplina;
  const remaining = formatTimeRemaining(now, targetDate);

  return (
    <div
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-white/10 bg-invictus-black/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
        className,
      )}
      aria-label={`Próxima clase: ${discName} a las ${entry.hora} en ${sedeNombre}, ${remaining}`}
    >
      <div className="flex items-center gap-4">
        <span className="h-2.5 w-2.5 rounded-full bg-invictus-gray-500" aria-hidden />
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-invictus-gray-500">
            Próxima · {remaining}
          </span>
          <span className="font-display text-xl leading-tight tracking-[-0.005em] text-invictus-white sm:text-2xl">
            {discName}
            {entry.nivel && (
              <span className="ml-2 rounded-full bg-invictus-red/20 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-widest text-invictus-red">
                {entry.nivel}
              </span>
            )}
          </span>
          <span className="text-xs text-invictus-gray-300">
            {entry.hora} · {sedeNombre}
          </span>
        </div>
      </div>

      <a
        href={whatsappLink({
          kind: "schedule",
          disciplina: discName,
          sede: sedeNombre,
          dia: entry.dias.join("/"),
          hora: entry.hora,
        })}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cta inline-flex items-center gap-1.5 self-start rounded-full border border-invictus-red/40 bg-invictus-red/5 px-4 py-2 text-xs font-medium text-invictus-red transition-colors hover:border-invictus-red hover:bg-invictus-red hover:text-invictus-white sm:self-auto"
      >
        Reservar
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
        />
      </a>
    </div>
  );
}
