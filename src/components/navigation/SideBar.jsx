import { useState } from "react";
import { FaFeatherAlt } from "react-icons/fa";

import SideBarElement from "./SideBarElement";
import ModalPost from "../modal/ModalPost";
import Avatar from "../Avatar";

import { useAuth } from "../../hooks/AuthProvider";

const Sidebar = () => {
  const auth = useAuth();

  const [modalPost, setModalPost] = useState(false);

  const handleToggleModal = () => {
    setModalPost(!modalPost);
  };

  return (
    <div className="hidden sm:inline h-full">
      <ModalPost modalIsOpen={modalPost} setIsOpen={setModalPost} />
      <div className="flex flex-col items-end ">
        <div className="fixed z-0 space-y-2 h-full xl:min-w-[270px] pt-2 border-r-[1px] pr-3">
          <SideBarElement name="Twitter" path="/home" />
          <SideBarElement name="Accueil" path="/home" />
          <SideBarElement name="Explorer" path="/explore" />
          <SideBarElement name="Messages" path="/messages" />
          <SideBarElement name="Signets" path="/bookmark" />
          <SideBarElement name="Profiles" path={"/" + auth.user.tag} />
          <div className="pb-5" />
          <ButtonPost handleToggleModal={handleToggleModal} />
          <Avatar
            username={auth.user ? auth.user.fullName : "undefined"}
            tag={auth.user ? auth.user.tag : "undefined"}
            id={auth.user ? auth.user._id : null}
          />
        </div>
      </div>
    </div>
  );
};

const ButtonPost = (props) => {
  return (
    <button
      onClick={props.handleToggleModal}
      className="flex justify-center bg-twitter p-3 w-full
      cursor-pointer rounded-full py-4 xl:py-3 xl:mr-5 font-sans hover:bg-twitterDark
    "
    >
      <span className="text-lg text-white font-semibold hidden xl:inline 2xl:inline">
        Poster
      </span>
      <FaFeatherAlt
        className="text-white inline xl:hidden 2xl:hidden"
        size="2em"
      />
    </button>
  );
};

export default Sidebar;
