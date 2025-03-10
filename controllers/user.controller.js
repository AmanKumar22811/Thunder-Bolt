import { connectDB } from "@/lib/mongoDB";
import { User } from "@/models/user.model";

export async function handleGoogleAuth({ googleId, name, email, picture }) {
  await connectDB();

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({ googleId, name, email, picture });
  }

  return user;
}
