import { LegacyHero } from "@/components/shared/LegacyHero";
import { SubpageContent } from "@/components/shared/SubpageContent";

const processLinks = [
  { label: "Engineering & Design", href: "/hygienic/engineering" },
  { label: "Utstyrsinstallasjon", href: "/hygienic/equipment" },
  { label: "Vedlikehold & Service", href: "/hygienic/service" }
];

export default function HygienicProcessSolutionsPage() {
  return (
    <main className="bg-white">
      <LegacyHero
        category="Services"
        title="Hygienic Process Solutions"
        subtitle="Smarte og effektive prosessystemer, skreddersydd for din bedrift."
        links={processLinks}
        imageSrc="/images/focus/Bilder_med_effekt.mp4"
      />

      <SubpageContent sidebarText="Komplette hygieniske prosessystemer bygget på velprøvd teknologi og operativ erfaring.">

        <h2 className="text-3xl lg:text-5xl font-light mb-8 lg:mb-12">Totalleverandør av hygienedrevne prosessystemer</h2>

        <p className="text-lg lg:text-xl font-light leading-relaxed mb-16 max-w-3xl">
          Med inngående kunnskap om mattrygghet og produksjonseffektivitet, leverer Aquatiq komplette prosessystemer og komponenter. Vi prioriterer sanitært design for å maksimere oppetid, redusere rengjøringskostnader og sikre sluttproduktets kvalitet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          <div className="border border-black/10 p-8 lg:p-12 hover:bg-black/5 transition-colors">
            <h3 className="text-2xl font-medium mb-4">Engineering & Design</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-8">
              Vi bistår med P&ID, 3D-modellering og optimalisering av eksisterende anlegg med fokus på EHEDG retningslinjer og sanitært design.
            </p>
            <ul className="space-y-3 font-light text-sm">
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Layout og flyt</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Risikovurdering</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Rengjøringsvennlighet</li>
            </ul>
          </div>

          <div className="border border-black/10 p-8 lg:p-12 hover:bg-black/5 transition-colors">
            <h3 className="text-2xl font-medium mb-4">Utstyr og Installasjon</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-8">
              Gjennom Aquatiq Food Network samarbeider vi med bransjens beste for å levere ventiler, pumper, varmevekslere og rørsystemer i ypperste klasse.
            </p>
            <ul className="space-y-3 font-light text-sm">
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Prosessrør og sveising</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Integrasjon og automasjon</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> FAT og igangkjøring</li>
            </ul>
          </div>
        </div>
      </SubpageContent>
    </main>
  );
}
