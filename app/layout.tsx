import type { Metadata } from "next";
import { Inter, Anton, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Grain } from "@/components/ui/grain";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { IntroVeil } from "@/components/ui/intro-veil";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invictuslaplata.com"),
  title: {
    default: "INVICTUS · La actitud se entrena · Artes marciales en La Plata",
    template: "%s · INVICTUS La Plata",
  },
  description:
    "La actitud se construye todos los días. Boxeo, Kick Boxing, Muay Thai, MMA, BJJ, Lucha y Taekwondo en La Plata. Dos sedes, equipo competitivo. Primera clase gratis.",
  keywords: [
    "artes marciales La Plata",
    "boxeo La Plata",
    "MMA La Plata",
    "BJJ La Plata",
    "muay thai La Plata",
    "kick boxing La Plata",
    "gimnasio artes marciales",
    "Invictus La Plata",
    "clases de boxeo",
    "entrenamiento competitivo",
  ],
  authors: [{ name: "INVICTUS La Plata" }],
  creator: "INVICTUS La Plata",
  publisher: "INVICTUS La Plata",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "INVICTUS La Plata",
    title: "INVICTUS · La actitud se entrena",
    description:
      "Artes marciales en La Plata. Boxeo · MMA · BJJ · Muay Thai · Lucha · Kick Boxing · Taekwondo. La actitud se construye todos los días.",
    url: "https://invictuslaplata.com",
    images: [
      {
        url: "/fotos/foto-09.jpg",
        width: 1200,
        height: 630,
        alt: "INVICTUS · Gimnasio de artes marciales en La Plata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INVICTUS · La actitud se entrena",
    description:
      "Artes marciales en La Plata. La actitud se construye todos los días.",
    images: ["/fotos/foto-09.jpg"],
  },
  appleWebApp: {
    capable: true,
    title: "INVICTUS",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`dark ${inter.variable} ${anton.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-invictus-black text-invictus-white flex flex-col">
        {/* Structured data — Google entiende que es un gym con 2 sedes */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "INVICTUS Mixed Martial Arts",
              alternateName: "INVICTUS La Plata",
              url: "https://invictuslaplata.com",
              description:
                "Gimnasio de artes marciales en La Plata. Boxeo, MMA, BJJ, Muay Thai, Lucha, Kick Boxing y Taekwondo. Equipo competitivo y primera clase gratis.",
              sameAs: ["https://www.instagram.com/invictuslaplata/"],
              location: [
                {
                  "@type": "SportsActivityLocation",
                  name: "INVICTUS · Sede 3 y 41",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Calle 3 y 41",
                    addressLocality: "La Plata",
                    addressRegion: "Buenos Aires",
                    addressCountry: "AR",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: -34.9044974,
                    longitude: -57.9542528,
                  },
                },
                {
                  "@type": "SportsActivityLocation",
                  name: "INVICTUS · Sede Diagonal 74",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Diagonal 74 N° 2755",
                    addressLocality: "La Plata",
                    addressRegion: "Buenos Aires",
                    addressCountry: "AR",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: -34.9385122,
                    longitude: -57.9537667,
                  },
                },
              ],
              sport: [
                "Boxing",
                "Mixed Martial Arts",
                "Brazilian Jiu-Jitsu",
                "Muay Thai",
                "Wrestling",
                "Kick Boxing",
                "Taekwondo",
              ],
            }),
          }}
        />
        <IntroVeil />
        <a href="#top" className="skip-link">
          Saltar al contenido
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Grain />
        {children}
      </body>
    </html>
  );
}
