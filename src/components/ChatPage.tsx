"use client";
import React, { useState } from "react";
import { DrizzleChat } from "@/lib/db/schema";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";
import { PanelRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  chatId: number;
  chats: DrizzleChat[];
};

const ChatPage = ({ chatId, chats }: Props) => {
  const router = useRouter();
  const [panelVisible, setPanelVisible] = useState(false);
  const currentChat = chats.find((chat) => chat.id === chatId);

  const deleteChat = async (chatID: number, fileKey: string) => {
    const response = await axios.delete(`/api/delete-chat`, {
      data: { chatID, fileKey },
    });
    toast.success(response.data.message);
    router.push("/");
  };

  return (
    <div className="flex max-h-screen overflow-x-hidden">
      {/* Desktop view */}
      <div className="hidden lg:flex w-full max-h-screen overflow-x-hidden overflow-y-auto">
        <div className="flex-[1] w-[300px]">
          <ChatSideBar chats={chats} chatId={chatId} deleteChat={deleteChat} />
        </div>
        <div className="max-h-screen p-3 overflow-hidden flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        <div className="flex-[3] max-w-md border-l-4 border-l-slate-200">
          <ChatComponent chatId={chatId} />
        </div>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden flex flex-row w-full h-screen overflow-y-auto justify-between">
        {panelVisible ? (
          <div className="h-screen transition-transform duration-500 w-[300px]">
            <ChatSideBar
              chats={chats}
              chatId={chatId}
              deleteChat={deleteChat}
            />
          </div>
        ) : null}

        <div className="flex flex-col w-full h-screen justify-between">
          <div className="flex flex-row gap-1 m-2">
            <button
              onClick={() => setPanelVisible(!panelVisible)}
              className="text-center border rounded-xl p-1"
            >
              <PanelRight />
            </button>
            <h2 className="text-xs w-full text-center border rounded-xl p-1">
              {currentChat?.pdfName}
            </h2>
          </div>
          <div className="flex flex-col p-3 max-w-full">
            <ChatComponent chatId={chatId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
