"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const { setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info from Google
        const { data: googleUser } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        // Send user details to backend for authentication
        const { data } = await axios.post("/api/auth/google", {
          googleId: googleUser.sub,
          name: googleUser.name,
          email: googleUser.email,
          picture: googleUser.picture,
        });

        // Store user details in localStorage and update context
        localStorage.setItem("userDetail", JSON.stringify(data.user));
        setUserDetail(data.user);

        closeDialog(false); // Close the dialog after successful login

        // Redirect user to workspace
        router.push(`/workspace/${data.user._id}`);
      } catch (error) {
        console.error("Google login error:", error);
      }
    },
    onError: (errorResponse) =>
      console.log("Google auth error:", errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col justify-center items-center gap-3">
              <h2 className="font-bold text-2xl text-white text-center">
                Continue with Thunder-Bolt
              </h2>
              <p className="mt-2 text-center">
                To use Thunder-Bolt you must log into an existing account or
                create one.
              </p>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer mt-3"
                onClick={googleLogin}
              >
                Sign In with Google
              </Button>
              <p className="text-center">
                By using Thunder-Bolt, you agree to the collection of usage data
                for analytics.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
