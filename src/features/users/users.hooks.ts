"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "./users.service";

const usersKey = ["users"] as const;
const detailKey = (id: string) => [...usersKey, "detail", id] as const;

export function useUsers(page: number) {
  return useQuery({
    queryKey: [...usersKey, "list", page],
    queryFn: ({ signal }) => usersService.list(page, signal),
  });
}

export function useUser(id?: string) {
  return useQuery({
    queryKey: detailKey(id ?? ""),
    queryFn: ({ signal }) => usersService.getById(id!, signal),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

export function useCreateUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: usersService.create,
    onSuccess: async (user) => {
      client.setQueryData(detailKey(user.id), user);
      await client.invalidateQueries({ queryKey: [...usersKey, "list"] });
    },
  });
}

export function useUpdateUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: usersService.update,
    onSuccess: async (user) => {
      // Cancel an older detail request before storing the mutation response.
      await client.cancelQueries({ queryKey: detailKey(user.id) });
      client.setQueryData(detailKey(user.id), user);
      await client.invalidateQueries({ queryKey: [...usersKey, "list"] });
    },
  });
}

export function useDeleteUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: usersService.remove,
    onSuccess: async (_result, id) => {
      await client.cancelQueries({ queryKey: detailKey(id) });
      client.removeQueries({ queryKey: detailKey(id) });
      await client.invalidateQueries({ queryKey: [...usersKey, "list"] });
    },
  });
}
