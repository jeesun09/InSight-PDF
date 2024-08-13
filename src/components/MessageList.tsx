import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";
import Markdown from "react-markdown";

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4 py-1 whitespace-pre-wrap">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md right-1 ring-gray-900/10",
                {
                  "bg-blue-600 text-white": message.role === "user",
                }
              )}
            >
              <Markdown>{message.content}</Markdown>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
