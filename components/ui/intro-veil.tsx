"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "invictus-intro-shown";

type Phase = "loading" | "first-visit" | "dismissed";

/**
 * Intro veil — pantalla negra que cubre el FCP.
 *
 * Arranca en "loading" (veil negro sin wordmark) desde el primer render
 * para evitar el flash pre-hydration. En el useEffect decide:
 *  - Si ya fue vista / reduced-motion: pasa directo a "dismissed" (exit sin animación).
 *  - Si es primera visita: pasa a "first-visit" → wordmark anima → auto-dismiss a 1600ms.
 *
 * Esto elimina la ventana ciega que tenía el useState(null) anterior.
 */
export function IntroVeil() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";

    if (reduce || alreadyShown) {
      setPhase("dismissed");
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, "1");
    setPhase("first-visit");

    const t = setTimeout(() => setPhase("dismissed"), 1600);
    return () => clearTimeout(t);
  }, []);

  const isVisible = phase !== "dismissed";
  const isAnimated = phase === "first-visit";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={
            isAnimated
              ? { opacity: 0, transition: { duration: 0.6, ease: [0.6, 0, 0.4, 1], delay: 0.1 } }
              : { opacity: 0, transition: { duration: 0 } }
          }
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-invictus-black"
        >
          {isAnimated && (
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={{
                opacity: 0,
                y: -10,
                filter: "blur(8px)",
                transition: { duration: 0.4, ease: [0.6, 0, 0.4, 1] },
              }}
              className="font-display tracking-[-0.04em] text-invictus-white"
              style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
            >
              INVIC<span className="text-invictus-red">T</span>US
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
