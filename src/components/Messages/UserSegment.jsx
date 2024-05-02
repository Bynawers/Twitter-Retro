import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import UserItem from "./UserItem";
import { useChat } from "../../hooks/ChatP";
import { RiSettings3Fill } from "react-icons/ri";
import { LuMailPlus } from "react-icons/lu";
import GroupChatModal from "../modal/GroupChatModal";
import { getChat } from "../../services/RequestMessages";

function UserItemSegment() {
  const { selectedChat, setSelectedChat, chats, setChats } = useChat();
  const auth = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchUserItems = async () => {
      setChats(await getChat());
    };

    fetchUserItems();
  }, [auth.token, setChats]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="w-5/12 h-screen border-r border-gray-300 overflow-hidden">
      <div className="flex items-end justify-between p-4">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="flex items-end mb-4">
          <div className="cursor-pointer items-center space-x-1 rounded-full font-san transition-all duration-20">
            <RiSettings3Fill
              size="1.5em"
              className="text-blue-500"
              style={{ marginRight: "1em" }}
            />
          </div>
          <div onClick={openModal}>
            <LuMailPlus size="1.5em" className="text-blue-500 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-screen">
        {/* Map over user items to render UserItem components */}
        {chats.map((userItem, index) => (
          <UserItem
            item={userItem}
            selected={selectedChat && selectedChat._id === userItem._id}
            key={index}
            time="testo"
            onClick={() => {
              setSelectedChat(userItem);
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <GroupChatModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
}

export default UserItemSegment;
