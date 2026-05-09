"use client";

import { useEffect, useState } from "react";
import {
  DAYS,
  DAY_LABEL_SHORT,
  dateToMinutes,
  diaFromDate,
  timeToMinutes,
  type ScheduleEntry,
} from "@/lib/schedule";
import type { Dia } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/hooks/use-reduced-motion";
import { TimetableCell } from "./timetable-cell";

type TimetableGridProps = {
  entries: ScheduleEntry[];
  hours: string[];
  /** Slug de la disciplina activa en filtro, "todas" o vacío */
  activeFilter: string;
  onCellClick: (entry: ScheduleEntry) => void;
};

/**
 * Grilla semanal: filas = horas, columnas = lun-vie.
 * Cells coloreadas si hay clase en ese slot. Empty cells apenas visibles.
 *
 * "Now line" — línea horizontal roja absoluta a la altura de la hora actual,
 * solo visible si:
 *  - Día actual ∈ DAYS (lun-vie)
 *  - Hora actual ∈ rango [primera hora, última hora + 60min]
 */
export function TimetableGrid({
  entries,
  hours,
  activeFilter,
  onCellClick,
}: TimetableGridProps) {
  const prefersReduced = useReducedMotion();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Map de "dia + hora" → entry. Permite lookup O(1) al pintar la grilla.
  const cellMap = new Map<string, ScheduleEntry>();
  entries.forEach((e) => {
    e.dias.forEach((dia) => {
      cellMap.set(`${dia}-${e.hora}`, e);
    });
  });

  // Calcular posición vertical de la "now line" (en %, dentro del body de la grid)
  const nowLine = (() => {
    if (!now) return null;
    const dia = diaFromDate(now);
    if (!DAYS.includes(dia)) return null;

    const nowMin = dateToMinutes(now);
    const firstHourMin = timeToMinutes(hours[0]);
    const lastHourMin = timeToMinutes(hours[hours.length - 1]) + 60;
    if (nowMin < firstHourMin || nowMin > lastHourMin) return null;

    const totalSpan = lastHourMin - firstHourMin;
    const offset = nowMin - firstHourMin;
    const pct = (offset / totalSpan) * 100;
    return { pct, dia };
  })();

  // Pre-compute la lista para stagger index
  let cellIndex = 0;

  return (
    <div className="relative">
      {/* Header con días */}
      <div className="grid grid-cols-[64px_repeat(5,1fr)] gap-1 sm:gap-2">
        <div aria-hidden />
        {DAYS.map((dia) => {
          const isToday = now && diaFromDate(now) === dia;
          return (
            <div
              key={dia}
              className={cn(
                "py-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] sm:text-xs",
                isToday ? "text-invictus-red" : "text-invictus-gray-500",
              )}
            >
              {DAY_LABEL_SHORT[dia]}
            </div>
          );
        })}
      </div>

      {/* Body de la grid + now-line */}
      <div className="relative border-t border-white/10 pt-2">
        {/* Now-line absolute */}
        {nowLine && !prefersReduced && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-[64px] right-0 z-10"
            style={{ top: `${nowLine.pct}%` }}
          >
            <div className="relative flex items-center">
              <span className="absolute -left-1.5 flex h-3 w-3">
                <span className="absolute inset-0 animate-ping rounded-full bg-invictus-red opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-invictus-red" />
              </span>
              <span className="h-[2px] flex-1 bg-gradient-to-r from-invictus-red via-invictus-red/70 to-transparent" />
            </div>
          </div>
        )}

        {/* Filas */}
        {hours.map((hora) => (
          <div
            key={hora}
            className="grid grid-cols-[64px_repeat(5,1fr)] gap-1.5 py-1 sm:gap-2"
          >
            {/* Hour label */}
            <div className="flex items-start justify-end pr-2 pt-2">
              <span className="font-mono text-[11px] font-medium tabular-nums text-invictus-gray-300 sm:text-xs">
                {hora}
              </span>
            </div>

            {/* Cells por día */}
            {DAYS.map((dia) => {
              const entry = cellMap.get(`${dia}-${hora}`) ?? null;
              const dimmed =
                !!entry &&
                activeFilter !== "todas" &&
                entry.disciplina !== activeFilter;
              const idx = cellIndex++;
              return (
                <TimetableCell
                  key={`${dia}-${hora}`}
                  entry={entry}
                  dia={dia}
                  hora={hora}
                  dimmed={dimmed}
                  onClick={onCellClick}
                  index={idx}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Leyenda compacta */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 pt-4 text-[10px] uppercase tracking-[0.2em] text-invictus-gray-500">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-invictus-red" /> En curso
        </span>
        <span className="flex items-center gap-2">
          <span className="block h-px w-6 bg-gradient-to-r from-invictus-red to-transparent" /> Hora actual
        </span>
        <span>· Click una clase para reservar</span>
      </div>
    </div>
  );
}
