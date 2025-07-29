"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SubmissionForm({ chatId }: { chatId: string }) {
  const router = useRouter();

  const [text, setText] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(text);

    await fetch(`/api/${chatId}`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    setText("");

    router.refresh();
  }

  return <form onSubmit={handleSubmit} className="flex gap-2">
    <Input type="text" value={text} onChange={e => setText(e.target.value)} />
    <Button type="submit">Submit</Button>
  </form>
}