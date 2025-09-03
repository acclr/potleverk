//@ts-nocheck
import TextBlockGridComponent from "@/components/patterns/text-block-grid";
import { getPrismicLink } from "@/features/prismic/utils/get-prismic-link";
import { createStylesForSlice } from "../utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type TextBlockGridProps = SliceComponentProps<Content.TextBlockGridSlice>;

/**
 * Component for "TextBlockGrid" Slices.
 */
const TextBlockGrid = ({ slice, context }: TextBlockGridProps): JSX.Element => {
  //@ts-ignore
  const { resolver } = context;
  const className = createStylesForSlice(slice);

  return (
    <TextBlockGridComponent
      className={className}
      title={slice.primary.title}
      eyebrowText={slice.primary.eyebrow_text}
      preamble={slice.primary.text}
      items={
        slice.items.map((item) => ({
          title: item.title,
          text: item.text,
          vectorHtml: item.vector_html,
          link: {
            label: item?.link?.text,
            href: getPrismicLink(item.link, resolver)
          }
        })) as any
      }
    />
  );
};

export default TextBlockGrid;
