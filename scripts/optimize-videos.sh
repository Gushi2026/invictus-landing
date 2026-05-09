#!/usr/bin/env bash
#
# Genera versiones WebM y MP4 optimizadas de los videos en public/videos/
# Requiere ffmpeg: brew install ffmpeg
#
# Salida típica: hero.mp4 (1.8MB) → hero.webm (~600KB-1MB) — 30-40% más liviano
#
# Uso:
#   chmod +x scripts/optimize-videos.sh
#   ./scripts/optimize-videos.sh

set -euo pipefail

VIDEOS_DIR="$(dirname "$0")/../public/videos"
cd "$VIDEOS_DIR"

if ! command -v ffmpeg &> /dev/null; then
  echo "❌ ffmpeg no está instalado. Instalalo con: brew install ffmpeg"
  exit 1
fi

for src in *.mp4; do
  base="${src%.mp4}"
  webm="${base}.webm"

  if [[ -f "$webm" && "$webm" -nt "$src" ]]; then
    echo "✓ $webm ya está actualizado, skip"
    continue
  fi

  echo "→ Generando $webm desde $src..."

  ffmpeg -y -i "$src" \
    -c:v libvpx-vp9 \
    -crf 32 \
    -b:v 0 \
    -row-mt 1 \
    -an \
    "$webm" \
    -loglevel error -stats

  src_size=$(du -h "$src" | cut -f1)
  webm_size=$(du -h "$webm" | cut -f1)
  echo "  $src ($src_size) → $webm ($webm_size)"
done

echo ""
echo "→ Re-comprimiendo MP4s con perfiles web-optimizados..."

for src in *.mp4; do
  base="${src%.mp4}"
  optimized="${base}.optimized.mp4"

  ffmpeg -y -i "$src" \
    -c:v libx264 \
    -crf 26 \
    -preset slow \
    -movflags +faststart \
    -an \
    "$optimized" \
    -loglevel error -stats

  if [[ -f "$optimized" ]]; then
    orig_size=$(stat -f%z "$src")
    new_size=$(stat -f%z "$optimized")
    if (( new_size < orig_size )); then
      mv "$optimized" "$src"
      echo "  ✓ $src re-comprimido ($((orig_size / 1024))KB → $((new_size / 1024))KB)"
    else
      rm "$optimized"
      echo "  - $src ya está óptimo, skip"
    fi
  fi
done

echo ""
echo "✓ Done. Después de correr esto, agregá <source> WebM en los <video> tags:"
echo ""
echo '  <video>'
echo '    <source src="/videos/hero.webm" type="video/webm" />'
echo '    <source src="/videos/hero.mp4" type="video/mp4" />'
echo '  </video>'
