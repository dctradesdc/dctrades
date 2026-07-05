"use client";

import { Button } from "@/components/ui/button";

export type UserFilter =
  | "all"
  | "active"
  | "inactive"
  | "suspended"
  | "admins";

interface Props {
  value: UserFilter;
  onChange: (value: UserFilter) => void;
}

const filters: {
  value: UserFilter;
  label: string;
}[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
  {
    value: "suspended",
    label: "Suspended",
  },
  {
    value: "admins",
    label: "Admins",
  },
];

export function UsersFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          size="sm"
          variant={
            value === filter.value
              ? "default"
              : "outline"
          }
          onClick={() =>
            onChange(filter.value)
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}