import {
  IoEllipsisHorizontal,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoStatsChart,
  IoRepeatSharp,
  IoBookmarkOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

import ReduceBigNumber from "../utils/ReduceBigNumbers";

const ActionButtons = (props) => {
  return (
    <div
      className={`flex flex-row justify-between h-12 w-full " ${
        props.view == "main" ? "border-b-[1px] border-t-[1px]" : ""
      }`}
    >
      <PostButton
        value={7246324}
        icon={
          <IoChatbubbleOutline className="text-icon size-[19px] active:text-iconHover" />
        }
      />
      <PostButton
        value={84932}
        icon={
          <IoRepeatSharp className="text-icon size-[19px] active:text-iconHover" />
        }
      />
      <PostButton
        value={3482}
        icon={
          <IoHeartOutline className="text-icon size-[19px] active:text-iconHover" />
        }
      />
      {props.view == "menu" && (
        <PostButton
          value={865658}
          icon={
            <IoStatsChart className="text-icon size-[19px] active:text-iconHover" />
          }
        />
      )}
      {props.view == "main" && (
        <PostButton
          value={9}
          icon={
            <IoBookmarkOutline className="text-icon size-[19px] active:text-iconHover" />
          }
        />
      )}

      {props.view == "menu" && (
        <div className="flex flex-row space-x-1">
          <PostButton
            value={null}
            icon={
              <IoBookmarkOutline className="text-icon size-[19px] active:text-iconHover" />
            }
          />
          <PostButton
            value={null}
            icon={
              <IoShareSocialOutline className="text-icon size-[19px] active:text-iconHover" />
            }
          />
        </div>
      )}
    </div>
  );
};

const PostButton = (props) => {
  const reduceValue = ReduceBigNumber(props.value);

  return (
    <button className="flex items-center">
      <div className="active:bg-iconBackgroundHover p-2 rounded-full">
        {props.icon}
      </div>
      {props.value !== null && (
        <span className="text-icon pl-2 text-sm">{reduceValue}</span>
      )}
    </button>
  );
};

export default ActionButtons;
