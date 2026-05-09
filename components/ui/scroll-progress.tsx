"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Indicador de progreso de scroll — línea roja fina arriba del viewport.
 * Cinematográfico (timer del round). Usa spring para suavidad.
 * Reduced-motion: la línea aparece estática al 0% (no animada).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-invictus-red motion-reduce:hidden"
      style={{ scaleX }}
    />
  );
}
