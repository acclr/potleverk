"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  Unsubscribe,
  updateDoc,
  writeBatch
} from "firebase/firestore";
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
    senderName: data?.senderName,
    senderRole: data?.senderRole,
    message: data?.message ?? "",
    sentAt,
    status: data?.status,
    type: data?.type,
    is_quote: data?.is_quote,
    intent: data?.intent ?? null,
    replyToMessageId: data?.replyToMessageId ?? null,
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
      const orderRef = doc(db, "orders", orderId);
      const senderRole = data?.senderRole;
      const isFromAdmin = senderRole === "admin";
      const unreadField = isFromAdmin ? "unreadForClient" : "unreadForAdmin";
      const resetOwnUnreadField = isFromAdmin ? "unreadForAdmin" : "unreadForClient";

      const batch = writeBatch(db);
      const messageRef = doc(ref);
      batch.set(messageRef, {
        ...data,
        sentAt: serverTimestamp() as unknown as Timestamp
      });
      batch.update(orderRef, {
        lastMessageAt: new Date().toISOString(),
        [unreadField]: increment(1),
        [resetOwnUnreadField]: 0,
      } as any);
      return batch.commit();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messageKeys.list({ orderId }) });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}

export function useMarkOrderMessagesRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, isAdmin }: { orderId: string; isAdmin: boolean }) => {
      if (!orderId) {
        return Promise.reject(new Error("orderId is required to mark messages as read"));
      }

      const orderRef = doc(db, "orders", orderId);
      const unreadField = isAdmin ? "unreadForAdmin" : "unreadForClient";
      return updateDoc(orderRef, {
        [unreadField]: 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
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