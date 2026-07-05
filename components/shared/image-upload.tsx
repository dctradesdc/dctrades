"use client";

import Image from "next/image";
import { Loader2, Trash2, Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({
  label,
  value,
  onChange,
}: ImageUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  async function upload(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">
        {label}
      </p>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={upload}
      />

      {value ? (
        <div className="relative overflow-hidden rounded-xl border">
          <Image
            src={value}
            alt={label}
            width={600}
            height={400}
            className="aspect-video w-full object-cover"
          />

          <div className="absolute right-3 top-3 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
            >
              <Upload className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              type="button"
              onClick={() =>
                onChange("")
              }
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border-2 border-dashed transition hover:border-primary"
        >
          {loading ? (
            <Loader2 className="size-8 animate-spin" />
          ) : (
            <>
              <Upload className="mb-3 size-8" />

              <p className="font-medium">
                Upload Image
              </p>

              <p className="text-sm text-muted-foreground">
                Click to upload
              </p>
            </>
          )}
        </button>
      )}
    </div>
  );
}