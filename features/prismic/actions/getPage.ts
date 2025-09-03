"use server";
import { createClient } from "@/features/prismic";
import { cache } from "react";

export const getPage = cache(async (uid: string) => {
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(err => {
    console.error(err);
    return null;
  });

  return page;
});

