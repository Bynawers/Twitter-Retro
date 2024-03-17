import { FiSettings } from "react-icons/fi";
import { FaTwitter, FaArrowLeft } from "react-icons/fa";

import {
  IoEllipsisHorizontal,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoStatsChart,
  IoRepeatSharp,
  IoBookmarkOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const IconButton = (props) => {
  return (
    <div className="flex h-full items-center justify-end">
      <div
        data-tooltip-id={props.tooltip}
        className={
          `rounded-3xl p-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer ` +
          props.styles
        }
        onClick={props.event}
      >
        {iconDataSet[props.name]}
      </div>
      {props.value !== null && (
        <span className="text-icon pl-2 text-sm">{props.value}</span>
      )}
    </div>
  );
};

const iconDataSet = {
  back: <FaArrowLeft size={17} />,
  twitter: <FaTwitter size="2em" color="#00ADED" />,
  setting: <FiSettings size={17} />,
  chat: (
    <IoChatbubbleOutline className="text-icon size-[19px] active:text-iconHover" />
  ),
  retweet: (
    <IoRepeatSharp className="text-icon size-[19px] active:text-iconHover" />
  ),
  like: (
    <IoHeartOutline className="text-icon size-[19px] active:text-iconHover" />
  ),
  view: (
    <IoStatsChart className="text-icon size-[19px] active:text-iconHover" />
  ),
  bookmark: (
    <IoBookmarkOutline className="text-icon size-[19px] active:text-iconHover" />
  ),
  share: (
    <IoShareSocialOutline className="text-icon size-[19px] active:text-iconHover" />
  ),
  more: (
    <IoEllipsisHorizontal className="text-icon size-[19px] hover:text-iconHover active:text-iconHover" />
  ),
  user: (
    <img
      className="flex h-8 w-8 rounded-full object-cover"
      src="./src/assets/defaultAvatar.jpg"
    />
  ),
};

export default IconButton;
