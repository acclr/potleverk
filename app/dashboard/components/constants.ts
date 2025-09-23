import type { OrderStatus } from "@/features/firebase/firestore/types/order";

export const statusLabel: Record<OrderStatus, string> = {
  planned: "Planlagt",
  "in-progress": "Under arbeid",
  done: "Ferdig",
};

export const statusStyles: Record<OrderStatus, string> = {
  planned: "bg-amber-100 text-amber-800",
  "in-progress": "bg-blue-100 text-blue-800",
  done: "bg-emerald-100 text-emerald-800",
};
