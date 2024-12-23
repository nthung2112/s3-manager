import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { listBuckets } from "./actions";
import { CreateBucketDialog } from "./components/create-bucket-dialog";
import { DeleteBucketDialog } from "./components/delete-bucket-dialog";

export default async function Home() {
  const { buckets, error } = await listBuckets();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Buckets</h2>
        <CreateBucketDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Bucket
          </Button>
        </CreateBucketDialog>
      </div>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {buckets?.map((bucket) => (
            <Card key={bucket.Name}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/buckets/${bucket.Name}`} className="hover:underline">
                    {bucket.Name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Created: {bucket.CreationDate?.toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <DeleteBucketDialog bucket={bucket.Name!} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}