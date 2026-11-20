import { api } from "@/lib/api";
import type { User, UserInput, UsersResponse } from "./users.types";

export const usersService = {
  async list(page: number, signal?: AbortSignal) {
    const { data } = await api.get<UsersResponse>("/api/users", {
      params: { page, limit: 20 },
      signal,
    });
    return data;
  },

  async getById(id: string, signal?: AbortSignal) {
    const { data } = await api.get<{ data: User }>(`/api/users/${id}`, {
      signal,
    });
    return data.data;
  },

  async create(input: UserInput) {
    const { data } = await api.post<{ data: User }>("/api/users", input);
    return data.data;
  },

  async update({ id, input }: { id: string; input: Partial<UserInput> }) {
    const { data } = await api.patch<{ data: User }>(`/api/users/${id}`, input);
    return data.data;
  },

  async remove(id: string) {
    await api.delete(`/api/users/${id}`);
  },
};
