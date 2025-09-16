import StatsSectionComponent from "@/components/patterns/stats-section";
import { createStylesForSlice } from "../utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StatsSection`.
 */
export type StatsSectionProps = SliceComponentProps<Content.StatsSectionSlice>;

/**
 * Component for "StatsSection" Slices.
 */
const StatsSection = ({ slice }: StatsSectionProps): JSX.Element => {
  // @ts-ignore
  const className = createStylesForSlice(slice);

  return <StatsSectionComponent className={className} title={slice.primary.title} items={slice.primary.items} />;
};

export default StatsSection;
