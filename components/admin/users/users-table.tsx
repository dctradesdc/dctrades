"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { AdminUser } from "@/features/admin/users";
import { formatDate } from "@/lib/date";

import { UserActions } from "./user-actions";
import { UserDetailsDialog } from "./user-details-dialog";
import { UserFilter, UsersFilter } from "./users-filter";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  users: AdminUser[];
}

const badgeVariant = {
  active: "default",
  inactive: "secondary",
  suspended: "destructive",
} as const;

export function UsersTable({ users }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<UserFilter>("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.full_name?.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      if (!matchesSearch) {
        return false;
      }

      switch (filter) {
        case "active":
          return user.status === "active";
        case "inactive":
          return user.status === "inactive";
        case "suspended":
          return user.status === "suspended";
        case "admins":
          return user.is_admin;
        default:
          return true;
      }
    });
  }, [users, search, filter]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="space-y-4 border-b p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="pl-9"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1 ? "user" : "users"}
            </p>
          </div>

          <UsersFilter value={filter} onChange={setFilter} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Accounts</TableHead>
              <TableHead className="text-center">Trades</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-20 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar_url ?? undefined} />
                          <AvatarFallback>
                            {user.full_name?.charAt(0).toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {user.full_name ?? "Unknown User"}
                            </p>
                            {user.is_admin && (
                              <Badge variant="outline">Admin</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="text-center font-medium">{user.accounts}</TableCell>
                    <TableCell className="text-center font-medium">{user.trades}</TableCell>

                    <TableCell>
                      <Badge variant={badgeVariant[user.status]}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {formatDate(user.last_active_at)}
                    </TableCell>

                    <TableCell className="text-right">
                      <UserActions
                        userId={user.id}
                        suspended={user.is_suspended}
                        onView={() => {
                          setSelectedUser(user);
                          setDetailsOpen(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <UserDetailsDialog
        user={selectedUser}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}