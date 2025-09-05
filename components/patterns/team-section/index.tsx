import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/components/utils";

import { AspectRatio } from "../../ui/aspect-ratio";
import Hoverable from "../../ui/hoverable";
import Section from "../../ui/section";

export type TeamContactPoint = {
  icon: LucideIcon;
  type: "email" | "phone" | "linkedin" | "twitter" | "github" | "website";
  value: string;
};

export type TeamMember = {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  contactPoints: TeamContactPoint[];
};

export type TeamSectionProps = {
  title: string;
  preamble?: string;
  items: TeamMember[];
  columns: 2 | 3 | 4 | 5 | 6;
};

const colsMap = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6"
};

export function TeamSection({ title, preamble, items, columns = 4 }: TeamSectionProps) {
  return (
    <Section className="bg-[#060606]" padding="lg" boxed>
      <div className="flex w-full flex-col">
        {/* Sektionens Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-[0.25em] text-4xl font-semibold text-white">{title}</h2>
          {preamble && <p className="text-base text-gray-300">{preamble}</p>}
        </div>

        {/* Team Members Grid */}
        <div className={cn("grid gap-4 !gap-y-24", colsMap[columns])}>
          {items?.map((member) => (
            <div key={member.name} className="bg-background-800 group relative flex w-full flex-col">
              {/* Bild och Överlägg */}
              <div className="relative">
                {/* Member Image */}
                <AspectRatio ratio={3 / 4}>
                  <Image src={member.imageUrl} alt={member.name} layout="fill" className="w-full object-cover" />
                </AspectRatio>

                {/* Överlägg som visas vid hover */}
                <div className="duration-[50ms] absolute inset-0 flex flex-col items-center justify-center bg-primary-900/90 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  {/* Bio */}
                  <p className="mb-4 px-4 text-center text-white">{member.bio}</p>

                  {/* Kontaktpunkter */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {member.contactPoints.map((contact) => {
                      const Icon = contact.icon;
                      let href: string = "#";
                      let isExternal = false;

                      switch (contact.type) {
                        case "email":
                          href = `mailto:${contact.value}`;
                          break;
                        case "phone":
                          href = `tel:${contact.value}`;
                          break;
                        case "linkedin":
                          href = `https://linkedin.com/in/${contact.value}`;
                          isExternal = true;
                          break;
                        case "twitter":
                          href = `https://twitter.com/${contact.value}`;
                          isExternal = true;
                          break;
                        case "github":
                          href = `https://github.com/${contact.value}`;
                          isExternal = true;
                          break;
                        case "website":
                          href = contact.value.startsWith("http") ? contact.value : `https://${contact.value}`;
                          isExternal = true;
                          break;
                        default:
                          href = "#";
                      }

                      return (
                        <Link
                          key={contact.type}
                          href={href}
                          target={isExternal ? "_blank" : "_self"}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          aria-label={contact.type}
                          className="flex items-center space-x-2 text-gray-200 transition-colors duration-200 hover:text-white">
                          <Hoverable bg="lighten" shape="circle" initial>
                            <Icon className="h-5 w-5" />
                          </Hoverable>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Information under bilden */}
              <div className="flex flex-col">
                {/* Member Name */}
                <h3 className="mt-4 text-left text-base font-semibold text-white">{member.name}</h3>

                {/* Member Title */}
                <p className="-mt-0.5 mb-4 text-left text-base font-light text-gray-200">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
