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
function normalizeRequired(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    return v === "true" || v === "yes" || v === "1" || v === "required" || v === "ja";
  }
  return false;
}

export const mapSlicesToFormProps = (slices: Content.FormSectionSlice[]) => {
  return slices?.map((formSlice) => {
    const primary = formSlice?.primary ?? {};
    return {
      type: formSlice.slice_type,
      ...primary,
      required: normalizeRequired(
        "required" in primary ? (primary as { required?: unknown }).required : undefined
      ),
    };
  });
};

/**
 * Component for "FormSection" Slices.
 */
export default async function Form({ slice }: FormSectionProps) {
  const shapeLink = slice?.primary?.form_shape;

  const shapeId = shapeLink && "id" in shapeLink ? shapeLink.id : undefined;
  if (!shapeId) {
    return null;
  }

  const client = await createClient();

  try {
    const form = await client.getByID(shapeId);
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
  } catch (e) {
    console.error("Could not fetch form_shape:", e);
    return null;
  }
}
