import { Pinecone } from "@pinecone-database/pinecone";
// import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertTOAscii } from "./utils";
import fs from "fs";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import pdfParse from "pdf-parse";

let pinecone: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  const fileStream = await downloadFromS3(fileKey);
  if (!fileStream) {
    throw new Error("Could not download file from S3");
  }
  console.log("File downloaded from S3");
  console.log("Downloaded file: ", fileStream);
  
  
  // Convert stream to buffer
  const fileBuffer = await streamToBuffer(fileStream);
  console.log("File buffer: ", fileBuffer);
  
  // Parse the PDF stream
  const pdfData = await pdfParse(fileBuffer);
  console.log("PDF Data: ", pdfData);
  // pdfData.text contains the full text content
  const documents = await prepareDocument(pdfData.text);
  console.log("Documents: ", documents);
  // Vectorize and embed the pages
  const vectors = await Promise.all(documents.map(embedDocument));
  console.log("Vectors: ", vectors);
  
  // Upload to Pinecone
  const client = await getPineconeClient();
  const pineconeIndex = client.index("insight-pdf");
  const namespace = pineconeIndex.namespace(convertTOAscii(fileKey));
  await namespace.upsert(vectors);

  return documents[0];
}

async function embedDocument(doc: Document) {
  const embeddings = await getEmbeddings(doc.pageContent);
  const hash = md5(doc.pageContent);
  return {
    id: hash,
    values: embeddings,
    metadata: {
      text: doc.metadata.text,
    },
  };
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const encoder = new TextEncoder();
  return new TextDecoder("utf-8").decode(encoder.encode(str).slice(0, bytes));
};

async function prepareDocument(pdfText: string) {
  const splitter = new RecursiveCharacterTextSplitter();

  const documents = await splitter.splitDocuments([
    new Document({
      pageContent: pdfText,
      metadata: {
        text: pdfText,
      },
    }),
  ]);

  return documents;
}


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

    if (!response.Body) {
      throw new Error("No content found in S3 response");
    }

    // Return the readable stream
    return response.Body as NodeJS.ReadableStream;
  } catch (error) {
    console.error("Error downloading file:", error);
    return null;
  }
}
// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}



// const file_name = await downloadFromS3(fileKey);
// if (!file_name) {
//   throw new Error("Could not download file from s3");
// }
// const loader = new PDFLoader(file_name);
// const pages = (await loader.load()) as PDFPage[];

// // split and segment the pdf into pages
// const documents = await Promise.all(pages.map((page) => prepareDocument(page)));
// // vectorize and embed the pages
// const vectors = await Promise.all(
//   documents.flat().map((emb) => embedDocument(emb))
// );
// // upload to pinecone
// const client = await getPineconeClient();
// const pineconeIndex = client.index("insight-pdf");
// const namespace = pineconeIndex.namespace(convertTOAscii(fileKey));
// await namespace.upsert(vectors);
// fs.unlinkSync(file_name);
// return documents[0];


// async function prepareDocument(page: PDFPage) {
//   let { pageContent, metadata } = page;
//   pageContent = pageContent.replace(/\n/g, "");
//   //split the docs
//   const splitter = new RecursiveCharacterTextSplitter();
//   const docs = await splitter.splitDocuments([
//     new Document({
//       pageContent,
//       metadata: {
//         pageNumber: metadata.loc.pageNumber,
//         text: truncateStringByBytes(pageContent, 36000),
//       },
//     }),
//   ]);
//   return docs;
// }



// async function embedDocument(doc: Document) {
//   try {
//     const embeddings = await getEmbeddings(doc.pageContent);
//     const hash = md5(doc.pageContent);
//     return {
//       id: hash,
//       values: embeddings,
//       metadata: {
//         text: doc.metadata.text,
//         pageNumber: doc.metadata.pageNumber,
//       },
//     };
//   } catch (error) {
//     console.log("Error embedding Document", error);
//     throw error;
//   }
// }