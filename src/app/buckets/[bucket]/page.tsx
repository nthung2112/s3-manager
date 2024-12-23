import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload } from "lucide-react";
import Link from "next/link";
import { listObjects } from "../../actions";
import { ObjectActions } from "./object-actions";
import { UploadDialog } from "./upload-dialog";
import { formatBytes } from "@/lib/utils";

export default async function BucketPage({ params }: { params: { bucket: string } }) {
  const { objects, error } = await listObjects(params.bucket);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            ← Back to buckets
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">{params.bucket}</h2>
        </div>
        <UploadDialog bucket={params.bucket}>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </UploadDialog>
      </div>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {objects?.map((object) => (
                <TableRow key={object.Key}>
                  <TableCell>{object.Key}</TableCell>
                  <TableCell>{formatBytes(object.Size!)}</TableCell>
                  <TableCell>{object.LastModified?.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <ObjectActions bucket={params.bucket} objectKey={object.Key!} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
