"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";

const ease = [0.2, 0.7, 0.1, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const title = titleRef.current;
      const video = videoRef.current;
      const content = contentRef.current;
      if (!section || !title || !video || !content) return;

      // Parallax: el video se queda más rápido (zoom-in sutil), el contenido
      // sale hacia arriba más lento. Crea sensación de profundidad cinemática.
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        animation: gsap
          .timeline()
          .to(video, { yPercent: 18, scale: 1.08, ease: "none" }, 0)
          .to(
            content,
            { yPercent: -25, opacity: 0.35, ease: "none" },
            0,
          )
          .to(
            title,
            { scale: 0.82, filter: "blur(2px)", ease: "none" },
            0,
          ),
      });

      cleanup = () => {
        trigger.kill();
      };
    })();

    return () => cleanup?.();
  }, []);


  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-x-clip bg-invictus-black"
    >
      {/* Video bg — autoplay loop, poster pre-cargado para LCP rápido */}
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover object-center will-change-transform motion-reduce:hidden"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Fallback estático para reduced-motion */}
      <picture className="hidden motion-reduce:block">
        <img
          src="/videos/hero-poster.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* Overlays cinematográficos — vignette + gradiente bottom para legibilidad de texto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-invictus-black via-invictus-black/70 to-invictus-black/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.65)_100%)]"
      />

      {/* Línea roja vertical decorativa */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-0 z-10 hidden h-full w-px bg-gradient-to-b from-transparent via-invictus-red/30 to-transparent sm:block sm:right-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-1/2 z-10 hidden h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent sm:block sm:left-10"
      />

      {/* Contenido */}
      <div
        ref={contentRef}
        className="relative z-20 mx-auto w-full max-w-7xl pb-24 pt-28 will-change-transform sm:pb-32 sm:pt-32 lg:pb-40"
        style={{
          paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
          paddingRight: "max(1.5rem, env(safe-area-inset-right))",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-invictus-red [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
            La Plata
          </span>
          <span className="h-px w-10 bg-invictus-red/60" />
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-invictus-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
            Artes marciales
          </span>
        </motion.div>

        <motion.h1
          ref={titleRef}
          initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
          className="font-display mt-7 max-w-5xl text-balance text-[clamp(2.5rem,7.5vw,7.5rem)] leading-[1] tracking-[-0.005em] text-invictus-white pb-2 will-change-transform"
        >
          {"La actitud "}
          <br />
          <span className="relative inline-block">
            no aparece.{" "}
            <span className="relative inline-block text-invictus-red">
              Se entrena
              {/* Subrayado animado */}
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease, delay: 1.1 }}
                className="absolute -bottom-3 left-0 h-[6px] w-full origin-left bg-invictus-red"
              />
            </span>
            <span className="text-invictus-white">.</span>
          </span>
        </motion.h1>

        <p className="mt-10 max-w-xl text-pretty text-base text-invictus-gray-300 sm:text-lg">
          <TextReveal
            text="Todos los días. En cada momento donde elegís no bajar los brazos."
            stagger={0.04}
            delay={0.6}
          />
          {" "}
          <br className="hidden sm:block" />
          <TextReveal
            text="Eso es lo que entrenamos."
            stagger={0.04}
            delay={1.0}
          />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.75 }}
          className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
        >
          <MagneticButton
            href={whatsappLink({ kind: "trial" })}
            target="_blank"
            rel="noopener noreferrer"
            strength={10}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-invictus-red px-8 py-4 text-base font-medium text-invictus-white shadow-[0_8px_30px_-12px_rgba(225,6,0,0.6)] transition-shadow hover:shadow-[0_14px_44px_-12px_rgba(225,6,0,0.8)]"
            style={{ transitionTimingFunction: "var(--ease-invictus)" }}
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-invictus-red-deep transition-transform duration-500 group-hover:translate-x-0"
              style={{ transitionTimingFunction: "var(--ease-invictus)" }}
            />
            <span className="relative">Empezá a entrenar</span>
            <ArrowRight
              size={18}
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            />
          </MagneticButton>
          <Link
            href="#horarios"
            className="group inline-flex items-center gap-2 text-base text-invictus-gray-100 transition-colors hover:text-invictus-white"
          >
            <span className="relative">
              Ver horarios
              <span
                aria-hidden
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-invictus-white transition-transform duration-300 group-hover:scale-x-100"
                style={{ transitionTimingFunction: "var(--ease-invictus)" }}
              />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

