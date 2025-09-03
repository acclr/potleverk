import Contained from "@/components/ui/contained";
import Section from "@/components/ui/section";
import { PrismicRichText } from "@/components/ui/prismic-rich-text";
import { cn } from "@/components/utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { getBgFromSlice, getSpaceFromSlice } from "../utils";

/**
 * Props for `TextContent`.
 */
export type TextContentProps = SliceComponentProps<Content.TextContentSlice>;

/**
 * Component for "TextContent" Slices.
 */
const TextContent = ({ slice }: TextContentProps): JSX.Element => {
  const className = cn(
    getBgFromSlice(slice.primary.background),
    getSpaceFromSlice(slice.primary.spacing_top, "top"),
    getSpaceFromSlice(slice.primary.spacing_bottom, "bottom")
  );

  return (
    <Section className={className} boxed>
      <Contained width="lg">
        <h1 className="mb-4 text-4xl font-semibold lg:text-3xl">{slice.primary.title}</h1>

        {slice.primary.preamble && (
          <p className="text-foreground-800 mb-10 mt-2 max-w-[70ch] text-lg font-bold">{slice.primary.preamble}</p>
        )}

        {slice.primary.rich_text && (
          <div className="max-w-[70ch]">
            <PrismicRichText field={slice.primary.rich_text} />
          </div>
        )}
      </Contained>
    </Section>
  );
};

export default TextContent;
