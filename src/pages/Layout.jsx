import React from "react";

import Widget from "../components/home/Widget";
import Sidebar from "../components/home/SideBar";
import BottomBar from "../components/home/BottomBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-white">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid sm:grid-cols-6 lg:grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-6 row-span-5 max-w-[600px] sm:col-span-5 md:col-span-5 lg:col-span-2 xl:col-span-2 border-x-[1px]">
            {children}
          </div>
          <Widget />
          <BottomBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;

/* Responsive DEBUG
sm:bg-green-300
md:bg-blue-300
lg:bg-red-400
xl:bg-yellow-400
*/
