"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const ease = [0.2, 0.7, 0.1, 1] as const;

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "p" | "span" | "h2" | "h3";
};

/**
 * Wrapper que hace clip-path mask reveal cuando entra en viewport.
 * Variants nativas de Framer Motion + viewport once.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  as = "div",
}: ScrollRevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.85, ease, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}
