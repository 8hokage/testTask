import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type User = {
  id: string;
  name: string;
  email: string;
  company: string;
  address: string;
  city: string;
  createdAt: string;
};

export function useUsers(search: string) {
  return useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await api.get("/api/users", { params: { search: search || undefined } });
      return res.data.data as User[];
    }
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/users/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    }
  });
}


