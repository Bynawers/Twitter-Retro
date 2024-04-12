import React from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { getSender } from "../../utils/ChatLogics";
import { format } from 'date-fns';

const UserItem = ({ item, username, lastMessage, onClick, selected }) => {
  const auth = useAuth();

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const formattedDate = format(new Date(timestamp), 'MMM d, yyyy h:mm a');
    return formattedDate;
  };

  return (
    <div
      className={`flex items-center space-x-4 cursor-pointer p-4 ${
        selected ? "bg-gray-200 border-blue-500 border-r-4" : ""
      }`}
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <div className="font-bold">
            {/* Truncate long names */}
            {!item.isGroupChat
              ? getSender(auth.user, item.users)
              : item.chatName}
          </div>
          <div className="text-sm text-gray-500 whitespace-nowrap">
            {/* Format the timestamp */}
            {item.latestMessage?.createdAt && formatTimestamp(item.latestMessage.createdAt)}
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
