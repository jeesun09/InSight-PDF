//chat/[chatId]
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { chats } from "@/lib/db/schema";
import ChatPage from "@/components/ChatPage";

type Props = {
  params: {
    chatId: string;
  };
};

const Page = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }

  return <ChatPage chats={_chats} chatId={parseInt(chatId)} />;
};

export default Page;
