"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Message, useChat } from "ai/react";
import { Button } from "./ui/button";
import { Loader2, Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });
  const { input, handleInputChange, handleSubmit, messages, isLoading } =
    useChat({
      api: "/api/chat",
      body: {
        chatId,
      },
      initialMessages: data || [],
    });
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div
      className="relative max-h-screen overflow-x-hidden overflow-y-auto"
      id="message-container"
    >
      <div className="sticky top-0 inset-x-0 bg-white dark:bg-slate-900 h-fit">
        <h3 className="text-xl m-1 dark:text-slate-100">Chat</h3>
      </div>
      {/* Chat messages */}
      <MessageList messages={messages} />
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-1 lg:px-2 bg-white dark:bg-slate-900"
      >
        <div className="flex py-1 gap-1">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full"
          />
          <Button className="bg-blue-600">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
