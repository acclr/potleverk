import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersRepo } from "@/features/firebase/firestore/repositories";
import type { Order } from "@/features/firebase/firestore/types";
import { where } from "firebase/firestore";

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
