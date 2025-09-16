import Contained from "@/components/ui/contained";
import { PrismicRichText } from "@/components/ui/prismic-rich-text";
import DefaultSection from "@/components/ui/section";
import { RichTextField } from "@prismicio/client";

interface TitleWithTextOnRightProps {
  eyebrowText?: string;
  title?: string;
  richText: RichTextField;
}

const TitleWithTextOnRight = ({
  eyebrowText,
  title,
  richText,
}: TitleWithTextOnRightProps) => {
  return (
    <DefaultSection classNames={{ inner: "gap-0" }}>
      <Contained width="lg" className="mb-4">
        {eyebrowText && (
          <span className="font-primary text-sm uppercase text-white">
            {eyebrowText}
          </span>
        )}
      </Contained>

      <Contained width="lg">
        <div className="flex items-start justify-between gap-12 xl:flex-col lg:gap-6">
          <div className="flex flex-[1] flex-col gap-4 lg:w-full lg:gap-0">
            {title && (
              <span className="heading-like text-4xl font-medium leading-snug text-primary-200 lg:text-3xl md:text-2xl">
                {title}
              </span>
            )}
          </div>

          <div className="wysiwyg flex-[1] text-base leading-relaxed lg:w-full lg:max-w-full">
            <PrismicRichText field={richText} />
          </div>
        </div>
      </Contained>
    </DefaultSection>
  );
};

export default TitleWithTextOnRight;
