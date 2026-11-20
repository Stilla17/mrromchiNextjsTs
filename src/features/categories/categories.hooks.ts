"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "./categories.service";

const categoriesKey = ["categories"] as const;

export function useCategories() {
  return useQuery({
    queryKey: categoriesKey,
    queryFn: ({ signal }) => categoriesService.list(signal),
    refetchInterval: 30_000,
  });
}

export function useCategoryMutations() {
  const client = useQueryClient();
  const refresh = () => client.invalidateQueries({ queryKey: categoriesKey });

  const create = useMutation({
    mutationFn: categoriesService.create,
    onSuccess: refresh,
  });
  const rename = useMutation({
    mutationFn: categoriesService.rename,
    onSuccess: refresh,
  });
  const remove = useMutation({
    mutationFn: categoriesService.remove,
    onSuccess: refresh,
  });

  return { create, rename, remove };
}
