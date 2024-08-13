import { Pinecone } from "@pinecone-database/pinecone";
import { convertTOAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbedding(
  embeddings: number[],
  fileKey: string
) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
  const index = await pinecone.index("insight-pdf");
  try {
    const namespace = convertTOAscii(fileKey);
    const queryResult = await index.namespace(`${namespace}`).query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    throw new Error("Error getting matches from embedding");
  }
}

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbedding(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );
  if (qualifyingDocs.length === 0) {
    let maxScoreDoc = matches.reduce(
      (max, match) =>
        match.score && match.score > (max.score as number) ? match : max,
      matches[0] as (typeof matches)[0]
    );
    qualifyingDocs.push(maxScoreDoc);
  }

  type Metadata = {
    text: string;
    pageNumber: number;
  };
  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);

  return docs.join("\n").substring(0, 3000);
}
