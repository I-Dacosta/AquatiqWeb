import { LegacyHero } from "@/components/shared/LegacyHero";
import { LegacyTeamContact } from "@/components/shared/LegacyTeamContact";
import { SubpageContent } from "@/components/shared/SubpageContent";

const analysisLinks = [
    { label: "Aquatiq ONE", href: "/analysis/aquatiq-one" },
    { label: "Food Safety Culture", href: "/analysis/food-safety-culture" },
    { label: "Sensilist", href: "/analysis/sensilist" },
];

const analysisTeam = [
    {
        name: "Heidi Camilla Sagen-Ohren",
        role: "Managing Director",
        phone: "+47 482 26 613",
        email: "heidi.sagen-ohren@aquatiq.com",
        imageSrc: "/images/focus/employee_placeholder_1.png", // Will need a transparent png cutout here
        company: "AQUATIQ SENSE"
    },
    {
        name: "Svein Georg Forland",
        role: "Senior Consultant & Marketing Manager",
        phone: "+47 911 84 293",
        email: "svein.georg.forland@aquatiq.com",
        imageSrc: "/images/focus/employee_placeholder_2.png", // Will need a transparent png cutout here
        company: "AQUATIQ SENSE"
    }
];

export default function AnalysisPage() {
    return (
        <main className="bg-white">
            <LegacyHero
                category="Services"
                title="Analysis"
                subtitle="Vi hjelper med å analysere, validere og forbedre bedriftens kompetanse relatert til mattrygghet. Vi leverer også spesialisert programvare for trending og overvåking av analytiske resultater i matindustrien."
                links={analysisLinks}
                imageSrc="/images/focus/Adult_Teaches_Kid_Food_Safety.mp4"
            />

            <LegacyTeamContact
                generalEmail="sense@aquatiq.com"
                generalPhone="+47 612 47 010"
                teamMembers={analysisTeam}
            />

            <SubpageContent sidebarText="Datadrevet innsikt og analyse for optimalisering av mattrygghet i produksjonsanlegg.">

                <h2 className="text-3xl lg:text-5xl font-light mb-8 lg:mb-12">Programvare og Digitale Verktøy</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24 mt-16">
                    <div className="border border-black/10 p-8 lg:p-12 hover:bg-black/5 transition-colors">
                        <h3 className="text-2xl font-medium mb-4">Sensilist</h3>
                        <p className="text-neutral-600 font-light leading-relaxed mb-8">
                            Bruk moderne, innovative digitale verktøy til å overvåke, organisere og spore analytiske kvalitetsdata for produksjonsmiljøet.
                        </p>
                        <ul className="space-y-3 font-light text-sm">
                            <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Listeria overvåkingsplaner</li>
                            <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Trending av resultater</li>
                            <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Varsling ved avvik</li>
                        </ul>
                    </div>

                    <div className="border border-black/10 p-8 lg:p-12 hover:bg-black/5 transition-colors">
                        <h3 className="text-2xl font-medium mb-4">Aquatiq ONE</h3>
                        <p className="text-neutral-600 font-light leading-relaxed mb-8">
                            Digital læringsplattform og kompetansestyring designet spesifikt for næringsmiddelindustrien og dens unike krav.
                        </p>
                        <ul className="space-y-3 font-light text-sm">
                            <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Kurs og E-læring</li>
                            <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Dokumentert opplæring</li>
                            <li className="flex gap-3"><span className="text-[#151F6D]">→</span> Food Safety Culture moduler</li>
                        </ul>
                    </div>
                </div>
            </SubpageContent>

        </main>
    );
}
