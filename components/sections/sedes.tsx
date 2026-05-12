"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { sedes } from "@/lib/schedule";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextReveal } from "@/components/ui/text-reveal";

const ease = [0.2, 0.7, 0.1, 1] as const;

function wazeUrl(lat: number, lng: number): string {
  return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
}

export function Sedes() {
  return (
    <section
      id="sedes"
      className="relative bg-invictus-black px-6 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow="05 · Sedes"
              headingClassName="font-display mt-4 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.005em]"
            >
              Dos puntos en La Plata.
              <br />
              <span className="text-invictus-red">Mismo equipo.</span>
            </SectionHeading>
          </div>
          <p className="max-w-sm text-pretty text-base text-invictus-gray-300">
            <TextReveal text="Elegí la sede que te quede más cerca. Las clases respetan la misma metodología y los mismos coaches rotan entre ambas." />
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sedes.map((sede, i) => (
            <motion.div
              key={sede.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <TiltCard intensity={6} className="group relative overflow-hidden rounded-[var(--radius)] border border-white/10 bg-invictus-gray-900 p-8 sm:p-10">
              {/* Decoración: grid abstracta de "calles" */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50"
                style={{
                  transitionTimingFunction: "var(--ease-invictus)",
                  backgroundImage:
                    "linear-gradient(to right, rgba(225,6,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  backgroundPosition: i === 0 ? "0 0" : "24px 24px",
                  maskImage:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, #000, transparent)",
                }}
              />

              {/* Contenido */}
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-invictus-red">
                    Sede {String(i + 1).padStart(2, "0")}
                  </span>
                  <MapPin
                    size={20}
                    className="text-invictus-gray-500"
                    aria-hidden
                  />
                </div>

                <h3 className="font-display mt-6 text-4xl leading-[1] tracking-[-0.005em] text-invictus-white sm:text-5xl">
                  {sede.nombre.replace("Sede ", "")}
                </h3>

                <p className="mt-3 text-base text-invictus-gray-300">
                  {sede.direccion}
                </p>
                <p className="text-sm text-invictus-gray-500">
                  {sede.ciudad}, {sede.provincia}
                </p>

                {sede.horario_atencion && (
                  <div className="mt-4 flex items-start gap-2">
                    <Clock size={14} className="mt-0.5 shrink-0 text-invictus-red" aria-hidden />
                    <div className="flex flex-col gap-0.5 text-sm text-invictus-gray-300">
                      <span>Lun–Vie {sede.horario_atencion.lun_vie}</span>
                      {sede.horario_atencion.sab && (
                        <span>Sáb {sede.horario_atencion.sab}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={sede.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-invictus-white px-5 py-2.5 text-sm font-medium text-invictus-black transition-colors hover:bg-invictus-gray-100"
                  >
                    Cómo llegar
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    />
                  </a>
                  <a
                    href={wazeUrl(sede.coords.lat, sede.coords.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-invictus-white transition-colors hover:border-white/40"
                  >
                    Abrir en Waze
                  </a>
                </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sedes.map((sede) => (
            <div
              key={sede.slug}
              className="group relative overflow-hidden rounded-[var(--radius)] border border-white/10 bg-invictus-gray-900"
            >
              <iframe
                title={`Mapa de ${sede.nombre}`}
                src={`https://maps.google.com/maps?q=${sede.coords.lat},${sede.coords.lng}&hl=es&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/10] w-full border-0 grayscale-[40%] transition-[filter] duration-500 group-hover:grayscale-0"
                style={{ filter: "invert(0.92) hue-rotate(180deg)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-invictus-black/90 via-invictus-black/30 to-transparent p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-red">
                  {sede.nombre}
                </p>
                <p className="mt-1 text-sm text-invictus-white">
                  {sede.direccion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
