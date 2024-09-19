//chat/[chatId]
"use client";
import React from "react";;
import { DrizzleChat } from "@/lib/db/schema";
import ChatPage from "@/components/ChatPage";
import { useChatsStore } from "@/store/useChatsStore";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};

const Page = ({ params: { chatId } }: Props) => {
  const router = useRouter();
  const { chats } = useChatsStore() as { chats: DrizzleChat[] };
  const { isSignedIn } = useAuth();
  if(!isSignedIn) {
    return router.push("/sign-in");
  }
  if(!chats) {
    return router.push("/");
  }

  return <ChatPage chats={chats} chatId={parseInt(chatId)} />;
};

export default Page;
