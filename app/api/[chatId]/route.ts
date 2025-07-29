import { Chat, Message } from "@/app/schema";
import { NextRequest } from "next/server";
import { worker } from "../../worker";

export async function POST(request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  const { text } = await request.json();

  const chat = await Chat.load(chatId, { resolve: { messages: { $each: true }}});

  chat?.messages.push(Message.create({ text }));

  // wait for sync before returning to ensure consistency in
  // fetches right afterwards
  await worker.waitForAllCoValuesSync();

  return new Response("OK", { status: 200 });
}