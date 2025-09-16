import TitleWithTextComponent from "@/components/patterns/title-with-text/title-with-text";
import PrismicRichText from "@/components/ui/prismic-rich-text";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
/**
 * Props for `TitleWithText`.
 */
export type TitleWithTextProps = SliceComponentProps<Content.TitleWithTextSlice>;

/**
 * Component for "TitleWithText" Slices.
 */
const TitleWithText = ({ slice }: TitleWithTextProps): JSX.Element => {
  return (
    //@ts-ignore
    <TitleWithTextComponent
      title={slice.primary.title}
      eyebrowText={slice.primary.eyebrow_text}
      text={<PrismicRichText field={slice.primary.rich_text} />}
    />
  );
};

export default TitleWithText;
