import { FacebookIcon } from "@/components/icons/facebook";
import { LinkedinIcon, LinkedInStrokeIcon } from "@/components/icons/linkedin";
import {
  TeamContactPoint,
  TeamMember,
  TeamSection,
} from "@/components/patterns/team-section";
import Section from "@/components/ui/section";
import { createStylesForSlice } from "@/features/prismic/slices/utils";
import { MailIcon, MapIcon, PhoneIcon } from "lucide-react";
import { createClient } from "@/features/prismic";

export default async function Contact() {

  const prismicClient = createClient();
  const contactInfo = await prismicClient.getSingle("contact_information");

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
      <TeamSection
        items={contactInfo}
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
