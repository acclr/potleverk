import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersRepo } from "@/features/firebase/firestore/repositories";
import type { Order } from "@/features/firebase/firestore/types";
import { where } from "firebase/firestore";
import { useState, useCallback } from "react";

// Query keys for consistent cache management
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters?: any) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const
} as const;

// ===== QUERIES =====

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: () => ordersRepo.getAll()
  });
}

export function useOrdersByClient(clientId: string | undefined, isAdmin: boolean = false) {
  return useQuery({
    queryKey: orderKeys.list({ clientId }),
    queryFn: () => ordersRepo.getAllBy(...isAdmin ? [] : [where("clientId", "==", clientId as string)]),
    enabled: !!clientId
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersRepo.getById(id),
    enabled: !!id
  });
}

export function usePaginatedOrdersByClient(
  clientId: string | undefined,
  isAdmin: boolean = false,
  pageSize: number = 10
) {
  const [pages, setPages] = useState<{ [key: number]: { data: Order[], lastDoc: any, hasMore: boolean } }>({});
  const [currentPage, setCurrentPage] = useState(0);

  const queryResult = useQuery({
    queryKey: orderKeys.list({ clientId, page: currentPage, pageSize }),
    queryFn: async () => {
      // Check if we already have this page cached
      if (pages[currentPage]) {
        return pages[currentPage];
      }

      const startAfterDoc = currentPage > 0 ? pages[currentPage - 1]?.lastDoc : undefined;
      const constraints = isAdmin ? [] : [where("clientId", "==", clientId as string)];

      const result = await ordersRepo.getPaginatedBy(pageSize, startAfterDoc, 'createdAt', ...constraints);

      // Cache the result
      setPages(prev => ({ ...prev, [currentPage]: result }));

      return result;
    },
    enabled: !!clientId
  });

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    if (queryResult.data?.hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [queryResult.data?.hasMore]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const reset = useCallback(() => {
    setPages({});
    setCurrentPage(0);
  }, []);

  return {
    ...queryResult,
    orders: queryResult.data?.data || [],
    hasMore: queryResult.data?.hasMore || false,
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    reset,
    hasPrevPage: currentPage > 0
  };
}

// ===== MUTATIONS =====

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Order, "createdAt" | "updatedAt" | "id">) =>
      ordersRepo.create({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Order),
    onSuccess: () => {
      // Invalidate and refetch orders lists
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    }
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof ordersRepo.update>[1] }) => ordersRepo.update(id, updates),
    onSuccess: (_, { id }) => {
      // Invalidate specific order and all lists
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    }
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersRepo.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: orderKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    }
  });
}
