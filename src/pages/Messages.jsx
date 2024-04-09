import React, { useState, useEffect } from "react";
import { LuMailPlus } from "react-icons/lu";
import { RiSettings3Fill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { MdGif, MdOutlineEmojiEmotions } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import MessageComponent from "../components/Messages/MessageComponent";
import { IoMdInformationCircleOutline } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import UserItem from "../components/Messages/UserItem";
import axios from "axios"; // Import Axios for making HTTP requests
import { useAuth } from "../hooks/AuthProvider"; // Import useAuth hook to access auth context
import { getSender } from "../utils/ChatLogics";
import { useChat} from "../hooks/ChatP";


function Messages() {
  const { selectedChat, setSelectedChat,  chats, setChats } = useChat();
  const auth = useAuth();
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    console.log(auth.user._id);
    console.log(auth.token);
    // Fetch user items when component mounts
    fetchUserItems();
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  // Function to fetch user items
  const fetchUserItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/chat", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }); // Make GET request to fetch user items
      setChats(response.data); // Update user items state with response data
    } catch (error) {
      console.error("Error fetching user items:", error);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessagesList([...messagesList, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  return (
    <div className="flex w-full h-full">
      {/* User section */}
      <div className="w-5/12 h-full border-r border-gray-300">
        <div className="p-4">
          <div className="flex items-end justify-between">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="flex items-end mb-4">
              <div className="cursor-pointer items-center space-x-1 rounded-full font-san transition-all duration-20">
                <RiSettings3Fill
                  size="1.5em"
                  className="text-blue-500"
                  style={{ marginRight: "1em" }}
                />
              </div>
              <div>
                <LuMailPlus size="1.5em" className="text-blue-500" />
              </div>
            </div>
          </div>
          {/* Map over user items to render UserItem components */}
          {chats.map((userItem, index) => (

            console.log(userItem),
              // Log user item to console
              <UserItem
              key={index}
              username={!userItem.isGroupChat
                ? getSender(auth.user, userItem.users)
                : userItem.chatName}
              lastMessage={userItem.latestMessage?.content
                ? userItem.latestMessage.content.length > 50
                  ? userItem.latestMessage.content.substring(0, 51) + "..."
                  : userItem.latestMessage.content
                : ''}
                onClick={() => {
                  setSelectedChat(userItem);
                  console.log("Selected Chat:", userItem);
                }}
            />
            ))}
            {/* Additional users*/}
        </div>
      </div>
      {/* Chat section */}
      <div className="flex flex-col w-3/4 h-full">
        <div className="flex justify-between items-center min-h-20 px-4 border-b-[1px]">
          <h1 className="text-xl font-bold">Username</h1>
          <div>
            <IoMdInformationCircleOutline
              size="1.5em"
              className="text-blue-500"
              style={{ marginBottom: "0.3em" }}
            />
          </div>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
          {/* Messages container */}
          <div className="flex flex-col gap-2 p-4">
            <MessageComponent text="Hello" sender="sender" />
            {messagesList.map((message, index) => (
              <MessageComponent
                key={index}
                text={message.text}
                sender={message.sender}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center h-16 p-2 border-t-[1px]">
          <div className="flex items-center space-x-3 h-full">
            <IoImageOutline size="1.5em" className="text-blue-500" />
            <MdGif size="2em" className="text-blue-500" />
            <MdOutlineEmojiEmotions
              size="1.5em"
              className="text-blue-500"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
          </div>
          {/* Input area */}
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            className="ml-3 flex-grow h-full px-4 rounded-lg border-2 border-gray-300"
          />
          <button
            className="text-blue-500 rounded-full font-semibold ml-2"
            onClick={handleSendMessage}
          >
            <IoMdSend size="1.5em" />
          </button>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-2">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
