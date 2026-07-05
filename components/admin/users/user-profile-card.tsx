import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Props {
  user: {
    full_name: string | null;
    email: string;
    avatar_url: string | null;
    status: "active" | "inactive" | "suspended";
    is_admin: boolean;
    accounts: number;
    trades: number;
    created_at: string;
    last_active_at: string | null;
  };
}

const badgeVariant = {
  active: "default",
  inactive: "secondary",
  suspended: "destructive",
} as const;

function formatDate(
  date: string | null
) {
  if (!date) return "-";

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(new Date(date));
}

export function UserProfileCard({
  user,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={
                  user.avatar_url ??
                  undefined
                }
              />

              <AvatarFallback className="text-xl">
                {user.full_name?.charAt(
                  0
                ) ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {user.full_name}
              </h1>

              <p className="text-muted-foreground">
                {user.email}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={
                    badgeVariant[
                      user.status
                    ]
                  }
                >
                  {user.status}
                </Badge>

                {user.is_admin && (
                  <Badge variant="outline">
                    Admin
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:min-w-70">
            <Stat
              label="Accounts"
              value={user.accounts}
            />

            <Stat
              label="Trades"
              value={user.trades}
            />

            <Stat
              label="Joined"
              value={formatDate(
                user.created_at
              )}
            />

            <Stat
              label="Last Active"
              value={formatDate(
                user.last_active_at
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}