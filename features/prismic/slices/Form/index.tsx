// @ts-nocheck
import Section from "@/components/ui/section";
import { PrismicForm } from "@/components/ui/prismic-form";
import { createClient } from "@/features/prismic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
/**
 * Props for `FormSection`.
 */
export type FormSectionProps = SliceComponentProps<Content.FormSectionSlice>;

/**
 * Maps form "slices" into usable props
 * @param slices
 * @returns
 */
export const mapSlicesToFormProps = (slices: Content.FormSectionSlice[]) => {
  return slices?.map((formSlice) => ({
    type: formSlice.slice_type,
    ...formSlice?.primary
  }));
};

/**
 * Component for "FormSection" Slices.
 */
export default async function Form({ slice }: FormSectionProps) {
  const shapeLink = slice?.primary?.form_shape;

  const client = await createClient();
  const form = await client.getByUID("form_shape", shapeLink?.uid!);
  const props = mapSlicesToFormProps(form?.data?.slices);

  return (
    <Section padding="lg" className="bg-gray-50" boxed>
      <PrismicForm
        type="send"
        submitText={form?.data?.submit_text}
        submittingText={form?.data?.submitting_text}
        submittedText={form?.data?.submitted_text}
        title={form?.data?.title}
        preamble={form?.data.preamble}
        fields={props}
      />
    </Section>
  );
}
