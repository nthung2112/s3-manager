"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBucket } from "../actions";

export function DeleteBucketDialog({ bucket, onClose }: { bucket: string; onClose: () => void }) {
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function onDelete() {
    const result = await deleteBucket(bucket);
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
        <DialogTitle>Delete Bucket</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the bucket &quot;{bucket}&quot;? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <DialogFooter>
        <Button variant="outline" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
