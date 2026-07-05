"use client";

import { useState } from "react";
import {
  Loader2,
  Pencil,
  Save,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { updateProfile } from "@/features/profile/actions";

import { AvatarUpload } from "./avatar-upload";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileCardProps {
  name?: string;
  email?: string;
  avatar?: string;
}

export function ProfileCard({
  name = "",
  email = "",
  avatar = "",
}: ProfileCardProps) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [fullName, setFullName] =
    useState(name);

  const [avatarUrl, setAvatarUrl] =
    useState(avatar);

  const [saving, setSaving] =
    useState(false);

  function handleCancel() {
    setFullName(name);
    setAvatarUrl(avatar);
    setIsEditing(false);
  }

  async function handleSave() {
    if (!fullName.trim()) {
      toast.error(
        "Please enter your full name."
      );
      return;
    }

    setSaving(true);

    try {
      const result =
        await updateProfile({
          name: fullName.trim(),
          avatar: avatarUrl,
        });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>

        <CardDescription>
          Manage your profile information.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!isEditing ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl} />

              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Full Name
                </p>

                <p className="font-semibold">
                  {fullName || "Not set"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium">
                  {email}
                </p>
              </div>
            </div>

            <Button
              onClick={() =>
                setIsEditing(true)
              }
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <div className="flex justify-center lg:justify-start">
              <AvatarUpload
                value={avatarUrl}
                onChange={setAvatarUrl}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name
                </Label>

                <Input
                  id="name"
                  value={fullName}
                  placeholder="John Doe"
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address
                </Label>

                <Input
                  id="email"
                  value={email}
                  disabled
                />

                <p className="text-xs text-muted-foreground">
                  Email addresses cannot
                  be changed.
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t pt-6">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="min-w-40"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}