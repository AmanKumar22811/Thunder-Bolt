import { connectDB } from "@/lib/mongoDB";
import { User } from "@/models/user.model";

export const handleGoogleAuth = async ({ googleId, name, email, picture }) => {
  await connectDB();

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({ googleId, name, email, picture });
  }

  return user;
};

export const getUserByEmail = async (email) => {
  await connectDB();
  return await User.findOne({ email });
};
