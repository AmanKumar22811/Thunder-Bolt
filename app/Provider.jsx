"use client";
import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/Header";
import { MessagesContext } from "@/context/MessagesContext";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  return (
    <div>
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
    </div>
  );
};

export default Provider;
