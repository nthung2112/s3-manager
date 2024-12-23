"use server";

import {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
  GetObjectCommand,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl as getSignedUrlS3 } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function listBuckets() {
  try {
    const command = new ListBucketsCommand({});
    const response = await s3.send(command);
    return { success: true, buckets: response.Buckets || [] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function createBucket(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const command = new CreateBucketCommand({
      Bucket: name,
    });
    await s3.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function listObjects(bucket: string) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
    });
    const response = await s3.send(command);
    return { success: true, objects: response.Contents || [] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteObject(bucket: string, key: string) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    await s3.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function uploadObject(bucket: string, formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: file.name,
      Body: Buffer.from(await file.arrayBuffer()),
    });
    await s3.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getSignedUrl(bucket: string, key: string) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    const url = await getSignedUrlS3(s3, command, { expiresIn: 3600 })
    return { success: true, url };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteBucket(bucket: string) {
  try {
    const command = new DeleteBucketCommand({
      Bucket: bucket,
    })
    await s3.send(command)
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}