import { LegacyHero } from "@/components/shared/LegacyHero";
import { SubpageContent } from "@/components/shared/SubpageContent";

const coursesLinks = [
  { label: "Aquatiq Food Forum", href: "/courses/forum" },
  { label: "Åpne kurs", href: "/courses/open" },
  { label: "Bedriftsinterne kurs", href: "/courses/internal" },
  { label: "Revisjonstjenester", href: "/courses/audit" },
];

export default function CoursesAuditPage() {
  return (
    <main className="bg-white">
      <LegacyHero
        category="Services"
        title="Training & Audits"
        subtitle="Vi bistår næringsmiddelindustrien med å forebygge og minimere risiko knyttet til mattrygghet."
        links={coursesLinks}
        imageSrc="/images/focus/Adult_Teaches_Kid_Food_Safety.mp4"
      />

      <SubpageContent sidebarText="Ekspertise på mattrygghet og kvalitetsstyring for industri og produsenter.">

        <h2 className="text-3xl lg:text-5xl font-light mb-8 lg:mb-12">Bygg en sterk mattrygghetskultur</h2>

        <p className="text-lg lg:text-xl font-light leading-relaxed mb-16 max-w-3xl">
          Gjennom våre kurs, seminarer og revisjonstjenester hjelper vi din bedrift med å oppfylle globale standarder (BRC, FSSC 22000, IFS). Vi utvikler de ansattes ferdigheter, sikrer at rutiner følges, og forbedrer matsikkerhetskulturen i hele verdikjeden.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          <div className="border border-black/10 p-8 lg:p-12 hover:bg-black/5 transition-colors">
            <h3 className="text-2xl font-medium mb-4">Kurs og Opplæring</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-8">
              Bredt utvalg av kurs innen hygiene, mattrygghet og standarder, tilgjengelig som åpne kurs, bedriftsinterne kurs og e-læring.
            </p>
            <ul className="space-y-3 font-light text-sm">
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Aquatiq Food Forum</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Hygieneansvarlig kurs</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> E-læring via Aquatiq ONE</li>
            </ul>
          </div>

          <div className="border border-black/10 p-8 lg:p-12 hover:bg-black/5 transition-colors">
            <h3 className="text-2xl font-medium mb-4">Revisjon og Tilsyn</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-8">
              Systematisk gjennomgang av bedriftens styringssystemer for å avdekke avvik og forbedringsmuligheter.
            </p>
            <ul className="space-y-3 font-light text-sm">
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Forhåndsrevisjon</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Leverandørrevisjon</li>
              <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Gap-analyse</li>
            </ul>
          </div>
        </div>

      </SubpageContent>
    </main>
  );
}
