import React, { useState } from "react";
import { LuMailPlus } from "react-icons/lu";
import { RiSettings3Fill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { MdGif, MdOutlineEmojiEmotions } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import MessageComponent from "../components/Messages/MessageComponent";
import { IoMdInformationCircleOutline } from "react-icons/io";

function Messages() {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessagesList([...messagesList, { text: message, sender: "user" }]);
      setMessage("");
    }
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
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
            <div>
              <h2 className="font-bold">Username</h2>
              <p>User status or additional information</p>
            </div>
          </div>
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
            {messagesList.map((message, index) => (
              <MessageComponent key={index} text={message.text} sender={message.sender} />
            ))}
          </div>
        </div>
        <div className="flex items-center h-16 p-2 border-t-[1px]">
          <div className="flex items-center space-x-3 h-full">
            <IoImageOutline size="1.5em" className="text-blue-500" />
            <MdGif size="2em" className="text-blue-500" />
            <MdOutlineEmojiEmotions size="1.5em" className="text-blue-500" />
          </div>
          {/* Input area */}
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
            className="ml-3 flex-grow h-full px-4 rounded-lg"
          />
          <button
            className="text-blue-500 rounded-full font-semibold ml-2"
            onClick={handleSendMessage}
          >
            <IoMdSend size="1.5em" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
