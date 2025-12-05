import { Input } from "@/components/common/input";
import { Loader2 } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  busy?: boolean;
};

export function UserTableToolbar({ value, onChange, busy }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {busy && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
    </div>
  );
}


