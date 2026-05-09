"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BLUR_BLACK } from "@/lib/constants";

export function Manifiesto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const scene = sceneRef.current;
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      const line3 = line3Ref.current;
      const tag = tagRef.current;
      const bg = bgRef.current;
      if (!wrapper || !scene || !line1 || !line2 || !line3 || !tag || !bg)
        return;

      gsap.set(line1, { opacity: 1, yPercent: 0, filter: "blur(0px)", scale: 1 });
      gsap.set(line2, { opacity: 0, yPercent: 60, scale: 1.08, filter: "blur(2px)" });
      gsap.set(line3, { opacity: 0, yPercent: 60, scale: 1.08, filter: "blur(2px)" });
      gsap.set(tag, { opacity: 0, y: 30 });
      gsap.set(bg, { scale: 1.25, opacity: 0.15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          pin: scene,
          pinSpacing: false,
          scrub: 0.6,
          onUpdate: (self) => {
            const counter = counterRef.current;
            if (!counter) return;
            const n = Math.round(self.progress * 99);
            counter.textContent = `${String(n).padStart(2, "0")} / Invictus`;
          },
        },
      });

      // Acto 1 → Acto 2 → Acto 3 + tag final
      tl.to(bg, { opacity: 0.4, scale: 1, duration: 1, ease: "power2.out" }, 0)
        // Hold line1 (Acto 1)
        .to({}, { duration: 1.2 })
        // Line1 absorbe el golpe + line2 entra (Acto 2)
        .to(
          line1,
          {
            opacity: 0,
            yPercent: 45,
            scale: 0.85,
            filter: "blur(24px)",
            duration: 0.55,
            ease: "power4.in",
          },
        )
        .to(
          line2,
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "back.out(2.2)",
          },
          "+=0.18",
        )
        // Hold line2
        .to({}, { duration: 1.4 })
        // Line2 absorbe + line3 entra (Acto 3)
        .to(
          line2,
          {
            opacity: 0,
            yPercent: 45,
            scale: 0.85,
            filter: "blur(24px)",
            duration: 0.55,
            ease: "power4.in",
          },
        )
        .to(
          line3,
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "back.out(2.2)",
          },
          "+=0.18",
        )
        // Pausa antes de revelar el tag
        .to({}, { duration: 0.6 })
        // Tag "Eso es Invictus." aparece debajo
        .to(tag, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        // Hold final
        .to({}, { duration: 0.8 })
        // bg fade
        .to(bg, { opacity: 0.18, duration: 0.4 }, "<");

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh);

      cleanup = () => {
        window.removeEventListener("resize", refresh);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative bg-invictus-black"
      style={{ height: "420vh" }}
      aria-label="Manifiesto"
    >
      <div
        ref={sceneRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div
          ref={bgRef}
          aria-hidden
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/fotos/foto-09.jpg"
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_BLACK}
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-invictus-black/60" />
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-invictus-red/40 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.32em] text-invictus-red">
              Manifiesto
            </span>
            <span className="h-px flex-1 bg-invictus-red/30" />
            <span
              ref={counterRef}
              className="font-mono text-xs uppercase tracking-[0.22em] tabular-nums text-invictus-gray-500"
            >
              00 / Invictus
            </span>
          </div>

          <div className="relative mt-12">
            {/* Versión animada (oculta para reduced-motion) */}
            <div className="relative min-h-[44vh] motion-reduce:hidden sm:min-h-[40vh]">
              {/* Acto 1 */}
              <p
                ref={line1Ref}
                className="font-display absolute inset-x-0 top-0 text-balance text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.005em] text-invictus-white pb-2"
              >
                La actitud no aparece
                <br />
                de un día para el otro.
              </p>

              {/* Acto 2 */}
              <p
                ref={line2Ref}
                className="font-display absolute inset-x-0 top-0 text-balance text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.005em] text-invictus-white opacity-0 pb-2"
              >
                Se construye{" "}
                <span className="relative inline-block text-invictus-red">
                  todos los días.
                </span>
                <br />
                <span className="text-invictus-gray-300">
                  En cada momento donde elegís no bajar los brazos.
                </span>
              </p>

              {/* Acto 3 */}
              <p
                ref={line3Ref}
                className="font-display absolute inset-x-0 top-0 text-balance text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.005em] text-invictus-white opacity-0 pb-2"
              >
                Es lo que te define
                <br />
                <span className="text-invictus-red">
                  cuando nadie está mirando.
                </span>
              </p>
            </div>

            {/* Tag final "Eso es Invictus" — aparece bajo el Acto 3 */}
            <p
              ref={tagRef}
              className="mt-10 font-mono text-xs uppercase tracking-[0.32em] text-invictus-red opacity-0 motion-reduce:hidden"
            >
              Eso es Invictus.
            </p>

            {/* Versión reduced-motion: stack vertical, sin animación */}
            <div className="hidden flex-col gap-6 motion-reduce:flex">
              <p className="font-display text-balance text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.005em] text-invictus-white">
                La actitud no aparece de un día para el otro.
              </p>
              <p className="font-display text-balance text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.005em] text-invictus-white">
                Se construye <span className="text-invictus-red">todos los días</span>. En cada momento donde elegís no bajar los brazos.
              </p>
              <p className="font-display text-balance text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.005em] text-invictus-white">
                Es lo que te define <span className="text-invictus-red">cuando nadie está mirando.</span>
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-invictus-red">
                Eso es Invictus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
