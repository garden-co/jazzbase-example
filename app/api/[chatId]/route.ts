import { Chat, Message } from "@/app/schema";
import { NextRequest } from "next/server";
import { waitUntil } from "@vercel/functions";
import { worker } from "../../worker";

export async function POST(request: NextRequest, { params }: { params: { chatId: string } }) {
  const { chatId } = params;
  const { text } = await request.json();

  const chat = await Chat.load(chatId, { resolve: { messages: { $each: true }}});

  chat?.messages.push(Message.create({ text }));

  await worker.waitForAllCoValuesSync();

  return new Response("OK", { status: 200 });
}