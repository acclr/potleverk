// @ts-nocheck
"use server";
import { createClient } from "@/features/prismic";
import { NavigationDocumentDataItemsItem } from "prismicio-types";
import { cache } from "react";
import { getHrefFromDoc } from "@/features/prismic/utils/get-href-from-doc";

export const getHeaderMenu = cache(async () => {
  try {
    const client = createClient();

    if (!client) return [];
    const drawer = await client.getByUID("navigation", "header-menu");

    return drawer?.data?.items?.map((item: NavigationDocumentDataItemsItem) => ({
      label: item?.link?.text ?? item?.text,
      href: getHrefFromDoc(item.link)
    })) ?? [];
  } catch (err) {
    console.error(err);
    return [];
  }
});
