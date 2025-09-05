import { cn } from "@/components/utils";
import { ImageField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText as BasePrismicRichText, JSXMapSerializer, PrismicRichTextProps } from "@prismicio/react";
import Image from "next/image";
import { PropsWithChildren } from "react";

/** @type {import("@prismicio/react").JSXMapSerializer} */
export const defaultComponents = {
  heading1: ({ children, heading1 }: PropsWithChildren<{ heading1: string }>) => (
    <h1 className={cn("text-3xl font-[550] first:mt-0 last:mb-0", heading1)}>
      {children}
    </h1>
  ),
  heading2: ({ children, heading2 }: PropsWithChildren<{ heading2: string }>) => (
    <h2 className={cn("text-2xl font-[550] first:mt-0 last:mb-0", heading2)}>
      {children}
    </h2>
  ),
  heading3: ({ children, heading3 }: PropsWithChildren<{ heading3: string }>) => (
    <h3 className={cn("ui-loose text-xl font-[550] first:mt-0 last:mb-0", heading3)}>{children}</h3>
  ),
  heading4: ({ children, heading4 }: PropsWithChildren<{ heading4: string }>) => (
    <h4 className={cn("ui-loose text-lg font-[550] first:mt-0 last:mb-0", heading4)}>{children}</h4>
  ),

  heading5: ({ children, heading5 }: PropsWithChildren<{ heading5: string }>) => <h5 className={cn("text-lg font-[550] first:mt-0 last:mb-0", heading5)}>{children}</h5>,
  paragraph: ({ children, paragraph }: PropsWithChildren<{ paragraph: string }>) => (
    <p className={cn("mb-[0.5em] block w-full text-base last:mb-0", paragraph)}>{children}</p>
  ),
  oList: ({ children, oList }: PropsWithChildren<{ oList: string }>) => (
    <ol className={cn("mb-[0.5em] pl-4 text-lg leading-relaxed last:mb-0 md:pl-6", oList)}>{children}</ol>
  ),
  oListItem: ({ children, oListItem }: PropsWithChildren<{ oListItem: string }>) => (
    <li className={cn("mb-[0.5em] list-decimal pl-1 text-lg leading-relaxed last:mb-0 md:pl-2", oListItem)}>{children}</li>
  ),
  list: ({ children, list }: PropsWithChildren<{ list: string }>) => <ul className={cn("mb-3 pl-4 text-lg last:mb-0 md:pl-6", list)}>{children}</ul>,
  listItem: ({ children, listItem }: PropsWithChildren<{ listItem: string }>) => (
    <li className={cn("list-disc pl-1 text-lg leading-relaxed last:mb-0 md:pl-2", listItem)}>{children}</li>
  ),
  preformatted: ({ children, preformatted }: PropsWithChildren<{ preformatted: string }>) => (
    <pre className={cn("mb-3 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg", preformatted)}>
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children, strong }: PropsWithChildren<{ strong: string }>) => <strong className={strong}>{children}</strong>,
  hyperlink: ({ children, node, hyperlink }: PropsWithChildren<{ node: { data: LinkField }; hyperlink: string }>) => (
    <PrismicNextLink field={node.data} className={cn("underline decoration-1 underline-offset-2", hyperlink)}>
      {children}
    </PrismicNextLink>
  ),
  image: ({ children, node, image }: PropsWithChildren<{ node: { data: ImageField }; image: string }>) => (
    <div className={cn("aspect-16/9 relative", image)}>
      <Image
        layout="fill"
        objectFit="cover"
        src={node.data.url ?? ""}
        alt={node.data.alt ?? ""}
        width={node.data.dimensions?.width}
        height={node.data.dimensions?.height}
      />
    </div>
  )
};

export default function PrismicRichText({
  components,
  ...props
}: PrismicRichTextProps) {
  return (
    <div className="flex w-full flex-col">
      <BasePrismicRichText components={{ ...defaultComponents, ...components } as JSXMapSerializer} field={props.field} />
    </div>
  );
}

export { PrismicRichText };
