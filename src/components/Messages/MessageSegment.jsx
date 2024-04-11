import { useState,useEffect } from "react";
import MessageComponent from "./MessageComponent";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { MdGif, MdOutlineEmojiEmotions } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import { useChat } from "../../hooks/ChatP";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";
import { getSender, getSenderFull } from "../../utils/ChatLogics";
import { ToastContainer, toast } from "react-toastify";
import { isSameUser } from "../../utils/ChatLogics";

function MessageSegment() {
    const {selectedChat} = useChat(); 
    const {user, token} = useAuth();
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const sendMessage = async (event) => {
    if (message.trim() !== "") {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setMessage("");
        const { data } = await axios.post(
          "http://localhost:3001/api/message",
          {
            content: message,
            chatId: selectedChat._id,
          },
          config
        );
        setMessagesList([...messagesList, data]);
      } catch (error) {
      console.log(error);
      toast.error("Error sending message");
      }
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessagesList([...messagesList, { text: message, sender: "user" }]);
      setMessage("");
    }
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      console.log("Selected Chat:", selectedChat._id);
      const response = await axios.get(
        `http://localhost:3001/api/message/${selectedChat._id}`,
        config
      );
      setMessagesList([]); // Clear the messages list
      setMessagesList(response.data); // Set the new messages
      console.log("Messages:", response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  
  

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
     sendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  return (
    <div className="flex flex-col w-3/4 h-full">
       {selectedChat ? (
        <>
        
      {/* Chat section */}
      <div className="flex justify-between items-center min-h-20 px-4 border-b-[1px]">
      <h1 className="text-xl font-bold">
  {selectedChat && !selectedChat.isGroupChat
    ? getSender(user, selectedChat.users)
    : selectedChat && selectedChat.chatName}
</h1>

        {/* Info icons */}
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Messages container */}
        <div className="flex flex-col gap-2 p-4">
        {messagesList.map((message, index) => {
  // Determine if the current message has the same sender as the previous one
  const sameUser = index > 0 && isSameUser(messagesList, message, index);
  // Determine the sender name to pass to MessageComponent
  const senderName = sameUser ? "user" : message.sender;
  return (
    <MessageComponent
      key={index}
      text={message.content}
      sender={senderName}
      sameUser={sameUser}
    />
  );
})}
        
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
          onClick={sendMessage}
        >
          <IoMdSend size="1.5em" />
        </button>
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-2">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </>
       ) : (  
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Select a chat to start messaging</h1>
        </div>
      )}
    </div>
  );
}

export default MessageSegment;
