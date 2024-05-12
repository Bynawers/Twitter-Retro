import { useState, useEffect, useRef } from "react";
import MessageComponent from "./MessageComponent";
import EmojiPicker from "emoji-picker-react";
import { MdGif, MdOutlineEmojiEmotions } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import { useChat } from "../../hooks/ChatP";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";
import { getSender, getSenderFull } from "../../utils/ChatLogics";
import { ToastContainer, toast } from "react-toastify";
import { isSameUser } from "../../utils/ChatLogics";
import twitterConfig from "../../../twitterConfig.json";
import io from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../../animations/typing.json";
import { getMessages, sendMessage } from "../../services/RequestMessages";
import IconButton from "../button/IconButton";
import { useNavigate } from "react-router-dom";
import InfoGroupModal from "../modal/InfoGroupModal";

var socket, selectedChatCompare;

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

function MessageSegment() {
  const navigate = useNavigate();
  const { selectedChat, setSelectedChat, notification, setNotification } =
    useChat();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const { user, token } = useAuth();
  const [userChat, setUserChat] = useState(null);
  const [chatName, setChatName] = useState("");
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
    });
    socket.on("typing", (chatID) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== chatID
      ) {
        setIsTyping(false);
      } else {
        setIsTyping(true);
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
        setMessagesList([...messagesList, newMessageRecieved]);
      }
    });
  });

  useEffect(() => {
    if (!selectedChat) {
      return;
    }

    const fetchData = async () => {
      if (selectedChat.isGroupChat) {
        setChatName(selectedChat.chatName);
      } else {
        const userChatTmp = await getSender(user, selectedChat.users);

        setChatName(userChatTmp.fullName);
        setUserChat(userChatTmp);
      }
    };
    fetchData();

    fetchMessages();
    selectedChatCompare = selectedChat;
    setIsTyping(false);
  }, [selectedChat]);

  useEffect(() => {
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

  const sendMessageHandler = async () => {
    if (message.trim() !== "") {
      socket.emit("stop typing", selectedChat._id);
      const data = await sendMessage(message, selectedChat._id);
      socket.emit("new message", data);
      setMessage("");
      setMessagesList([...messagesList, data]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessageHandler();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    const config = {
      headers: {
        Auth: token,
      },
    };
    const response = await axios.get(
      BASE_URL + `/api/message/${selectedChat._id}`,
      config
    );
    setMessagesList(response.data);

    setMessagesList(await getMessages(selectedChat._id));

    socket.emit("join chat", selectedChat._id);
  };

  const handleInfo = () => {
    if (selectedChat.isGroupChat) {
      setModalInfoOpen(true);
    } else {
      navigate("/" + userChat.tag);
    }
  };

  const handleChatNameChange = (value) => {
    setChatName(value);
  };

  return (
    <div className="flex flex-col w-3/4 h-full border-r-[1px]">
      {selectedChat ? (
        <>
          {/* Chat section */}
          <div className="flex justify-between items-center min-h-16 px-4 border-b-[1px]">
            <h1 className="text-xl font-bold">{chatName}</h1>
            <div>
              <IconButton
                name="info"
                event={() => handleInfo()}
                colorHover={"#54b3f3"}
                backgroundHover={"#e9f6fd"}
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
                return (
                  <MessageComponent
                    key={index}
                    text={message.content}
                    sameUser={sameUser}
                    userId={message.sender._id}
                    isGroupChat={selectedChat.isGroupChat}
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
            <div className="flex items-center space-x-2 h-full">
              <IconButton
                name="emojis"
                event={() => setShowEmojiPicker(!showEmojiPicker)}
                colorHover={"#54b3f3"}
                backgroundHover={"#e9f6fd"}
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

            <IconButton
              name="send"
              event={sendMessageHandler}
              colorHover={"#54b3f3"}
              backgroundHover={"#e9f6fd"}
            />
            <InfoGroupModal
              users={selectedChat.users}
              isOpen={modalInfoOpen}
              chatName={chatName}
              handleChatNameChange={handleChatNameChange}
              onRequestClose={() => setModalInfoOpen(false)}
            />
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
