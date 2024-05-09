import React from "react";
import twitterConfig from "../../../twitterConfig.json";
const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;
const MessageComponent = ({ text, sameUser, isGroupChat, userId }) => {
  // Determine the background color and text color based on the sender
  const backgroundColor = sameUser ? "bg-blue-500" : "bg-gray-300";
  const textColor = sameUser ? "text-white" : "text-black";

  // Determine the text alignment based on the sender
  const justifyContent = sameUser ? "justify-end" : "justify-start";

  return (
    <div className={`flex items-center ${justifyContent}`}>
      {isGroupChat && !sameUser && (
        <img
          src={`${BASE_URL}/images/profile/${userId}`}
          className="w-8 h-8 rounded-full mr-1"
        />
      )}
      <div className="max-w-xs">
        <span
          className={`px-4 py-2 rounded-lg inline-block ${backgroundColor} ${textColor}`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default MessageComponent;
