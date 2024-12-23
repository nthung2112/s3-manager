"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBucket } from "../actions";

export function CreateBucketDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const result = await createBucket(formData);
    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new bucket</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Bucket name</Label>
            <Input id="name" name="name" required />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit">Create bucket</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
