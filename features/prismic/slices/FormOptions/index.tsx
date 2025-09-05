// @ts-nocheck
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FormOptions`.
 */
export type FormOptionsProps = SliceComponentProps<Content.FormOptionsSlice>;

/**
 * Component for "FormOptions" Slices.
 */
const FormOptions = ({ slice }: FormOptionsProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for form_options (variation: {slice.variation}) Slices
    </section>
  );
};

export default FormOptions;
