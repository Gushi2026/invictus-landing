"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  DAYS,
  DAY_LABEL_SHORT,
  diaFromDate,
  disciplinaBySlug,
  getHoursForSede,
  schedule,
  scheduleBySede,
  sedes,
  type ScheduleEntry,
} from "@/lib/schedule";
import { whatsappLink } from "@/lib/whatsapp";
import type { Dia } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextReveal } from "@/components/ui/text-reveal";
import { NowTease } from "@/components/ui/now-tease";
import { TimetableGrid } from "@/components/ui/timetable-grid";
import { ClassDrawer } from "@/components/ui/class-drawer";

const ease = [0.2, 0.7, 0.1, 1] as const;

type ViewMode = "semanal" | "lista";

export function Horarios() {
  const [sedeSlug, setSedeSlug] = useState<string>(sedes[0].slug);
  const [discFilter, setDiscFilter] = useState<string>("todas");
  const [view, setView] = useState<ViewMode>("semanal");
  const [drawerEntry, setDrawerEntry] = useState<ScheduleEntry | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<Dia>("lun");

  // En el primer mount, setear day tab al día actual si lun-vie
  useEffect(() => {
    const today = diaFromDate(new Date());
    if (DAYS.includes(today)) setActiveDay(today);
  }, []);

  const sedeActual = sedes.find((s) => s.slug === sedeSlug)!;

  // Disciplinas únicas presentes en la sede actual
  const disciplinasEnSede = useMemo(() => {
    const slugs = new Set(scheduleBySede(sedeSlug).map((e) => e.disciplina));
    return Array.from(slugs).map((slug) => disciplinaBySlug(slug)!).filter(Boolean);
  }, [sedeSlug]);

  // Entries de la sede (sin filtrar por disciplina — el filtrado se hace por dim en grid)
  const entriesSede = useMemo(() => scheduleBySede(sedeSlug), [sedeSlug]);

  // Entries filtradas para la lista — sí aplica filtro
  const entriesFiltered = useMemo(() => {
    return discFilter === "todas"
      ? entriesSede
      : entriesSede.filter((e) => e.disciplina === discFilter);
  }, [entriesSede, discFilter]);

  // Entries del día activo (mobile day-tabs)
  const entriesByDay = useMemo(() => {
    return entriesFiltered
      .filter((e) => e.dias.includes(activeDay))
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }, [entriesFiltered, activeDay]);

  // Agrupado por disciplina (vista lista desktop)
  const grouped = useMemo(() => {
    const map = new Map<string, ScheduleEntry[]>();
    entriesFiltered.forEach((e) => {
      const arr = map.get(e.disciplina) ?? [];
      arr.push(e);
      map.set(e.disciplina, arr);
    });
    return Array.from(map.entries());
  }, [entriesFiltered]);

  // Hours únicas de la sede para el grid
  const hours = useMemo(() => getHoursForSede(sedeSlug), [sedeSlug]);

  const openDrawer = (entry: ScheduleEntry) => {
    setDrawerEntry(entry);
    setDrawerOpen(true);
  };

  return (
    <section
      id="horarios"
      className="relative bg-invictus-gray-900 px-6 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow="04 · Horarios"
              headingClassName="font-display mt-4 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] tracking-[-0.005em] pb-2"
            >
              Mirá la grilla.
              <br />
              <span className="text-invictus-red">Reservá la clase.</span>
            </SectionHeading>
          </div>
          <p className="max-w-sm text-pretty text-base text-invictus-gray-300">
            <TextReveal text="Más de 35 clases por semana entre las dos sedes. La primera es de prueba." />
          </p>
        </div>

        {/* Sede selector */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <div
            className="inline-flex rounded-full border border-white/10 bg-invictus-black p-1"
            role="tablist"
            aria-label="Seleccionar sede"
          >
            {sedes.map((s) => {
              const active = s.slug === sedeSlug;
              return (
                <button
                  key={s.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSedeSlug(s.slug);
                    setDiscFilter("todas");
                  }}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 text-sm transition-colors",
                    active
                      ? "text-invictus-white"
                      : "text-invictus-gray-300 hover:text-invictus-white",
                  )}
                >
                  {active && (
                    <motion.span
                      initial={{ opacity: 0, x: -2 }}
                      animate={{ opacity: 1, x: [2, -1, 0.5, 0] }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full bg-invictus-red"
                    />
                  )}
                  <span className="relative z-10">{s.nombre}</span>
                </button>
              );
            })}
          </div>

          {/* View toggle — desktop only */}
          <div
            className="hidden rounded-full border border-white/10 bg-invictus-black p-1 sm:inline-flex"
            role="tablist"
            aria-label="Modo de vista"
          >
            {(["semanal", "lista"] as ViewMode[]).map((v) => {
              const active = v === view;
              return (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setView(v)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                    active
                      ? "text-invictus-white"
                      : "text-invictus-gray-500 hover:text-invictus-white",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="view-active"
                      transition={{ duration: 0.3, ease }}
                      className="absolute inset-0 rounded-full bg-invictus-red/20 ring-1 ring-invictus-red/40"
                    />
                  )}
                  <span className="relative z-10">{v}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Disciplina filter chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <FilterChip
            active={discFilter === "todas"}
            onClick={() => setDiscFilter("todas")}
          >
            Todas
          </FilterChip>
          {disciplinasEnSede.map((d) => (
            <FilterChip
              key={d.slug}
              active={discFilter === d.slug}
              onClick={() => setDiscFilter(d.slug)}
            >
              {d.nombre}
            </FilterChip>
          ))}
        </div>

        {/* NowTease — header dinámico */}
        <div className="mt-8">
          <NowTease sedeSlug={sedeSlug} />
        </div>

        {/* Vista desktop: semanal o lista según toggle */}
        <div className="mt-10 hidden sm:block">
          <AnimatePresence mode="wait">
            {view === "semanal" ? (
              <motion.div
                key={`grid-${sedeSlug}-${discFilter}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
              >
                <TimetableGrid
                  entries={entriesSede}
                  hours={hours}
                  activeFilter={discFilter}
                  onCellClick={openDrawer}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`list-${sedeSlug}-${discFilter}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
                className="divide-y divide-white/5 border-y border-white/10"
              >
                <ListView
                  grouped={grouped}
                  sedeNombre={sedeActual.nombre}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vista mobile: day tabs + cards */}
        <div className="mt-10 sm:hidden">
          {/* Day tabs */}
          <div
            className="flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-invictus-black p-1"
            role="tablist"
            aria-label="Día de la semana"
          >
            {DAYS.map((dia) => {
              const isActive = dia === activeDay;
              return (
                <button
                  key={dia}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveDay(dia)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                    isActive
                      ? "text-invictus-white"
                      : "text-invictus-gray-300 hover:text-invictus-white",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="day-active"
                      transition={{ duration: 0.3, ease }}
                      className="absolute inset-0 rounded-full bg-invictus-red"
                    />
                  )}
                  <span className="relative z-10">{DAY_LABEL_SHORT[dia]}</span>
                </button>
              );
            })}
          </div>

          {/* Cards del día */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={`day-${activeDay}-${sedeSlug}-${discFilter}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
              className="mt-6 flex flex-col gap-3"
            >
              {entriesByDay.length === 0 ? (
                <li className="rounded-xl border border-white/5 bg-invictus-black/40 px-4 py-6 text-center text-sm text-invictus-gray-500">
                  No hay clases este día con ese filtro.
                </li>
              ) : (
                entriesByDay.map((e, i) => (
                  <DayCard
                    key={`${e.disciplina}-${e.hora}-${i}`}
                    entry={e}
                    onClick={() => openDrawer(e)}
                  />
                ))
              )}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* Drawer detail */}
        <ClassDrawer
          entry={drawerEntry}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      </div>
    </section>
  );
}

// ============================================================
// Sub-componentes
// ============================================================

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-full border px-4 py-1.5 text-xs",
        active
          ? "border-invictus-red text-invictus-white"
          : "border-white/10 text-invictus-gray-300 transition-colors hover:border-white/30 hover:text-invictus-white",
      )}
    >
      {active && (
        <motion.span
          initial={{ opacity: 0, x: -1.5 }}
          animate={{ opacity: 1, x: [1.5, -1, 0.5, 0] }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-invictus-red"
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function ListView({
  grouped,
  sedeNombre,
}: {
  grouped: [string, ScheduleEntry[]][];
  sedeNombre: string;
}) {
  if (grouped.length === 0) {
    return (
      <p className="py-12 text-center text-invictus-gray-500">
        Ese filtro no devuelve clases. Probá otra disciplina.
      </p>
    );
  }
  return (
    <>
      {grouped.map(([discSlug, ents]) => {
        const disc = disciplinaBySlug(discSlug);
        return (
          <div
            key={discSlug}
            className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-[200px_1fr] sm:items-baseline sm:gap-8"
          >
            <div>
              <h3 className="font-display text-2xl leading-tight tracking-[-0.005em] text-invictus-white">
                {disc?.nombre ?? discSlug}
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {ents.map((e, i) => (
                <li
                  key={`${discSlug}-${e.hora}-${i}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-invictus-black/50 px-4 py-3 ring-1 ring-white/5 transition-colors hover:ring-invictus-red/40"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-semibold tabular-nums text-invictus-white">
                      {e.hora}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {e.dias.map((dia) => (
                        <span
                          key={dia}
                          className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-invictus-gray-300"
                        >
                          {dia}
                        </span>
                      ))}
                    </div>
                    {e.nivel && (
                      <span className="rounded-full bg-invictus-red/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-invictus-red">
                        {e.nivel}
                      </span>
                    )}
                  </div>
                  <a
                    href={whatsappLink({
                      kind: "schedule",
                      disciplina: disc?.nombre ?? discSlug,
                      sede: sedeNombre,
                      dia: e.dias.join("/"),
                      hora: e.hora,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-invictus-red/40 bg-invictus-red/5 px-4 py-2 text-xs font-medium text-invictus-red transition-colors hover:border-invictus-red hover:bg-invictus-red hover:text-invictus-white"
                  >
                    Tomála
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}

function DayCard({
  entry,
  onClick,
}: {
  entry: ScheduleEntry;
  onClick: () => void;
}) {
  const disc = disciplinaBySlug(entry.disciplina);
  const discName = disc?.nombre ?? entry.disciplina;

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-invictus-black/50 px-4 py-3.5 text-left transition-colors hover:border-invictus-red/40"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold tabular-nums text-invictus-white">
            {entry.hora}
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg leading-tight tracking-[-0.005em] text-invictus-white">
              {discName}
            </span>
            {entry.nivel && (
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-invictus-red">
                {entry.nivel}
              </span>
            )}
          </div>
        </div>
        <ArrowUpRight
          size={16}
          className="text-invictus-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>
    </li>
  );
}
