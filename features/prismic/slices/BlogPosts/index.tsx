// @ts-nocheck
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Hoverable from "@/components/ui/hoverable";
import Section from "@/components/ui/section";
import { createClient } from "@/features/prismic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getHrefFromDoc } from "@/features/prismic/utils/get-href-from-doc";
import { getBgFromSlice, getSpaceFromSlice } from "../utils";

/**
 * Props for `BlogPosts`.
 */
export type BlogPostsProps = SliceComponentProps<Content.BlogPostsSlice>;

/**
 * Component for "BlogPosts" Slices.
 */
const BlogPosts = async ({ slice }: BlogPostsProps): Promise<JSX.Element> => {
  const client = createClient();
  //@ts-ignore
  const blogPosts = await client.getAllByType("blog_post", { pageSize: 3 });
  const blogPostsData = blogPosts?.slice(0, slice.primary.show_all ? Infinity : 3);

  const className = cn(
    getBgFromSlice(slice.primary.background),
    getSpaceFromSlice(slice.primary.spacing_top, "top"),
    getSpaceFromSlice(slice.primary.spacing_bottom, "bottom")
  );

  return (
    <Section classNames={{ container: className }} boxed>
      <div className="mb-8 mr-auto flex w-[860px] max-w-full flex-col items-start justify-start text-left">
        <h2 className="mb-2.5 text-3xl font-[550]">{slice.primary.title}</h2>
        {slice.primary.text && <p className="mb-4 max-w-[70ch] text-xl">{slice.primary.text}</p>}
      </div>

      <div className="grid gap-4 gap-y-12 lgup:grid-cols-3 lg:grid-cols-2 lg:gap-8 md:grid-cols-1">
        {blogPostsData.map((item, index) => (
          <BlogPostItem
            key={index}
            title={item?.data?.title}
            text={item?.data?.preamble}
            url={item.uid}
            image={item.data.image}
          />
        ))}
      </div>

      {!slice.primary.show_all && (
        <div className="mt-12 flex flex-col items-center justify-center">
          <Link href={getHrefFromDoc(slice.primary.show_all_link) ?? "#"}>
            <Button>{slice.primary.show_all_link.text ?? "Visa fler"}</Button>
          </Link>
        </div>
      )}
    </Section>
  );
};

const BlogPostItem = ({ title, text, image, url }) => {
  return (
    <Link href={`/blogg/${url}`} className="group flex flex-col">
      {image?.url && (
        <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-xl">
          <Image
            src={image.url}
            alt={image.alt}
            width={768}
            height={512}
            className="absolute left-0 top-0 z-10 h-full w-full overflow-hidden rounded-xl object-cover"
          />
          <div className="absolute z-20 flex size-full items-center justify-center bg-teal-800/60 opacity-0 transition-all group-hover:opacity-100">
            <Hoverable shape="circle" bg="lighten" initial>
              <ChevronRight strokeWidth={1} color="white" size={42} />
            </Hoverable>
          </div>
        </AspectRatio>
      )}

      <div className="mt-4 flex flex-col space-y-1.5" data-testid="content-block-content">
        <span className="text-lg font-[550] group-hover:text-teal-900">{title}</span>
        <p className="line-clamp-3 text-base">{text}</p>
      </div>
    </Link>
  );
};

export default BlogPosts;
