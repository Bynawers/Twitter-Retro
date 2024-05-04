import { useRef } from "react";

import Widget from "./Widget";
import Sidebar from "./navigation/SideBar";
import BottomBar from "./navigation/BottomBar";

import { useAuth } from "../hooks/AuthProvider";

const Layout = ({ children }) => {
  const auth = useAuth();

  const widgetRef = useRef(null);
  const mainRef = useRef(null);

  let prevMainScrollTop = 0;
  let prevWidgetScrollTop = 0;

  const getScrollDirection = (prevScrollTop, currentScrollTop) => {
    return currentScrollTop > prevScrollTop
      ? "down"
      : currentScrollTop < prevScrollTop
      ? "up"
      : "none";
  };

  const handleScroll = (event) => {
    const currentMainScrollTop = mainRef.current.scrollTop;
    const currentWidgetScrollTop = widgetRef.current.scrollTop;

    const mainScrollDirection = getScrollDirection(
      prevMainScrollTop,
      currentMainScrollTop
    );
    const widgetScrollDirection = getScrollDirection(
      prevWidgetScrollTop,
      currentWidgetScrollTop
    );

    if (mainScrollDirection === "down") {
      const scrollDiff = (currentMainScrollTop - prevMainScrollTop) / 2;
      widgetRef.current.scrollTop += scrollDiff;
    } else if (mainScrollDirection === "up") {
      const scrollDiff = (currentMainScrollTop - prevMainScrollTop) / 2;
      widgetRef.current.scrollTop += scrollDiff;
    } else if (widgetScrollDirection === "up") {
      const scrollDiff = (currentWidgetScrollTop - prevWidgetScrollTop) / 2;
      mainRef.current.scrollTop += scrollDiff;
    } else if (widgetScrollDirection === "down") {
      const scrollDiff = (currentWidgetScrollTop - prevWidgetScrollTop) / 2;
      mainRef.current.scrollTop += scrollDiff;
    }

    prevMainScrollTop = currentMainScrollTop;
    prevWidgetScrollTop = currentWidgetScrollTop;
  };

  return (
    <div className="fixed w-full h-full overscroll-none">
      {auth.user && (
        <div className="flex h-full xl:px-30 mx-auto max-w-[1300px] overscroll-none">
          <div className="flex flex-1 h-full overflow-x-hidden overflow-y-hidden">
            <div className="flex flex-1 xl:min-w-[300px] justify-end sm:min-w-[88px]">
              <Sidebar />
            </div>
            <main className="flex flex-3 overflow-x-hidden overflow-y-hidden">
              <div
                className="flex flex-2 flex-col sm:min-w-[500px] md:min-w-[600px] max-w-[600px] lg:min-w-[600px] relative overflow-y-scroll no-scrollbar scrollbar-none"
                ref={mainRef}
                onScroll={handleScroll}
              >
                {children}
                <BottomBar />
              </div>
              <div className="flex flex-1 border-l-[1px]">
                <div className="flex w-full md:w-[320px] lg:w-[414px] md:pl-4 md:pr-4 lg:pl-8 lg:pr-8">
                  <div
                    className="hidden md:block w-full overflow-y-scroll no-scrollbar scrollbar-none"
                    ref={widgetRef}
                    onScroll={handleScroll}
                  >
                    <Widget />
                  </div>
                </div>
              </div>
              <div className="flex md:hidden w-[200px] flex-1 h-full"></div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};
export default Layout;
