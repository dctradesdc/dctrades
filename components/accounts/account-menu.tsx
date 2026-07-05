"use client";

import {
  Archive,
  Copy,
  Download,
  Edit,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountMenuProps {
  onEdit?: () => void;
  onDuplicate?: () => void;
  onExport?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export function AccountMenu({
  onEdit,
  onDuplicate,
  onExport,
  onArchive,
  onDelete,
}: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52"
      >
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 size-4" />
          Edit Account
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDuplicate}>
          <Copy className="mr-2 size-4" />
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onExport}>
          <Download className="mr-2 size-4" />
          Export
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onArchive}>
          <Archive className="mr-2 size-4" />
          Archive
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onDelete}
          variant="destructive"
        >
          <Trash2 className="mr-2 size-4" />
          Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}