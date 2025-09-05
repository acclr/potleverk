import Image from "next/image";

import { Card, CardContent } from "../../ui/card";

import { AspectRatio } from "../../ui/aspect-ratio";
import { Button } from "../../ui/button";
import { CarouselItem } from "../../ui/carousel";

export default function HorizontalCard({ eyebrowText, title, text, buttonText, image }: { eyebrowText: string; title: string; text: string; buttonText: string; image: { url: string; alt: string } }) {
  return (
    <CarouselItem className="basis-2/5 select-none lg:basis-1/2 md:basis-1/2 sm:basis-full">
      <Card className="ui-card min-h-full flex-row overflow-hidden">
        <CardContent className="flex space-x-6 !p-0">
          <div className="flex flex-[2] flex-col items-start justify-start p-4">
            <div className="ui-eyebrow mb-4 inline-flex text-sm">{eyebrowText}</div>
            <h2 className="mb-2 text-lg">{title}</h2>
            <p className="mb-4 text-sm">{text}</p>
            <Button size="sm" className="mt-auto">
              {buttonText}
            </Button>
          </div>
          <div className="flex flex-[2]">
            <AspectRatio ratio={4 / 3}>
              <Image width={300} height={300} className="absolute size-full object-cover" src={image.url} alt={title} />
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
