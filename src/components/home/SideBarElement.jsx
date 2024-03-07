import {
  HiHome,
  HiOutlineHome,
  HiSearch,
  HiOutlineSearch,
  HiBell,
  HiOutlineBell,
  HiChatAlt,
  HiOutlineChatAlt,
  HiDocumentText,
  HiOutlineDocumentText,
  HiBookmark,
  HiOutlineBookmark,
  HiUserCircle,
  HiOutlineUserCircle,
  HiDotsCircleHorizontal,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";

import { FaTwitter } from "react-icons/fa";

import { useLocation, Link } from "react-router-dom";

const SideBarElement = (props) => {
  const location = useLocation();

  const isSelected = location.pathname == props.path;

  return (
    <Link
      to={props.path}
      onClick={() => props.setSelected(props.name)}
      className="group flex max-w-fit 
      cursor-pointer items-center space-x-1 rounded-full px-4 py-3 font-sans
      transition-all duration-200 hover:bg-gray-200 mb-1 border-white"
    >
      {props.name === "Twitter" && <FaTwitter size="2em" color="#00ADED" />}
      {props.name === "Accueil" &&
        (isSelected ? (
          <HiHome size="2em" color="#0f1419" />
        ) : (
          <HiOutlineHome size="2em" color="#0f1419" />
        ))}
      {props.name === "Explorer" &&
        (isSelected ? (
          <HiSearch size="2em" color="#0f1419" />
        ) : (
          <HiOutlineSearch size="2em" color="#0f1419" />
        ))}
      {props.name === "Notifications" &&
        (isSelected ? (
          <HiBell size="2em" color="#0f1419" />
        ) : (
          <HiOutlineBell size="2em" color="#0f1419" />
        ))}
      {props.name === "Messages" &&
        (isSelected ? (
          <HiChatAlt size="2em" color="#0f1419" />
        ) : (
          <HiOutlineChatAlt size="2em" color="#0f1419" />
        ))}
      {props.name === "Listes" &&
        (isSelected ? (
          <HiDocumentText size="2em" color="#0f1419" />
        ) : (
          <HiOutlineDocumentText size="2em" color="#0f1419" />
        ))}
      {props.name === "Signets" &&
        (isSelected ? (
          <HiBookmark size="2em" color="#0f1419" />
        ) : (
          <HiOutlineBookmark size="2em" color="#0f1419" />
        ))}
      {props.name === "Profiles" &&
        (isSelected ? (
          <HiUserCircle size="2em" color="#0f1419" />
        ) : (
          <HiOutlineUserCircle size="2em" color="#0f1419" />
        ))}
      {props.name === "Plus" &&
        (isSelected ? (
          <HiDotsCircleHorizontal size="2em" color="#0f1419" />
        ) : (
          <HiOutlineDotsCircleHorizontal size="2em" color="#0f1419" />
        ))}

      {props.name !== "Twitter" && (
        <span className="hidden xl:inline 2xl:inline text-xl font-medium pl-3 pr-4 ">
          {props.name}
        </span>
      )}
    </Link>
  );
};

export default SideBarElement;
