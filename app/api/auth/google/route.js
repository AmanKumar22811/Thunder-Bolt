import { NextResponse } from "next/server";
import { handleGoogleAuth } from "@/controllers/user.controller";

export async function POST(req) {
  try {
    const body = await req.json();
    const user = await handleGoogleAuth(body);

    return NextResponse.json({ message: "User authenticated", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error storing user", error: error.message }, { status: 500 });
  }
}