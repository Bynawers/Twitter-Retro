import SideBarElement from "./SideBarElement";

import { Link } from "react-router-dom";

const SidebarTest = () => {
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px] fixed">
          <SideBarElement name="Twitter" path="/home" />
          <SideBarElement name="Accueil" path="/home" />
          <SideBarElement name="Explorer" path="/explore" />
          <SideBarElement name="Notifications" path="/notifications" />
          <SideBarElement name="Messages" path="/not-found" />
          <SideBarElement name="Listes" path="/not-found" />
          <SideBarElement name="Signets" path="/not-found" />
          <SideBarElement name="Profiles" path="/not-found" />
          <SideBarElement name="Plus" path="/not-found" />

          <Link
            to={"/not-found"}
            onClick={() => {}}
            style={{ backgroundColor: "#00ADED" }}
            className="flex mr-7 justify-center mt-3
      cursor-pointer items-center space-x-2 rounded-full px-4 py-3 font-sans
      transition-all duration-200 hover:bg-gray-200mb-1"
          >
            <span className="text-lg pl-3 text-white font-semibold">
              Poster
            </span>
          </Link>

          <div
            to={"/not-found"}
            onClick={() => {}}
            className="flex mr-2 justify-center bottom-5
      cursor-pointer items-center space-x-2 rounded-full px-4 py-3 font-sans
      transition-all duration-200 hover:bg-gray-200mb-1 fixed"
          >
            <span className="text-lg pl-3 font-medium">Bynawers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarTest;
