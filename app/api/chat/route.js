import { NextResponse } from "next/server";
import {
  saveUserMessage,
  saveAssistantResponse,
  getChatHistory,
} from "@/controllers/chat.controller";

export const POST = async (req) => {
  try {
    const { userId, prompt } = await req.json();

    const chat = await saveUserMessage(userId, prompt);

    // Simulating an AI response (Replace with your AI logic)
    const aiResponse = `AI Response to: ${prompt}`;

    await saveAssistantResponse(userId, aiResponse);

    return NextResponse.json({ message: "Chat saved", chat }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing chat", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const chatHistory = await getChatHistory(userId);

    return NextResponse.json({ chatHistory }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching chat", error: error.message },
      { status: 500 }
    );
  }
};
