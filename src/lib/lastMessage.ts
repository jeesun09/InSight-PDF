import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "./db";
import { chats } from "./db/schema";
import { eq } from "drizzle-orm";

export async function lastmassage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  let lastchat;
  if (userId) {
    lastchat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (lastchat) {
      const i = lastchat.length;
      lastchat = lastchat[i - 1];
    }
  }
  return lastchat;
}
