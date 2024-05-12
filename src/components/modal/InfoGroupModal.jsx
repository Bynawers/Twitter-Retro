import React, { useEffect } from "react";
import Modal from "react-modal";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";
import { useChat } from "../../hooks/ChatP";
import twitterConfig from "../../../twitterConfig.json";
import UserBadgeItem from "./userAvatar/UserBadgeItem";
import UserListItem from "./userAvatar/UserListItem";
import IconButton from "../button/IconButton";
import ClassicButton from "../button/ClassicButton";
import { HiSearch } from "react-icons/hi";
import SearchBar from "../SearchBar";
import Avatar from "../Avatar";
import { getSearchUser } from "../../services/RequestUsers";

import { useNavigate } from "react-router-dom";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 670,
    height: "80%",
    borderRadius: 20,
    overflowX: "hidden",
    overflowY: "scroll",
    backgroundColor: "white",
    border: 0,
    padding: 0,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
};

function InfoGroupModal({
  isOpen,
  onRequestClose,
  chatName,
  setChatName,
  users,
}) {
  const navigate = useNavigate();
  let subtitle;
  const { chats, setChats } = useChat();
  const { user, token } = useAuth();
  const { selectedChat } = useChat();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(
    users ? (users.length > 0 ? users : []) : []
  );

  const leaveRequest = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
      };

      const requestBody = {
        chatId: selectedChat._id,
        userId: user._id,
      };

      const response = await axios.put(
        BASE_URL + "/api/chat/groupremove",

        requestBody,
        config
      );
      if (response.status === 200) {
        onRequestClose();
        const newChats = chats.filter((item) => item._id !== selectedChat._id);
        setChats(newChats);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error leaving the group chat");
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Auth: token,
        },
      };

      const requestBody = {
        chatId: selectedChat,
        chatName: groupChatName,
      };

      if (groupChatName == "") {
        return;
      }

      const response = await axios.put(
        BASE_URL + "/api/chat/rename",
        requestBody,
        config
      );

      if (response.status === 200) {
        setChatName(groupChatName);
        const newChats = chats.map((item) =>
          item._id === selectedChat._id
            ? { ...item, chatName: groupChatName }
            : item
        );
        setChats(newChats);
        onRequestClose();
      }
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, e.g., display an error message to the user
      throw new Error("Error renaming the group chat");
    }
  };

  function afterOpenModal() {
    if (subtitle) {
      subtitle.style.color = "#f00";
    }
  }

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={onRequestClose}
        contentLabel="GroupChat Modal"
      >
        <div className="relative flex-col">
          <div>
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center space-x-4 ">
                <IconButton name="close" event={onRequestClose} />

                <span className="text-xl font-bold text-gray-800">
                  Manage group "{chatName}"
                </span>
              </div>

              <ClassicButton
                text="Modify"
                color={selectedUsers.length !== 0 ? "black" : "lock"}
                event={handleSubmit}
              />
            </div>
            <div className="flex ml-2 space-between w-[100%] px-4 items-center space-x-4 border-b pb-4">
              <span className="text-lg text-gray-600">Modifier le nom</span>
              <input
                type="text"
                placeholder={chatName}
                className="w-[70%] h-10 text-md outline-none border-2 rounded-lg border-gray-200 p-4 mt-2"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </div>
          </div>

          <div>
            {selectedUsers.map((u, index) => {
              return (
                <React.Fragment key={index}>
                  <UserHandler
                    data={u}
                    navigate={navigate}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                </React.Fragment>
              );
            })}
            <div
              onClick={leaveRequest}
              className="ml-[40%]  mr-[40%] justify-center items-center flex"
            >
              <ClassicButton text="Leave group" color="red" textButton={true} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

const UserHandler = (props) => {
  const goProfile = () => {
    props.navigate("/" + props.data.tag);
  };
  const selectedChat = useChat().selectedChat;
  const { token } = useAuth();

  const handleremove = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
      };

      const requestBody = {
        chatId: selectedChat._id,
        userId: props.data._id,
      };

      const response = await axios.put(
        BASE_URL + "/api/chat/groupremove",
        requestBody,
        config
      );

      if (response.status == 200) {
        const updatedUsers = props.selectedUsers.filter(
          (item) => item._id !== props.data._id
        );
        console.log(updatedUsers);
        props.setSelectedUsers(updatedUsers);
      }

      toast.success("User removed from the group chat");
    } catch (error) {
      console.error(error);
      throw new Error("Error removing user from the group chat");
    }
  };

  return (
    <div
      className="flex flex-col items-center w-full cursor-pointer"
      to={"/" + props.data.tag}
    >
      <div
        className="flex
      cursor-pointer items-center px-4 py-3 font-sans w-full hover:bg-gray-100 justify-center"
      >
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex" onClick={goProfile}>
            <img
              className="flex h-[40px] w-[40px] rounded-full object-cover"
              src={BASE_URL + "/images/profile/" + props.data._id}
            />
            <div className="flex-col items-start flex">
              <span className="text-md pl-3 font-bold">
                {props.data.fullName}
              </span>
              <span className="text-md pl-3 font-light">@{props.data.tag}</span>
            </div>
          </div>
          <ClassicButton
            text="remove"
            color="red"
            textButton={true}
            event={handleremove}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoGroupModal;
