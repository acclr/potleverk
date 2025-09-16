"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { uploadToStorage } from "@/features/firebase/storage";
import { useCreateOrder } from "@/features/firebase/firestore/queries/orders.query";
import { type Order, OrderStatus } from "@/features/firebase/firestore/types";
import { useAuth } from "@/features/firebase/auth";

type CreateOrderInput = {
  subject: string;
  description?: string;
  is_pickup?: boolean;
  attachments?: File[];
};

export function usePlaceOrder() {
  const router = useRouter();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createOrder = useCreateOrder();

  const placeOrder = useCallback(
    async ({ subject, description, is_pickup = false, attachments = [] }: CreateOrderInput) => {
      if (!user?.uid) {
        setError("Du må være innlogget for å bestille.");
        throw new Error("Not authenticated");
      }

      setError(null);
      setUploading(true);
      try {
        const uploadedUrls: string[] = [];
        for (const file of attachments) {
          const fd = new FormData();
          fd.append("file", file);
          const res = await uploadToStorage(fd);
          if (res.success && res.fullPath) {
            uploadedUrls.push(res.fullPath);
          }
        }

        const data: Omit<Order, "id" | "createdAt" | "updatedAt"> = {
          subject,
          description: description || "",
          status: OrderStatus.PLANNED,
          is_pickup,
          attachments: uploadedUrls,
          clientId: user.uid,
        } as any;

        await createOrder.mutateAsync(data as any);
        router.push("/order");
      } catch (e: any) {
        setError(e?.message || "Kunne ikke sende bestilling");
        return Promise.reject(e);
      } finally {
        setUploading(false);
      }

      return Promise.resolve();
    },
    [user?.uid, router, createOrder]
  );

  return { placeOrder, uploading, error };
}

export default usePlaceOrder;


