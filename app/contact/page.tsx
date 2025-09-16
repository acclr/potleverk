import { FacebookIcon } from "@/components/icons/facebook";
import { LinkedinIcon, LinkedInStrokeIcon } from "@/components/icons/linkedin";
import {
  TeamContactPoint,
  TeamMember,
  TeamSection,
} from "@/components/patterns/team-section";
import Section from "@/components/ui/section";
import { createStylesForSlice } from "@/features/prismic/slices/utils";
import { MailIcon, MapIcon, PhoneIcon, ExternalLinkIcon } from "lucide-react";

export default function Contact() {
  const employees: TeamMember[] = [
    {
      name: "Daniel Ehrenberg-Rasmussen",
      title: "Graphics Designer",
      bio: "Daniel is a graphics designer at Potleverk. He is responsible for the design of the website and the graphics for the products.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg2UYjIh_mqRAWnKFUUyuHASqEEZzFbR2CMw&s",
      contactPoints: [
        {
          type: "email",
          value: "daniel@potleverk.no",
          icon: MailIcon,
        },
        {
          type: "phone",
          value: "855 49 350",
          icon: PhoneIcon,
        },
      ],
    },
    {
      name: "Elliott Ehrenberg",
      title: "Graphics Designer",
      bio: "Elliott is a graphics designer at Potleverk. He is responsible for the design of the website and the graphics for the products.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk3NmmlpJ3rKlh5NPGAd00zocHhdamnxDepg&s",
      contactPoints: [
        {
          type: "email",
          value: "elliott@potleverk.no",
          icon: MailIcon,
        },
      ],
    },
    {
      name: "Jostein Hanssen",
      title: "Software Engineer",
      bio: "Jostein is a software engineer at Potleverk. He is responsible for the development of the website and the software for the products.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg2UYjIh_mqRAWnKFUUyuHASqEEZzFbR2CMw&s",
      contactPoints: [
        {
          type: "email",
          value: "jostein@potleverk.no",
          icon: MailIcon,
        },
        {
          type: "phone",
          value: "855 49 350",
          icon: PhoneIcon,
        },
        {
          type: "linkedin",
          value: "https://linkedin.com/in/jostein-hanssen",
          // @ts-ignore Fix this
          icon: LinkedInStrokeIcon,
        },
      ],
    },
  ];

  const contactMethods = [
    {
      type: "Mejla oss",
      value: "daniel@potleverk.no",
      icon: MailIcon,
    },
    {
      type: "Ring oss",
      value: "855 49 350",
      icon: PhoneIcon,
    },
    {
      type: "Besök oss",
      value: "Hoveveien 38, 1234 Sandnes",
      icon: MapIcon,
    },
  ];

  return (
    <div>
      <Section boxed>
        <div className="flex flex-row lg:flex-col items-center justify-between lg:items-start gap-12 lg:gap-8 w-full">
          <div className="flex flex-col">
            <h3 className="text-3xl font-semibold leading-snug text-black lg:text-3xl md:text-2xl">
              Hur kan vi hjälpa?
            </h3>
          </div>

          <div className="flex flex-row lg:flex-col gap-8 lg:gap-6 items-center lg:items-start">
            {contactMethods?.map((method, i) => (
              <div key={i} className="flex flex-row items-center gap-4">
                <div className="w-10 h-10 p-2.5 bg-gray-200 rounded-full flex items-center justify-center">
                  <method.icon size={32} color="black" />
                </div>
                <div className="flex flex-col">
                  <p className="text-base min-w-max font-semibold">
                    {method.type}
                  </p>
                  <p className="text-sm min-w-max">{method.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* @ts-ignore */}
      <TeamSection
        items={employees}
        columns={3}
        classNames={{
          container: createStylesForSlice({
            primary: {
              // @ts-ignore
              background: "",
              spacing_top: "None",
            },
          }),
        }}
      />
    </div>
  );
}
