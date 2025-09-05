// @ts-nocheck
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FormTextarea`.
 */
export type FormTextareaProps = SliceComponentProps<Content.FormTextareaSlice>;

/**
 * Component for "FormTextarea" Slices.
 */
const FormTextarea = ({ slice }: FormTextareaProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for form_textarea (variation: {slice.variation}) Slices
    </section>
  );
};

export default FormTextarea;
