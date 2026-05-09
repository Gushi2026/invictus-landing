"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MediaCard } from "@/components/ui/media-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextReveal } from "@/components/ui/text-reveal";

const ease = [0.2, 0.7, 0.1, 1] as const;

import type { MediaSource } from "@/components/ui/media-card";

type Card = {
  index: string;
  eyebrow: string;
  titulo: string;
  copy: string;
  media: MediaSource;
};

const CARDS: Card[] = [
  {
    index: "01",
    eyebrow: "Equipo competitivo",
    titulo: "Cinturones que se entrenan acá.",
    copy: "Ares FC, UFC, federaciones nacionales. La sala donde se ganaron es la misma a la que vas a entrar.",
    media: {
      type: "video",
      src: "/videos/showreel.mp4",
      poster: "/videos/showreel-poster.jpg",
    },
  },
  {
    index: "02",
    eyebrow: "Sparring controlado",
    titulo: "Cuando estás listo. Nunca antes.",
    copy: "El sparring es supervisado y progresivo. No se mide quién pega más fuerte. Se mide quién aprende.",
    media: {
      type: "image",
      src: "/fotos/foto-09.jpg",
      hoverSrc: "/fotos/foto-10.jpg",
    },
  },
  {
    index: "03",
    eyebrow: "Tatami abierto",
    titulo: "Roll BJJ sin reservar.",
    copy: "Open mat semanal para los que ya entrenan. Vienen alumnos de otras academias a rolar. La puerta está abierta.",
    media: {
      type: "image",
      src: "/fotos/foto-07.jpg",
      hoverSrc: "/fotos/foto-08.jpg",
    },
  },
  {
    index: "04",
    eyebrow: "Comunidad",
    titulo: "Lo que pasa después de la clase.",
    copy: "Eventos, asados post-grading, viajes a competencias. Acá no entrenás solo: te sumás a una vuelta.",
    media: {
      type: "image",
      src: "/fotos/foto-11.jpg",
      hoverSrc: "/fotos/foto-04.jpg",
    },
  },
];

export function Showreel() {
  return (
    <section
      id="showreel"
      className="relative bg-invictus-black px-6 py-28 sm:px-8 sm:py-36"
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "var(--container-2xl)" }}
      >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow="03 · En acción"
              headingClassName="font-display mt-4 max-w-3xl text-balance text-[clamp(2.5rem,7vw,7rem)] leading-[1] tracking-[-0.005em] pb-2"
            >
              Adentro
              <br />
              <span className="text-invictus-red">del entrenamiento.</span>
            </SectionHeading>
          </div>
          <p className="max-w-md text-pretty text-base text-invictus-gray-300">
            <TextReveal text="Cuatro instantáneas del gym que ningún flyer puede mostrar. Mirá el ritmo. Después coordinamos cuándo venís." />
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
            >
              <TiltCard intensity={5}>
                <MediaCard
                  media={c.media}
                  alt={c.titulo}
                  aspect="aspect-[5/4]"
                >
                  {/* Index */}
                  <span className="absolute left-6 top-6 z-10 font-mono text-xs uppercase tracking-[0.32em] text-invictus-white/70">
                    {c.index}
                  </span>
                  <span className="absolute right-6 top-6 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-colors duration-500 group-hover:border-invictus-red group-hover:bg-invictus-red">
                    <ArrowUpRight
                      size={16}
                      className="text-invictus-white"
                    />
                  </span>

                  {/* Body */}
                  <div className="relative z-10 p-6 sm:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-invictus-red">
                      {c.eyebrow}
                    </p>
                    <h3 className="font-display mt-3 text-3xl leading-[0.95] tracking-[-0.005em] text-invictus-white sm:text-4xl">
                      {c.titulo}
                    </h3>
                    <p className="mt-3 max-w-md text-sm text-invictus-gray-300">
                      {c.copy}
                    </p>
                  </div>
                </MediaCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
