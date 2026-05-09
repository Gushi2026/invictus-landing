"use client";

import { useEffect } from "react";

/**
 * Smooth scroll global con Lenis.
 *  - Easing martial: easeOutQuart (lento al inicio, snap al final).
 *  - Lerp 0.08 para sensación de peso/inercia controlada.
 *  - Integrado con GSAP ScrollTrigger (sincronización perfecta).
 *  - Reduced-motion: no monta nada, browser usa scroll nativo.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cleanup: () => void = () => {};

    (async () => {
      const Lenis = (await import("lenis")).default;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        // Duration en segundos para alcanzar el target — más alto = más inercia
        duration: 1.4,
        // Easing martial: easeOutQuart — empieza con peso, snap final
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        // Lerp suave (qué tan rápido cierra la distancia con el target)
        lerp: 0.08,
        // Smooth wheel (rueda + trackpad)
        smoothWheel: true,
        // Wheel multiplier — 1 = normal
        wheelMultiplier: 1,
        // Touch (mobile) usa nativo, más responsive
        touchMultiplier: 1.5,
      });

      // Sync con ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      const tickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tickerCb);
        lenis.destroy();
      };
    })();

    return () => cleanup();
  }, []);

  return null;
}
