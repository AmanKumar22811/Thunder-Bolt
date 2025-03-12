"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

const ChatView = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userDetail?._id) return;

    const fetchChats = async () => {
      try {
        const { data } = await axios.get(`/api/chat/${userDetail._id}`);
        console.log(data.chats[0].messages);
        const filterData = data.chats[0].messages.filter(
          (message) => message.role === "user"
        );
        setChats(filterData);
      } catch (err) {
        setError("Failed to load chats");
        console.error("Error fetching chats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userDetail]);

  return (
    <div className="p-4 h-[80vh] overflow-y-auto bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Your Chats</h2>

      {loading && <p>Loading chats...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && chats.length === 0 && <p>No chats found</p>}

      <div className="space-y-3">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="p-3 bg-gray-800 rounded-lg cursor-pointer"
          >
            <p className="font-semibold">{chat.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatView;
