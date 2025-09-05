import { LinkField, LinkResolverFunction } from "@prismicio/client";

export function getPrismicLink(link: LinkField, resolver: LinkResolverFunction) {
  if (link?.link_type === "Web") {
    return link.url; // Outbound link, return as is
  }

  if (link?.link_type === "Document") {
    const path = resolver ? resolver(link) : "/";;
    return path?.startsWith("/") ? path : `/${path}`; // Ensure leading slash for internal links
  }

  return "/#";
}
