import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/hooks/use-users";
import { useState } from "react";
import { Confirm } from "@/components/ui/confirm";

interface UserRowProps {
  user: User;
  onDelete: (user: User) => void;
  disabled?: boolean;
};

export function UserRow({ user, onDelete, disabled }: UserRowProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.company}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell>{user.city}</TableCell>
        <TableCell className="text-right">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={disabled}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <Confirm
        open={open}
        onOpenChange={setOpen}
        title="Delete user?"
        description="This action cannot be undone. The user will be permanently removed."
        confirmText="Delete"
        onConfirm={async () => onDelete(user)}
        loading={disabled}
      />
    </>
  );
}


