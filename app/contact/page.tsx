"use server";

import { LucideProps, MailIcon, MapIcon, PhoneIcon } from "lucide-react";
import { createClient } from "@/features/prismic";
import { ContactTemplate } from "./ContactTemplate";


export default async function Contact() {

  const prismicClient = createClient();
  const contactInfo = await prismicClient.getSingle("contact_information");
  const contactMethods = [
    {
      type: "Mejla oss",
      value: "daniel@potleverk.no",
      icon: "MailIcon",
    },
    {
      type: "Ring oss",
      value: "855 49 350",
      icon: "PhoneIcon",
    },
    {
      type: "Besök oss",
      value: "Hoveveien 38, 1234 Sandnes",
      icon: "MapIcon",
    },
  ];

  return <ContactTemplate contactInfo={contactInfo} contactMethods={contactMethods} />
}