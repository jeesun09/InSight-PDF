import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });
    const result = response;
    return result.data[0].embedding as number[];
  } catch (error) {
    throw new Error("Error in getEmbeddings");
  }
}
