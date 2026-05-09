"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextReveal } from "@/components/ui/text-reveal";
import trayectoriaData from "@/content/trayectoria.json";

const ease = [0.2, 0.7, 0.1, 1] as const;

/**
 * Sección Trayectoria — stats reales + highlights de competencias.
 * La data viene de /content/trayectoria.json. Cuando se sumen records
 * concretos (peleas profesionales, cinturones, fechas), se editan ahí
 * sin tocar este componente.
 */
export function Trayectoria() {
  const { stats, highlights } = trayectoriaData;

  return (
    <section
      id="trayectoria"
      className="relative bg-invictus-black px-6 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow="06 · Trayectoria"
              headingClassName="font-display mt-4 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] tracking-[-0.005em] pb-2"
            >
              Lo que se construyó
              <br />
              <span className="text-invictus-red">en estos años.</span>
            </SectionHeading>
          </div>
          <p className="max-w-sm text-pretty text-base text-invictus-gray-300">
            <TextReveal text="Más de ocho años entrenando peleadores que se subieron a las jaulas más serias del país y del mundo." />
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-invictus-red/20 py-12 sm:grid-cols-4 sm:gap-x-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="flex flex-col gap-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-5xl tabular-nums leading-none tracking-[-0.02em] text-invictus-white sm:text-7xl">
                {stat.valor}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-invictus-gray-500">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Highlights — donde compitieron */}
        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-invictus-gray-500">
            Donde compitieron
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.li
                key={h.titulo}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.55, ease, delay: i * 0.08 }}
                className="flex flex-col border-l-2 border-invictus-red/40 pl-5 py-2"
              >
                <span className="font-display text-3xl leading-tight tracking-[-0.005em] text-invictus-white sm:text-4xl">
                  {h.titulo}
                </span>
                {h.year && (
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
                    {h.year}
                  </span>
                )}
                <span className="mt-2 text-sm text-invictus-gray-300">
                  {h.descripcion}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Pie de sección — invitación discreta */}
        <p className="mt-20 max-w-2xl text-pretty text-sm text-invictus-gray-500 sm:text-base">
          Esta lista crece sola. La actitud no aparece de un día para el otro —{" "}
          <span className="text-invictus-white">se construye todos los días.</span>
        </p>
      </div>
    </section>
  );
}
