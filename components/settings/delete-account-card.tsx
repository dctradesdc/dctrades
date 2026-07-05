"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteAccountCard() {
  const [confirmText, setConfirmText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      // TODO:
      // Call your delete account server action here.
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-destructive/40">
      <CardHeader>
        <CardTitle className="text-destructive">
          Danger Zone
        </CardTitle>

        <CardDescription>
          Permanently delete your account and
          all associated data.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />

            <div className="space-y-2">
              <p className="font-medium">
                Delete Account
              </p>

              <p className="text-sm text-muted-foreground">
                This action cannot be undone.
                Your journals, trades, images,
                analytics, and account
                information will be permanently
                removed.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete your account?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This action is permanent.

                    <br />
                    <br />

                    Type <strong>DELETE</strong>{" "}
                    below to continue.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <Input
                  placeholder="Type DELETE"
                  value={confirmText}
                  onChange={(e) =>
                    setConfirmText(
                      e.target.value
                    )
                  }
                />

                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    disabled={
                      confirmText !==
                        "DELETE" || loading
                    }
                    onClick={handleDelete}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}