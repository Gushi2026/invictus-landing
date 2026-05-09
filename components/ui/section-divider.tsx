"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type SectionDividerProps = {
  className?: string;
  /** "thin" = línea fina perimetral. "accent" = más gruesa, central rojo lleno. */
  variant?: "thin" | "accent";
};

/**
 * Divider horizontal entre secciones.
 * La línea se draws-in de izquierda a derecha cuando entra al viewport.
 * Reduced-motion: aparece estática.
 */
export function SectionDivider({
  className,
  variant = "thin",
}: SectionDividerProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6 sm:px-8", className)}>
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.1, ease }}
        className={cn(
          "h-px w-full origin-left",
          variant === "thin"
            ? "bg-gradient-to-r from-transparent via-invictus-red/40 to-transparent"
            : "bg-invictus-red/70",
        )}
      />
    </div>
  );
}
