import { useState, useRef } from "react";

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
  IoCameraOutline,
} from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { HiSearch, HiOutlineSearch } from "react-icons/hi";
import { MdGif, MdOutlineEmojiEmotions } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { LuMailPlus } from "react-icons/lu";

const IconButton = (props) => {
  const inputRef = useRef(null);

  const [hover, setHover] = useState(false);
  const color = props.color ? props.color : "#4e5255";
  const background = props.background ? props.background : "";
  const backgroundHover = props.backgroundHover
    ? props.backgroundHover
    : "#eff1f1";

  const styles = "size-[19px] ";
  const animation = "transition-all duration-300";

  const iconDataSet = {
    back: (
      <IoArrowBackOutline
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 17,
        }}
      />
    ),
    twitter: (
      <FaTwitter
        color="#00ADED"
        style={{ fontSize: props.size ? props.size : 35 }}
      />
    ),
    chat: (
      <IoChatbubbleOutline
        className={styles + animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 17,
        }}
      />
    ),
    retweet: props.state ? (
      <IoRepeat
        className={styles + animation}
        style={{
          color: props.colorHover,
          fontSize: props.size ? props.size : 17,
        }}
      />
    ) : (
      <IoRepeatOutline
        className={styles + animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 17,
        }}
      />
    ),
    like: props.state ? (
      <IoHeart
        className={animation}
        style={{
          color: props.colorHover,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ) : (
      <IoHeartOutline
        className={animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ),
    view: (
      <IoStatsChart
        className={animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ),
    bookmark: props.state ? (
      <IoBookmark
        className={animation}
        style={{
          color: props.colorHover,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ) : (
      <IoBookmarkOutline
        className={animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ),
    share: (
      <IoShareSocialOutline
        className={animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ),
    camera: (
      <IoCameraOutline
        className={animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ),
    more: (
      <IoEllipsisHorizontal
        className={animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ),
    close: (
      <IoCloseOutline
        className={animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 25,
        }}
      />
    ),
    search: props.state ? (
      <HiSearch
        className={animation}
        style={{
          color: props.colorHover,
          fontSize: props.size ? props.size : 19,
        }}
      />
    ) : (
      <HiOutlineSearch
        className={animation}
        style={{
          color: hover ? props.colorHover : color,
          fontSize: props.size ? props.size : 19,
        }}
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
    emojis: (
      <MdOutlineEmojiEmotions
        style={{ color: "#00ADED", fontSize: props.size ? props.size : 19 }}
      />
    ),
    gif: (
      <MdGif
        style={{ color: "#00ADED", fontSize: props.size ? props.size : 25 }}
      />
    ),
    info: (
      <IoMdInformationCircleOutline
        style={{ color: "#00ADED", fontSize: props.size ? props.size : 25 }}
      />
    ),
    setting: (
      <RiSettings3Fill
        style={{ color: "#00ADED", fontSize: props.size ? props.size : 25 }}
      />
    ),
    group: (
      <LuMailPlus
        style={{ color: "#00ADED", fontSize: props.size ? props.size : 25 }}
      />
    ),
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        props.setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    props.setFile(file);
  };

  const openFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleClick = (e) => {
    if (props.type == "input") {
      openFileInput();
      return;
    }
    props.event(e);
  };

  const handleHover = () => {
    setHover(true);
  };

  const handleUnHover = () => {
    setHover(false);
  };

  return (
    <button
      className={`flex h-full items-center justify-end rounded-xl`}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnHover}
    >
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleProfileChange}
        style={{ display: "none" }}
        ref={inputRef}
      />

      <div
        data-tooltip-id={props.tooltip}
        className={
          `rounded-3xl p-2 transition-all duration-300 cursor-pointer ` +
          props.styles
        }
        style={{
          backgroundColor: hover
            ? backgroundHover
            : background
            ? background
            : "",
        }}
      >
        {iconDataSet[props.name]}
      </div>
      {props.value !== null && (
        <span
          className={` text-sm ` + animation}
          style={{ color: hover ? props.colorHover : color }}
        >
          {props.value != 0 ? props.value : ""}
        </span>
      )}
    </button>
  );
};

export default IconButton;
