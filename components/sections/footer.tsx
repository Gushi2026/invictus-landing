import Link from "next/link";
import { sedes } from "@/lib/schedule";
import { INSTAGRAM_URL, SHOP_FORM_URL, BRAND } from "@/lib/constants";
import { whatsappLink } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/wordmark";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.6 6.32A8 8 0 0 0 4.05 14.5L3 19l4.6-1.04a8 8 0 0 0 12.05-7.45 8 8 0 0 0-2.05-4.2zm-5.6 12.32a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.74.62.6-2.66-.16-.26a6.6 6.6 0 1 1 5.9 3.36zm3.6-4.95c-.2-.1-1.18-.58-1.36-.65-.18-.06-.32-.1-.45.1-.13.2-.5.65-.62.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-1-.6-.53-1-1.18-1.12-1.38-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35l-.65-1.55c-.17-.4-.34-.34-.46-.35h-.4c-.13 0-.34.05-.52.25s-.69.67-.69 1.64.71 1.9.81 2.04c.1.13 1.4 2.13 3.39 2.99.47.2.84.32 1.13.41.47.15.9.13 1.24.08.38-.06 1.18-.48 1.34-.95.16-.46.16-.86.12-.94-.05-.08-.18-.13-.38-.23z" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#disciplinas", label: "Disciplinas" },
  { href: "#coaches", label: "Coaches" },
  { href: "#horarios", label: "Horarios" },
  { href: "#sedes", label: "Sedes" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-invictus-black px-6 pb-12 pt-24 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* Bloque manifesto */}
        <div className="border-t border-white/10 pt-16">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-invictus-red">
            La actitud
          </p>
          <h3 className="font-display mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.005em] text-invictus-white pb-2">
            No se compra.
            <br />
            <span className="text-invictus-red">Se entrena.</span>
          </h3>
        </div>

        {/* Grid info */}
        <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-12 border-t border-white/10 pt-12 sm:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4">
            <Wordmark size="md" showSubtitle />
            <p className="mt-6 max-w-xs text-sm text-invictus-gray-300">
              Gimnasio de artes marciales en {BRAND.ciudad}. Boxeo, MMA, BJJ,
              Muay Thai, Lucha, Kick Boxing y Taekwondo.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
              {BRAND.ciudad} · Argentina
            </p>
          </div>

          {/* Navegación */}
          <div className="col-span-1 sm:col-span-2">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-invictus-gray-500">
              Navegar
            </p>
            <ul className="mt-5 flex flex-col gap-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-invictus-gray-300 transition-colors hover:text-invictus-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sedes */}
          <div className="col-span-2 sm:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-invictus-gray-500">
              Sedes
            </p>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              {sedes.map((s) => (
                <li key={s.slug}>
                  <a
                    href={s.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block"
                  >
                    <span className="block font-medium text-invictus-white transition-colors group-hover:text-invictus-red">
                      {s.nombre.replace("Sede ", "")}
                    </span>
                    <span className="text-xs text-invictus-gray-500">
                      {s.direccion}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto + Más */}
          <div className="col-span-1 sm:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-invictus-gray-500">
              Conectar
            </p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={whatsappLink({ kind: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-invictus-gray-300 transition-colors hover:text-invictus-white"
                >
                  <WhatsAppIcon size={14} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="INVICTUS en Instagram (@invictuslaplata)"
                  className="inline-flex items-center gap-2 text-invictus-gray-300 transition-colors hover:text-invictus-white"
                >
                  <InstagramIcon size={14} />
                  @invictuslaplata
                </a>
              </li>
              <li>
                <a
                  href={SHOP_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tienda de indumentaria INVICTUS (formulario externo)"
                  className="inline-flex items-center gap-1 text-invictus-gray-300 transition-colors hover:text-invictus-white"
                >
                  Indumentaria
                  <span aria-hidden className="text-invictus-gray-500">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Wordmark gigante decorativo */}
        <div
          aria-hidden
          className="mt-24 select-none overflow-hidden border-t border-white/5 pt-8"
        >
          <p className="font-display text-center leading-none tracking-[-0.04em] text-invictus-white/[0.04]"
             style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}
          >
            INVIC<span className="text-invictus-red/[0.08]">T</span>US
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
            © {new Date().getFullYear()} {BRAND.nombre} · Todos los derechos reservados
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-invictus-gray-500">
            Hecho en La Plata
          </p>
        </div>
      </div>
    </footer>
  );
}
