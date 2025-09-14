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
  isFullWidth = false,
  objectContain = false,
  className
}: { title: string; richText: string; reversed: boolean; eyebrowText: string; buttons: UIButtonProps; image: { url: string; alt: string }; isFullWidth: boolean; objectContain: boolean; className?: string }) => {
  return (
    <Section
      data-slice="image-with-content"
      boxed={isFullWidth ? false : true}
      padding={isFullWidth ? "none" : "lg"}
      direction="row"
      classNames={{
        container: cn(
          "lg:flex-col",
          isFullWidth ? (reversed ? "lgup:flex-row-reverse" : "") : "",
          className
        ),
        inner: cn(
          "items-stretch lg:!flex-col lg:items-start gap-24",
          reversed ? "lgup:flex-row-reverse" : ""
        ),
      }}
    >
      {image && (
        <div
          className={cn(
            isFullWidth ? "flex w-full flex-[1]" : "flex w-full flex-[1]"
          )}
        >
          <Image
            className={cn(
              "left-0 top-0 z-10 h-full w-full",
              objectContain ? "object-contain" : "object-cover"
            )}
            alt={image.alt as string}
            src={image.url as string}
            width={600}
            height={400}
            quality={80}
          />
        </div>
      )}

      <div className="flex flex-[1] flex-col items-center justify-center text-left">
        <div
          className={cn(
            isFullWidth
              ? "p-24 lg:p-12 md:p-8"
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
                "font-[700]",
                isFullWidth ? "text-[42px]" : "text-[42px] lg:text-[32px]"
              )}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}

          <div className="mb-8 mt-6 text-lg">{richText}</div>
          {buttons && renderButtons(buttons)}
        </div>
      </div>
    </Section>
  );
};
