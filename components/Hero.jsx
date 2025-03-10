"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";

const Hero = () => {
  const suggesstions = [
    "Create TODO App in React",
    "Create Budget Track App",
    "Create Gym Management Portal Dashboard",
    "Create VITE app",
    "Create Login Signup Screen",
  ];

  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);

  const onGenerate = (input) => {
    setMessages({
      role: "user",
      content: input,
    });
  };
  return (
    <div className="flex flex-col items-center mt-15 gap-2">
      <h2 className="font-bold text-4xl">What do you want to build?</h2>
      <p className="text-gray-400 font-medium ">
        Prompt,run,edit,and deploy full-stack web apps
      </p>
      <div className="p-5 border rounded-xl max-w-2xl w-full mt-3 border-l-cyan-400 border-t-cyan-400">
        <div className="flex gap-2">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter the prompt here. . ."
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight
              className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
              onClick={() => onGenerate(userInput)}
            />
          )}
        </div>

        <div>
          <Link className="h-5 w-5" />
        </div>

        <div className="flex mt-8 flex-wrap max-w-2xl gap-3 items-center justify-center ">
          {suggesstions.map((suggestion, index) => (
            <h2
              key={index}
              onClick={() => onGenerate(suggestion)}
              className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
            >
              {suggestion}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
