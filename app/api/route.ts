import { Chat, Message } from "../schema";
import { co } from "jazz-tools";
import { waitUntil } from "@vercel/functions";
import { NextResponse } from "next/server";
import { worker } from "../worker";

export async function POST() {
  const chat = Chat.create({
    messages: co.list(Message).create([]),
  });

  waitUntil(worker.waitForAllCoValuesSync());

  return NextResponse.json({ chatId: chat.id }, { status: 200 });
}
