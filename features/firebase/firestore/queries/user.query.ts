"use client";

import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "@/features/firebase/client";
import type { Message } from "@/features/firebase/firestore/types";

export const messageKeys = {
  all: ["messages"] as const,
  lists: () => [...messageKeys.all, "list"] as const,
  list: (filters?: any) => [...messageKeys.lists(), filters] as const
} as const;

function mapMessageDoc(doc: any): Message {
  const data = doc.data?.() ?? doc.data;
  const sentAt = (data?.sentAt instanceof Timestamp)
    ? (data.sentAt as Timestamp).toDate().toISOString()
    : (data?.sentAt ?? null);

  return {
    id: doc.id,
    senderId: data?.senderId ?? "",
    message: data?.message ?? "",
    sentAt,
    status: data?.status
  } as Message;
}

export function useOrderMessages(orderId: string | undefined) {
  return useQuery({
    queryKey: messageKeys.list({ orderId }),
    queryFn: async () => {
      const ref = collection(db, "orders", orderId as string, "messages");
      const snap = await getDocs(query(ref, orderBy("sentAt", "asc")));
      return snap.docs.map((d) => mapMessageDoc(d));
    },
    enabled: !!orderId
  });
}


