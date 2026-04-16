"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/firebase/auth";
import { usePaginatedOrdersByClient } from "@/features/firebase/firestore/queries/orders.query";
import { useMarkOrderMessagesRead } from "@/features/firebase/firestore/queries/user.query";
import { UserRole } from "@/features/firebase/firestore/types";
import type { Order } from "@/features/firebase/firestore/types/order";
import { LoaderIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrdersList, OrderDetail, OrderDetailModal, UserHeader } from "../components";
import { BackButton } from "../components/back-button";

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { 
    orders = [], 
    isLoading,
    currentPage,
    hasMore,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
  } = usePaginatedOrdersByClient(
    user?.uid,
    user?.role === UserRole.ADMIN,
    10 // page size
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const markOrderMessagesRead = useMarkOrderMessagesRead();
  const isAdmin = user?.role === UserRole.ADMIN;

  const sortedOrders = useMemo(() => {
    type OrderTimestampValue =
      | Date
      | string
      | {
          toDate?: () => Date;
          seconds?: number;
        }
      | null
      | undefined;
    const getUnreadCount = (order: Order) =>
      isAdmin ? (order?.unreadForAdmin ?? 0) : (order?.unreadForClient ?? 0);
    const toTimestampMs = (value: OrderTimestampValue): number => {
      if (!value) return 0;
      if (typeof value === "string") {
        const parsed = Date.parse(value);
        return Number.isNaN(parsed) ? 0 : parsed;
      }
      if (value instanceof Date) {
        return value.getTime();
      }
      if (typeof value === "object" && value !== null && "toDate" in value && typeof value.toDate === "function") {
        const date = value.toDate();
        return date instanceof Date ? date.getTime() : 0;
      }
      if (typeof value === "object" && value !== null && "seconds" in value && typeof value.seconds === "number") {
        return value.seconds * 1000;
      }
      return 0;
    };
    const getLastActivity = (order: Order) => toTimestampMs(order?.lastMessageAt ?? order?.createdAt);

    return [...orders].sort((a: Order, b: Order) => {
      const aUnread = getUnreadCount(a);
      const bUnread = getUnreadCount(b);
      if (aUnread !== bUnread) return bUnread - aUnread;
      return getLastActivity(b) - getLastActivity(a);
    });
  }, [orders, isAdmin]);

  const selected = useMemo(() => {
    if (!sortedOrders?.length) return null;
    return sortedOrders.find((o) => o.id === selectedId) ?? null;
  }, [sortedOrders, selectedId]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedId(orderId);
    markOrderMessagesRead.mutate({ orderId, isAdmin: user?.role === UserRole.ADMIN });
    if (isMobile) {
      setIsMobileModalOpen(true);
    }
  };

  useEffect(() => {
    if (!user?.uid) {
      router.push("/account");
    }
  }, [user, router]);

  if (!user?.uid) {
    return (
      <div className="flex items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-max bg-gray-50/50">
      <UserHeader 
        title="Mine bestillinger"
        subtitle="Se og administrer dine bestillinger"
      />
      
      <div className="container mx-auto flex flex-col gap-6 px-6 py-8">
        <BackButton />
        
        <div className="flex flex-col lgup:flex-row gap-6 bg-white rounded-lg shadow-sm border">
        {/* Orders List Sidebar */}
        <OrdersList
          orders={sortedOrders}
          selectedId={selected?.id ?? null}
          isLoading={isLoading}
          onSelectOrder={handleSelectOrder}
          isAdmin={isAdmin}
          currentPage={currentPage}
          hasMore={hasMore}
          hasPrevPage={hasPrevPage}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          onGoToPage={goToPage}
          totalDisplayed={orders.length}
        />

          {/* Desktop Order Detail */}
          <section className="hidden lgup:block lgup:col-span-8 xl:col-span-9 py-6 pr-8 flex-[999]">
            <OrderDetail orders={sortedOrders} selected={selected} isMobile={false} />
          </section>
        </div>

        {/* Mobile Order Detail Modal */}
        <OrderDetailModal
          isOpen={isMobileModalOpen}
          onOpenChange={setIsMobileModalOpen}
          selected={selected}
        />
      </div>
    </div>
  );
}
