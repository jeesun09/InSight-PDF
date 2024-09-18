"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { chats as _chats } from "@/lib/db/schema";
import { useChatsStore } from "@/store/useChatsStore";
import { useRouter } from "next/navigation";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const router = useRouter();
  const { deleteChat, lastChat } = useChatsStore() as {
    deleteChat: (chatID: number, fileKey: string) => void;
    lastChat: DrizzleChat;
  };
  const handleDeleteChat = (chatID: number, fileKey: string) => {
    deleteChat(chatID, fileKey);
    router.push(`/chat/${lastChat.id}`);
  }

  return (
    <div className="w-full h-screen p-4 text-gray-200 relative bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border mt-1 lg:mt-2">
          {" "}
          <PlusCircle className="mr-2 w-4 h-4" /> New Chat
        </Button>
      </Link>
      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-xs lg:text-sm truncate whitespace-nowrap text-ellipsis ">
                {chat.pdfName}
              </p>
              <Trash2 onClick={() => handleDeleteChat(chat.id, chat.fileKey)} />
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-1 left-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 flex-wrap">
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
