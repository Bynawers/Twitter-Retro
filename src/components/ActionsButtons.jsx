import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import ReduceBigNumber from "../utils/ReduceBigNumbers";

import {
  likeTweet,
  unlikeTweet,
  retweetTweet,
  unretweetTweet,
  bookmarkTweet,
  unbookmarkTweet,
} from "../services/RequestTweets";
import IconButton from "./button/IconButton";

import { useAuth } from "../hooks/AuthProvider";

const ActionButtons = (props) => {
  const auth = useAuth();
  const { user, updateUser } = useAuth();

  const [like, setLike] = useState(
    auth.user.likes ? auth.user.likes.includes(props.id) : false
  );
  const [retweet, setRetweet] = useState(
    auth.user.retweets ? auth.user.retweets.includes(props.id) : false
  );
  const [bookmark, setBookmark] = useState(
    auth.user.bookmarks ? auth.user.bookmarks.includes(props.id) : false
  );

  const handleDefault = async (e) => {};

  const handleLike = async (e) => {
    e.preventDefault();

    let response;
    if (!like) {
      response = await likeTweet(props.id);
    } else {
      response = await unlikeTweet(props.id);
    }

    if (response) {
      let updatedLikes;
      if (like) {
        updatedLikes = auth.user.likes.filter((likeId) => likeId !== props.id);
      } else {
        updatedLikes = [...auth.user.likes, props.id];
      }

      const updatedUser = {
        ...auth.user,
        likes: updatedLikes,
        stat: {
          ...auth.user.stat,
          likeCount: auth.user.stat.likeCount + (like ? -1 : 1),
        },
      };

      updateUser(updatedUser);
      setLike(!like);
    } else {
      toast.error("An error has occurred");
    }
  };

  const handleRetweet = async (e) => {
    e.preventDefault();

    let response;
    if (!retweet) {
      response = await retweetTweet(props.id);
    } else {
      response = await unretweetTweet(props.id);
    }

    if (response) {
      setRetweet(!retweet);
    } else {
      toast.error("An error has occurred");
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();

    let response;
    if (!bookmark) {
      response = await bookmarkTweet(props.id);
    } else {
      response = await unbookmarkTweet(props.id);
    }

    if (response) {
      toast.success("Operation success");
      setBookmark(!bookmark);
    } else {
      toast.error("An error has occurred");
    }
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
        colorHover={"#54b3f3"}
        backgroundHover={"#e9f6fd"}
        name="chat"
      />
      <IconButton
        event={handleRetweet}
        value={ReduceBigNumber(props.data ? props.data.retweet : -1)}
        colorHover={"#13ba82"}
        backgroundHover={"#def1eb"}
        state={retweet}
        name="retweet"
      />
      <IconButton
        event={handleLike}
        value={ReduceBigNumber(props.data ? props.data.like : -1)}
        colorHover={"#fa2c8b"}
        backgroundHover={"#fee7f2"}
        state={like}
        name="like"
      />

      {props.view == "menu" && (
        <IconButton
          event={handleDefault}
          value={ReduceBigNumber(props.data ? props.data.view : -1)}
          colorHover={"#54b3f3"}
          backgroundHover={"#e9f6fd"}
          name="view"
        />
      )}
      {props.view == "main" && (
        <IconButton
          event={handleBookmark}
          value={ReduceBigNumber(props.data ? props.data.bookmark : -1)}
          colorHover={"#54b3f3"}
          backgroundHover={"#e9f6fd"}
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
            colorHover={"#54b3f3"}
            backgroundHover={"#e9f6fd"}
          />
          <IconButton
            event={handleShare}
            name="share"
            colorHover={"#54b3f3"}
            backgroundHover={"#e9f6fd"}
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
