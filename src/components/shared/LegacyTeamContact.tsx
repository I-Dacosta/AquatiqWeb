"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeMarker } from "@/components/home/ThemeController";

interface TeamMember {
    name: string;
    role: string;
    phone: string;
    email: string;
    imageSrc: string;
    company?: string;
}

interface LegacyTeamContactProps {
    generalEmail: string;
    generalPhone: string;
    teamMembers: TeamMember[];
}

export function LegacyTeamContact({ generalEmail, generalPhone, teamMembers }: LegacyTeamContactProps) {
    return (
        <ThemeMarker isDarkTheme={false} className="w-full">
            <section className="w-full py-24 md:py-32 px-4 md:px-8 bg-[#EAE2D6] text-[#151F6D]">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

                    {/* Left Column: General Contact */}
                    <div className="lg:col-span-4 flex flex-col">
                        <h2 className="text-4xl md:text-5xl font-light mb-8">Kontakt oss</h2>
                        <p className="text-xl mb-8 opacity-80">For generelle henvendelser</p>

                        <div className="flex flex-col gap-4 text-lg">
                            <Link href={`mailto:${generalEmail}`} className="hover:opacity-70 transition-opacity underline underline-offset-4">
                                {generalEmail}
                            </Link>
                            <Link href={`tel:${generalPhone.replace(/\s+/g, '')}`} className="hover:opacity-70 transition-opacity underline underline-offset-4">
                                {generalPhone}
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Team Members */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {teamMembers.map((member, idx) => (
                            <div key={idx} className="flex flex-col">
                                {/* Portrait Cutout Image */}
                                <div className="relative w-full aspect-[4/5] bg-transparent overflow-hidden mb-6 flex items-end justify-center rounded-3xl">
                                    {/* Assuming images are cutouts on transparent backgrounds, as seen on legacy site */}
                                    <Image
                                        src={member.imageSrc}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="object-contain object-bottom w-full h-auto drop-shadow-xl"
                                    />
                                </div>

                                {/* Text Details */}
                                <div className="flex flex-col gap-1 border-l border-[#151F6D]/20 pl-4 py-1">
                                    {member.company && (
                                        <span className="text-xs font-semibold tracking-widest uppercase opacity-70 mb-1">
                                            {member.company}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-medium">{member.name}</h3>
                                    <p className="text-sm opacity-80 mb-4">{member.role}</p>

                                    <Link href={`tel:${member.phone.replace(/\s+/g, '')}`} className="text-sm hover:opacity-70 transition-opacity underline underline-offset-4">
                                        {member.phone}
                                    </Link>
                                    <Link href={`mailto:${member.email}`} className="text-sm hover:opacity-70 transition-opacity underline underline-offset-4 break-words">
                                        {member.email}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </ThemeMarker>
    );
}
