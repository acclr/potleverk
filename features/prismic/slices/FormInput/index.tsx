import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FormInput`.
 */
// @ts-ignore
export type FormInputProps = SliceComponentProps<Content.FormInputSlice>;

/**
 * Component for "FormInput" Slices.
 */
const FormInput = ({ slice }: FormInputProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for form_input (variation: {slice.variation}) Slices
    </section>
  );
};

export default FormInput;
