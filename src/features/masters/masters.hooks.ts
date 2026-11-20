"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mastersService } from "./masters.service";

export const mastersKey = (categoryId: string) => ["masters", categoryId] as const;

export function useMasters(categoryId: string | null) {
  return useQuery({
    queryKey: mastersKey(categoryId ?? ""),
    queryFn: ({ signal }) => mastersService.list(categoryId!, signal),
    enabled: Boolean(categoryId),
  });
}

export function useMasterMutations(categoryId: string | null) {
  const client = useQueryClient();
  const create = useMutation({
    mutationFn: mastersService.create,
    onSuccess: () =>
      categoryId
        ? client.invalidateQueries({ queryKey: mastersKey(categoryId) })
        : undefined,
  });
  const update = useMutation({
    mutationFn: mastersService.update,
    onSuccess: () =>
      categoryId
        ? client.invalidateQueries({ queryKey: mastersKey(categoryId) })
        : undefined,
  });
  const remove = useMutation({
    mutationFn: mastersService.remove,
    onSuccess: () =>
      categoryId
        ? client.invalidateQueries({ queryKey: mastersKey(categoryId) })
        : undefined,
  });
  return { create, update, remove };
}
