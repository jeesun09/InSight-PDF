//chat/[chatId]
"use client";
import React, { useEffect, } from "react";;
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
  const { isSignedIn } = useAuth();
  const { chats, fetchChats, loading, error } = useChatsStore() as {
    chats: DrizzleChat[];
    fetchChats: () => void;
    loading: boolean;
    error: string | null;
  };

  useEffect(() => {
    if (isSignedIn && chats.length === 0 && !loading) {
      fetchChats();
    }
  }, [isSignedIn, chats, fetchChats, loading]);

  // Redirect if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);
  // If chats are not found, redirect to home
  if (!chats || chats.length === 0) {
    router.push("/");
    return null;
  }

  return <ChatPage chats={chats} chatId={parseInt(chatId)} />;
};

export default Page;
