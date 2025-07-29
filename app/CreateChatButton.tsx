"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CreateChatButton() {
  const router = useRouter();

  return <Button onClick={async () => {
    const response = await fetch("/api", {
      method: "POST",
    });

    const { chatId } = await response.json();
    router.push(`/${chatId}`);
  }}>Create Chat</Button>;
}
