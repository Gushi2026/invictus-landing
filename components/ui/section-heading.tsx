"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const eyebrowEase = [0.2, 0.7, 0.1, 1] as const;
const strikeEase = [0.18, 1.6, 0.5, 1] as const;

type SectionHeadingProps = {
  eyebrow: string;
  children: React.ReactNode;
  eyebrowClassName?: string;
  headingClassName?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  children,
  eyebrowClassName,
  headingClassName,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = motion[as] as typeof motion.h2;
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.4, ease: eyebrowEase }}
        className={cn(
          "font-mono text-xs uppercase tracking-[0.28em] text-invictus-red",
          eyebrowClassName,
        )}
      >
        {eyebrow}
      </motion.p>
      <Heading
        initial={{ opacity: 0, y: 64, scale: 0.9, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, delay: 0.32, ease: strikeEase }}
        className={headingClassName}
      >
        {children}
      </Heading>
    </>
  );
}
