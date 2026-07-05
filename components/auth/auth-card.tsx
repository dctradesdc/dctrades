"use client";

import { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <Card className="mx-auto w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {children}

        {footer && (
          <div className="border-t pt-6">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}