"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { BLUR_BLACK } from "@/lib/constants";

export type MediaSource =
  | { type: "image"; src: string; hoverSrc?: string }
  | { type: "video"; src: string; poster: string };

type MediaCardProps = {
  media: MediaSource;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  aspect?: string;
};

/**
 * Media card que acepta image (con opcional hoverSrc para cross-fade) o video
 * (autoplay on hover, pause on leave + offscreen via IntersectionObserver).
 *
 * Parallax sutil: la imagen se desplaza ±7% según el scroll progress de la card,
 * con un scale 1.15 que oculta los bordes durante la traslación.
 *
 * El children se renderiza por encima de la media (overlay).
 */
export function MediaCard({
  media,
  alt,
  className,
  children,
  aspect = "aspect-[4/5]",
}: MediaCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [inView, setInView] = useState(false);

  // Parallax: y va de -7% a 7% según el progreso de scroll relativo a la card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isHover && inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isHover, inView]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden bg-invictus-gray-900",
        aspect,
        className,
      )}
      style={{ borderRadius: "var(--radius)" }}
    >
      {/* Wrapper con parallax — drift sutil con scroll */}
      <motion.div
        className="absolute inset-0 motion-reduce:transform-none"
        style={{ y: imageY, scale: 1.15 }}
      >
        {media.type === "image" ? (
          <>
            <Image
              src={media.src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={BLUR_BLACK}
              className={cn(
                "object-cover",
                media.hoverSrc
                  ? "opacity-100 group-hover:opacity-0"
                  : "opacity-60 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-80",
              )}
              style={
                media.hoverSrc
                  ? undefined
                  : { transitionTimingFunction: "var(--ease-invictus)" }
              }
            />
            {media.hoverSrc && (
              <Image
                src={media.hoverSrc}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-0 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <>
            <Image
              src={media.poster}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={BLUR_BLACK}
              className={cn(
                "object-cover",
                isHover ? "opacity-0" : "opacity-70",
              )}
            />
            <video
              ref={videoRef}
              src={media.src}
              muted
              loop
              playsInline
              preload="none"
              poster={media.poster}
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
            />
          </>
        )}
      </motion.div>

      {/* Overlay base */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-invictus-black via-invictus-black/70 to-transparent"
      />

      {children}
    </div>
  );
}
