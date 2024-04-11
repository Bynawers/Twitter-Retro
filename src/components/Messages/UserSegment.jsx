// UserItemSegment.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import UserItem from "./UserItem";
import { getSender } from "../../utils/ChatLogics";
import { useChat } from "../../hooks/ChatP";

function UserItemSegment() {
  const { selectedChat, setSelectedChat, chats, setChats } = useChat();
  const auth = useAuth();

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/chat", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchUserItems();
  }, [auth.token, setChats]);

  return (
    <div className="w-5/12 h-full border-r border-gray-300">
      <div className="p-4">
        <div className="flex items-end justify-between">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          {/* Settings icons */}
        </div>
        {/* Map over user items to render UserItem components */}
        {chats.map((userItem, index) => (
          <UserItem
            key={index}
            username={
              !userItem.isGroupChat
                ? getSender(auth.user, userItem.users)
                : userItem.chatName
            }
            lastMessage={
              userItem.latestMessage?.content
                ? userItem.latestMessage.content.length > 50
                  ? userItem.latestMessage.content.substring(0, 51) + "..."
                  : userItem.latestMessage.content
                : ""
            }
            onClick={() => {
              setSelectedChat(userItem);
              console.log(selectedChat);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default UserItemSegment;
