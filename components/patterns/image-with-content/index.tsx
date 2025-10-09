import { cn } from "@/components/utils";
import Image from "next/image";
import { AspectRatio } from "../../ui/aspect-ratio";
import Section from "../../ui/section";
import { renderButtons, UIButtonProps } from "@/features/prismic/utils/render-buttons";

export const ImageWithContent = ({
  title,
  richText,
  reversed,
  eyebrowText,
  buttons,
  image,
  isVertical = false,
  isFullWidth = false,
  objectContain = false,
  className,
}: {
  title: string;
  richText: string;
  reversed: boolean;
  eyebrowText: string;
  buttons: UIButtonProps;
  image: { url: string; alt: string };
  isVertical: boolean;
  isFullWidth: boolean;
  objectContain: boolean;
  className?: string;
}) => {
  return (
    <Section
      data-slice="image-with-content"
      boxed={isFullWidth ? false : true}
      padding={isFullWidth ? "none" : "lg"}
      direction={isVertical ? "column" : "row"}
      classNames={{
        container: cn(
          "lg:flex-col",
          isFullWidth ? (reversed ? "lgup:flex-row-reverse" : "") : "",
          className
        ),
        inner: cn(
          "items-stretch lg:!flex-col lg:items-start",
          reversed ? "lgup:flex-row-reverse" : "",
          isVertical ? "gap-8" : "gap-24"
        ),
      }}
    >
      {image && (
        <div
          className={cn(
            isFullWidth ? "flex w-full flex-[1]" : "flex w-full flex-[1]"
          )}
        >
          {isFullWidth ? (
            <AspectRatio ratio={4 / 3}>
              <Image
                className={cn(
                  "left-0 rounded-none top-0 z-10 h-full w-full",
                  objectContain ? "object-cover" : "object-cover"
                )}
                alt={image.alt as string}
                src={image.url as string}
                width={600}
                height={400}
                quality={80}
              />
            </AspectRatio>
          ) : (
            <Image
              className={cn(
                "left-0 rounded-2xl top-0 z-10 h-full w-full",
                objectContain ? "object-cover" : "object-cover"
              )}
              alt={image.alt as string}
              src={image.url as string}
              width={600}
              height={400}
              quality={80}
            />
          )}
        </div>
      )}

      <div
        className={cn(
          "flex flex-[1] flex-col items-center justify-center text-left",
          isVertical ? "text-center" : ""
        )}
      >
        <div
          className={cn(
            isFullWidth
              ? "p-16 lg:p-6 md:p-6 gap-3 flex flex-col w-full"
              : reversed
                ? "mr-8 lg:mr-0"
                : "ml-8 lg:ml-0"
          )}
        >
          {eyebrowText && (
            <span className="ui-eyebrow inline-block text-lg">
              {eyebrowText}
            </span>
          )}

          {title && (
            <h3
              className={cn(
                "font-[700] leading-tight",
                isFullWidth
                  ? "text-[42px] lg:text-[32px] md:text-[28px]"
                  : "text-[42px] lg:text-[32px]"
              )}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}

          <div className="text-lg">{richText}</div>
          {buttons && renderButtons(buttons)}
        </div>
      </div>
    </Section>
  );
};
