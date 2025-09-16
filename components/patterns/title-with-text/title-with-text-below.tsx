import Contained from "@/components/ui/contained";
import { PrismicRichText } from "@/components/ui/prismic-rich-text";
import DefaultSection from "@/components/ui/section";

const TitleWithTextBelow = ({ eyebrowText, title, richText }) => {
  return (
    <DefaultSection classNames={{ inner: "gap-0" }} className="lg:py-8 md:py-4">
      <Contained width="sm" className="mb-4 lg:mx-[unset] lg:mr-auto">
        {eyebrowText && <span className="font-primary text-sm uppercase">{eyebrowText}</span>}
      </Contained>

      <Contained width="sm" className="lg:w-full lg:items-start lg:text-left">
        <div className="flex flex-col items-start justify-start">
          {title && (
            <span className="heading-like mb-6 text-4xl font-medium leading-snug text-primary-200 lg:text-3xl md:text-2xl">
              {title}
            </span>
          )}

          <div className="wysiwyg text-base leading-relaxed">
            <PrismicRichText field={richText} />
          </div>
        </div>
      </Contained>
    </DefaultSection>
  );
};

export default TitleWithTextBelow;
