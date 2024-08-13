//api/delete-chat
import { db } from "@/lib/db";
import { chats, messages } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getPineconeClient } from "@/lib/pinecone";
import { convertTOAscii } from "@/lib/utils";

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { chatID, fileKey } = await req.json();

    // Delete pinecone namespace
    const client = await getPineconeClient();
    const pineconeIndex = client.index("insight-pdf");
    const namespace = pineconeIndex.namespace(convertTOAscii(fileKey));
    await namespace.deleteAll();

    // Delete chat
    await db.delete(messages).where(eq(messages.chatId, chatID));
    await db.delete(chats).where(eq(chats.id, chatID));
    return NextResponse.json({ message: "Chat deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting chat" }, { status: 500 });
  }
}
