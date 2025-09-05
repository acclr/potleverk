//@ts-nocheck
import { ImageWithContent } from "@/components/patterns/image-with-content";
import PrismicRichText from "@/components/ui/prismic-rich-text";
import { getPrismicLink } from "@/features/prismic/utils/get-prismic-link";
import { createStylesForSlice } from "../utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Simplify } from "prismicio-types";

/**
 * Props for `ImageWithContent`.
 */
export type ImageWithContentProps = SliceComponentProps<Content.ImageWithContentSlice>;

/**
 * Component for "ImageWithContent" Slices.
 */
const ImageWithContentSlice = ({ slice, context }: ImageWithContentProps): JSX.Element => {
  //@ts-ignore
  const className = createStylesForSlice(slice);

  return (
    /* @ts-ignore */
    <ImageWithContent
      sectionTitle={slice.primary.section_title}
      sectionDescription={slice.primary.section_description}
      eyebrowText={slice.primary.eyebrow_text}
      isFullWidth={slice.variation === "fullWidth"}
      isVertical={slice.variation === "vertical"}
      reversed={slice.primary.direction === "reverse"}
      title={slice.primary.title}
      richText={<PrismicRichText field={slice.primary.rich_text} />}
      image={slice.primary.image}
      objectContain={slice.primary.object_contain}
      imageUrl={slice.primary.image.url}
      imageUrlAlt={slice.primary.image.alt}
      buttons={slice.primary.buttons?.map((button: Simplify<Content.ImageWithContentSliceDefaultPrimaryButtonsItem>) => ({
        text: button.link.text,
        //@ts-ignore
        link: getPrismicLink(button.link, context.resolver),
        type: button.type
      }))}
      direction={slice.primary.direction}
      className={className}
    />
  );
};

export default ImageWithContentSlice;
