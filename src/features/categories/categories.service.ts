import { api } from "@/lib/api";
import type { Category, CategoryInput } from "./categories.types";

export const categoriesService = {
  async list(signal?: AbortSignal) {
    const { data } = await api.get<{ data: Category[] }>("/api/categories", {
      signal,
    });
    return data.data;
  },
  async create(input: CategoryInput) {
    const { data } = await api.post<{ data: Category }>(
      "/api/categories",
      input,
    );
    return data.data;
  },
  async rename({ id, name }: { id: string; name: string }) {
    const { data } = await api.patch<{ data: Category }>(
      `/api/categories/${id}`,
      { name },
    );
    return data.data;
  },
  async remove(id: string) {
    await api.delete(`/api/categories/${id}`);
  },
};
