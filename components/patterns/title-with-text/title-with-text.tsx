import { renderButtons } from "@/features/prismic/utils/render-buttons";
import Section from "../../ui/section";
import Contained from "@/components/ui/contained";

export default function TitleWithText({
  title,
  eyebrowText,
  text,
  buttons,
  className,
}) {
  return (
    <Section
      boxed
      classNames={{
        container: className,
        inner: "flex-col items-center justify-center text-center space-y-8",
      }}
    >
      <Contained width="lg" className="space-y-6">
        {eyebrowText ? <span className="ui-eyebrow">{eyebrowText}</span> : null}
        <h2 className="text-3xl font-[550]">{title}</h2>
        {text && text}
        {buttons && renderButtons(buttons)}
      </Contained>
    </Section>
  );
}
