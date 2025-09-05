//@ts-ignore
import MotivatorsComponent from "@/components/patterns/motivators/index";
import { createStylesForSlice } from "../utils";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Motivators`.
 */
// @ts-ignore
export type MotivatorsProps = SliceComponentProps<Content.MotivatorsSlice>;

/**
 * Component for "Motivators" Slices.
 */
const Motivators = ({ slice }: MotivatorsProps): JSX.Element => {
  const className = createStylesForSlice(slice);

  return (
    //@ts-ignore
    <MotivatorsComponent
      className={className}
      items={slice?.primary?.items?.map(
        // @ts-ignore
        (item: Content.MotivatorsSliceDefaultPrimaryItemsItem) => ({
          title: item?.title,
          text: item?.text,
          vectorIcon: item?.vector_icon,
          imageIcon: item?.icon?.url
        })
      )}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default Motivators;
