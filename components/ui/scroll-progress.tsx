"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/components/hooks/use-reduced-motion";

export function ScrollProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-invictus-red"
      style={{ scaleX }}
    />
  );
}
