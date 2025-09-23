import Image from "next/image";
import Section from "../../ui/section";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPrismicLink } from "@/features/prismic/utils/get-prismic-link";
import { resolver } from "@/features/prismic/resolver";

export default function ContentBlocks({
  className,
  items,
  title,
  preamble,
  eyebrowText,
  link,
}) {
  return (
    <Section classNames={{ container: className }} boxed>
      <div className="mb-8 mr-auto flex w-[860px] max-w-full flex-col items-start justify-start text-left">
        {eyebrowText && (
          <span className="ui-eyebrow text-base">{eyebrowText}</span>
        )}
        <h2 className="mb-2.5 text-3xl font-[550]">{title}</h2>
        {preamble && <p className="mb-4 max-w-[70ch] text-xl">{preamble}</p>}
      </div>

      <div className="grid gap-4 gap-y-10 lgup:grid-cols-3 lg:grid-cols-2 lg:gap-8 md:grid-cols-1">
        {items.map((item, index) => (
          <ContentBlock key={index} {...item} />
        ))}
      </div>

      <Link href={getPrismicLink(link, resolver)}>
        <Button variant="default" size="lg" className="mt-12 max-w-max">
          {link?.text ?? "Visa alla"}
        </Button>
      </Link>
    </Section>
  );
}

const ContentBlock = ({ title, text, image, link }) => {
  const Element = link ? Link : "div";

  console.log({ title, link });
  return (
    <Element
      className="ui-card flex flex-col"
      href={getPrismicLink(link, resolver)}
    >
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
        <span className="text-lg font-[550]">{title}</span>
        <p className="text-[15px] font-[500]">
          {text ??
            "Nulla ullamco id dolor et. Ad non reprehenderit ex occaecat aliquip qui qui dolore sit."}
        </p>
      </div>
    </Element>
  );
};
