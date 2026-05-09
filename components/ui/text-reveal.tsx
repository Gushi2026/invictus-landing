"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 0.7, 0.25, 1] as const;

type TextRevealProps = {
  text: string;
  splitBy?: "word" | "char";
  stagger?: number;
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * Word/char-by-word reveal estilo Chainzoku adaptado.
 * Cada token se traslada y fade-in (sin máscara overflow-hidden
 * para no recortar descenders como g, p, y, j).
 */
export function TextReveal({
  text,
  splitBy = "word",
  stagger = 0.045,
  delay = 0,
  duration = 0.55,
  className,
}: TextRevealProps) {
  const tokens =
    splitBy === "word" ? text.split(/(\s+)/) : Array.from(text);

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={cn("inline", className)}
      aria-label={text}
    >
      {tokens.map((token, idx) => {
        if (/^\s+$/.test(token)) {
          return <Fragment key={`s-${idx}`}>{token}</Fragment>;
        }
        return (
          <motion.span
            key={`w-${idx}`}
            aria-hidden
            variants={{
              hidden: { y: 14, opacity: 0, filter: "blur(4px)" },
              visible: {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration, ease },
              },
            }}
            className="inline-block"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {token}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
