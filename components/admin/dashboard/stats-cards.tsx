import {
  Users,
  UserCheck,
  UserX,
  Ban,
  Briefcase,
  ChartCandlestick,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  totalAccounts: number;
  totalTrades: number;
}

const stats = [
  {
    title: "Total Users",
    key: "totalUsers",
    icon: Users,
  },
  {
    title: "Active Users",
    key: "activeUsers",
    icon: UserCheck,
  },
  {
    title: "Inactive Users",
    key: "inactiveUsers",
    icon: UserX,
  },
  {
    title: "Suspended",
    key: "suspendedUsers",
    icon: Ban,
  },
  {
    title: "Accounts",
    key: "totalAccounts",
    icon: Briefcase,
  },
  {
    title: "Trades",
    key: "totalTrades",
    icon: ChartCandlestick,
  },
] as const;

export function StatsCards(props: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>

              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {props[stat.key]}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}