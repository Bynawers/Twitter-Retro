import React from "react";
import UserItemSegment from "../components/Messages/UserSegment";
import MessageSegment from "../components/Messages/MessageSegment";
import { ToastContainer, toast } from "react-toastify";

function Messages() {
  return (
    <div className="flex w-full h-full">
      {/* UserItem segment */}
      <UserItemSegment />
      {/* Message segment */}
      <MessageSegment />
      <ToastContainer />
    </div>
  );
}

export default Messages;
