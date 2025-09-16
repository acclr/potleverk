import Image from "next/image";
import Section from "../../ui/section";
import { AspectRatio } from "../../ui/aspect-ratio";

type ContentBlocksProps = {
  className?: string | null;
  items?: any[] | null;
  title?: string | null;
  preamble?: string | null;
  eyebrowText?: string | null;
};

export default function ContentBlocks({
  className,
  items = [],
  title,
  preamble,
  eyebrowText,
}: ContentBlocksProps) {
  return (
    <Section classNames={{ container: className ?? undefined }} boxed>
      <div className="mb-8 mr-auto flex w-[860px] max-w-full flex-col items-start justify-start text-left">
        {eyebrowText && (
          <span className="ui-eyebrow text-base">{eyebrowText}</span>
        )}
        <h2 className="mb-2.5 text-3xl font-[550]">{title}</h2>
        {preamble && <p className="mb-4 max-w-[70ch] text-xl">{preamble}</p>}
      </div>

      <div className="grid gap-4 gap-y-10 lgup:grid-cols-3 lg:grid-cols-2 lg:gap-8 md:grid-cols-1">
        {items?.map((item, index) => (
          <ContentBlock key={index} {...item} />
        ))}
      </div>
    </Section>
  );
}

const ContentBlock = ({
  title,
  text,
  image,
}: {
  title?: string;
  text?: string;
  image: any;
}) => {
  return (
    <div className="ui-card flex flex-col">
      {image?.url && (
        <AspectRatio
          ratio={4 / 3}
          className="ui-image rounded-xl overflow-hidden"
        >
          <Image
            src={image.url}
            alt={image.alt}
            width={768}
            height={512}
            className="absolute left-0 top-0 h-full w-full overflow-hidden object-cover"
          />
        </AspectRatio>
      )}

      <div
        className="mt-4 flex flex-col space-y-1.5"
        data-testid="content-block-content"
      >
        {title && <span className="text-lg font-[550]">{title}</span>}
        {text && (
          <p className="text-[15px] font-[500]">
            {text ??
              "Nulla ullamco id dolor et. Ad non reprehenderit ex occaecat aliquip qui qui dolore sit."}
          </p>
        )}
      </div>
    </div>
  );
};
