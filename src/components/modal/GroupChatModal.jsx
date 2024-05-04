import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import {toast ,ToastContainer}from "react-toastify";
import { useAuth } from "../../hooks/AuthProvider";
import axios from "axios";
import { useChat } from "../../hooks/ChatP";
import twitterConfig from "../../../twitterConfig.json";
import UserBadgeItem from "./userAvatar/UserBadgeItem";
import UserListItem from "./userAvatar/UserListItem";

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
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
};

function GroupChatModal({ isOpen , onRequestClose}) {
  let subtitle;
  const { chats, setChats } = useChat(); 
  const { user, token } = useAuth();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log(userToAdd);
      toast.error("User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Auth: token,
        },
      };
      const { data } = await axios.get(BASE_URL+`/search?search=${search}`, config);
      console.log(data);
      setLoading(false);
      console.log(data);
      setSearchResult(data);
    } catch (error) {
      toast.error("Error searching users");
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const config = {
        headers: {
          Auth: token,
        },
      };
      const { data } = await axios.post(
        BASE_URL+`/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onRequestClose();
      toast.success("Group chat created successfully");
    } catch (error) {
        console.log(error); 
      toast.error("Error creating group chat");
    }
  };

  function afterOpenModal() {
    if (subtitle) {
      subtitle.style.color = "#f00";
    }
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
      >
        <div className="flex-col">
          <div className="flex justify-between">
            
            <div className="flex-col">
              <div>Create a group</div>
              <div>add People</div>
            </div>

            <div onClick={handleSubmit}>create</div>
          </div>
          <input type="text" placeholder="groupchatname" className="w-full m-4 h-10" onChange={(e) => setGroupChatName(e.target.value)}/>
          <div className="flex m-4  ">
            <div>icon</div>
            <input type="text" placeholder="search" className="w-full ml-2 h-10" onChange={(e) => handleSearch(e.target.value)} />
          </div>
          <div>
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
          </div>
            <div>
                {searchResult.map((user) => (
                <UserListItem user={user} handleFunction={() => handleGroup(user)} />
                ))}
            </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default GroupChatModal;
