"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "invictus-intro-shown";

/**
 * Intro veil — pantalla negra con wordmark INVICTUS que se muestra
 * solo en la primera carga de la sesión (cubre el FCP en producción).
 *
 *  - Aparece full-screen black con el wordmark centrado
 *  - Después de ~1.6s se desvanece (el wordmark sale primero, después el bg)
 *  - sessionStorage flag → no se muestra en navegaciones internas o reloads
 *    durante la misma sesión
 *  - Reduced-motion: se monta y desmonta inmediatamente sin animación
 */
export function IntroVeil() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    // SSR safe: solo en cliente
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";

    if (reduce || alreadyShown) {
      setShow(false);
      return;
    }

    setShow(true);
    sessionStorage.setItem(STORAGE_KEY, "1");

    // Auto-dismiss después de 1.6s
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);

  // Antes de saber si mostrar (SSR/hidratación inicial), no renderizamos nada
  if (show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.6, 0, 0.4, 1], delay: 0.1 },
          }}
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-invictus-black"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
