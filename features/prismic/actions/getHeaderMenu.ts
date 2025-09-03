// @ts-nocheck
"use server";
import { createClient } from "@/features/prismic";
import { NavigationDocumentDataItemsItem } from "prismicio-types";
import { cache } from "react";
import { getHrefFromDoc } from "@/features/prismic/utils/get-href-from-doc";

export const getHeaderMenu = cache(async () => {
  const client = createClient();
  const drawer = await client.getByUID("navigation", "header-menu").catch(err => {
    console.error(err);
    return null;
  });

  return drawer?.data?.items?.map((item: NavigationDocumentDataItemsItem) => ({
    label: item?.link?.text ?? item?.text,
    href: getHrefFromDoc(item.link)
  })) ?? [];
});
