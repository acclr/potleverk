"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "..";

export const pageKeys = {
  all: ["pages"] as const,
  details: (filters?: any) => [...pageKeys.all, "details", filters] as const
} as const;


export function useGetPage(uid: string) {
  const client = createClient();

  return useQuery({
    queryKey: pageKeys.details({ uid }),
    queryFn: async () => client.getByUID("page", uid),
    enabled: !!uid
  });
}


