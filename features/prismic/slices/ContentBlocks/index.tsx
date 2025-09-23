import ContentBlocksComponent from "@/components/patterns/content-blocks";
import { createStylesForSlice } from "../utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContentBlocks`.
 */
export type ContentBlocksProps = SliceComponentProps<Content.ContentBlocksSlice>;

/**
 * Component for "ContentBlocks" Slices.
 */
const ContentBlocks = ({ slice }: ContentBlocksProps): JSX.Element => {
  const className = createStylesForSlice(slice);

  const transformItem = (
    item: Content.ContentBlocksSliceDefaultPrimaryItemsItem
  ) => ({
    title: item.title,
    text: item.text,
    image: item.image,
    link: item.link,
  });

  console.log({ prm: slice.primary });
  return (
    //@ts-ignore
    <ContentBlocksComponent
      className={className}
      eyebrowText={slice.primary.eyebrow_text}
      title={slice.primary.title}
      preamble={slice.primary.text}
      items={slice.primary.items.map((item) => transformItem(item))}
      link={slice.primary.link}
    />
  );
};

export default ContentBlocks;
