import React from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { getSender, getSenderid } from "../../utils/ChatLogics";
import { format } from "date-fns";
import twitterConfig from "../../../twitterConfig.json";
import groupimage from "../../services/images-group/group-chat.png";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

const UserItem = ({ item, username, lastMessage, onClick, selected }) => {
  const auth = useAuth();

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const formattedDate = format(new Date(timestamp), "MMM d, yyyy h:mm a");
    return formattedDate;
  };

  return (
    <div
      className={`flex items-center space-x-4 cursor-pointer p-4 ${
        selected ? "bg-gray-200 border-blue-500 border-r-4" : ""
      }`}
      onClick={onClick}
    >
      {!item.isGroupChat ? (
        <img
          src={`${BASE_URL}/images/profile/${getSenderid(
            auth.user,
            item.users
          )}`}
          alt=""
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <img
          src={groupimage}
          alt=""
          className="w-12 h-12 rounded-full bg-slate-300"
        />
        // Content for group chat can be added here if needed
      )}

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <div className="font-bold">
            {/* Truncate long names */}
            {!item.isGroupChat
              ? getSender(auth.user, item.users).fullName
              : item.chatName}
          </div>
          <div className="text-sm text-gray-500 whitespace-nowrap">
            {/* Format the timestamp */}
            {item.latestMessage?.createdAt &&
              formatTimestamp(item.latestMessage.createdAt)}
          </div>
        </div>

        <p className="text-gray-500">
          {item.latestMessage?.content
            ? item.latestMessage.content.length > 30
              ? item.latestMessage.content.substring(0, 31) + "..."
              : item.latestMessage.content
            : ""}
        </p>
      </div>
    </div>
  );
};

export default UserItem;
