import { useRef } from "react";

import Widget from "./Widget";
import Sidebar from "./navigation/SideBar";
import BottomBar from "./navigation/BottomBar";

const Layout = ({ children }) => {
  const widgetRef = useRef(null);
  const mainRef = useRef(null);

  const handleWidgetScroll = () => {
    if (mainRef.current && widgetRef.current) {
      mainRef.current.scrollTop = widgetRef.current.scrollTop;
    }
  };

  const handleMainScroll = () => {
    if (mainRef.current && widgetRef.current) {
      widgetRef.current.scrollTop = mainRef.current.scrollTop;
    }
  };

  return (
    <div className="fixed w-full h-full overscroll-none">
      <div className="flex h-full xl:px-30 mx-auto max-w-[1300px] overscroll-none">
        <div className="flex flex-1 h-full overflow-x-hidden overflow-y-hidden">
          <div className="flex flex-1 xl:min-w-[300px] justify-end sm:min-w-[88px]">
            <Sidebar />
          </div>
          <main className="flex flex-3 overflow-x-hidden overflow-y-hidden">
            <div
              className="flex flex-2 flex-col max-w-[600px] lg:min-w-[600px] relative overflow-y-scroll no-scrollbar scrollbar-none"
              ref={mainRef}
              onScroll={handleMainScroll}
            >
              {children}
              <BottomBar />
            </div>
            <div className="flex flex-1 border-l-[1px]">
              <div className="flex w-full md:w-[320px] lg:w-[414px] md:pl-4 md:pr-4 lg:pl-8 lg:pr-8">
                <div
                  className="hidden md:block w-full overflow-y-scroll no-scrollbar scrollbar-none"
                  ref={widgetRef}
                  onScroll={handleWidgetScroll}
                >
                  <Widget />
                </div>
              </div>
            </div>
            <div className="flex md:hidden w-[200px] flex-1 h-full"></div>
          </main>
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
