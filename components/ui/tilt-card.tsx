"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
};

/**
 * 3D tilt card. Mouse-tracked transform con perspective real.
 * GPU-accelerated, deshabilitado bajo prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
  perspective = 1200,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Solo en dispositivos con mouse real (no touch). Mobile / iPad táctil queda estático.
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fineHover) return;

    let rx = 0;
    let ry = 0;
    let targetRx = 0;
    let targetRy = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      targetRy = x * intensity;
      targetRx = -y * intensity;
    };
    const onLeave = () => {
      targetRx = 0;
      targetRy = 0;
    };

    const tick = () => {
      rx += (targetRx - rx) * 0.12;
      ry += (targetRy - ry) * 0.12;
      el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [intensity, perspective]);

  return (
    <div
      ref={ref}
      className={cn("transform-gpu transition-transform will-change-transform", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
