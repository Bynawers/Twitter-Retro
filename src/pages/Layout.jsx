import React from "react";

import Widget from "../components/home/Widget";
import Sidebar from "../components/home/SideBar";
import Home from "../pages/Home";

const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-white ">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px]
          "
          >
            <Home />
          </div>
          <Widget />
        </div>
      </div>
    </div>
  );
};

export default Layout;
