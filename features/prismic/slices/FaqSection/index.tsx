import FaqSectionComponent from "@/components/patterns/faq-section";
import { createStylesForSlice } from "../utils";

/**
 * Props for `FaqSection`.
 */
export type FaqSectionProps = any;

/**
 * Component for "FaqSection" Slices.
 */
const FaqSection = ({ slice }: FaqSectionProps): JSX.Element => {
  const className = createStylesForSlice(slice);

  return (
    <>
      <FaqSectionComponent
        /* eyebrowText={slice.primary.eyebrow_text} */
        title={slice.primary.title ?? ""  }
        text={slice.primary.text ?? ""}
        items={slice.items.map((item: any, i: number) => ({
          id: i,
          question: item.question,
          answer: item.answer
        }))}
        // @ts-ignore
        className={className}
      />
    </>
  );
};

export default FaqSection;
