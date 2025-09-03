import BannerComponent from "@/components/patterns/banner";
import PrismicRichText from "@/components/ui/prismic-rich-text";
import { getPrismicLink } from "@/features/prismic/utils/get-prismic-link";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
// import { getPrismicLink } from "@/features/prismic/actions/get-prismic-link";

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>;

/**
 * Component for "Banner" Slices.
 */
const Banner = ({ slice, context }: BannerProps): JSX.Element => {
  // @ts-ignore
  const { resolver } = context;

  return (
    <BannerComponent
      data-sliceid={slice.slice_type}
      imageUrl={slice.primary.image.url ?? ""}
      altTitle={slice.primary.image.alt ?? ""}
      eyebrowText={slice.primary.eyebrow_text ?? ""}
      title={slice.primary.title ?? ""}
      centered={slice.primary.centered}
      richText={<PrismicRichText field={slice.primary.rich_text ?? ""} />}
      // @ts-ignore
      buttons={slice.primary.buttons?.map((button) => ({
        text: button.link.text,
        link: getPrismicLink(button.link, resolver),
        type: button.type
      }))}
      backgroundOverlay={slice.primary.background_overlay}
    />
  );
};

export default Banner;
