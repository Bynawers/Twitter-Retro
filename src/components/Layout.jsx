import React from "react";

import Widget from "./Widget";
import Sidebar from "./navigation/SideBar";
import BottomBar from "./navigation/BottomBar";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="flex h-full mx-auto xl:px-30 max-w-[1200px]">
        <div className="flex flex-1 h-full overflow-x-hidden">
          <div className="flex flex-1 xl:min-w-[300px] justify-end sm:min-w-[88px]">
            <Sidebar />
          </div>
          <div className="flex flex-2 flex-col max-w-[600px] lg:min-w-[600px]">
            {children}
            <BottomBar />
          </div>
          <div className="flex flex-1">
            <div className="flex lg:w-[320px] 2xl:w-[380px] border-l-[1px] lg:mr-[10px] xl:mr-[30px] lg:pr-4">
              <div className="hidden lg:block w-full">
                <Widget />
              </div>
            </div>
          </div>
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
