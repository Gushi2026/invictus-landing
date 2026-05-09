"use client";

import { motion } from "framer-motion";
import {
  DAY_LABEL_SHORT,
  DISC_LABEL,
  disciplinaBySlug,
  type ScheduleEntry,
} from "@/lib/schedule";
import type { Dia } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TimetableCellProps = {
  entry: ScheduleEntry | null;
  dia: Dia;
  hora: string;
  /** True si el filtro activo NO matchea esta entry. La cell se atenúa. */
  dimmed?: boolean;
  /** True si esta entry corresponde a la clase EN CURSO. */
  isCurrent?: boolean;
  onClick?: (entry: ScheduleEntry) => void;
  /** Index para stagger animation */
  index?: number;
};

/**
 * Cell individual de la grilla. Si `entry` es null, es slot vacío (apenas visible).
 * Si tiene entry, es clickeable y muestra el nombre completo de la disciplina.
 *
 * Estilos high-contrast:
 *  - Empty: borde dotted casi invisible, transparente
 *  - Filled: fondo blanco / cream + texto negro → contraste máximo contra el bg gray-900 de la sección
 *  - Current (en curso): fondo rojo + texto blanco + ring rojo brillante
 *  - Hover: lift + ring rojo
 *  - Dimmed (filtrado): opacity 30% (vuelve a 100% al hover)
 */
export function TimetableCell({
  entry,
  dia,
  hora,
  dimmed = false,
  isCurrent = false,
  onClick,
  index = 0,
}: TimetableCellProps) {
  if (!entry) {
    return (
      <div
        aria-hidden
        className="h-full min-h-[56px] rounded-md border border-dashed border-white/[0.06]"
      />
    );
  }

  const disc = disciplinaBySlug(entry.disciplina);
  const label = DISC_LABEL[entry.disciplina] ?? disc?.nombre ?? entry.disciplina;
  const fullName = disc?.nombre ?? entry.disciplina;
  const dayLabel = DAY_LABEL_SHORT[dia];

  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(entry)}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.012, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative flex h-full min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-md px-1.5 py-2 text-center transition-[transform,box-shadow,background-color,opacity] duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5",
        isCurrent
          ? "bg-invictus-red text-invictus-white shadow-[0_8px_24px_-8px_rgba(225,6,0,0.5)] ring-1 ring-invictus-red/60"
          : "bg-invictus-white text-invictus-black shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_-6px_rgba(225,6,0,0.4)] hover:ring-2 hover:ring-invictus-red",
        dimmed && "opacity-25 hover:opacity-100",
      )}
      aria-label={`${fullName}, ${dayLabel} ${hora}${entry.nivel ? ", " + entry.nivel : ""}`}
    >
      <span
        className={cn(
          "font-display text-[13px] leading-[1.05] tracking-[-0.01em] sm:text-sm",
          isCurrent ? "text-invictus-white" : "text-invictus-black",
        )}
      >
        {label}
      </span>
      {entry.nivel && (
        <span
          className={cn(
            "font-mono text-[8px] uppercase tracking-[0.2em]",
            isCurrent ? "text-invictus-white/80" : "text-invictus-red",
          )}
        >
          {entry.nivel}
        </span>
      )}
    </motion.button>
  );
}
