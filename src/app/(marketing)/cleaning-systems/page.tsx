import { LegacyHero } from "@/components/shared/LegacyHero";
import { SubpageContent } from "@/components/shared/SubpageContent";

const cleaningLinks = [
  { label: "Manuell og automatisk rengjøringssystem", href: "/cleaning-systems/manual-auto" },
  { label: "Åpne rengjøringssytemer (OPC)", href: "/cleaning-systems/opc" },
  { label: "Automatisert rengjøring", href: "/cleaning-systems/automated" },
  { label: "Installasjon av rørsystemer", href: "/cleaning-systems/installations" },
];

export default function CleaningSystemsPage() {
  return (
    <main className="bg-white">
      <LegacyHero
        category="Services"
        title="Cleaning Systems"
        subtitle="Våre rengjøringssystemer er testet og brukt av ledende matprodusenter verden over."
        links={cleaningLinks}
        imageSrc="/images/focus/Zoom_effekt_på_bilde.mp4"
      />

      <SubpageContent sidebarText="Profesjonelle rengjøringssystemer for næringsmiddelindustrien.">

        <h2 className="text-3xl lg:text-5xl font-light mb-8 lg:mb-12">Automatisert hygiene for matindustrien</h2>

        <p className="text-lg lg:text-xl font-light leading-relaxed mb-16 max-w-3xl">
          Sikre konsistente og målbare rengjøringsresultater med våre avanserte systemer. Vi tilbyr alt fra manuelle lavtrykksanlegg til fullt automatiserte CIP-løsninger og robotisert rengjøring. Våre løsninger reduserer vannforbruk, kjemikaliebruk og tidsbruk, samtidig som de oppfyller de strengeste kravene for matsikkerhet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          <div className="border border-black/10 p-8 lg:p-12 hover:bg-black/5 transition-colors">
            <h3 className="text-2xl font-medium mb-4">Åpne Rengjøringssystemer (OPC)</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-8">
              Skreddersydde anlegg for spyling, skumlegging og desinfisering. Både sentraliserte og desentraliserte løsninger.
            </p>
            <ul className="space-y-3 font-light text-sm">
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Satellittstasjoner</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Pumpestasjoner</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Slangetromler & tilbehør</li>
            </ul>
          </div>

          <div className="border border-black/10 p-8 lg:p-12 hover:bg-black/5 transition-colors">
            <h3 className="text-2xl font-medium mb-4">Automatisert Rengjøring</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-8">
              Fremtidens renhold er automatisert. Vi leverer skreddersydde CIP/SIP anlegg og automatiserte rengjøringsmaskiner.
            </p>
            <ul className="space-y-3 font-light text-sm">
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Clean-In-Place (CIP)</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Kassevaskere</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Robotisert rengjøring</li>
            </ul>
          </div>
        </div>
      </SubpageContent>
    </main>
  );
}
