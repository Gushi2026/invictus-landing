"use client";

import { useState } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { ArrowUpRight, MessageCircle, CreditCard, Building2, Copy, Check } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { MERCADO_PAGO_URL, TRANSFERENCIA, PRECIO_MENSUAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type StartDrawerProps = {
  trigger: React.ReactNode;
};

/**
 * Drawer "Empezá a entrenar" con 3 caminos:
 *  1. WhatsApp — clase de prueba gratis (siempre habilitado)
 *  2. Mercado Pago — pago online (requiere MERCADO_PAGO_URL configurado)
 *  3. Transferencia — alias/CBU + comprobante por WhatsApp (requiere TRANSFERENCIA configurado)
 *
 * Si los placeholders de pago están vacíos, esas opciones aparecen
 * marcadas como "próximamente" pero el WhatsApp siempre funciona.
 */
export function StartDrawer({ trigger }: StartDrawerProps) {
  const hasMercadoPago = MERCADO_PAGO_URL.length > 0;
  const hasTransferencia = TRANSFERENCIA.alias.length > 0 || TRANSFERENCIA.cbu.length > 0;

  return (
    <DrawerPrimitive.Root>
      <DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" />
        <DrawerPrimitive.Content
          className="fixed inset-x-0 bottom-0 z-[81] mt-24 flex h-auto max-h-[85vh] flex-col rounded-t-[var(--radius)] border-t border-white/10 bg-invictus-gray-900 outline-none"
        >
          <DrawerPrimitive.Title className="sr-only">
            Empezá a entrenar
          </DrawerPrimitive.Title>
          <DrawerPrimitive.Description className="sr-only">
            Elegí cómo querés empezar
          </DrawerPrimitive.Description>

          {/* Handle bar */}
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/15"
          />

          <div className="mx-auto w-full max-w-2xl overflow-y-auto px-6 pb-10 pt-8 sm:px-10">
            {/* Header */}
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-invictus-red">
              Empezá
            </p>
            <h3 className="font-display mt-3 text-balance text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-[-0.005em] text-invictus-white pb-1">
              Tres formas de
              <br />
              <span className="text-invictus-red">empezar a entrenar.</span>
            </h3>
            <p className="mt-3 text-sm text-invictus-gray-300">
              Elegí la que prefieras. Las tres llegan al mismo gym.
            </p>

            {/* Opciones */}
            <div className="mt-8 flex flex-col gap-3">
              {/* 1. WhatsApp — clase prueba (siempre habilitado) */}
              <DrawerOption
                icon={<MessageCircle size={20} />}
                title="Probá una clase gratis"
                description="Coordinás por WhatsApp. La primera es de prueba, sin tarjeta, sin compromiso."
                href={whatsappLink({ kind: "trial" })}
                ctaLabel="Hablar por WhatsApp"
                accent
              />

              {/* 2. Mercado Pago — placeholder si no hay URL */}
              {hasMercadoPago ? (
                <DrawerOption
                  icon={<CreditCard size={20} />}
                  title={`Pagá tu primer mes${PRECIO_MENSUAL ? ` · ${PRECIO_MENSUAL}` : ""}`}
                  description="Mercado Pago. Recibís el comprobante automático y empezás cuando quieras."
                  href={MERCADO_PAGO_URL}
                  ctaLabel="Pagar online"
                />
              ) : (
                <DrawerOption
                  icon={<CreditCard size={20} />}
                  title="Pagá tu primer mes online"
                  description="Mercado Pago — próximamente. Mientras tanto, coordinanos por WhatsApp."
                  disabled
                />
              )}

              {/* 3. Transferencia — placeholder si no hay datos */}
              {hasTransferencia ? (
                <TransferenciaOption />
              ) : (
                <DrawerOption
                  icon={<Building2 size={20} />}
                  title="Transferencia bancaria"
                  description="Próximamente. Por ahora se coordina por WhatsApp."
                  disabled
                />
              )}
            </div>

            {/* Footer del drawer */}
            <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
              La Plata · Argentina
            </p>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}

type OptionProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  accent?: boolean;
  disabled?: boolean;
};

function DrawerOption({
  icon,
  title,
  description,
  href,
  ctaLabel,
  accent = false,
  disabled = false,
}: OptionProps) {
  const Wrapper = (props: React.HTMLAttributes<HTMLDivElement>) =>
    disabled ? <div {...props} /> : <a href={href} target="_blank" rel="noopener noreferrer" {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>} />;

  return (
    <Wrapper
      className={cn(
        "group relative flex items-start gap-4 rounded-[var(--radius)] border p-5 transition-colors sm:p-6",
        disabled
          ? "cursor-not-allowed border-white/5 bg-invictus-black/40 opacity-60"
          : accent
            ? "border-invictus-red bg-invictus-red/10 hover:bg-invictus-red/20"
            : "border-white/10 bg-invictus-black/40 hover:border-white/30 hover:bg-invictus-black/60",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          accent ? "bg-invictus-red text-white" : "bg-white/5 text-invictus-gray-100",
        )}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-display text-lg leading-tight tracking-[-0.005em] text-invictus-white sm:text-xl">
          {title}
        </p>
        <p className="mt-1 text-sm text-invictus-gray-300">{description}</p>
        {!disabled && ctaLabel && (
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-invictus-red">
            {ctaLabel}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        )}
      </div>
    </Wrapper>
  );
}

/**
 * Card de transferencia con copy-to-clipboard del alias/CBU
 * + botón a WhatsApp para enviar comprobante.
 */
function TransferenciaOption() {
  const [copied, setCopied] = useState<"alias" | "cbu" | null>(null);

  const copy = async (value: string, kind: "alias" | "cbu") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="rounded-[var(--radius)] border border-white/10 bg-invictus-black/40 p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-invictus-gray-100"
        >
          <Building2 size={20} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg leading-tight tracking-[-0.005em] text-invictus-white sm:text-xl">
            Transferencia
          </p>
          <p className="mt-1 text-sm text-invictus-gray-300">
            Copiás los datos, transferís y enviás el comprobante por WhatsApp.
          </p>

          {/* Datos copiables */}
          <div className="mt-4 flex flex-col gap-2">
            {TRANSFERENCIA.alias && (
              <CopyRow
                label="Alias"
                value={TRANSFERENCIA.alias}
                copied={copied === "alias"}
                onCopy={() => copy(TRANSFERENCIA.alias, "alias")}
              />
            )}
            {TRANSFERENCIA.cbu && (
              <CopyRow
                label="CBU"
                value={TRANSFERENCIA.cbu}
                copied={copied === "cbu"}
                onCopy={() => copy(TRANSFERENCIA.cbu, "cbu")}
              />
            )}
            {TRANSFERENCIA.titular && (
              <p className="text-xs text-invictus-gray-500">
                Titular: <span className="text-invictus-gray-100">{TRANSFERENCIA.titular}</span>
              </p>
            )}
          </div>

          <a
            href={whatsappLink({ kind: "general" })}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-invictus-red"
          >
            Enviar comprobante por WhatsApp
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

function CopyRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className="group flex items-center gap-3 rounded-md border border-white/10 bg-invictus-gray-800 px-3 py-2 text-left transition-colors hover:border-white/30"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
        {label}
      </span>
      <span className="flex-1 truncate font-mono text-sm text-invictus-white">
        {value}
      </span>
      <span className="text-invictus-gray-300 transition-colors group-hover:text-invictus-white">
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </span>
    </button>
  );
}
