"use client";

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TradeActionsProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TradeActions({
  onView,
  onEdit,
  onDelete,
}: TradeActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        aria-label="Open trade actions"
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48"
      >
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 size-4" />
          View Trade
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 size-4" />
          Edit Trade
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={onDelete}
        >
          <Trash2 className="mr-2 size-4" />
          Delete Trade
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}