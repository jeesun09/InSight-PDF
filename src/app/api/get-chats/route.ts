export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { chats } from "@/lib/db/schema";
import { log } from "console";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const _chats = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));
    return NextResponse.json(_chats);
  } catch (error) {
    log("Error fetching chats", error);
    return NextResponse.json(
      { error: "Error fetching chats" },
      { status: 500 }
    );
  }
}
