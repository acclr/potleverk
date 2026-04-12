/**
 * @typedef {import("@prismicio/client").Content.CardGridSlice} CardGridSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardGridSlice>} CardGridProps
 * @param {CardGridProps} props
 */

import Section from "@/components/ui/section";
import { createStylesForSlice } from "../utils";
import { Content } from "@prismicio/client";
import Image from "next/image";
import { SliceComponentProps } from "@prismicio/react";

const CardGrid = ({ slice }: SliceComponentProps<Content.CardGridSlice>) => {
  const className = createStylesForSlice(slice as never);

  const primary = slice.primary;

  return (
    <Section boxed classNames={{ container: className }}>
      {(primary.eyebrowText || primary.title || primary.subTitle) && (
        <div className="mx-auto mb-8 max-w-[860px] text-center md:text-left">
          {primary.eyebrowText ? (
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              {primary.eyebrowText}
            </p>
          ) : null}
          {primary.title ? (
            <h2 className="mb-2 text-3xl font-semibold lg:text-3xl">{primary.title}</h2>
          ) : null}
          {primary.subTitle ? (
            <p className="text-lg text-gray-600">{primary.subTitle}</p>
          ) : null}
        </div>
      )}

      <div className="grid w-full grid-cols-3 gap-4">
        {slice.items.map((item, index) => (
          <div
            key={index}
            className="rounded-md flex flex-col items-center bg-black/5 p-5 text-center"
          >
            {item.icon?.url ? (
              <Image
                src={item.icon.url}
                alt={item.icon.alt ?? ""}
                width={48}
                height={48}
                className="mb-2 h-12 w-12 object-contain"
              />
            ) : null}
            <div dangerouslySetInnerHTML={{ __html: item.vector_html ?? "" }} />
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm font-normal">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default CardGrid;
