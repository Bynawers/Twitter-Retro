import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useChat } from "../../hooks/ChatP";
import twitterConfig from "../../../twitterConfig.json";
import { getSearchUser } from "../../services/RequestUsers";
import Modal from "react-modal";
import { HiSearch } from "react-icons/hi";
import IconButton from "../button/IconButton";
import ClassicButton from "../button/ClassicButton";
import { toast } from "react-toastify";
import UserBadgeItem from "./userAvatar/UserBadgeItem";
import React from "react";
import Avatar from "../Avatar";

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

function AddUserstoGroupModal({ isOpen, onRequestClose }) {
    const { user, token } = useAuth();
    const { selectedChat } = useChat();
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const handleSearch = async (query) => {
       const data = await getSearchUser(query);
         setSearchResult(data); 
      };

      const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
      };

      const handleSubmit = async () => {
        if (!selectedUsers) {
          toast.error("select users to add");
          return;
        }
        console.log(selectedUsers.map(user => user._id))
        try {
          const config = {
            headers: {
              Auth: token,
            },
          };
          const { data } = await axios.put(
            BASE_URL + `/api/chat/groupadd`,
            {
            chatId: selectedChat._id,
              userIds: selectedUsers.map(user => user._id),
            },
            config
          );
          onRequestClose();
          window.location.reload();
          toast.success("Group chat created successfully");
        } catch (error) {
          console.log(error);
          toast.error("Error creating group chat");
        }
      };
      const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
          return;
        }
    
        setSelectedUsers([...selectedUsers, userToAdd]);
      };


      return (
        <>
            <Modal
                isOpen={isOpen}
                style={customStyles}
                onRequestClose={onRequestClose}
                contentLabel="Add users">
            <div className="flex-col">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center space-x-4 ">
                <IconButton name="close" event={onRequestClose} />

                <span className="text-xl font-bold text-gray-800">
                  Add Users to {selectedChat.name}
                </span>
              </div>
              <ClassicButton
                text="Add"
                color={selectedUsers.length !== 0 ? "black" : "lock"}
                event={handleSubmit}
              />
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
              <div className="">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />)
              )}
                </div>
              <div>
              {searchResult.map((user, index) => (
                <React.Fragment key={index}>
                  <UserElement data={user} event={() => handleGroup(user)} />
                </React.Fragment>
              ))}
            </div>

            </div>

            </Modal>

        </>
      )
    
    

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
export default AddUserstoGroupModal;