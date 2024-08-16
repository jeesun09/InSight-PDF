//Download a file from S3 using the AWS SDK v3
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

export async function downloadFromS3(file_key: string) {
  try {
    const s3 = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };
    const command = new GetObjectCommand(params);
    const response = await s3.send(command);
    const tmpDir = "/tmp";
    const file_name = path.join(tmpDir, `pdf-${Date.now()}.pdf`);

    // Create write stream and pipe the response body to the file
    const writeStream = fs.createWriteStream(file_name);
    const readableStream = response.Body as NodeJS.ReadableStream;
    readableStream.pipe(writeStream);

    // Wait for the file to finish writing
    await new Promise<void>((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    return file_name;
  } catch (error) {
    console.log("Error downloading file", error);
    return null;
  }
}
