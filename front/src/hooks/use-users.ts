import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  });
}

type UsersContext = { prevEntries: Array<[unknown, User[] | undefined]> };

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation<void, unknown, string, UsersContext>({
    mutationFn: async (id: string) => {
      await api.delete(`/api/users/${id}`);
    },
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prevEntries = qc.getQueriesData<User[]>({ queryKey: ["users"] });
      prevEntries.forEach(([key, data]) => {
        qc.setQueryData<User[] | undefined>(key, (data ?? []).filter((u) => u.id !== id));
      });
      return { prevEntries };
    },
    onError: (_err, _id, ctx) => {
      ctx?.prevEntries?.forEach(([key, data]) => {
        qc.setQueryData(key as readonly unknown[], data);
      });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    }
  });
}


