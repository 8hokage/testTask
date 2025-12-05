import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function UserTableToolbar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}


