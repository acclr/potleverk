"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/firebase/auth";
import { usePaginatedOrdersByClient } from "@/features/firebase/firestore/queries/orders.query";
import { UserRole } from "@/features/firebase/firestore/types";
import { LoaderIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrdersList, OrderDetail, OrderDetailModal, UserHeader } from "../components";
import { BackButton } from "../components/back-button";
import { useTranslation } from "@/hooks/useTranslation";

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
    pageSize 
  } = usePaginatedOrdersByClient(
    user?.uid,
    user?.role === UserRole.ADMIN,
    10 // page size
  );

  const { t } = useTranslation();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const selected = useMemo(() => {
    if (!orders?.length) return null;
    return orders.find((o) => o.id === selectedId) ?? null;
  }, [orders, selectedId]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedId(orderId);
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
        title={ t('myOrdersTitle.text') }
        subtitle={ t('myOrdersSubTitle.text') }
      />
      
      <div className="container mx-auto flex flex-col gap-6 px-6 py-8">
        <BackButton />
        
        <div className="flex flex-col lgup:flex-row gap-6 bg-white rounded-lg shadow-sm border">
        {/* Orders List Sidebar */}
        <OrdersList
          orders={orders}
          selectedId={selected?.id ?? null}
          isLoading={isLoading}
          onSelectOrder={handleSelectOrder}
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
            <OrderDetail orders={orders} selected={selected} isMobile={false} />
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
