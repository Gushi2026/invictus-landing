import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Manifiesto } from "@/components/sections/manifiesto";
import { Monumental } from "@/components/sections/monumental";
import { Disciplinas } from "@/components/sections/disciplinas";
import { Coaches } from "@/components/sections/coaches";
import { Showreel } from "@/components/sections/showreel";
import { Horarios } from "@/components/sections/horarios";
import { Sedes } from "@/components/sections/sedes";
import { Trayectoria } from "@/components/sections/trayectoria";
import { CtaFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <MarqueeBand
          variant="minimal"
          items={Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              INVIC<span className="text-invictus-red">T</span>US
            </span>
          ))}
        />

        <Manifiesto />

        <Monumental />

        <SectionDivider />

        <Disciplinas />

        <SectionDivider />

        <Coaches />

        <SectionDivider />

        <Showreel />

        <MarqueeBand
          variant="accent"
          direction="reverse"
          items={[
            <span key="0">Empezá</span>,
            <span key="1">Probá</span>,
            <span key="2">Volvé</span>,
            <span key="3">Sumate</span>,
            <span key="4">No bajes los brazos</span>,
          ]}
        />

        <Horarios />

        <SectionDivider />

        <Sedes />

        <SectionDivider />

        <Trayectoria />

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
