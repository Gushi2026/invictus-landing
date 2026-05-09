import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization — AVIF + WebP automático con fallback a JPG
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compresión y headers
  compress: true,
  poweredByHeader: false,

  // Reducir el bundle agregando experimental optimizations
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
    ],
  },
};

export default nextConfig;
