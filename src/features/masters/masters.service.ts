import { api } from "@/lib/api";
import type { Master, MasterFields, MasterInput } from "./masters.types";

export const mastersService = {
  async list(categoryId: string, signal?: AbortSignal) {
    const { data } = await api.get<{ data: Master[] }>("/api/masters", {
      params: { categoryId },
      signal,
    });
    return data.data;
  },
  async create(input: MasterInput) {
    const { data } = await api.post<{ data: Master }>("/api/masters", input);
    return data.data;
  },
  async update({ id, input }: { id: string; input: MasterFields }) {
    const { data } = await api.patch<{ data: Master }>(`/api/masters/${id}`, input);
    return data.data;
  },
  async remove(id: string) {
    await api.delete(`/api/masters/${id}`);
  },
};
