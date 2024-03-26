import { useState } from "react";

import ReduceBigNumber from "../utils/ReduceBigNumbers";

import IconButton from "./button/IconButton";

const ActionButtons = (props) => {
  const [like, setLike] = useState(false);
  const [retweet, setRetweet] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const handleDefault = (e) => {};

  const handleLike = (e) => {
    setLike(!like);
  };

  const handleRetweet = (e) => {
    setRetweet(!retweet);
  };

  const handleBookmark = (e) => {
    setBookmark(!bookmark);
  };

  const handleShare = (e) => {};

  return (
    <div
      className={`flex flex-row justify-between h-12 w-full " ${
        props.view == "main" ? "border-b-[1px] border-t-[1px]" : ""
      }`}
    >
      <IconButton
        event={handleDefault}
        value={ReduceBigNumber(props.data ? props.data.comment : -1)}
        color={"#54b3f3"}
        background={"#e9f6fd"}
        name="chat"
      />
      <IconButton
        event={handleRetweet}
        value={ReduceBigNumber(props.data ? props.data.retweet : -1)}
        color={"#13ba82"}
        background={"#def1eb"}
        state={retweet}
        name="retweet"
      />
      <IconButton
        event={handleLike}
        value={ReduceBigNumber(props.data ? props.data.like : -1)}
        color={"#fa2c8b"}
        background={"#fee7f2"}
        state={like}
        name="like"
      />

      {props.view == "menu" && (
        <IconButton
          event={handleDefault}
          value={ReduceBigNumber(props.data ? props.data.view : -1)}
          color={"#54b3f3"}
          background={"#e9f6fd"}
          name="view"
        />
      )}
      {props.view == "main" && (
        <IconButton
          event={handleBookmark}
          value={ReduceBigNumber(props.data ? props.data.bookmark : -1)}
          color={"#54b3f3"}
          background={"#e9f6fd"}
          state={bookmark}
          name="bookmark"
        />
      )}

      {props.view == "menu" && (
        <div className="flex flex-row space-x-1">
          <IconButton
            event={handleBookmark}
            state={bookmark}
            name="bookmark"
            color={"#54b3f3"}
            background={"#e9f6fd"}
          />
          <IconButton
            event={handleShare}
            name="share"
            color={"#54b3f3"}
            background={"#e9f6fd"}
          />
        </div>
      )}
    </div>
  );
};

const PostButton = (props) => {
  const reduceValue = ReduceBigNumber(props.value);

  const handleClickButton = (e) => {
    e.preventDefault();
    alert("test");
  };

  return (
    <button className="flex items-center" onClick={handleClickButton}>
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
