import { connectDB } from "@/lib/mongoDB";
import { Chat } from "@/models/chat.model";

export const saveUserMessage = async (userId, prompt) => {
  await connectDB();

  let chat = await Chat.findOne({ userId });

  if (!chat) {
    chat = new Chat({ userId, messages: [] });
  }

  chat.messages.push({ role: "user", content: prompt });
  await chat.save();

  return chat;
};

export const saveAssistantResponse = async (userId, response) => {
  await connectDB();

  let chat = await Chat.findOne({ userId });

  if (!chat) return null; // User should have sent a message first

  chat.messages.push({ role: "assistant", content: response });
  await chat.save();

  return chat;
};

export const getChatHistory = async (userId) => {
  await connectDB();

  const chat = await Chat.findOne({ userId }).populate("userId");

  return chat ? chat.messages : [];
};
