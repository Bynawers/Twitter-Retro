import React from "react";

const MessageComponent = ({ text, sender }) => {
  // Define background colors and text colors for sender and receiver
  const senderBackgroundColor = "bg-blue-500";
  const receiverBackgroundColor = "bg-gray-300";
  const senderTextColor = "text-white";
  const receiverTextColor = "text-black";

  // Determine the background color and text color based on the sender
  const backgroundColor = sender === "user" ? senderBackgroundColor : receiverBackgroundColor;
  const textColor = sender === "user" ? senderTextColor : receiverTextColor;

  // Determine the text alignment based on the sender
  const justifyContent = sender === "user" ? 'justify-end' : 'justify-start';

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
