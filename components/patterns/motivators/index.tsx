import { LucideIcon } from "lucide-react";
import Section from "../../ui/section";

export type MotivationalItem = {
  imageIcon: string;
  vectorIcon: string;
  title: string;
  text: string;
};

export type MotivationalSectionProps = {
  className?: string;
  items: MotivationalItem[];
};

const MotivationalItem = ({ vectorIcon, imageIcon, title, text }: MotivationalItem) => (
  <div className="flex items-center space-x-3">
    {vectorIcon && (
      <div data-testid="icon" className="h-8 w-8 flex-shrink-0 text-primary" dangerouslySetInnerHTML={{ __html: vectorIcon }} />
    )}

    <div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  </div>
);

export default function MotivationalSection({ className, items }: MotivationalSectionProps) {
  return (
    <Section boxed classNames={{ container: className }}>
      <div className="container mx-auto flex items-center justify-center gap-12">
        {items.map((item, index) => (
          <MotivationalItem key={index} {...item} />
        ))}
      </div>
    </Section>
  );
}
