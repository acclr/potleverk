"use server";
import { createClient } from "@/features/prismic";
import { cache } from "react";

export const getSettings = cache(async () => {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(err => {
    console.error(err);
    return null;
  })

  return settings;
});
