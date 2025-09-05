import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { Badge } from "../../ui/badge";

import Contained from "../../ui/contained";
import Section from "../../ui/section";
import { FAQPage } from "schema-dts";
import { JsonLd } from "react-schemaorg";

type FaqSectionProps = {
  className?: string;
  eyebrowText?: string;
  title: string;
  text: string;
  items: {
    id: number | string;
    question: string;
    answer: string;
  }[];
};

export default function FaqSection({
  eyebrowText,
  title = "Mollit qui consequat elit.",
  text = "Fugiat enim exercitation ullamco aute anim exercitation ipsum cupidatat consequat proident cillum ipsum.",
  items,
  className
}: FaqSectionProps) {
  return (
    <Section data-testid="faq-section" classNames={{ container: className }} boxed>
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": items.map((item, i) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        }}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        {eyebrowText && (
          <div className="ui-eyebrow flex w-max">
            {eyebrowText}
          </div>
        )}
        <h2 className="text-center text-3xl font-[550]">{title}</h2>
        <p className="mb-6 text-base">{text}</p>

        <Contained width="lg">
          <Accordion className="w-full flex-[1]" type="multiple">
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.question}
                className="mb-2 rounded-lg border border-gray-200 px-4 last:mb-0">
                <AccordionTrigger className="heading-like items-center justify-between text-left text-lg font-bold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="w-full items-start justify-start text-left text-base leading-relaxed text-black">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Contained>
      </div>
    </Section>
  );
}
