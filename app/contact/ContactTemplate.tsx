"use client";

import { TeamSection } from "@/components/patterns/team-section";
import Section from "@/components/ui/section";
import { createStylesForSlice } from "@/features/prismic/slices/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { ContactInformationDocument } from "@/prismicio-types";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps, MailIcon, MapIcon, PhoneIcon } from "lucide-react";

interface ContactTemplateProps {
  contactInfo: ContactInformationDocument<string>;
  contactMethods: {
      type: string;
      value: string;
      icon: string;
    }[],
}

export function ContactTemplate({ contactInfo, contactMethods }: ContactTemplateProps) {

      const { t } = useTranslation();
      const getIcon = (icon: string) => {

        if (icon === "MailIcon") {

          return <MailIcon  size={32} color="black" />
        } else if (icon === "PhoneIcon") {

          return <PhoneIcon  size={32} color="black" />
        } else if (icon === "MapIcon") {

           return <MapIcon  size={32} color="black" />
        }

      }

      return (
        <div>
          <Section boxed>
            <div className="flex flex-row lg:flex-col items-center justify-between lg:items-start gap-12 lg:gap-8 w-full">
              <div className="flex flex-col">
                <h3 className="text-3xl font-semibold leading-snug text-black lg:text-3xl md:text-2xl">
                  { t('howCanWeHelp.text') }
                </h3>
              </div>

              <div className="flex flex-row lg:flex-col gap-8 lg:gap-6 items-center lg:items-start">
                {contactMethods?.map((method, i) => (
                  <div key={i} className="flex flex-row items-center gap-4">
                    <div className="w-10 h-10 p-2.5 bg-gray-200 rounded-full flex items-center justify-center">
                      {getIcon(method.icon)}
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