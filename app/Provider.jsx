"use client";
import React, { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // Initialize userDetail with localStorage data
  const [userDetail, setUserDetailState] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userDetail");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // Sync localStorage with state whenever userDetail changes
  useEffect(() => {
    if (userDetail) {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
    } else {
      localStorage.removeItem("userDetail");
    }
  }, [userDetail]);

  // Function to update user details
  const setUserDetail = (user) => {
    setUserDetailState(user);
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
