"use client";

import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/features/auth/actions/index";

interface UserMenuProps {
  name?: string;
  email?: string;
  avatar?: string;
}

export function UserMenu({
  name = "User",
  email = "",
  avatar = "",
}: UserMenuProps) {
  const router = useRouter();

  const initials = name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent focus:outline-none">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={avatar}
            alt={name}
          />

          <AvatarFallback>
            {initials || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        {/* User Info */}
        <div className="border-b px-3 py-3">
          <p className="truncate font-semibold">
            {name}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {email}
          </p>
        </div>

        <DropdownMenuItem
          onClick={() =>
            router.push("/settings")
          }
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            router.push("/settings")
          }
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

            <DropdownMenuItem
            variant="destructive"
            onClick={async () => {
                await signOut();
            }}
            >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
            </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}