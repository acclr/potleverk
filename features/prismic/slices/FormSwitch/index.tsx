// @ts-nocheck
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FormSwitch`.
 */
export type FormSwitchProps = SliceComponentProps<Content.FormSwitchSlice>;

/**
 * Component for "FormSwitch" Slices.
 */
const FormSwitch = ({ slice }: FormSwitchProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for form_switch (variation: {slice.variation}) Slices
    </section>
  );
};

export default FormSwitch;
