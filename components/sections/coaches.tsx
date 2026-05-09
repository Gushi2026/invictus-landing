"use client";

import Image from "next/image";
import { BLUR_BLACK } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import coachesData from "@/content/coaches.json";
import { whatsappLink } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

type Coach = (typeof coachesData)[number];

const ease = [0.2, 0.7, 0.1, 1] as const;

function getInitials(c: Coach): string {
  const parts = c.nombre.split(" ");
  return (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
}

export function Coaches() {
  const head = coachesData.find((c) => c.headCoach);
  const rest = coachesData.filter((c) => !c.headCoach);

  return (
    <section
      id="coaches"
      className="relative bg-invictus-black px-6 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow="02 · Coaches"
              headingClassName="font-display mt-4 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.005em]"
            >
              Nueve profes.
              <br />
              <span className="text-invictus-red">Misma vara.</span>
            </SectionHeading>
          </div>
          <p className="max-w-sm text-pretty text-base text-invictus-gray-300">
            <TextReveal text="Competidores activos y profesores con años de tatami. Acá no se improvisa la enseñanza: cada disciplina tiene su responsable." />
          </p>
        </div>

        {/* Banner foto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease }}
          className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl sm:aspect-[16/6]"
        >
          <Image
            src="/fotos/foto-09.jpg"
            alt="Equipo Invictus en preparación de pelea"
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            placeholder="blur"
            blurDataURL={BLUR_BLACK}
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-invictus-black/85 via-invictus-black/30 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-invictus-gray-100">
              Equipo competitivo · La Plata
            </p>
          </div>
        </motion.div>

        {/* Head coach */}
        {head && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease }}
            className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-12 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12"
          >
            <CoachAvatar coach={head} size="lg" />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-invictus-red">
                {head.rol}
              </p>
              <h3 className="font-display mt-3 text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.005em]">
                {head.nombre}
              </h3>
              {head.apodo && (
                <p className="mt-2 font-display text-2xl text-invictus-gray-300">
                  &ldquo;{head.apodo}&rdquo;
                </p>
              )}
              <p className="mt-3 text-sm text-invictus-gray-300">
                {head.disciplinas.length > 0
                  ? head.disciplinas.join(" · ")
                  : "Coach generalista"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Resto editorial */}
        <ul className="mt-12 grid grid-cols-1 gap-x-10 border-t border-white/10 pt-4 sm:grid-cols-2">
          {rest.map((c, i) => (
            <motion.li
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, ease, delay: i * 0.04 }}
              className="group flex items-center gap-5 border-b border-white/5 py-5"
            >
              <CoachAvatar coach={c} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-2xl leading-tight text-invictus-white sm:text-3xl">
                  {c.nombre}
                </p>
                <p className="mt-0.5 truncate text-xs text-invictus-gray-300">
                  {c.disciplinas.length > 0
                    ? c.disciplinas.join(" · ")
                    : "Coach generalista"}
                  {c.apodo && (
                    <span className="text-invictus-gray-500">
                      {" · "}&ldquo;{c.apodo}&rdquo;
                    </span>
                  )}
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-invictus-gray-500">
                {c.rol}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA equipo competitivo */}
        <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-invictus-red/30 bg-gradient-to-br from-invictus-red/10 to-transparent p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h3 className="font-display text-2xl leading-tight tracking-[-0.005em] text-invictus-white sm:text-3xl">
              ¿Querés competir?
            </h3>
            <p className="mt-2 max-w-md text-sm text-invictus-gray-300 sm:text-base">
              El equipo competitivo entrena con cabeza de torneo. Si ya tenés
              base y querés llevarlo en serio, hablemos.
            </p>
          </div>
          <MagneticButton
            href={whatsappLink({ kind: "competitivo" })}
            target="_blank"
            rel="noopener noreferrer"
            strength={10}
            className="group inline-flex items-center gap-2 rounded-full bg-invictus-red px-6 py-3.5 text-sm font-medium text-invictus-white transition-colors hover:bg-invictus-red-deep"
          >
            Quiero competir
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function CoachAvatar({
  coach,
  size,
}: {
  coach: Coach;
  size: "sm" | "lg";
}) {
  const dims =
    size === "lg"
      ? "h-32 w-32 sm:h-40 sm:w-40 text-5xl sm:text-6xl"
      : "h-12 w-12 text-base";

  return (
    <div
      aria-hidden
      className={`relative shrink-0 overflow-hidden rounded-full bg-invictus-gray-900 ring-1 ring-white/10 flex items-center justify-center ${dims}`}
    >
      <span className="font-display tabular-nums text-invictus-gray-300">
        {getInitials(coach)}
      </span>
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-invictus-red/20 to-transparent" />
    </div>
  );
}
