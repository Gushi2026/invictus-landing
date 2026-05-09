"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MarqueeBandProps = {
  items: React.ReactNode[];
  variant?: "default" | "accent" | "minimal";
  direction?: "forward" | "reverse";
  className?: string;
};

const variantClasses: Record<NonNullable<MarqueeBandProps["variant"]>, string> = {
  default: "bg-invictus-gray-900 text-invictus-white border-y border-white/10",
  accent: "bg-invictus-red text-invictus-white",
  minimal:
    "bg-transparent text-invictus-white/80 border-y border-white/5",
};

/**
 * Marquee band — separador entre secciones con keywords en loop.
 * No JS para la animación: usa @keyframes marquee de globals.css.
 * Se pausa en hover y bajo prefers-reduced-motion (vía CSS).
 */
export function MarqueeBand({
  items,
  variant = "default",
  direction = "forward",
  className,
}: MarqueeBandProps) {
  return (
    <motion.div
      role="presentation"
      aria-hidden
      initial={{ opacity: 0, x: "-30%", scaleY: 0.4, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: "0%", scaleY: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "left center" }}
      className={cn(
        "relative overflow-hidden py-5 sm:py-6",
        variantClasses[variant],
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max whitespace-nowrap font-display text-3xl uppercase tracking-normal motion-reduce:animate-none sm:text-5xl",
          direction === "reverse" ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {Array.from({ length: 2 }).map((_, group) => (
          <div key={group} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
            {items.map((item, i) => (
              <span key={`${group}-${i}`} className="flex items-center gap-10 sm:gap-14">
                <span>{item}</span>
                <span
                  aria-hidden
                  className={cn(
                    "h-2 w-2 rounded-full",
                    variant === "accent"
                      ? "bg-invictus-white"
                      : "bg-invictus-red",
                  )}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
