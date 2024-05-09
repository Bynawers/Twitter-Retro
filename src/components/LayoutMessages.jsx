import { useRef } from "react";

import Widget from "./Widget";
import Sidebar from "./navigation/SideBar";
import BottomBar from "./navigation/BottomBar";

const LayoutMessages = ({ children }) => {
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
      <div className="flex h-full mx-auto max-w-[1300px] overscroll-none">
        <div className="flex flex-1 h-full">
          <div className="flex flex-1 xl:min-w-[300px] justify-end sm:min-w-[88px]">
            <Sidebar />
          </div>
          <main className="flex flex-3">
            <div
              className="flex flex-col w-[918px] max-w-[988px] lg:min-w-[988px] xl:min-w-[1048px] relative overflow-y-scroll no-scrollbar scrollbar-none"
              ref={mainRef}
              onScroll={handleMainScroll}
            >
              {children}
            </div>
            <BottomBar />
          </main>
        </div>
      </div>
    </div>
  );
};
export default LayoutMessages;

/* Responsive DEBUG
sm:bg-green-300
md:bg-blue-300
lg:bg-red-400
xl:bg-yellow-400
*/
