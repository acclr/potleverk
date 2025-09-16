import { renderButtons } from "@/features/prismic/utils/render-buttons";
import Section from "../../ui/section";

export default function TitleWithText({ title, text, eyebrowText, buttons, className }) {
  return (
    <Section
      boxed
      classNames={{
        container: className,
        inner: "flex-col items-center justify-center text-center space-y-8",
      }}
    >
      <h2 className="text-3xl font-[550]">{title}</h2>
      {text && text}
      {buttons && renderButtons(buttons)}
    </Section>
  );
}
