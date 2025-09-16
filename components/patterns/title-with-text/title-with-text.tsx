import { renderButtons } from "@/features/prismic/utils/render-buttons";
import Section from "../../ui/section";

type TitleWithTextProps = {
  title: string;
  text: string | React.ReactNode;
  eyebrowText: string;
  buttons: any;
  className: string;
};

export default function TitleWithText({
  title,
  text,
  eyebrowText,
  buttons,
  className,
}: TitleWithTextProps) {
  return (
    <Section
      boxed
      classNames={{
        container: className,
        inner: "flex-col items-center justify-center text-center space-y-4",
      }}
    >
      <h2 className="text-3xl font-[550]">{title}</h2>
      {text && text}
      {buttons && renderButtons(buttons)}
    </Section>
  );
}
