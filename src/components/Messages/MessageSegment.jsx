import { useState, useEffect, useRef } from "react";
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
import { IoMdInformationCircleOutline } from "react-icons/io";
import twitterConfig from "../../../twitterConfig.json";
import io from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../../animations/typing.json";

var socket, selectedChatCompare;

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

var socket, selectedChatCompare;

function MessageSegment() {
  const { selectedChat, setSelectedChat, notification, setNotification } =
    useChat();
  const [socketConnected, setSocketConnected] = useState(false);
  const { user, token } = useAuth();
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef(null); // Ref for messages container

  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
      console.log("connected");
    });
    socket.on("typing", (chatID) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== chatID
      ) {
        setIsTyping(false);
      }else{
        setIsTyping(true)
      }
      
    });
    socket.on("stop typing", () => setIsTyping(false));
    return () => {
      // Clean up event listeners
      socket.off("connected");
      socket.off("message received");
    };
  }, []);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //toast.info("New message recieved");
      } else {
        console.log("new message recieved", newMessageRecieved.content);

        setMessagesList([...messagesList, newMessageRecieved]);
      }
    });
  }); // Dependency array ensures this effect runs only when selectedChatCompare changes

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
      selectedChatCompare = selectedChat;
      setIsTyping(false)
    }
  }, [selectedChat]);

  useEffect(() => {
    console.log(messagesList.length);
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messagesList]);

  const handleMessageChange = (event) => {
    const newMessage = event.target.value;
    setMessage(newMessage);

    if (!socketConnected || !selectedChat) return;

    // If not already typing, set typing flag and emit typing event
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    // Define timer length and update last typing time
    const timerLength = 3000;
    const lastTypingTime = Date.now();

    // Set up timer to check if user is still typing
    const typingTimer = setTimeout(() => {
      const timeNow = Date.now();
      const timeDiff = timeNow - lastTypingTime;
      // If the time difference exceeds the timer length and user is still typing, emit stop typing event
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);

    // Clean up timer when component unmounts or when message changes
    return () => clearTimeout(typingTimer);
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setMessage("");
        const { data } = await axios.post(
          BASE_URL + "/api/message",
          {
            content: message,
            chatId: selectedChat._id,
          },
          config
        );
        //console.log("data", data);
        socket.emit("new message", data);
        setMessagesList([...messagesList, data]);
      } catch (error) {
        console.log(error);
        toast.error("Error sending message");
      }
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

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:3001/api/message/${selectedChat._id}`,
        config
      );
      setMessagesList(response.data);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="flex flex-col w-3/4 h-full border-r-[1px]">
      {selectedChat ? (
        <>
          {/* Chat section */}
          <div className="flex justify-between items-center min-h-16 px-4 border-b-[1px]">
            <h1 className="text-xl font-bold">
              {selectedChat && !selectedChat.isGroupChat
                ? getSender(user, selectedChat.users)
                : selectedChat && selectedChat.chatName}
            </h1>
            <div>
              <IoMdInformationCircleOutline
                size="1.5em"
                className="text-blue-500"
                style={{ marginBottom: "0.3em" }}
              />
            </div>
          </div>
          <div
            className="flex flex-col-reverse flex-grow overflow-y-auto"
            ref={messagesContainerRef}
          >
            {/* Messages container */}
            <div className="flex flex-col gap-2 p-4">
              {messagesList.map((message, index) => {
                const sameUser = isSameUser(message, user._id);
                const senderName = sameUser ? "user" : "other";
                // console.log(senderName);
                return (
                  <MessageComponent
                    key={index}
                    text={message.content}
                    sender={senderName}
                  />
                );
              })}
            </div>
          </div>
          {istyping ? (
            <div className="h-6 w-12 ml-3 mb-3">
              <Lottie animationData={animationData} />{" "}
            </div>
          ) : null}

          <div className="flex items-center min-h-14 p-2 border-t-[1px]">
            <div className="flex items-center space-x-3 h-full">
              <IoImageOutline size="1.5em" className="text-blue-500" />
              <MdGif size="2em" className="text-blue-500" />
              <MdOutlineEmojiEmotions
                size="1.5em"
                className="text-blue-500"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            </div>
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
          <h1 className="text-2xl font-bold">
            Select a chat to start messaging
          </h1>
        </div>
      )}
    </div>
  );
}

export default MessageSegment;
