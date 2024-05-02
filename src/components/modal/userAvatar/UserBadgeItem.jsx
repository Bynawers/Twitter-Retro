import React from 'react';
import { IoIosClose } from "react-icons/io";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
      <div className="inline-flex items-center bg-blue-500 text-white px-2 py-1 rounded-lg m-1 mb-2 cursor-pointer" onClick={handleFunction}>
        <span className="text-xs">{user.fullName}</span>
        <IoIosClose />
      </div>
    );
  };

export default UserBadgeItem;