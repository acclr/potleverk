"use client";

import { cn } from "@/components/utils";
import type { Order } from "@/features/firebase/firestore/types/order";
import { formatDate } from "./utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OrdersListProps {
  orders: Order[];
  selectedId: string | null;
  isLoading: boolean;
  onSelectOrder: (orderId: string) => void;
  isAdmin: boolean;
  // Pagination props
  currentPage: number;
  hasMore: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage?: (page: number) => void;
  totalDisplayed?: number;
}

export function OrdersList({
  orders,
  selectedId,
  isLoading,
  onSelectOrder,
  isAdmin,
  currentPage,
  hasMore,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  onGoToPage,
}: OrdersListProps) {
  // Generate page numbers to show (current page and a few around it)
  const generatePageNumbers = () => {
    const pages: number[] = [];
    
    // Always show page 0
    if (currentPage > 1) {
      pages.push(0);
      if (currentPage > 2) pages.push(-1); // -1 represents ellipsis
    }
    
    // Show pages around current
    for (let i = Math.max(0, currentPage - 1); i <= currentPage + 1; i++) {
      if (i >= 0 && (i <= currentPage || (i === currentPage + 1 && hasMore))) {
        pages.push(i);
      }
    }
    
    return Array.from(new Set(pages)); // Remove duplicates
  };

  return (
    <aside className="lgup:min-w-[380px] lgup:border-r p-6 md:p-4 lgup:border-black/10 xl:col-span-3">
      {/* Header with title and pagination */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-base font-extrabold">
          Mine bestillinger
        </h2>
        
        {/* Compact pagination */}
        {(hasMore || hasPrevPage || currentPage > 0) && (
          <div className="flex items-center gap-1 text-sm">
            {/* Previous button */}
            <button
              onClick={hasPrevPage ? onPrevPage : undefined}
              disabled={!hasPrevPage}
              className={cn(
                "p-1 rounded hover:bg-gray-100 transition-colors",
                !hasPrevPage && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {generatePageNumbers().map((pageNum, index) => (
                <span key={index}>
                  {pageNum === -1 ? (
                    <span className="px-1 text-gray-400">…</span>
                  ) : (
                    <button
                      onClick={() => onGoToPage?.(pageNum)}
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium transition-colors",
                        pageNum === currentPage
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {pageNum + 1}
                    </button>
                  )}
                </span>
              ))}
              {hasMore && (
                <span className="px-1 text-gray-400">…</span>
              )}
            </div>
            
            {/* Next button */}
            <button
              onClick={hasMore ? onNextPage : undefined}
              disabled={!hasMore}
              className={cn(
                "p-1 rounded hover:bg-gray-100 transition-colors",
                !hasMore && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <ul className="space-y-1.5">
        {isLoading && (
          <div className="text-gray-500">Laster bestillinger…</div>
        )}
        {!isLoading && orders?.length === 0 && (
          <div className="text-gray-500">Ingen bestillinger funnet.</div>
        )}
        {orders?.map((order) => (
          <li key={order.id}>
            {(() => {
              const unreadCount = isAdmin
                ? (order.unreadForAdmin ?? 0)
                : (order.unreadForClient ?? 0);
              return (
            <button
              onClick={() => onSelectOrder(order.id)}
              className={cn("relative w-full text-left p-4 lg:p-3 rounded-lg overflow-hidden !mb-0", 
                selectedId === order.id
                  ? "border-none outline outline-2 outline-primary-600/20"
                  : "bg-transparent lgup:hover:bg-black/5"
              )}
            >
              <div
                className={cn(
                  "absolute top-0 right-0 w-full lgup:w-screen h-full",
                  selectedId === order.id
                    ? "bg-black/[0.03] hover:bg-black/10"
                    : "bg-transparent lgup:hover:bg-black/5"
                )}
              />
              <div className="flex items-start justify-between gap-0">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate max-w-[220px]">
                      {order.subject || "Uten tittel"}
                    </p>
                    {unreadCount > 0 ? (
                      <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Opprettet {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            </button>
              );
            })()}
          </li>
        ))}
      </ul>
    </aside>
  );
}
