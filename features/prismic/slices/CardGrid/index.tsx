/**
 * @typedef {import("@prismicio/client").Content.CardGridSlice} CardGridSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardGridSlice>} CardGridProps
 * @param {CardGridProps} props
 */

import Section from "@/components/ui/section";
import { createStylesForSlice } from "../utils";
import { Content } from "@prismicio/client";

export type CardGridSliceProps = {
  slice: Content.CardGridSlice;
};

const CardGrid = ({ slice }: { slice: Content.CardGridSliceDefault }) => {
  // @ts-ignore
  const className = createStylesForSlice(slice);

  return (
    <Section boxed classNames={{ container: className }}>
      <div className="grid w-full grid-cols-3 gap-4">
        {slice.items.map((item, index) => (
          <div key={index} className="rounded-md flex flex-col items-center bg-black/5 p-5 text-center">
            <div dangerouslySetInnerHTML={{ __html: item.vector_html ?? '' }} />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm font-normal">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default CardGrid;
