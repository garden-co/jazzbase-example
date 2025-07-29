import { Chat, Message } from "../schema";
import { co } from "jazz-tools";
import { NextResponse } from "next/server";
import { worker } from "../worker";

export async function POST() {
  const chat = Chat.create({
    messages: co.list(Message).create([]),
  });

  // wait for sync before returning to ensure consistency in
  // fetches right afterwards
  await worker.waitForAllCoValuesSync();

  return NextResponse.json({ chatId: chat.id }, { status: 200 });
}
