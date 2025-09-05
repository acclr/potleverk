"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const defaultItems = [
  {
    vectorHtml: "",
    title: "Responsiv Design",
    text: "Skapar visuellt slående design som fungerar sömlöst på alla enheter."
  },
  {
    vectorHtml: "",
    title: "E-handelslösningar",
    text: "Bygger robusta onlinebutiker som driver försäljning och förbättrar varumärkes synlighet."
  },
  {
    vectorHtml: "",
    title: "Innehållshantering",
    text: "Ger dig verktygen för att enkelt uppdatera innehåll och hålla din webbplats fräsch."
  },
  {
    vectorHtml: "",
    title: "SEO-optimering",
    text: "Förbättrar din webbplats synlighet på sökmotorer för att locka fler besökare."
  },
  {
    vectorHtml: "",
    title: "Webbsäkerhet",
    text: "Säkerställer att din webbplats är säker mot hot med den senaste webbsäkerhetstekniken."
  },
  {
    vectorHtml: "",
    title: "Anpassad Webbutveckling",
    text: "Skapar skräddarsydda lösningar som passar perfekt för dina affärsbehov."
  },
  {
    vectorHtml: "",
    title: "Prestandaoptimering",
    text: "Förbättrar din webbplats hastighet och effektivitet för en bättre användarupplevelse."
  },
  {
    vectorHtml: "",
    title: "Analys och Rapportering",
    text: "Ger värdefulla insikter om din webbplats prestanda för att driva tillväxt."
  }
];

type TextBlockItem = {
  title: string;
  text: string;
  vectorHtml?: string;
  eyebrowText?: string;
  link?: {
    label: string;
    href: string;
    target: "_self" | "_blank" | undefined;
  };
};

type TextBlockGridProps = {
  className?: string;
  eyebrowText?: string;
  title: string;
  preamble?: string;
  items?: TextBlockItem[];
  buttonUrl?: string;
  buttonText?: string;
};

export default function TextBlockGrid({
  title,
  className,
  eyebrowText,
  preamble = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  items = defaultItems,
  buttonUrl,
  buttonText
}: TextBlockGridProps) {
  return (
    <Section boxed classNames={{ container: className }}>
      <div className="mb-8 mr-auto flex w-[860px] max-w-full flex-col items-start justify-start space-y-2.5 text-left">
        {eyebrowText && <span className="ui-eyebrow">{eyebrowText}</span>}
        <h2 className="text-3xl font-[550]">{title}</h2>
        <p className="mb-4 max-w-[70ch] text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-12 gap-y-4 lg:grid-cols-2 lg:gap-8 md:grid-cols-1 md:gap-6">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col">
            {item.vectorHtml && (
              <div
                className="mb-1 h-8 w-8 fill-primary-600 text-primary-600 [&>svg]:h-8 [&>svg]:w-8"
                dangerouslySetInnerHTML={{ __html: item.vectorHtml }}
              />
            )}
            <div className="pt-0">
              <span className="heading py-1 text-lg font-[550]">{item.title}</span>
              <p className="text-base">{item.text}</p>

              {item?.link?.label && (
                <Link
                  className="group mt-1.5 flex items-center justify-start space-x-1 font-medium text-primary-600 hover:font-semibold"
                  href={item?.link?.href ?? ""}>
                  <span>{item?.link?.label}</span>
                  <ArrowRight strokeWidth={2} size={18} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {buttonUrl && buttonText && (
        <div className="mt-12 flex items-center justify-center">
          <Link href={buttonUrl}>
            <Button color="default" size="sm">
              {buttonText}
            </Button>
          </Link>
        </div>
      )}
    </Section>
  );
}
