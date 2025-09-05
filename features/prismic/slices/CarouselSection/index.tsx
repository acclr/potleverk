import CarouselSectionComponent from "@/components/patterns/carousel-section";
import HorizontalCard from "@/components/patterns/carousel-section/horizontal-card";
import VerticalCard from "@/components/patterns/carousel-section/vertical-card";
import { createStylesForSlice } from "../utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

const transformCard = (card) => ({
  ...card,
  eyebrowText: card.eyebrow_text,
  buttonText: card.button_text
});

/**
 * Props for `CarouselSection`.
 */
export type CarouselSectionProps = SliceComponentProps<Content.CarouselSectionSlice>;

/**
 * Component for "CarouselSection" Slices.
 */
const CarouselSection = ({ slice }: CarouselSectionProps): JSX.Element => {
  // @ts-ignore
  const className = createStylesForSlice(slice);

  return (
    // @ts-ignore
    <CarouselSectionComponent
      className={className}
      eyebrowText={slice.primary.eyebrow_text ?? ''}
      title={slice.primary.title ?? ''}
      text={slice.primary.text ?? ''}
      cards={slice.primary.cards?.map(transformCard)}
      component={slice.primary.card_type === "Horizontal" ? HorizontalCard : VerticalCard}
    />
  );
};

export default CarouselSection;
