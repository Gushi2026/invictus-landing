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

      // Evita que los cambios de altura del URL bar de iOS Safari
      // fuercen un recálculo de ScrollTrigger en cada scroll
      ScrollTrigger.config({ ignoreMobileResize: true });

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      // Sync con ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      const tickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);

      // Recalcular después de que fuentes e imágenes carguen
      const onLoad = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener("load", onLoad);
      }

      cleanup = () => {
        window.removeEventListener("load", onLoad);
        gsap.ticker.remove(tickerCb);
        lenis.destroy();
      };
    })();

    return () => cleanup();
  }, []);

  return null;
}
