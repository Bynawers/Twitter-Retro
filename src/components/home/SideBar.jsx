import SideBarElement from "./SideBarElement";

import { FaFeatherAlt } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden md:inline sm:inline lg:inline xl:inline 2xl:inline h-full pr-2 md:pr-4">
      <div className="flex flex-col items-end ">
        <div className="space-y-2 fixed h-full xl:min-w-[270px] pt-2">
          <SideBarElement name="Twitter" path="/home" />
          <SideBarElement name="Accueil" path="/home" />
          <SideBarElement name="Explorer" path="/explore" />
          <SideBarElement name="Notifications" path="/notifications" />
          <SideBarElement name="Messages" path="/not-found" />
          <SideBarElement name="Listes" path="/not-found" />
          <SideBarElement name="Signets" path="/not-found" />
          <SideBarElement name="Profiles" path="/not-found" />
          <SideBarElement name="Plus" path="/not-found" />
          <div className="pb-5" />
          <ButtonPost />
          <Avatar />
        </div>
      </div>
    </div>
  );
};

const ButtonPost = () => {
  return (
    <Link
      to={"/not-found"}
      onClick={() => {}}
      className="flex justify-center bg-twitter p-3
      cursor-pointer rounded-full py-4 xl:py-3 xl:mr-5 font-sans hover:bg-blue-400
    "
    >
      <span className="text-lg text-white font-semibold hidden xl:inline 2xl:inline">
        Poster
      </span>
      <FaFeatherAlt
        className="text-white inline xl:hidden 2xl:hidden"
        size="2em"
      />
    </Link>
  );
};

const Avatar = () => {
  return (
    <div className="flex absolute bottom-5 w-full">
      <div
        to={"/not-found"}
        onClick={() => {}}
        className="flex
      cursor-pointer items-center rounded-full xl:px-4 xl:py-3 font-sans w-[85px] xl:w-full hover:bg-gray-200 xl:justify-between justify-center"
      >
        <div className="flex flex-row items-center">
          <img
            className="flex h-[50px] w-[50px] rounded-full object-cover"
            src="./src/assets/defaultAvatar.jpg"
          />
          <div className="hidden flex-col items-start xl:flex 2xl:flex">
            <span className="text-sm pl-3 font-bold">Bynawers</span>
            <span className="text-sm pl-3 font-light">@Byna_wers</span>
          </div>
        </div>
        <div className="hidden items-start xl:inline 2xl:inline">
          <HiOutlineDotsHorizontal size="1.5em" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
