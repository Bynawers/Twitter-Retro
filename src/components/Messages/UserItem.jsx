import React from "react";

const UserItem = ({ username, lastMessage, onClick }) => {
  return (
    <div
      className="flex items-center space-x-4 cursor-pointer mb-4"
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
      <div>
        <h2 className="font-bold">{username}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default UserItem;
