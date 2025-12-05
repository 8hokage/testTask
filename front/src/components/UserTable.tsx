"use client";
import { useCallback, useEffect, useState } from "react";
import { useDeleteUser, User, useUsers } from "@/hooks/use-users";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { UserRow } from "@/components/users/UserRow";
import { UserTableToolbar } from "@/components/users/UserTableToolbar";

export function UserTable() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setSearch(input), 300);
    return () => clearTimeout(t);
  }, [input]);

  const { data, isLoading, isFetching } = useUsers(search);
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();

  const users = data ?? [];
  const isBusy = isLoading || isFetching;

  const handleDelete = useCallback(async (user: User) => {
    await deleteUser(user.id);
  }, [deleteUser]);

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
      </div>
      <UserTableToolbar value={input} onChange={setInput} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                disabled={isDeleting}
                onDelete={handleDelete}
              />
            ))}
            {!isBusy && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

