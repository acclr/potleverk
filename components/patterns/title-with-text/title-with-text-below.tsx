import Contained from "@/components/ui/contained";
import { PrismicRichText } from "@/components/ui/prismic-rich-text";
import DefaultSection from "@/components/ui/section";

const TitleWithTextBelow = ({
  eyebrowText,
  title,
  richText,
  text,
  width = "sm",
  classNames,
}) => {
  return (
    <DefaultSection
      boxed
      classNames={{ inner: "gap-0", ...classNames }}
      className="lg:py-8 md:py-4"
    >
      <Contained width={width} className="mb-4 lg:mx-[unset] lg:mr-auto">
        {eyebrowText && (
          <span className="font-primary text-sm uppercase">{eyebrowText}</span>
        )}
      </Contained>

      <Contained
        width={width}
        className="lg:w-full lg:items-start lg:text-left"
      >
        <div className="flex flex-col items-start justify-start">
          {title && (
            <h3 className="text-4xl font-semibold leading-snug text-black lg:text-3xl md:text-2xl">
              {title}
            </h3>
          )}

          <div className="wysiwyg text-base leading-relaxed">
            {richText && <PrismicRichText field={richText} />}
            {text && text}
          </div>
        </div>
      </Contained>
    </DefaultSection>
  );
};

export default TitleWithTextBelow;
