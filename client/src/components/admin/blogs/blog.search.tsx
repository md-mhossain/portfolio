"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function BlogSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        placeholder="Search blogs..."
        className="pl-9"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
