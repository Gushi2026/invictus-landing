"use client";

import Image from "next/image";
import { BLUR_BLACK } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StartDrawer } from "@/components/ui/start-drawer";

const ease = [0.2, 0.7, 0.1, 1] as const;

export function CtaFinal() {
  return (
    <section
      className="relative isolate overflow-hidden bg-invictus-black px-6 py-32 sm:px-8 sm:py-44"
      aria-label="Llamado final a reservar clase"
    >
      <Image
        src="/fotos/foto-09.jpg"
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_BLACK}
        className="object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-invictus-black/70 via-invictus-black/85 to-invictus-black"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-invictus-red to-transparent"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-xs uppercase tracking-[0.28em] text-invictus-red"
        >
          La primera, gratis
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="font-display mt-6 text-balance text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.005em]"
        >
          Decidí no bajar
          <br />
          <span className="text-invictus-red">los brazos.</span>
        </motion.h2>

        <p className="mt-6 max-w-xl text-pretty text-base text-invictus-gray-300 sm:text-lg">
          <TextReveal
            text="Sin tarjeta. Sin venta a presión. Llegás, entrenás, y decidís cuando nadie te está mirando."
            delay={0.25}
          />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, ease, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          <StartDrawer
            trigger={
              <button
                type="button"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-invictus-red px-8 py-4 text-base font-medium text-invictus-white shadow-[0_8px_30px_-12px_rgba(225,6,0,0.7)] transition-all hover:bg-invictus-red-deep hover:shadow-[0_14px_40px_-12px_rgba(225,6,0,0.8)]"
                style={{ transitionTimingFunction: "var(--ease-invictus)" }}
              >
                Empezá ahora
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            }
          />
          <a
            href={whatsappLink({ kind: "general" })}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-invictus-gray-300 underline decoration-invictus-gray-500 underline-offset-4 transition-colors hover:text-invictus-white hover:decoration-invictus-white"
          >
            o escribinos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
