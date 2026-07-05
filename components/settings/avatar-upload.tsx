"use client";

import Image from "next/image";
import {
  Camera,
  Loader2,
  Trash2,
} from "lucide-react";
import {
  ChangeEvent,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface AvatarUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function AvatarUpload({
  value,
  onChange,
}: AvatarUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleUpload(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowed.includes(file.type)
    ) {
      toast.error(
        "Only JPG, PNG and WEBP images are allowed."
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Maximum file size is 5MB."
      );
      return;
    }

    setLoading(true);

    try {
      const formData =
        new FormData();

      formData.append("file", file);

      const res = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await res.json();

      if (!data.success) {
        throw new Error(
          data.message
        );
      }

      onChange(data.url);

      toast.success(
        "Profile picture updated."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to upload image."
      );
    } finally {
      setLoading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleUpload}
      />

      <div className="relative">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-border bg-muted">
          {value ? (
            <Image
              src={value}
              alt="Profile"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <Camera className="size-10" />
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
              <Loader2 className="size-6 animate-spin" />
            </div>
          )}
        </div>

        {!loading && (
          <Button
            size="icon"
            type="button"
            className="absolute bottom-1 right-1 h-9 w-9 rounded-full"
            onClick={() =>
              inputRef.current?.click()
            }
          >
            <Camera className="size-4" />
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={loading}
        >
          Change Photo
        </Button>

        {value && (
          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              onChange("")
            }
            disabled={loading}
          >
            <Trash2 className="mr-2 size-4" />
            Remove
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        JPG, PNG or WEBP • Maximum 5 MB
      </p>
    </div>
  );
}