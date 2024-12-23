"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBucket } from "../actions";

export function DeleteBucketDialog({ bucket }: { bucket: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function onDelete() {
    const result = await deleteBucket(bucket);
    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Bucket</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the bucket "{bucket}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
