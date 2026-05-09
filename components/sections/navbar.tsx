"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/wordmark";

const NAV_ITEMS = [
  { href: "#disciplinas", label: "Disciplinas" },
  { href: "#coaches", label: "Coaches" },
  { href: "#horarios", label: "Horarios" },
  { href: "#sedes", label: "Sedes" },
];

const ease = [0.2, 0.7, 0.1, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-white/10 bg-invictus-black/70 backdrop-blur-md supports-[backdrop-filter]:bg-invictus-black/60"
          : "border-b border-transparent bg-transparent",
      )}
      style={{
        transitionTimingFunction: "var(--ease-invictus)",
        paddingTop: "env(safe-area-inset-top, 0)",
      }}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8"
        style={{
          paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
          paddingRight: "max(1.25rem, env(safe-area-inset-right))",
        }}
      >
        <Link
          href="#top"
          className="flex items-center transition-opacity hover:opacity-80"
          aria-label="Inicio"
        >
          <Wordmark size={scrolled ? "sm" : "md"} />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm tracking-wide text-invictus-gray-300 transition-colors hover:text-invictus-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink({ kind: "trial" })}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden h-9 items-center justify-center gap-1.5 rounded-full border border-invictus-red/70 px-4 text-sm font-medium text-invictus-red transition-colors hover:bg-invictus-red hover:text-invictus-white md:inline-flex"
          >
            Vení una vez
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="relative z-[60] inline-flex h-10 w-10 items-center justify-center rounded-full text-invictus-white transition-colors hover:bg-white/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[55] origin-top bg-invictus-black transition-[transform,opacity] duration-300 md:hidden",
          open
            ? "scale-y-100 opacity-100"
            : "pointer-events-none scale-y-95 opacity-0",
        )}
        style={{
          transitionTimingFunction: "var(--ease-invictus)",
          paddingBottom: "env(safe-area-inset-bottom, 0)",
          paddingTop: "calc(4rem + env(safe-area-inset-top, 0))",
        }}
      >
        <ul className="flex flex-col gap-1 px-6 py-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 py-5 font-display text-3xl tracking-[-0.005em] text-invictus-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-8">
            <a
              href={whatsappLink({ kind: "trial" })}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="block w-full rounded-full bg-invictus-red px-6 py-4 text-center text-base font-medium text-invictus-white"
              onClick={() => setOpen(false)}
            >
              Vení una vez
            </a>
          </li>
        </ul>
      </div>
    </motion.header>
  );
}
