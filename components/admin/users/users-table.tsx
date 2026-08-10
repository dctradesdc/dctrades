"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import type { AdminUser } from "@/features/admin/users";
import { formatDate } from "@/lib/date";

import { UserActions } from "./user-actions";
import { UserDetailsDialog } from "./user-details-dialog";
import {
  UsersFilter,
  type UserFilter,
} from "./users-filter";

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
  const router = useRouter();

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
      <div className="w-full space-y-4">
        {/* Search + Filter Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
            <p className="text-xs font-medium text-muted-foreground sm:text-sm">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1 ? "user" : "users"}
            </p>

            <UsersFilter value={filter} onChange={setFilter} />
          </div>
        </div>

        {/* Users Responsive Table Container */}
        <div className="w-full overflow-x-auto rounded-xl border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
          <Table className="w-full min-w-250 text-left">
            <TableHeader>
              <TableRow className="border-b border-border/60 bg-muted/30 hover:bg-muted/30">
                <TableHead className="py-3.5 px-3">User</TableHead>
                <TableHead className="py-3.5 px-3">Email</TableHead>
                <TableHead className="py-3.5 px-3">Plan</TableHead>
                <TableHead className="py-3.5 px-3">Subscription</TableHead>
                <TableHead className="py-3.5 px-3">Expires</TableHead>
                <TableHead className="py-3.5 px-2 text-center">Accounts</TableHead>
                <TableHead className="py-3.5 px-2 text-center">Trades</TableHead>
                <TableHead className="py-3.5 px-3">Status</TableHead>
                <TableHead className="py-3.5 px-3">Last Active</TableHead>
                <TableHead className="py-3.5 px-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => {
                  const subscription = user.subscription;
                  const plan = subscription?.plan ?? "free";
                  const subscriptionStatus = subscription?.status ?? "active";

                  return (
                    <TableRow
                      key={user.id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      {/* User Avatar & Name */}
                      <TableCell className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage
                              src={user.avatar_url ?? undefined}
                            />
                            <AvatarFallback className="text-xs font-semibold">
                              {user.full_name?.charAt(0).toUpperCase() ?? "U"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex items-center gap-1.5 min-w-0">
                            <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                              {user.full_name ?? "Unknown User"}
                            </p>

                            {user.is_admin && (
                              <Badge
                                variant="outline"
                                className="h-4 px-1 text-[9px] uppercase font-bold tracking-wider shrink-0"
                              >
                                Admin
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Email */}
                      <TableCell className="py-3 px-3 font-mono text-xs text-foreground truncate max-w-45">
                        {user.email}
                      </TableCell>

                      {/* Plan Badge */}
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant={
                            plan === "pro"
                              ? "default"
                              : plan === "basic"
                              ? "secondary"
                              : "outline"
                          }
                          className="capitalize text-[11px] font-semibold px-2 py-0.5"
                        >
                          {plan}
                        </Badge>
                      </TableCell>

                      {/* Subscription Status */}
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant={
                            subscriptionStatus === "active"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize text-[11px] font-semibold px-2 py-0.5"
                        >
                          {subscriptionStatus}
                        </Badge>
                      </TableCell>

                      {/* Expiry Date */}
                      <TableCell className="py-3 px-3 whitespace-nowrap text-xs text-muted-foreground">
                        {subscription?.expiresAt
                          ? formatDate(subscription.expiresAt)
                          : "—"}
                      </TableCell>

                      {/* Accounts */}
                      <TableCell className="py-3 px-2 text-center font-mono text-xs font-semibold text-foreground">
                        {user.accounts}
                      </TableCell>

                      {/* Trades */}
                      <TableCell className="py-3 px-2 text-center font-mono text-xs font-semibold text-foreground">
                        {user.trades}
                      </TableCell>

                      {/* User Status */}
                      <TableCell className="py-3 px-3">
                        <Badge variant={badgeVariant[user.status]} className="text-[11px] px-2 py-0.5">
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Badge>
                      </TableCell>

                      {/* Last Active */}
                      <TableCell className="py-3 px-3 whitespace-nowrap text-xs text-muted-foreground">
                        {formatDate(user.last_active_at)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-3 px-3 text-right">
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
      </div>

      <UserDetailsDialog
        user={selectedUser}
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open);

          if (!open) {
            router.refresh();
          }
        }}
      />
    </>
  );
}