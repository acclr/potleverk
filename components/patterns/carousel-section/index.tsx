import Section from "../../ui/section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel";

type CarouselProps = {
  eyebrowText?: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
  component?: React.ElementType;
  orientation?: "horizontal" | "vertical";
  className?: string;
  cards?: {
    eyebrowText?: string;
    title?: string;
    text?: string;
    image?: string;
    buttonText?: string;
  }[];
};

export default function CarouselSection({
  eyebrowText,
  title,
  text,
  cards,
  children,
  component,
  orientation = "horizontal",
  className
}: CarouselProps) {
  const Element = component ?? ((props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />);

  return (
    <Section classNames={{ container: className }}>
      <Carousel
        orientation={orientation}
        opts={{
          dragFree: true
        }}
        className="w-full">
        <div className="mb-6 flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-start gap-2">
            {eyebrowText && <div className="ui-eyebrow">{eyebrowText}</div>}
            <h2 className="heading-like pb-2 text-3xl font-[550] md:text-2xl">{title}</h2>
            {text && <p className="mb-4 max-w-[50ch] text-xl">{text}</p>}
          </div>
          <div className="flex space-x-2 lgup:hidden">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent className="cursor-grab active:cursor-grabbing">
          {children ?? cards?.map((card, index) => <Element key={index} {...card} />)}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}

export { CarouselSection };
