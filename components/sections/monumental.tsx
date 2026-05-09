"use client";

import { useEffect, useRef } from "react";

const WORD = "INVICTUS";
const LETTERS = WORD.split("");

/**
 * Sección monumental — el wordmark INVICTUS llena el viewport.
 *  - Pinned 200vh: las 8 letras revelan letter-by-letter conforme scrolleás.
 *  - Stagger de 0.1, easing back.out(1.4) — cada letra cae con peso y rebota.
 *  - La "T" en rojo Invictus.
 *  - Sublinea aparece al final del scroll: "El gimnasio. La gente. La actitud."
 *  - Reduced-motion: estado final estático, sin animación.
 */
export function Monumental() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Estado final visible sin animar
      lettersRef.current.forEach((l) => {
        if (l) {
          l.style.opacity = "1";
          l.style.transform = "translateY(0) scale(1)";
        }
      });
      if (sublineRef.current) {
        sublineRef.current.style.opacity = "1";
        sublineRef.current.style.transform = "translateY(0)";
      }
      if (eyebrowRef.current) eyebrowRef.current.style.opacity = "1";
      return;
    }

    let cleanup: () => void = () => {};

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const scene = sceneRef.current;
      const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
      const subline = sublineRef.current;
      const eyebrow = eyebrowRef.current;

      if (!section || !scene || letters.length === 0 || !subline || !eyebrow)
        return;

      // Estado inicial
      gsap.set(letters, { opacity: 0, y: 80, scale: 0.85, filter: "blur(8px)" });
      gsap.set(eyebrow, { opacity: 0, y: 16 });
      gsap.set(subline, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: scene,
          pinSpacing: false,
          scrub: 0.6,
        },
      });

      // Eyebrow aparece primero
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });

      // Las 8 letras revelan en stagger con peso y overshoot
      tl.to(
        letters,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 0.55,
          ease: "back.out(1.5)",
        },
        "+=0.2",
      );

      // Subline al final
      tl.to(
        subline,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "+=0.3",
      );

      // Hold final
      tl.to({}, { duration: 0.6 });

      cleanup = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-invictus-black"
      style={{ height: "200vh" }}
      aria-label="Invictus"
    >
      <div
        ref={sceneRef}
        className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4"
      >
        {/* Líneas decorativas top + bottom (estilo Chainzoku frame) */}
        <div
          aria-hidden
          className="absolute inset-x-6 top-8 flex items-center gap-4 sm:inset-x-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-invictus-gray-500">
            01 / Marca
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-invictus-gray-500">
            La Plata · 2026
          </span>
        </div>

        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-invictus-red"
        >
          Esto es —
        </p>

        {/* INVICTUS — wordmark monumental */}
        <h2
          className="font-display flex items-baseline justify-center leading-none tracking-[-0.04em] text-invictus-white"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 18rem)",
            letterSpacing: "-0.04em",
          }}
          aria-label={WORD}
        >
          {LETTERS.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el;
              }}
              className={`inline-block ${char === "T" ? "text-invictus-red" : ""}`}
              style={{ willChange: "transform, opacity, filter" }}
              aria-hidden
            >
              {char}
            </span>
          ))}
        </h2>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="mt-12 max-w-md text-center text-base text-invictus-gray-300 sm:text-lg"
        >
          El gimnasio.
          <br />
          La gente.
          <br />
          <span className="text-invictus-white">La actitud.</span>
        </p>

        {/* Línea decorativa bottom */}
        <div
          aria-hidden
          className="absolute inset-x-6 bottom-8 flex items-center gap-4 sm:inset-x-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-invictus-gray-500">
            Scroll —
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-invictus-gray-500">
            Continuar
          </span>
        </div>
      </div>
    </section>
  );
}
