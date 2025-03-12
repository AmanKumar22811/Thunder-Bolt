import { connectDB } from "@/lib/mongoDB";
import { Chat } from "@/models/chat.model";

export async function GET(req, { params }) {
  const { userId } = await params;
  console.log(userId);
  console.log(userId);
  try {
    await connectDB();
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ chats }), { status: 200 });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
