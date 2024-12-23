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
import { uploadObject } from "../../actions";

export function UploadDialog({ children, bucket }: { children: React.ReactNode; bucket: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const result = await uploadObject(bucket, formData);
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
          <DialogTitle>Upload file</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Select file</Label>
            <Input id="file" name="file" type="file" required />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit">Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
