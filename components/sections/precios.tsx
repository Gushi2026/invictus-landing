"use client";

import { motion, Transition } from "framer-motion";
import { CheckCircleIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { whatsappLink } from "@/lib/whatsapp";
import planes from "@/content/precios.json";

const ease = [0.2, 0.7, 0.1, 1] as const;

type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  style?: React.CSSProperties;
};

function BorderTrail({ className, size = 80, transition, delay, style }: BorderTrailProps) {
  const BASE: Transition = { repeat: Infinity, duration: 4, ease: "linear" };
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)`, ...style }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ ...(transition ?? BASE), delay }}
      />
    </div>
  );
}

type Plan = (typeof planes)[number];

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const hasPrice = plan.precio !== "";
  const href = whatsappLink({ kind: "general" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col rounded-2xl border",
        plan.highlighted
          ? "border-invictus-red bg-invictus-gray-900"
          : "border-invictus-gray-700 bg-invictus-gray-900",
      )}
    >
      {plan.highlighted && (
        <BorderTrail
          className="bg-invictus-red"
          size={80}
          style={{
            boxShadow: "0 0 12px 4px rgb(225 6 0 / 40%), 0 0 40px 10px rgb(225 6 0 / 15%)",
          }}
        />
      )}

      <div
        className={cn(
          "rounded-t-2xl border-b p-6",
          plan.highlighted
            ? "border-invictus-red/30 bg-invictus-red/5"
            : "border-invictus-gray-700",
        )}
      >
        {plan.highlighted && (
          <div className="mb-4 flex w-fit items-center gap-1.5 rounded-md border border-invictus-red/40 bg-invictus-red/10 px-2.5 py-1">
            <StarIcon className="h-3 w-3 fill-invictus-red text-invictus-red" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-invictus-red">
              Más elegido
            </span>
          </div>
        )}

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-invictus-gray-500">
          {plan.nombre}
        </p>

        <div className="mt-3 flex items-end gap-1">
          {hasPrice ? (
            <>
              <span className="mb-1 font-mono text-base text-invictus-gray-500">$</span>
              <span className="font-display text-6xl leading-none tracking-[-0.02em] text-invictus-white">
                {plan.precio}
              </span>
            </>
          ) : (
            <span
              className={cn(
                "font-display text-4xl leading-none tracking-[-0.01em]",
                plan.highlighted ? "text-invictus-red" : "text-invictus-gray-500",
              )}
            >
              Consultá
            </span>
          )}
        </div>
        {hasPrice && (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-invictus-gray-500">
            por mes
          </p>
        )}

        <p className="mt-4 text-sm text-invictus-gray-300">{plan.info}</p>
      </div>

      <div className="flex flex-col gap-3 px-6 py-6">
        {plan.features.map((f) => (
          <div key={f.text} className="flex items-center gap-3">
            <CheckCircleIcon
              className={cn(
                "h-4 w-4 shrink-0",
                plan.highlighted ? "text-invictus-red" : "text-invictus-gray-500",
              )}
            />
            <span className="text-sm text-invictus-gray-300">{f.text}</span>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "mt-auto border-t p-4",
          plan.highlighted ? "border-invictus-red/30" : "border-invictus-gray-700",
        )}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors",
            plan.highlighted
              ? "bg-invictus-red text-invictus-white hover:bg-invictus-red-deep"
              : "border border-invictus-gray-700 text-invictus-white hover:border-invictus-gray-500 hover:bg-invictus-gray-800",
          )}
        >
          Consultá por WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

export function Precios() {
  return (
    <section
      id="precios"
      className="relative bg-invictus-black px-6 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow="06 · Planes"
              headingClassName="font-display mt-4 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] tracking-[-0.005em] pb-2"
            >
              Elegí cómo
              <br />
              <span className="text-invictus-red">comprometerte.</span>
            </SectionHeading>
          </div>
          <p className="max-w-sm text-pretty text-base text-invictus-gray-300">
            Sin contratos anuales. Sin letra chica.
            <br />
            Empezás cuando querés, con lo que querés.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {planes.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-invictus-gray-500">
          Primera clase gratis en cualquier disciplina —{" "}
          <span className="text-invictus-white">sin tarjeta, sin presión</span>
        </p>
      </div>
    </section>
  );
}
