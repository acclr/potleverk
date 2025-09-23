"use client";

import type { Order } from "@/features/firebase/firestore/types/order";
import { OrderDetailDesktop } from "./OrderDetailDesktop";
import { OrderDetailMobile } from "./OrderDetailMobile";

interface OrderDetailProps {
  orders: Order[];
  selected: Order | null;
  isMobile?: boolean;
}

export function OrderDetail({ orders, selected, isMobile = false }: OrderDetailProps) {
  // Mobile layout
  if (isMobile) {
    if (!selected) return null;
    return <OrderDetailMobile selected={selected} />;
  }

  // Desktop layout
  return <OrderDetailDesktop orders={orders} selected={selected} />;
}
