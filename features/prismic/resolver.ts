import { LinkResolverFunction } from "@prismicio/client";

export const resolver: LinkResolverFunction = (doc) => {
  if (!doc || !doc.uid) return "/";

  // Blog posts under `/blogg/[uid]`
  if (doc.type === "blog_post") return `/blogg/${doc.uid}`;

  // General pages under `/[uid]`
  if (doc.type === "page") return `/${doc.uid}`;

  return "/";
};