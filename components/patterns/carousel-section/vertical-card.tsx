import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

import { Button } from "../../ui/button";
import { CarouselItem } from "../../ui/carousel";

type VerticalCardProps = {
  eyebrowText: string;
  title: string;
  text: string;
  buttonText: string;
  image: any;
};

export default function VerticalCard({
  eyebrowText,
  title,
  text,
  buttonText,
  image,
}: VerticalCardProps) {
  return (
    <CarouselItem className="basis-1/4 select-none lg:basis-1/3 md:basis-1/2 sm:basis-full">
      <Card className="min-h-full flex-row">
        <CardContent className="p-0">
          <img
            className="ui-rounded-md h-1/2 w-full !rounded-b-none object-cover"
            src={image.url}
            alt={title}
          />
          <div className="flex h-1/2 flex-col items-start justify-start p-4">
            <div className="ui-rounded-sm mb-4 inline-flex items-center border border-black/10 px-2.5 py-0.5 text-sm font-light text-black transition-colors">
              {eyebrowText}
            </div>
            <h2 className="mb-2 text-lg">{title}</h2>
            <p className="mb-4 text-sm">{text}</p>
            {/* Button does not look good on certain screen sizes*/}
            <Button className="ui-rounded-sm mt-auto">{buttonText}</Button>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
