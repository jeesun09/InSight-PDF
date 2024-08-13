import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

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
    <div className="w-screen min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200 flex justify-center items-center">
      <div className="p-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center">
            <h1 className="mr-3 text-2xl sm:text-4xl md:text-5xl font-semibold">
              Chat with your PDF
            </h1>
            <UserButton afterSwitchSessionUrl="/" />
          </div>
          <div className="flex mt-3 justify-center">
            {isAuth && lastChat && (
              <>
                <Link href={`/chat/${lastChat.id}`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>
          <p className="max-w-lg mt-4 text-base sm:text-lg text-slate-600">
            Unlock the Power of Your PDFs with AI-Driven Insights
          </p>
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get start! <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
