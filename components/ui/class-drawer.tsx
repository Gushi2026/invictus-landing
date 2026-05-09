"use client";

import { Drawer as DrawerPrimitive } from "vaul";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import {
  DAY_LABEL_SHORT,
  disciplinaBySlug,
  sedeBySlug,
  type ScheduleEntry,
} from "@/lib/schedule";
import type { Dia } from "@/lib/constants";
import { whatsappLink } from "@/lib/whatsapp";

type ClassDrawerProps = {
  entry: ScheduleEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Drawer de detalle al hacer click en una cell del timetable.
 * Muestra: disciplina + tagline + nivel + hora + días + sede + dirección + CTA "Tomála".
 */
export function ClassDrawer({ entry, open, onOpenChange }: ClassDrawerProps) {
  if (!entry) return null;

  const disc = disciplinaBySlug(entry.disciplina);
  const sede = sedeBySlug(entry.sede);
  const discName = disc?.nombre ?? entry.disciplina;
  const sedeNombre = sede?.nombre ?? entry.sede;

  return (
    <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" />
        <DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-[81] mt-24 flex h-auto max-h-[85vh] flex-col rounded-t-[var(--radius)] border-t border-white/10 bg-invictus-gray-900 outline-none">
          <DrawerPrimitive.Title className="sr-only">
            {discName} · {entry.hora}
          </DrawerPrimitive.Title>
          <DrawerPrimitive.Description className="sr-only">
            Detalle de la clase y opción de reserva
          </DrawerPrimitive.Description>

          {/* Handle */}
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/15"
          />

          <div className="mx-auto w-full max-w-2xl overflow-y-auto px-6 pb-10 pt-8 sm:px-10">
            {/* Eyebrow */}
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-invictus-red">
              Reservá tu lugar
            </p>

            {/* Disciplina */}
            <h3 className="font-display mt-3 text-balance text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-[-0.005em] text-invictus-white pb-1">
              {discName}
              {entry.nivel && (
                <span className="ml-3 inline-block rounded-full bg-invictus-red/20 px-3 py-1 align-middle font-mono text-xs uppercase tracking-widest text-invictus-red">
                  {entry.nivel}
                </span>
              )}
            </h3>

            {disc?.tagline && (
              <p className="mt-3 text-base text-invictus-gray-300">
                {disc.tagline}
              </p>
            )}

            {/* Info grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow
                icon={<Clock size={18} />}
                label="Hora"
                value={entry.hora}
                detail={entry.dias.map((d) => DAY_LABEL_SHORT[d as Dia]).join(" · ")}
              />
              <InfoRow
                icon={<MapPin size={18} />}
                label="Sede"
                value={sedeNombre.replace("Sede ", "")}
                detail={sede?.direccion}
              />
            </div>

            {/* Descripción */}
            {disc?.descripcion && (
              <div className="mt-8 border-t border-white/5 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
                  La clase
                </p>
                <p className="mt-3 text-sm text-invictus-gray-300 sm:text-base">
                  {disc.descripcion}
                </p>
              </div>
            )}

            {/* CTA */}
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
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-invictus-red px-6 py-4 text-base font-medium text-invictus-white transition-colors hover:bg-invictus-red-deep sm:w-auto"
            >
              Tomála
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
              La primera es de prueba. Sin tarjeta.
            </p>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}

function InfoRow({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-invictus-black/40 p-4">
      <span aria-hidden className="mt-0.5 text-invictus-gray-300">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
          {label}
        </p>
        <p className="mt-1 font-display text-lg leading-tight tracking-[-0.005em] text-invictus-white">
          {value}
        </p>
        {detail && (
          <p className="mt-1 text-xs text-invictus-gray-300">{detail}</p>
        )}
      </div>
    </div>
  );
}
