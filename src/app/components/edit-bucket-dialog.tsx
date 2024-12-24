"use client";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBucket, updateBucket } from "../actions";

interface CreateBucketDialogProps {
  onClose: () => void;
  mode?: "create" | "edit";
  bucket?: string;
}

export function EditBucketDialog({
  onClose,
  mode = "create",
  bucket = "",
}: CreateBucketDialogProps) {
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const result =
      mode === "create"
        ? await createBucket(formData)
        : await updateBucket(bucket, formData.get("name") as string);

    if (result.success) {
      onClose();
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "Create new bucket" : "Edit bucket name"}</DialogTitle>
      </DialogHeader>
      <form action={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Bucket name</Label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={bucket}
            placeholder={mode === "create" ? "my-new-bucket" : ""}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit">{mode === "create" ? "Create bucket" : "Save changes"}</Button>
      </form>
    </DialogContent>
  );
}
