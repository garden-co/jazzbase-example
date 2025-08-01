import { Chat } from "../schema";
import { SubmissionForm } from "./form";
import "../worker";

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  const chat = await Chat.load(chatId, { resolve: { messages: { $each: true }}});

  return <div className="flex flex-col gap-4 max-w-md mx-auto mt-10">
    <h1>Chat</h1>
    {chat?.messages.map(msg => <div key={msg.id} className="p-2 border bg-muted rounded-md">{msg.text}</div>)}

    <SubmissionForm chatId={chatId}/>
  </div>
}