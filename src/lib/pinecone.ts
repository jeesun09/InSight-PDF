import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertTOAscii } from "./utils";
import fs from "fs";

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
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("Could not download file from s3");
  }
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];
  // split and segment the pdf into pages
  const documents = await Promise.all(pages.map((page) => prepareDocument(page)));
  // vectorize and embed the pages
  const vectors = await Promise.all(
    documents.flat().map((emb) => embedDocument(emb))
  );
  // upload to pinecone
  const client = await getPineconeClient();
  const pineconeIndex = client.index("insight-pdf");
  const namespace = pineconeIndex.namespace(convertTOAscii(fileKey));
  await namespace.upsert(vectors);
  fs.unlinkSync(file_name);
  return documents[0];
}

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  //split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    };
  } catch (error) {
    console.log("Error embedding Document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const encoder = new TextEncoder();
  return new TextDecoder("utf-8").decode(encoder.encode(str).slice(0, bytes));
};
