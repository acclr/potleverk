import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersRepo } from "@/features/firebase/firestore/repositories";
import type { User } from "@/features/firebase/firestore/types";

// Query keys for consistent cache management
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters?: any) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const
} as const;

// ===== QUERIES =====

export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: () => usersRepo.getAll()
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersRepo.getById(id),
    enabled: !!id
  });
}

// ===== MUTATIONS =====

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<User, "createdAt" | "updatedAt" | "id">) => usersRepo.create({ ...data, meta: {
      createdAt: new Date().toISOString(),
    } } as User),
    onSuccess: () => {
      // Invalidate and refetch users lists
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    }
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof usersRepo.update>[1] }) => usersRepo.update(id, updates),
    onSuccess: (_, { id }) => {
      // Invalidate specific user and all lists
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    }
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersRepo.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    }
  });
}
