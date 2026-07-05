"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function AlertDialog({
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Root
>) {
  return (
    <AlertDialogPrimitive.Root
      data-slot="alert-dialog"
      {...props}
    />
  );
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Trigger
>) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Portal
>) {
  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      {...props}
    />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Overlay
>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Content
>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />

      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-6 shadow-xl",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>) {
  return (
    <AlertDialogPrimitive.Title
      className={cn(
        "text-lg font-semibold",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>) {
  return (
    <AlertDialogPrimitive.Description
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        buttonVariants(),
        className
      )}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        className
      )}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};