import { co, z } from "jazz-tools";

const Message = co.map({
  text: z.string(),
});

const Chat = co.map({
  messages: co.list(Message),
});

export { Chat, Message };
