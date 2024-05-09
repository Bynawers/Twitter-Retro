import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { toast } from "react-toastify";
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

function GroupChatModal({ isOpen, onRequestClose }) {
  let subtitle;
  const { chats, setChats } = useChat();
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
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
      const data = await getSearchUser(query);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error);
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
        BASE_URL + `/api/chat/group`,
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

  const handleNext = () => {
    if (selectedUsers.length === 0) {
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={onRequestClose}
        contentLabel="GroupChat Modal"
      >
        <div className="relative flex-col">
          <div className="sticky">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center space-x-4 ">
                <IconButton
                  name={step == 1 ? "close" : "back"}
                  event={step == 1 ? onRequestClose : handleBack}
                />

                <span className="text-xl font-bold text-gray-800">
                  New message
                </span>
              </div>

              {step == 1 && (
                <ClassicButton
                  text="Next"
                  color={selectedUsers.length !== 0 ? "black" : "lock"}
                  event={handleNext}
                />
              )}
              {step == 2 && <IconButton name="close" event={onRequestClose} />}
            </div>
            {step == 1 && (
              <div className="flex items-center border-b">
                <HiSearch className="absolute ml-4 text-twitter" size={25} />
                <input
                  type="text"
                  placeholder="Search people"
                  className="w-[90%] ml-[10%] h-10 pr-4 outline-none"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            )}
          </div>
          {step == 1 && (
            <div className="">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </div>
          )}
          {step == 1 && (
            <div>
              {searchResult.map((user, index) => (
                <React.Fragment key={index}>
                  <UserElement data={user} event={() => handleGroup(user)} />
                </React.Fragment>
              ))}
            </div>
          )}

          {step == 2 && (
            <div className="flex flex-col ml-2 pt-8 w-[90%] px-8">
              <span className="text-xl text-gray-600">Nom du groupe</span>
              <input
                type="text"
                placeholder=""
                className="w-full h-10 text-md outline-none border-2 rounded-lg border-gray-200 p-4 mt-2"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </div>
          )}

          {step == 2 && (
            <div className="w-full flex justify-center pt-10">
              <ClassicButton
                text="Submit"
                color={groupChatName.length !== 0 ? "twitter" : "lock"}
                event={handleSubmit}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export const UserElement = (props) => {
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

export default GroupChatModal;
