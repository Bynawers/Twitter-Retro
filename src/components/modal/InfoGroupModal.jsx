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

function InfoGroupModal({ isOpen, onRequestClose, chatName, users }) {
  const navigate = useNavigate();
  let subtitle;
  const { chats, setChats } = useChat();
  const { user, token } = useAuth();
  const {selectedChat} = useChat();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(
    users ? (users.length > 0 ? users : []) : []
  );
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(users);
  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const leaveRequest = async () => { 

    try{
      console.log(selectedChat._id);
      const config = {
        headers: {
          Auth: token,
        },
      };
      const { data } = await axios.put(
        "http://localhost:3001/api/chat/leave",
        {
          chatId: selectedChat._id,
        },
        config
      );
    window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error leaving the group chat");
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const data = await getSearchUser(query);
      console.log(data);
      setLoading(false);
      console.log(data);
      setSearchResult(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
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
  
      const { data } = await axios.put(
        "http://localhost:3001/api/chat/rename",
        requestBody,
        config
      );
  
      onRequestClose();
      window.location.reload();
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
                  <UserHandler data={u} navigate={navigate} />
                </React.Fragment>
              );
            })}
           <div onClick={leaveRequest}><ClassicButton text="Leave group" color="red" textButton={true} /></div> 
          </div>

          <div className="flex items-center border-b">
            <HiSearch className="absolute ml-4 text-twitter" size={25} />
            <input
              type="text"
              placeholder="Search people"
              className="w-[90%] ml-[10%] h-10 pr-4 outline-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {searchResult.map((user, index) => (
            <React.Fragment key={index}>
              <UserElement data={user} event={() => handleGroup(user)} />
            </React.Fragment>
          ))}
        </div>
      </Modal>
    </>
  );
}

const UserElement = (props) => {
  return (
    <div className="w-full h-[65px]">
      <Avatar
        group
        id={props.data._id}
        username={props.data.fullName}
        tag={props.data.tag}
        event={props.event}
      />
    </div>
  );
};

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
          'Content-Type': 'application/json',
          Auth : token
        },
      };
  
      const requestBody = {
        chatId: selectedChat._id,
        userId: props.data._id,
      };
  
      const { data } = await axios.put(
        "http://localhost:3001/api/chat/groupremove",
        requestBody,
        config
      );
  
      toast.success("User removed from the group chat");
    } catch (error) {
      console.error(error);
      throw new Error("Error removing user from the group chat");
    }
  };
  return (
    <button
      className="flex flex-col items-center w-full"
      to={"/" + props.data.tag}
    >
      <div
        className="flex
      cursor-pointer items-center xl:px-4 xl:py-3 font-sans w-[85px] xl:w-full hover:bg-gray-100 xl:justify-between justify-center"
      >
        <div className="flex flex-row items-center w-full justify-between" >
          <div className="flex" onClick={goProfile}>
            <img
              className="flex h-[40px] w-[40px] rounded-full object-cover"
              src={BASE_URL + "/images/profile/" + props.data._id}
            />
            <div className="hidden flex-col items-start xl:flex 2xl:flex">
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
    </button>
  );
};

export default InfoGroupModal;
