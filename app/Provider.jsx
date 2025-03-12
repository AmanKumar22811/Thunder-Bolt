"use client";
import React, { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [userDetail, setUserDetailState] = useState(null);

  // Load user details from localStorage only on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userDetail");
      if (storedUser) {
        setUserDetailState(JSON.parse(storedUser));
      }
    }
  }, []); // ✅ Runs once on mount

  // Sync localStorage with userDetail ONLY when it actually changes
  useEffect(() => {
    if (userDetail) {
      const storedUser = localStorage.getItem("userDetail");
      if (storedUser !== JSON.stringify(userDetail)) {
        localStorage.setItem("userDetail", JSON.stringify(userDetail));
      }
    }
  }, [userDetail]); // ✅ Prevents unnecessary updates

  // Function to update user details safely
  const setUserDetail = (user) => {
    setUserDetailState((prev) =>
      JSON.stringify(prev) !== JSON.stringify(user) ? user : prev
    );
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
    >
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </NextThemesProvider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
