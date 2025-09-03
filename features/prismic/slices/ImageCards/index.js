"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Section from "@/components/ui/section";
import PrismicRichText from "@/components/ui/prismic-rich-text";
import { createStylesForSlice } from "../utils";
import * as prismic from "@prismicio/client";
import { asText } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";

const ImageCard = (item) => {
  const image = item.image;

  return (
    <AspectRatio className="rounded-lg relative w-full overflow-hidden" ratio={12 / 9}>
      <Link href={item.buttonLink.url ?? "/"} path={item.buttonLink.uid} className="absolute left-0 top-0 h-full w-full">
        {prismic.isFilled.image(image) && (
          <div className="group absolute left-0 top-0 flex h-full w-full flex-grow bg-black">
            <Image
              src={image.url}
              alt={image.alt ?? (item?.title || "Image Card alt")}
              layout="fill"
              objectFit="cover"
              className="absolute left-0 top-0 h-full w-full transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-70"
            />

            <div
              className="content absolute bottom-8 left-8 z-10 flex w-[calc(100%-8rem)] flex-col gap-0 font-primary lg:bottom-6 lg:left-6 lg:w-[calc(100%-3rem)] md:bottom-5 md:left-5 md:w-[calc(100%-2.5rem)]"
              style={{
                bottom: "1.5rem",
                left: "1.5rem",
                color: "white",
                paddingRight: "1.5rem"
              }}>
              <span className="mb-1 line-clamp-1 text-2xl font-[550] font-semibold leading-[1.5] md:mb-2 md:text-base md:leading-[1]">
                {item.title || "Aliqua laborum"}
              </span>

              <PrismicRichText field={item.text} />
            </div>

            {item?.backgroundOverlay && (
              <div
                className="absolute bottom-0 left-0 z-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent opacity-20 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(180deg, var(--tw-gradient-to) 0%, var(--tw-gradient-from) 100%)`,
                  minHeight: "100%"
                }}
              />
            )}
          </div>
        )}
      </Link>
    </AspectRatio>
  );
};

/**
 * @typedef {import("@prismicio/client").Content.ImageCardsSlice} ImageCardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageCardsSlice>} ImageCardsProps
 * @param {ImageCardsProps} props
 */
const ImageCards = ({ slice }) => {
  const className = createStylesForSlice(slice);

  return (
    <Section boxed className={{ container: className }}>
      <div className="mb-8 flex flex-col gap-16 lg:gap-8">
        <h2 className="text-center text-4xl font-semibold lg:text-4xl md:text-[34px]">{asText(slice.primary.heading)}</h2>
        <p className="text-center text-lg lg:text-lg md:text-base">{slice.primary.text}</p>
      </div>

      {/* {prismic.isFilled.richText(slice.primary.heading) && (
          <span className="text-left font-secondary text-4xl font-normal lg:text-4xl md:text-[34px]">
            <PrismicText field={slice.primary.heading} />
          </span>
          // <Heading className="font-secondary  text-4xl text-center">
          //   <PrismicText field={slice.primary.heading} />
          // </Heading>
        )} */}
      <div className="grid grid-cols-2 items-start justify-center gap-6 md:grid-cols-1">
        {slice.items.map((item) => (
          <ImageCard key={item.image.url} {...item} />
        ))}
      </div>
    </Section>
  );
};

export default ImageCards;
