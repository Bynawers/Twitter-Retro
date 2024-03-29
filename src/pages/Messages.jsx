import React from "react";

function Messages() {
  return (
    <div className="flex w-full h-full">
      {/* User section */}
      <div className="w-1/4 h-full bg-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">User Information</h1>
          {/* Sample user information */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
            <div>
              <h2 className="font-bold">Username</h2>
              <p>User status or additional information</p>
            </div>
          </div>
          {/* Additional user details */}
          {/* Add more user details here */}
        </div>
      </div>
      {/* Chat section */}
      <div className="flex flex-col w-3/4 h-full">
        <div className="flex justify-center items-center h-16 bg-gray-200">
          <h1 className="text-xl font-bold">Chat</h1>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
          {/* Messages container */}
          <div className="flex flex-col gap-2 p-4">
            {/* Example message */}
            <div className="flex items-center">
              <div className="bg-blue-500 text-white py-2 px-4 rounded-l-lg">
                Hello!
              </div>
            </div>
            {/* Example received message */}
            <div className="flex items-center justify-end">
              <div className="bg-gray-300 py-2 px-4 rounded-r-lg">
                Hi there!
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-16 bg-gray-200">
          {/* Input area */}
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full h-full px-4"
          />
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold ml-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
