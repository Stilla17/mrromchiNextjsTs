"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

type Session = {
  id: string;
  role: "admin" | "user";
};

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await api.get<{ data: Session }>("/api/session/me");
      return data.data;
    },
    staleTime: 5 * 60_000,
  });
}
