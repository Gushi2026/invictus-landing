"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { disciplinas } from "@/lib/schedule";
import { whatsappLink } from "@/lib/whatsapp";
import { MediaCard } from "@/components/ui/media-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextReveal } from "@/components/ui/text-reveal";

const FILTERS = [
  { id: "todas", label: "Todas" },
  { id: "empezar", label: "Para empezar" },
  { id: "competir", label: "Competir" },
  { id: "niños", label: "Niños" },
  { id: "sin-contacto", label: "Sin contacto" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

// Asignación de fotos primaria + hover (cross-fade entre dos fotos)
const FOTOS_POR_SLUG: Record<string, { primary: string; hover: string }> = {
  boxeo: { primary: "/fotos/foto-02.jpg", hover: "/fotos/foto-09.jpg" },
  "kick-boxing": { primary: "/fotos/foto-03.jpg", hover: "/fotos/foto-10.jpg" },
  "muay-thai": { primary: "/fotos/foto-01.jpg", hover: "/fotos/foto-11.jpg" },
  mma: { primary: "/fotos/foto-04.jpg", hover: "/fotos/foto-09.jpg" },
  "mma-infantil": { primary: "/fotos/foto-05.jpg", hover: "/fotos/foto-06.jpg" },
  lucha: { primary: "/fotos/foto-06.jpg", hover: "/fotos/foto-07.jpg" },
  bjj: { primary: "/fotos/foto-07.jpg", hover: "/fotos/foto-08.jpg" },
  taekwondo: { primary: "/fotos/foto-08.jpg", hover: "/fotos/foto-04.jpg" },
};

const ease = [0.2, 0.7, 0.1, 1] as const;

export function Disciplinas() {
  const [filter, setFilter] = useState<FilterId>("todas");

  const visibles =
    filter === "todas"
      ? disciplinas
      : disciplinas.filter((d) => d.intencion.includes(filter));

  return (
    <section
      id="disciplinas"
      className="relative bg-invictus-black px-6 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow="01 · Disciplinas"
              headingClassName="font-display mt-4 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.005em]"
            >
              Elegí cómo querés <span className="text-invictus-red">empezar</span>.
            </SectionHeading>
          </div>
          <p className="max-w-sm text-pretty text-base text-invictus-gray-300">
            <TextReveal text="Ocho disciplinas. Sin clases sueltas: cada una tiene un sistema de progresión real. Filtrá por lo que buscás." />
          </p>
        </div>

        {/* Filter pills */}
        <div
          className="mt-12 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filtrar disciplinas por intención"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={
                  "relative rounded-full px-5 py-2.5 text-sm transition-colors " +
                  (active
                    ? "text-invictus-white"
                    : "text-invictus-gray-300 hover:text-invictus-white")
                }
              >
                {active && (
                  <motion.span
                    initial={{ opacity: 0, x: -2 }}
                    animate={{ opacity: 1, x: [2, -1, 0.5, 0] }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-invictus-red"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibles.map((d, i) => {
              const fotos = FOTOS_POR_SLUG[d.slug];
              return (
                <motion.div
                  key={d.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.04 }}
                  className="group"
                >
                  <MediaCard
                    media={{
                      type: "image",
                      src: fotos?.primary ?? "/fotos/foto-09.jpg",
                      hoverSrc: fotos?.hover,
                    }}
                    alt={d.nombre}
                    aspect="aspect-[4/5]"
                  >
                    {/* Info pills sup */}
                    <div className="absolute left-5 top-5 z-10 flex gap-1.5">
                      {d.infantil && (
                        <span className="rounded-full bg-invictus-red px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-invictus-white">
                          Niños
                        </span>
                      )}
                      {d.soloEn && (
                        <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-invictus-gray-100 backdrop-blur-sm">
                          Solo Diagonal 74
                        </span>
                      )}
                    </div>

                    {/* Numerador */}
                    <span className="absolute right-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-white/60">
                      {String(i + 1).padStart(2, "0")} / {String(visibles.length).padStart(2, "0")}
                    </span>

                    {/* Body */}
                    <div className="relative z-10 p-6 sm:p-7">
                      <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.005em] text-invictus-white sm:text-4xl">
                        {d.nombre}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-invictus-red">
                        {d.tagline}
                      </p>
                      <p className="mt-3 line-clamp-3 text-sm text-invictus-gray-300">
                        {d.descripcion}
                      </p>

                      <a
                        href={whatsappLink({ kind: "trial", disciplina: d.nombre })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-invictus-white opacity-90 transition-opacity hover:opacity-100"
                      >
                        Probá esta
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </div>
                  </MediaCard>
                </motion.div>
              );
            })}

            {filter === "todas" && (
              <motion.a
                key="cta-no-se"
                layout
                href={whatsappLink({ kind: "consultoria" })}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease, delay: visibles.length * 0.04 }}
                className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[var(--radius)] border border-invictus-red bg-invictus-red p-6 transition-colors hover:bg-invictus-red-deep sm:p-7"
                aria-label="Consultar por WhatsApp qué disciplina probar"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]"
                />
                <span className="relative font-mono text-[10px] uppercase tracking-[0.28em] text-invictus-white/80">
                  Te ayudamos
                </span>
                <div className="relative">
                  <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.005em] text-invictus-white sm:text-4xl">
                    ¿No sabés cuál
                    <br />
                    elegir?
                  </h3>
                  <p className="mt-3 max-w-[18ch] text-sm text-invictus-white/85">
                    Contanos qué buscás y te ayudamos en 1 minuto.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-invictus-white">
                    Hablemos por WhatsApp
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </motion.a>
            )}
          </AnimatePresence>
        </motion.div>

        {visibles.length === 0 && (
          <p className="mt-12 text-center text-invictus-gray-500">
            Ese filtro no devuelve resultados. Probá otra opción.
          </p>
        )}
      </div>
    </section>
  );
}
