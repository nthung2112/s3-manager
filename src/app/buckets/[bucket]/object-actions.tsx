"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteObject, getSignedUrl } from "../../actions";

export function ObjectActions({ bucket, objectKey }: { bucket: string; objectKey: string }) {
  const router = useRouter();

  async function onDelete() {
    const result = await deleteObject(bucket, objectKey);
    if (result.success) {
      router.refresh();
    }
  }

  async function onDownload() {
    const result = await getSignedUrl(bucket, objectKey);
    if (!(result.success && result.url)) {
      return;
    }
    const link = document.createElement("a");
    link.href = result.url;
    link.download = objectKey;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
