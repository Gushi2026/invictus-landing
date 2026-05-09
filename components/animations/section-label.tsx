"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function SectionLabel({ children, delay = 0.1, className }: SectionLabelProps) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={cn(
        "font-mono text-xs uppercase tracking-[0.28em] text-invictus-red",
        className,
      )}
    >
      {children}
    </motion.span>
  );
}
