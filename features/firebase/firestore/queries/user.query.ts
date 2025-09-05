"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, Timestamp, Unsubscribe, serverTimestamp } from "firebase/firestore";
import { db } from "@/features/firebase/client";
import type { Message, User } from "@/features/firebase/firestore/types";
import { usersRepo } from "../repositories";

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

export function useOrderMessages(orderId?: string | undefined) {
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

export function useCreateOrderMessage(orderId?: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Message>) => {
      if (!orderId) {
        return Promise.reject(new Error("orderId is required to create a message"));
      }
      const ref = collection(db, "orders", orderId, "messages");
      // Enforce server-side timestamp for consistency across clients
      return addDoc(ref, {
        ...data,
        sentAt: serverTimestamp() as unknown as Timestamp
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messageKeys.list({ orderId }) });
    }
  });
}

export function subscribeToOrderMessages(
  orderId?: string | undefined,
  callback?: (messages: Message[]) => void
): Unsubscribe | null {
  if (!callback) return null;

  const ref = query(
    collection(db, "orders", orderId as string, "messages"),
    orderBy("sentAt", "asc")
  );
  return onSnapshot(ref, (snap) => {
    callback(snap?.docs.map((d) => mapMessageDoc(d)));
  });
}