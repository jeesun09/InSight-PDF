import FileUpload from "@/components/FileUpload";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  let lastChat;
  if (userId) {
    lastChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (lastChat) {
      const i = lastChat.length;
      lastChat = lastChat[i - 1];
    }
  }

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200 flex justify-center items-center dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-950">
        <div className="p-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <h1 className="mr-3 text-2xl text-black dark:text-slate-100 sm:text-4xl md:text-5xl font-semibold">
                Chat with your PDF
              </h1>
              <UserButton afterSwitchSessionUrl="/" />
            </div>
            <div className="flex mt-3 justify-center">
              {isAuth && lastChat && (
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
              {isAuth ? (
                <FileUpload />
              ) : (
                <Link href="/sign-in" className="flex justify-center items-center">
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
    </>
  );
}
