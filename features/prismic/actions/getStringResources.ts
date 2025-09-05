"use server";
import { createClient } from "@/features/prismic";

export const getStringResources = async () => {
  const client = createClient();
  const localization = await client.getSingle("localization").catch(err => {
    console.error(err);
    return null;
  })

  if (!localization) {
    return {};
  }

  const resources = {};
  localization.data.resources.map((resource) => {
    resources[resource.key] = resource.value;
  });

  return resources;
};
