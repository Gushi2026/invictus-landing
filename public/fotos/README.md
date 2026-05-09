# Banco de fotos · INVICTUS

Cada foto en este directorio se usa en al menos una sección. Cuando llegue el material real del shoot, reemplazá los archivos manteniendo los **nombres exactos**: el código no cambia, solo se actualiza el contenido visual.

## Mapa de uso por archivo

| Archivo | Dónde aparece | Tipo recomendado |
|---|---|---|
| `foto-01.jpg` | Disciplinas — Muay Thai (primary) | Acción striking, vertical 4:5, ~2000×2500px |
| `foto-02.jpg` | Disciplinas — Boxeo (primary) | Pad work / sparring, vertical 4:5 |
| `foto-03.jpg` | Disciplinas — Kick Boxing (primary) | Combo de patadas, vertical 4:5 |
| `foto-04.jpg` | Disciplinas — MMA (primary) + Showreel (hover de card 4) | Pelea / clinch / cage, vertical 4:5 |
| `foto-05.jpg` | Disciplinas — MMA Infantil (primary) | Niños entrenando con respeto, vertical 4:5 |
| `foto-06.jpg` | Disciplinas — Lucha (primary) + MMA Infantil (hover) | Takedown / clinch, vertical 4:5 |
| `foto-07.jpg` | Disciplinas — BJJ (primary) + Showreel card 3 (primary) | Sparring/roll BJJ, vertical 4:5 |
| `foto-08.jpg` | Disciplinas — Taekwondo (primary) + BJJ (hover) + Showreel card 3 (hover) | Patada técnica, vertical 4:5 |
| `foto-09.jpg` | **Multi-uso crítico**: Manifesto bg + Coaches banner + CTA Final bg + OG image SEO | Foto cinematográfica horizontal 16:9, ~3000×1700px. Equipo o entrenamiento general. Será el "rostro" del sitio. |
| `foto-10.jpg` | Disciplinas — Kick Boxing (hover) | Foto secundaria de KB |
| `foto-11.jpg` | Disciplinas — Muay Thai (hover) + Showreel card 4 (primary) | Foto secundaria MT / Comunidad |

## Specs técnicas

- **Formato**: JPG con calidad 80-85, o WebP (Next.js auto-convierte a AVIF/WebP)
- **Resolución**: mínimo 1500px lado largo, ideal 2000-3000px
- **Aspect ratios**:
  - Cards de Disciplinas y Showreel: **4:5 vertical**
  - Banner de Coaches y Manifesto bg: **16:8 a 16:9 horizontal**
  - Para `foto-09.jpg` (Open Graph): **1200×630** funciona, pero más grande (1800×945) escala mejor
- **Tratamiento sugerido en post**: desaturación leve (-15%), contraste alto, sombras frías, highlights cálidos. Cohesión sin filtros obvios.

## Si querés probar rápido con stock

Mientras coordinás el shoot real, **Unsplash** tiene buenas opciones libres (CC0 / Unsplash License):

- https://unsplash.com/s/photos/martial-arts
- https://unsplash.com/s/photos/boxing-training
- https://unsplash.com/s/photos/jiu-jitsu
- https://unsplash.com/s/photos/mma-training
- https://unsplash.com/s/photos/muay-thai

Bajá una y renombrala al slot correspondiente (`foto-XX.jpg`). Mantené el nombre y el código las usa automáticamente.

## Si necesitás ayuda con el shoot

Briefing rápido para el fotógrafo:

> Necesito retratos individuales de 9 profes (1:1, 1500×1500), 16-20 fotos de acción (4:5, 2000×2500) cubriendo las 8 disciplinas, 5 fotos cinematográficas del equipo (16:9, 3000×1700), y 6-8 fotos de cada sede (16:10). Tono: serio, alto contraste, sin pose obvia. La foto debe sentirse "tomada cuando nadie está mirando."
