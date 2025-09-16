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
  title?: string;
  preamble?: string;
  items: TeamMember[];
  columns: 2 | 3 | 4 | 5 | 6;
  classNames?: {
    container?: string;
    inner?: string;
  };
};

const colsMap = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export function TeamSection({
  title,
  preamble,
  items,
  columns = 4,
  classNames,
}: TeamSectionProps) {
  return (
    <Section
      className="bg-[#060606]"
      padding="lg"
      boxed
      classNames={classNames}
    >
      <div className="flex w-full flex-col">
        {(!!title || !!preamble) && (
          <div className="mb-12 text-center">
            <h2 className="mb-[0.25em] text-4xl font-semibold text-white">
              {title}
            </h2>

            {preamble && <p className="text-base text-gray-300">{preamble}</p>}
          </div>
        )}

        {/* Team Members Grid */}
        <div
          className={cn(
            "grid gap-8 !gap-y-24 lg:!gap-y-8 lg:flex lg:flex-col lg:w-full",
            colsMap[columns]
          )}
        >
          {items?.map((member) => (
            <div
              key={member.name}
              className="group relative flex w-full flex-col"
            >
              {/* Bild och Överlägg */}
              <div className="relative">
                {/* Member Image */}
                <AspectRatio ratio={3 / 4}>
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    layout="fill"
                    className="w-full rounded-xl object-cover"
                  />
                </AspectRatio>

                {/* Överlägg som visas vid hover */}
                <div className="duration-[50ms] absolute inset-0 flex flex-col rounded-xl items-center justify-center bg-secondary-900/80 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  {/* Bio */}
                  <p className="mb-4 px-4 text-center text-white">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Information under bilden */}
              <div className="flex flex-col">
                {/* Member Name */}
                <h3 className="mt-4 text-left text-base font-semibold text-black">
                  {member.name}
                </h3>

                {/* Member Title */}
                <p className="-mt-0.5 mb-4 text-left text-base font-light text-black">
                  {member.title}
                </p>

                <div className="-mt-1 flex flex-row justify-start items-center gap-1">
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
                        href = contact.value.startsWith("http")
                          ? contact.value
                          : `https://${contact.value}`;
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
                        className="flex bg-black/5 hover:bg-black/10 rounded-full items-center space-x-2 text-black transition-colors duration-200 hover:text-black"
                      >
                        <Hoverable bg="lighten" shape="circle" initial>
                          <Icon
                            size={32}
                            className="h-5 w-5"
                            strokeWidth={1.25}
                          />
                        </Hoverable>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
