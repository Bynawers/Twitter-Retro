import { useState, useEffect } from "react";

import { FiSettings } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";

import {
  IoEllipsisHorizontal,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoHeart,
  IoStatsChart,
  IoRepeatOutline,
  IoRepeat,
  IoBookmarkOutline,
  IoBookmark,
  IoShareSocialOutline,
  IoCloseOutline,
  IoMailOutline,
  IoArrowBackOutline,
  IoImageOutline,
} from "react-icons/io5";

const IconButton = (props) => {
  const [color, setColor] = useState("#4e5255");
  const [background, setBackground] = useState("");

  const styles = "size-[19px] ";
  const animation = "transition-all duration-300";

  const iconDataSet = {
    back: (
      <IoArrowBackOutline
        style={{ color: color, fontSize: props.size ? props.size : 17 }}
      />
    ),
    twitter: (
      <FaTwitter
        color="#00ADED"
        style={{ fontSize: props.size ? props.size : 35 }}
      />
    ),
    setting: (
      <FiSettings
        style={{ color: color, fontSize: props.size ? props.size : 17 }}
      />
    ),
    chat: (
      <IoChatbubbleOutline
        className={styles + animation}
        style={{ color: color, fontSize: props.size ? props.size : 17 }}
      />
    ),
    retweet: props.state ? (
      <IoRepeat
        className={styles + animation}
        style={{ color: color, fontSize: props.size ? props.size : 17 }}
      />
    ) : (
      <IoRepeatOutline
        className={styles + animation}
        style={{ color: color, fontSize: props.size ? props.size : 17 }}
      />
    ),
    like: props.state ? (
      <IoHeart
        className={animation}
        style={{ color: color, fontSize: props.size ? props.size : 19 }}
      />
    ) : (
      <IoHeartOutline
        className={animation}
        style={{ color: color, fontSize: props.size ? props.size : 19 }}
      />
    ),
    view: (
      <IoStatsChart
        className={animation}
        style={{ color: color, fontSize: props.size ? props.size : 19 }}
      />
    ),
    bookmark: props.state ? (
      <IoBookmark
        className={animation}
        style={{ color: color, fontSize: props.size ? props.size : 19 }}
      />
    ) : (
      <IoBookmarkOutline
        className={animation}
        style={{ color: color, fontSize: props.size ? props.size : 19 }}
      />
    ),
    share: (
      <IoShareSocialOutline
        className={animation}
        style={{ color: color, fontSize: props.size ? props.size : 19 }}
      />
    ),
    more: (
      <IoEllipsisHorizontal
        className={animation}
        style={{ color: color, fontSize: props.size ? props.size : 19 }}
      />
    ),
    close: (
      <IoCloseOutline
        className={animation}
        style={{ color: color, fontSize: props.size ? props.size : 25 }}
      />
    ),
    message: (
      <IoMailOutline className={styles + animation} style={{ color: color }} />
    ),
    image: (
      <IoImageOutline
        style={{ color: "#00ADED", fontSize: props.size ? props.size : 19 }}
      />
    ),
    user: (
      <img
        className="flex h-8 w-8 rounded-full object-cover"
        src="./src/assets/defaultAvatar.jpg"
      />
    ),
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.event();
  };

  const handleHover = () => {
    if (props.hover == null) {
      setColor(props.color != null ? props.color : "#4e5255");
      setBackground(props.background != null ? props.background : "#e7e7e8");
    }
  };

  const handleUnHover = () => {
    if (!props.state) {
      setColor("#4e5255");
    }
    setBackground("");
  };

  return (
    <button
      className="flex h-full items-center justify-end rounded-xl"
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnHover}
    >
      <div
        data-tooltip-id={props.tooltip}
        className={
          `rounded-3xl p-2 bg-icon-` +
          background +
          ` transition-all duration-300 cursor-pointer ` +
          props.styles
        }
        style={{ backgroundColor: background }}
      >
        {iconDataSet[props.name]}
      </div>
      {props.value !== null && (
        <span className={` text-sm ` + animation} style={{ color: color }}>
          {props.value != 0 ? props.value : ""}
        </span>
      )}
    </button>
  );
};

export default IconButton;
