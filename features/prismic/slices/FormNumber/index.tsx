// @ts-nocheck
// import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FormNumber`.
 */
export type FormNumberProps = SliceComponentProps<Content.FormNumberSlice>;

/**
 * Component for "FormNumber" Slices.
 */
const FormNumber = ({ slice }: FormNumberProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for form_number (variation: {slice.variation}) Slices
    </section>
  );
};

export default FormNumber;
