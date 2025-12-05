import { Button } from "@/components/common/button";
import { TableCell, TableRow } from "@/components/common/table";
import { User } from "@/hooks/useUsers";
import { Trash2 } from "lucide-react";

type Props = {
  user: User;
  onDelete: (user: User) => void;
  disabled?: boolean;
};

export function UserRow({ user, onDelete, disabled }: Props) {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.company}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>{user.city}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(user)}
          disabled={disabled}
          aria-label={`Delete ${user.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}


