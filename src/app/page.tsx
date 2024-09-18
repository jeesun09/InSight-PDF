"use client";
import FileUpload from "@/components/FileUpload";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Footer from "@/components/Footer";
import { useChatsStore } from "@/store/useChatsStore";
import { useEffect } from "react";
import { DrizzleChat } from "@/lib/db/schema";

interface ChatsStore {
  fetchChats: () => void;
  chats: DrizzleChat[];
  lastChat: DrizzleChat;
}

export default function Home() {
  const { isSignedIn } = useAuth();
  const { fetchChats, lastChat } = useChatsStore() as ChatsStore;

  useEffect(() => {
    if (isSignedIn) {
      fetchChats();
    }
  }, [isSignedIn]);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200 flex justify-center items-center dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-950">
        <div className="p-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <h1 className="mr-3 text-2xl text-black dark:text-slate-100 sm:text-4xl md:text-5xl font-semibold">
                Chat with your PDF
              </h1>
              <UserButton afterSwitchSessionUrl="/" />
            </div>
            <div className="flex mt-3 justify-center">
              {isSignedIn && lastChat && (
                <>
                  <Link href={`/chat/${lastChat.id}`}>
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="button"
                      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    >
                      <span>Go to Chats</span>
                      <ArrowRight className="ml-2" />
                    </HoverBorderGradient>
                  </Link>
                </>
              )}
            </div>
            <p className="max-w-lg mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              Unlock the power of your PDFs with InSight PDF, an AI-driven
              platform that lets you interact with your documents effortlessly.
              Get insights and answers from your PDFs like never before.
            </p>
            <div className="w-full mt-4">
              {isSignedIn ? (
                <FileUpload />
              ) : (
                <Link
                  href="/sign-in"
                  className="flex justify-center items-center"
                >
                  <HoverBorderGradient
                    containerClassName="rounded-xl"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                    Login to get start! <LogIn className="w-4 h-4 ml-2" />
                  </HoverBorderGradient>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
