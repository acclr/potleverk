// @ts-nocheck
"use server";
import { createClient } from "@/features/prismic";
import { NavigationDocumentDataItemsItem } from "prismicio-types";
import { getHrefFromDoc } from "@/features/prismic/utils/get-href-from-doc";
import { cache } from "react";

export const getDrawerMenu = cache(async () => {
  const client = createClient();
  try {
    if (!client) return [];
    const drawer = await client.getByUID("navigation", "drawer-menu");

  return drawer?.data?.items?.map((item: NavigationDocumentDataItemsItem) => ({
    label: item?.link?.text ?? item?.text,
    href: getHrefFromDoc(item.link)
  }));
  } catch (err) {
    console.error(err);
    return [];
  }
});
