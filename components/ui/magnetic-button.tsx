"use client";

import { useRef, useEffect, forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = ComponentPropsWithoutRef<"a"> & {
  strength?: number;
  href: string;
};

export const MagneticButton = forwardRef<HTMLAnchorElement, MagneticButtonProps>(
  function MagneticButton({ children, className, strength = 8, ...rest }, externalRef) {
    const innerRef = useRef<HTMLAnchorElement>(null);
    const ref = (externalRef as React.RefObject<HTMLAnchorElement>) ?? innerRef;

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const fineHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      if (!fineHover) return;

      let raf: number | null = null;
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        cx = (x / r.width) * strength;
        cy = (y / r.height) * strength;
      };
      const onLeave = () => {
        cx = 0;
        cy = 0;
      };
      const tick = () => {
        tx += (cx - tx) * 0.15;
        ty += (cy - ty) * 0.15;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        raf = requestAnimationFrame(tick);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
      };
    }, [ref, strength]);

    return (
      <a
        ref={ref}
        className={cn("inline-block transform-gpu will-change-transform", className)}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
