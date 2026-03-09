"use client";

import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: "Mowi", logo: "/images/logo/partners/mowi_logo.png" },
  { name: "BAMA", logo: "/images/logo/partners/bama_logo.png" },
  { name: "Grieg Seafood", logo: "/images/logo/partners/Grieg_logo.png" },
  { name: "SalMar", logo: "/images/logo/partners/salmar_logo.png" },
  { name: "Norsk Hydro", logo: "/images/logo/partners/hydro_logo.png" },
  { name: "Huon", logo: "/images/logo/partners/Huon_Aqua_logo.png" },
  { name: "Henning Olsen", logo: "/images/logo/partners/henning_olsen_logo.png" },
  { name: "Lerøy", logo: "/images/logo/partners/leroy_logo.png" },
  { name: "Nortura", logo: "/images/logo/partners/nortura_logo.png" },
  { name: "Ragn-Sells", logo: "/images/logo/partners/ragn_sells_logo.png" },
  { name: "TINE", logo: "/images/logo/partners/tine_logo.png" },
];

// Dupliser for sømløs marquee (kun medium-layout)
const duplicatedPartners = [...partners, ...partners];

export function PartnerSection() {
  return (
    <section className="relative z-30 w-full py-2 sm:py-0">
      {/* WIDE (>=1920px): Vis alle logoer i én rolig linje */}
      <div className="hidden min-[1920px]:block">
        <div className="mx-auto flex w-full items-center justify-between gap-6 px-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex min-w-0 flex-1 items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={48}
                className="h-12 w-auto object-contain opacity-60 transition-opacity hover:opacity-100"
                sizes="(min-width: 1920px) 160px, 120px"
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE + MEDIUM (<1920px) */}
      <div className="min-[1920px]:hidden">
        {/* Mobil: ingen animasjon, bare horizontal scroll */}
        <div className="block md:hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 px-1">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex h-10 w-24 shrink-0 items-center justify-center"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={32}
                    className="h-6 w-auto object-contain opacity-60"
                    sizes="120px"
                    priority={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medium+: “marquee på hover” (ingen JS, ingen state) */}
        <div className="hidden md:block">
          <div className="partner-marquee overflow-hidden px-1">
            <div
              className="
                partner-marquee-track
                flex w-[200%] items-center
              "
            >
              <div className="flex w-1/2 items-center gap-8 lg:gap-12">
                {duplicatedPartners.slice(0, partners.length).map((partner) => (
                  <LogoTile key={`a-${partner.name}`} partner={partner} />
                ))}
              </div>

              <div className="flex w-1/2 items-center gap-8 lg:gap-12">
                {duplicatedPartners.slice(partners.length).map((partner) => (
                  <LogoTile key={`b-${partner.name}`} partner={partner} />
                ))}
              </div>
            </div>
          </div>

          {/* Liten UX-hint (valgfritt, men ofte “premium”): */}
          <p className="mt-2 text-center text-xs text-neutral-500">
            Hold musepekeren over for å se alle partnerne
          </p>
        </div>
      </div>
    </section>
  );
}

function LogoTile({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-12 w-32 shrink-0 items-center justify-center">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={140}
        height={40}
        className="h-8 w-auto object-contain opacity-60 transition-opacity hover:opacity-100"
        sizes="(min-width: 1024px) 140px, 120px"
        priority={false}
      />
    </div>
  );
}
