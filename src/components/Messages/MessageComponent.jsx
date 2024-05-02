import React from "react";

const MessageComponent = ({ text, sender }) => {
  // Determine the background color and text color based on the sender
  const backgroundColor = sender === "user" ? "bg-blue-500" : "bg-gray-300";
  const textColor = sender === "user" ? "text-white" : "text-black";

  // Determine the text alignment based on the sender
  const justifyContent = sender === "user" ? "justify-end" : "justify-start";

  return (
    <div className={`flex items-center ${justifyContent}`}>
      <div className="max-w-xs">
        <span className={`px-4 py-2 rounded-lg inline-block ${backgroundColor} ${textColor}`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default MessageComponent;
