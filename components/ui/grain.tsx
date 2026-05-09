/**
 * Grain overlay global — film noise estilo Fabrica/AXM/Arpeggio.
 * SVG turbulence + mix-blend-mode: overlay para fundirse con cualquier bg.
 * Animado en JS con keyframes CSS para performance (no JS loop).
 */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.08] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "240px 240px",
        animation: "grain-shift 8s steps(8) infinite",
      }}
    />
  );
}
