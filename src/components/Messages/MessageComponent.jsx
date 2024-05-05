import React from "react";

const MessageComponent = ({ text, sender ,isGroupChat}) => {
  // Determine the background color and text color based on the sender
  const backgroundColor = sender === "user" ? "bg-blue-500" : "bg-gray-300";
  const textColor = sender === "user" ? "text-white" : "text-black";

  // Determine the text alignment based on the sender
  const justifyContent = sender === "user" ? "justify-end" : "justify-start";

  return (
    <div className={`flex items-center ${justifyContent}`}>
      {isGroupChat && sender === "user" && (
        <div className="w-10 h-10 bg-gray-400 rounded-ful"></div>
      )}
      <div className="max-w-xs">
        <span className={`px-4 py-2 rounded-lg inline-block ${backgroundColor} ${textColor}`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default MessageComponent;
