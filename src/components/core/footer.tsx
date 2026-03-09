"use client";

import React from "react";

type FooterLink = { label: string; href: string };

export function Footer() {
  const year = new Date().getFullYear();

  const headOffice = {
    title: "HOVEDKONTOR",
    lines: ["Hovemovegen 1,", "2624 Lillehammer, Norway"],
  };

  const contact = {
    title: "KONTAKT OSS",
    lines: ["+47 61 24 70 10", "post@aquatiq.com"],
    telHref: "tel:+4761247010",
    mailHref: "mailto:post@aquatiq.com",
  };

  const columns: Array<{ title: string; links: FooterLink[] }> = [
    {
      title: "SOLUTIONS",
      links: [
        { label: "Chemistry", href: "/chemistry" },
        { label: "Training & Audits", href: "/training-audits" },
        { label: "Analysis", href: "/analysis" },
        { label: "Cleaning Systems", href: "/cleaning-systems" },
      ],
    },
    {
      title: "ABOUT US",
      links: [
        { label: "About Aquatiq", href: "/about" },
        { label: "Work with us", href: "/careers" },
        { label: "Sustainability", href: "/sustainability" },
      ],
    },
    {
      title: "CONTACT",
      links: [{ label: "Contact us", href: "/contact" }],
    },
  ];

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-white/10 bg-[var(--aquatiq-blue)]">
      {/* Mobile Layout */}
      <div className="block md:hidden px-6 py-12">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/images/logo/aquatiq-white.png"
            alt="Aquatiq logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          {/* Left column */}
          <div className="space-y-1 text-white/70">
            <p className="underline">{headOffice.lines[0]}</p>
            <p className="underline">{headOffice.lines[1]}</p>
            <p className="mt-4">
              <a href={contact.telHref} className="hover:text-white/90 transition">
                {contact.lines[0]}
              </a>
            </p>
            <p className="underline">
              <a href={contact.mailHref} className="hover:text-white/90 transition">
                {contact.lines[1]}
              </a>
            </p>
          </div>

          {/* Right column */}
          <div className="space-y-1 text-white/70 text-right">
            <p className="underline">
              <a href="/privacy-policy" className="hover:text-white/90 transition">
                Privacy Policy
              </a>
            </p>
            <p className="underline">
              <a href="/transparency" className="hover:text-white/90 transition">
                Transparency
              </a>
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex items-end justify-between text-sm text-white/70">
          <div>
            <p>Aquatiq AS © {year}</p>
            <p>{headOffice.lines[2]}</p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/aquatiqofficial/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/aquatiqofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/aquatiq/posts/?feedView=all"
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
      {/* Hovedfooter – full bredde */}
      <div className="w-full px-8 py-9">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand helt til venstre */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-center gap-3">
              <img
                src="/images/logo/aquatiq-white.png"
                alt="Aquatiq logo"
                className="h-10 w-auto"
              />
              <p className="text-2xl font-inter leading-6 text-white/55">
                What it Takes
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-3" />
          
          {/* Link-kolonner (Stingray-stil med linjer) */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {columns.map((col) => (
                <div key={col.title}>
                  <h4 className="text-xs font-semibold tracking-[0.18em] text-white/70">
                    {col.title}
                  </h4>

                  <ul className="mt-5 border-t border-white/10">
                    {col.links.map((l) => (
                      <li
                        key={l.label}
                        className="py-2"
                      >
                        <a
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            l.href.startsWith("http")
                              ? "noreferrer noopener"
                              : undefined
                          }
                          className="block text-sm text-white/55 transition hover:text-white/85"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Linje under + “Hovedkontor”-seksjon som i Stingray */}
        <div className="mt-7 pt-5">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-2" />
            <div className="md:col-span-3" />
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h5 className="text-xs font-semibold tracking-[0.18em] text-white/70">
                    {headOffice.title}
                  </h5>
                  <div className="mt-5 border-t border-white/10 py-4 text-sm leading-6 text-white/55">
                    {headOffice.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold tracking-[0.18em] text-white/70">
                    {contact.title}
                  </h5>
                  <div className="mt-5 border-t border-white/10 py-4 text-sm leading-6 text-white/55">
                    <p>
                      <a
                        href={contact.telHref}
                        className="transition hover:text-white/85"
                      >
                        {contact.lines[0]}
                      </a>
                    </p>
                    <p>
                      <a
                        href={contact.mailHref}
                        className="transition hover:text-white/85"
                      >
                        {contact.lines[1]}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Tom slot for å matche 3-kolonne layout */}
                <div className="hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini-footer som Stingray */}
      <div className="w-full ">
        {/* Rad 1: FØLG OSS + Til toppen */}
        <div className="px-8 py-5">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="hidden md:block md:col-span-5" />
            <div className="md:col-span-7">
              <div className="relative left-2 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                  FØLG OSS
                </p>

                <button
                  type="button"
                  onClick={scrollToTop}
                  className="relative right-2 inline-flex items-center gap-2 text-xs tracking-[0.06em] text-white/55 transition hover:text-white/85"
                >
                  <span aria-hidden>↑</span>
                  <span>Til toppen</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rad 2: sosiale lenker + credit + copyright */}
        <div className="border-t border-white/10 px-8 py-5">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
            <div className="hidden md:block md:col-span-5" />
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
                <div className="text-center md:text-left">
              <div className="text-xs tracking-[0.06em] text-white/50">
                <a
                  href="https://www.linkedin.com/company/aquatiq/posts/?feedView=all"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition hover:text-white/80"
                >
                  LinkedIn
                </a>
                <span className="mx-2 text-white/25">/</span>
                <a
                  href="https://www.facebook.com/aquatiqofficial/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition hover:text-white/80"
                >
                  Facebook
                </a>
                <span className="mx-2 text-white/25">/</span>
                <a
                  href="https://www.instagram.com/aquatiqofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition hover:text-white/80"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="text-center">
            </div>

                <div className="text-center md:text-right">
                  <p className="text-xs tracking-[0.06em] text-white/45">
                    © {year} Aquatiq
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
