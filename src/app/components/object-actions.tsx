"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pencil, MoreVertical, Trash } from "lucide-react";
import { DeleteBucketDialog } from "./delete-bucket-dialog";
import { Bucket } from "@aws-sdk/client-s3";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export function ObjectActions({ bucket }: { bucket: Bucket }) {
  const [dialogMenu, setDialogMenu] = useState<string>("none");

  const handleDialogMenu = () => {
    switch (dialogMenu) {
      case "create":
        return null;
      case "delete":
        return <DeleteBucketDialog bucket={bucket.Name!} onClose={() => setDialogMenu("none")} />;
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setDialogMenu("create")}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem className="text-red-600 cursor-pointer" onSelect={() => setDialogMenu("delete")}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {handleDialogMenu()}
    </Dialog>
  );
}
