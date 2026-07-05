import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SupportCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Support
        </CardTitle>

        <CardDescription>
          Need help? Contact our support team.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium">
            Email
          </p>

          <p className="text-sm text-muted-foreground">
            support@dctrades.in
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">
            Website
          </p>

          <p className="text-sm text-muted-foreground">
            https://dctrades.in
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">
            Response Time
          </p>

          <p className="text-sm text-muted-foreground">
            Within 24–48 hours
          </p>
        </div>
      </CardContent>
    </Card>
  );
}